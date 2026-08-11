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

describe("B-2: GET /api/badges/:badgeCode/evidence returns ordered EvidenceResult[]", () => {
  let client: Client;
  let goodInstrumentId: string;
  let missingInstrumentId: string;

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

    // Seed an instrument with a known row
    const instrRes = await client.query(
      `INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3::jsonb) RETURNING id`,
      [pfRes.rows[0].id, "Test Instrument", JSON.stringify([{ key: "k1", text: "row text" }])]
    );
    goodInstrumentId = instrRes.rows[0].id;
    missingInstrumentId = "00000000-0000-0000-0000-000000000001";

    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required, evidence_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)`,
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
        JSON.stringify([
          { instrument_id: goodInstrumentId, row_key: "k1" },
          { instrument_id: missingInstrumentId, row_key: "k2" },
        ]),
      ]
    );
  }, 30000);

  afterAll(async () => {
    await client.end();
  });

  it("returns 200 array with ordered EvidenceResult entries", async () => {
    const { GET } = await import(
      "../../src/app/api/badges/[badgeCode]/evidence/route"
    );
    const req = new Request("http://localhost/api/badges/2E-TEST/evidence");
    const res = await GET(req, { params: Promise.resolve({ badgeCode: "2E-TEST" }) });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    expect(body[0]).toMatchObject({
      instrumentId: goodInstrumentId,
      rowKey: "k1",
      resolved: true,
      rowText: "row text",
    });
    expect(body[1]).toMatchObject({
      instrumentId: missingInstrumentId,
      rowKey: "k2",
      resolved: false,
    });
  });

  it("returns 404 for unknown badge_code", async () => {
    const { GET } = await import(
      "../../src/app/api/badges/[badgeCode]/evidence/route"
    );
    const req = new Request("http://localhost/api/badges/NO-SUCH/evidence");
    const res = await GET(req, { params: Promise.resolve({ badgeCode: "NO-SUCH" }) });
    expect(res.status).toBe(404);
  });
});
