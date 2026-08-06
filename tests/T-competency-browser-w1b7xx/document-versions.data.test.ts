import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getDocumentVersions } from "../../src/lib/document-versions";

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
let standardEmptyId: string;
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

  const standardEmpty = await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3) RETURNING id",
    [pf.rows[0].id, "P6", "Standard Empty body"]
  );
  standardEmptyId = standardEmpty.rows[0].id;

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

describe("B-1: getDocumentVersions", () => {
  it("returns exactly the target entity's rows, most-recent-first, none of another entity's", async () => {
    const rows = await getDocumentVersions(ADMIN_URL, "standards", standardAId);
    expect(rows.map((r) => r.changeNote)).toEqual(["Revised wording", "Initial draft"]);
    expect(new Date(rows[0].createdAt).getTime()).toBeGreaterThan(
      new Date(rows[1].createdAt).getTime()
    );
  });
});

describe("B-2: getDocumentVersions with zero rows", () => {
  it("returns an empty array (not an error) for an entity with no document_versions rows", async () => {
    const rows = await getDocumentVersions(ADMIN_URL, "standards", standardEmptyId);
    expect(rows).toEqual([]);
  });
});
