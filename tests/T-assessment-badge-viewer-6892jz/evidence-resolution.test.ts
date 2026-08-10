import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getEvidenceForBadge } from "../../src/lib/badges";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

let client: Client;
let competencyId: string;
let pfId: string;
let instrumentId: string;
let badgeCode: string;

beforeAll(async () => {
  await migrate(DATABASE_URL);
  client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  // Truncate tables in order (from the spec)
  const truncateTables = [
    "document_versions",
    "training_units",
    "instruments",
    "badges",
    "functional_analyses",
    "standards",
    "primary_functions",
    "competencies",
    "admin_users",
  ];
  for (const table of truncateTables) {
    await client.query(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
  }

  // Seed competency
  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ('Test Competency') RETURNING id"
  );
  competencyId = compRes.rows[0].id;

  // Seed primary function
  const pfRes = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, 'Test PF') RETURNING id",
    [competencyId]
  );
  pfId = pfRes.rows[0].id;

  // Seed instrument with rows
  const instrumentRes = await client.query(
    "INSERT INTO instruments (pf_id, name, rows) VALUES ($1, 'Test Instrument', $2) RETURNING id",
    [
      pfId,
      JSON.stringify([
        { key: "row-1", text: "Evidence Text 1" },
        { key: "row-2", text: "Evidence Text 2" },
      ]),
    ]
  );
  instrumentId = instrumentRes.rows[0].id;

  // Seed badge with mixed evidence (resolvable, bad instrument_id, bad row_key)
  badgeCode = "TEST-B1";
  await client.query(
    `INSERT INTO badges (pf_id, level, name, badge_code, evidence_required)
     VALUES ($1, 'L1', 'Test Badge', $2, $3)`,
    [
      pfId,
      badgeCode,
      JSON.stringify([
        { instrument_id: instrumentId, row_key: "row-1" }, // resolvable
        { instrument_id: "00000000-0000-0000-0000-000000000001", row_key: "x" }, // bad instrument_id
        { instrument_id: instrumentId, row_key: "nonexistent" }, // bad row_key
      ]),
    ]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-1: evidence resolution for badge", () => {
  it("returns array with same length as evidence_required", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, "TEST-B1");
    expect(results).toHaveLength(3);
  });

  it("resolves resolvable entry with rowText", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, "TEST-B1");
    const resolvable = results[0];
    expect(resolvable.resolved).toBe(true);
    expect(resolvable.rowText).toBe("Evidence Text 1");
    expect(resolvable.instrumentId).toBe(instrumentId);
    expect(resolvable.rowKey).toBe("row-1");
  });

  it("returns unresolved for bad instrument_id", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, "TEST-B1");
    const badInstrument = results[1];
    expect(badInstrument.resolved).toBe(false);
    expect(badInstrument.instrumentId).toBe("00000000-0000-0000-0000-000000000001");
    expect(badInstrument.rowKey).toBe("x");
    expect(badInstrument.rowText).toBeUndefined();
  });

  it("returns unresolved for bad row_key", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, "TEST-B1");
    const badRowKey = results[2];
    expect(badRowKey.resolved).toBe(false);
    expect(badRowKey.instrumentId).toBe(instrumentId);
    expect(badRowKey.rowKey).toBe("nonexistent");
    expect(badRowKey.rowText).toBeUndefined();
  });

  it("returns empty array for nonexistent badge", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, "NONEXISTENT");
    expect(results).toEqual([]);
  });
});
