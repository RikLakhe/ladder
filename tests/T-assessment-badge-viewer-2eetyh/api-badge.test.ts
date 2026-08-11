import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const TABLES_TO_TRUNCATE = [
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

describe("B-1: GET /api/badges/:badgeCode returns correct JSON", () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    for (const table of TABLES_TO_TRUNCATE) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }

    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Engineering"]
    );
    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [compRes.rows[0].id, "Backend"]
    );

    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        pfRes.rows[0].id,
        "Test Badge",
        "senior",
        "2E-TEST",
        "gold",
        "certifies text",
        "80%",
        "Tech Lead",
        true,
      ]
    );
  }, 30000);

  afterAll(async () => {
    await client.end();
  });

  it("returns 200 JSON with all badge fields for known badge_code", async () => {
    const { GET } = await import(
      "../../src/app/api/badges/[badgeCode]/route"
    );
    const req = new Request("http://localhost/api/badges/2E-TEST", {
      headers: { "x-database-url": DATABASE_URL },
    });
    const res = await GET(req, { params: Promise.resolve({ badgeCode: "2E-TEST" }) });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      badgeCode: "2E-TEST",
      name: "Test Badge",
      tier: "gold",
      level: "senior",
      certifies: "certifies text",
      completionBar: "80%",
      verifierRole: "Tech Lead",
      cosignerRequired: true,
    });
  });

  it("returns 404 with {error:'not found'} for unknown badge_code", async () => {
    const { GET } = await import(
      "../../src/app/api/badges/[badgeCode]/route"
    );
    const req = new Request("http://localhost/api/badges/NO-SUCH-BADGE", {
      headers: { "x-database-url": DATABASE_URL },
    });
    const res = await GET(req, { params: Promise.resolve({ badgeCode: "NO-SUCH-BADGE" }) });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toMatchObject({ error: "not found" });
  });
});
