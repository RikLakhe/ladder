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

  // Truncate tables in order
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

  // Seed badge with mixed evidence (resolvable + broken)
  badgeCode = "TEST-B3";
  await client.query(
    `INSERT INTO badges (pf_id, level, name, badge_code, evidence_required)
     VALUES ($1, 'L1', 'Test Badge', $2, $3)`,
    [
      pfId,
      badgeCode,
      JSON.stringify([
        { instrument_id: instrumentId, row_key: "row-1" }, // resolvable
        { instrument_id: "00000000-0000-0000-0000-000000000001", row_key: "x" }, // broken
      ]),
    ]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-3: e2e — badge detail page renders evidence with expandable chips and broken-link warnings", () => {
  it("getEvidenceForBadge returns both resolvable and broken entries", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, badgeCode);
    expect(results).toHaveLength(2);

    const resolvable = results[0];
    expect(resolvable.resolved).toBe(true);
    expect(resolvable.rowText).toBe("Evidence Text 1");

    const broken = results[1];
    expect(broken.resolved).toBe(false);
    expect(broken.rowText).toBeUndefined();
  });

  it("resolves all evidence entries without omitting broken entries", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, badgeCode);

    // All entries present (not omitted)
    expect(results.every((r) => r.instrumentId && r.rowKey)).toBe(true);

    // Resolvable entry has rowText
    const resolvable = results.find((r) => r.resolved);
    expect(resolvable).toBeDefined();
    expect(resolvable?.rowText).toBeTruthy();

    // Broken entry does not have rowText
    const broken = results.find((r) => !r.resolved);
    expect(broken).toBeDefined();
    expect(broken?.rowText).toBeUndefined();
  });

  it("evidence data structure supports rendering as expandable chips and broken warnings", async () => {
    const results = await getEvidenceForBadge(DATABASE_URL, badgeCode);

    results.forEach((entry) => {
      // Each entry has the structure needed for rendering
      expect(entry).toHaveProperty("instrumentId");
      expect(entry).toHaveProperty("rowKey");
      expect(entry).toHaveProperty("resolved");

      if (entry.resolved) {
        // Resolvable: can be shown as expandable chip with rowText in expanded view
        expect(entry.rowText).toBeDefined();
      } else {
        // Broken: can be shown as warning without rowText
        expect(entry.rowText).toBeUndefined();
      }
    });
  });
});
