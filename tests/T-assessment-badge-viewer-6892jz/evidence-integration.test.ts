import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getEvidenceForBadge } from "../../src/lib/badges";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

let client: Client;
let instrumentId: string;
const BADGE_CODE = "TEST-B2-INTEGRATION";

beforeAll(async () => {
  await migrate(DATABASE_URL);
  client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

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

  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ('B2 Competency') RETURNING id"
  );
  const pfRes = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, 'B2 PF') RETURNING id",
    [compRes.rows[0].id]
  );
  const pfId = pfRes.rows[0].id;

  const instrRes = await client.query(
    "INSERT INTO instruments (pf_id, name, rows) VALUES ($1, 'B2 Instrument', $2) RETURNING id",
    [
      pfId,
      JSON.stringify([
        { key: "row-a", text: "B2 Evidence Text" },
      ]),
    ]
  );
  instrumentId = instrRes.rows[0].id;

  await client.query(
    `INSERT INTO badges (pf_id, level, name, badge_code, evidence_required)
     VALUES ($1, 'L1', 'B2 Badge', $2, $3)`,
    [
      pfId,
      BADGE_CODE,
      JSON.stringify([
        { instrument_id: instrumentId, row_key: "row-a" },
        { instrument_id: "00000000-0000-0000-0000-000000000099", row_key: "missing" },
        { instrument_id: instrumentId, row_key: "no-such-row" },
      ]),
    ]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-2: integration — badge with mixed evidence entries", () => {
  it("returns array length matching evidence_required", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, BADGE_CODE);
    expect(results).toHaveLength(3);
  });

  it("correctly flags resolved entries in mixed evidence", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, BADGE_CODE);
    expect(results[0].resolved).toBe(true);
    expect(results[0].rowText).toBe("B2 Evidence Text");
  });

  it("correctly flags broken entries in mixed evidence", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, BADGE_CODE);
    expect(results[1].resolved).toBe(false);
    expect(results[2].resolved).toBe(false);
    expect(results[1].rowText).toBeUndefined();
    expect(results[2].rowText).toBeUndefined();
  });

  it("does not omit broken entries from result array", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, BADGE_CODE);
    expect(results.every((r) => r.instrumentId && r.rowKey)).toBe(true);
    expect(results).toHaveLength(3);
  });
});
