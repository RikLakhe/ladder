import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getCompetenciesWithPfCount } from "../../src/lib/competencies";

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

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }
});

afterAll(async () => {
  await client.end();
});

describe("B-2: getCompetenciesWithPfCount returns lastUpdated field", () => {
  it("returns ISO string for competency with document_versions, null for one without", async () => {
    // Insert an admin user (required for document_versions FK)
    const adminRes = await client.query(
      "INSERT INTO admin_users (email) VALUES ($1) RETURNING id",
      ["test-admin@example.com"]
    );
    const adminId = adminRes.rows[0].id;

    // Competency WITH document versions
    const withDvRes = await client.query(
      "INSERT INTO competencies (name, description) VALUES ($1, $2) RETURNING id",
      ["Technical Skill", "Has versions"]
    );
    const withDvId = withDvRes.rows[0].id;
    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [withDvId, "Quality & Testing"]
    );
    const pfId = pfRes.rows[0].id;

    await client.query(
      "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by) VALUES ($1, $2, $3, $4)",
      ["primary_functions", pfId, "Initial version", adminId]
    );

    // Competency WITHOUT document versions
    const noDvRes = await client.query(
      "INSERT INTO competencies (name, description) VALUES ($1, $2) RETURNING id",
      ["Leadership", "No versions"]
    );
    const noDvId = noDvRes.rows[0].id;

    const rows = await getCompetenciesWithPfCount(ADMIN_URL);

    const withDvRow = rows.find((r) => r.id === withDvId);
    const noDvRow = rows.find((r) => r.id === noDvId);

    expect(withDvRow).toBeDefined();
    expect(noDvRow).toBeDefined();

    // Should have an ISO string for the row with versions
    expect(typeof withDvRow!.lastUpdated).toBe("string");
    expect(withDvRow!.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    // Should be null for the row without versions
    expect(noDvRow!.lastUpdated).toBeNull();
  });
});
