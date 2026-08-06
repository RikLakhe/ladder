import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { GET } from "../../src/app/api/documents/[entityTable]/[entityId]/versions/route";

const ADMIN_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const TABLES = [
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

let client: Client;
let standardAId: string;
let standardBId: string;
let adminId: string;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const admin = await client.query(
    "INSERT INTO admin_users (email) VALUES ($1) RETURNING id",
    ["admin@example.com"]
  );
  adminId = admin.rows[0].id;

  const competency = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  const pf = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competency.rows[0].id, "Architecture"]
  );

  const standardA = await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3) RETURNING id",
    [pf.rows[0].id, "P4", "Standard A body"]
  );
  standardAId = standardA.rows[0].id;

  const standardB = await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3) RETURNING id",
    [pf.rows[0].id, "P5", "Standard B body"]
  );
  standardBId = standardB.rows[0].id;

  await client.query(
    "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by, created_at) VALUES ($1, $2, $3, $4, $5)",
    ["standards", standardAId, "Initial draft", adminId, "2026-01-01T00:00:00Z"]
  );
  await client.query(
    "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by, created_at) VALUES ($1, $2, $3, $4, $5)",
    ["standards", standardAId, "Revised wording", adminId, "2026-02-01T00:00:00Z"]
  );
  await client.query(
    "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by, created_at) VALUES ($1, $2, $3, $4, $5)",
    ["standards", standardBId, "Unrelated entity's version", adminId, "2026-03-01T00:00:00Z"]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-3: GET /api/documents/:entityTable/:entityId/versions", () => {
  it("returns exactly the target entity's versions, most-recent-first, none of another entity's", async () => {
    const response = await GET(
      new Request("http://localhost/api/documents/standards/x/versions"),
      { params: Promise.resolve({ entityTable: "standards", entityId: standardAId }) }
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.map((v: { changeNote: string }) => v.changeNote)).toEqual([
      "Revised wording",
      "Initial draft",
    ]);
    expect(body[0].changedBy).toBe(adminId);
  });
});
