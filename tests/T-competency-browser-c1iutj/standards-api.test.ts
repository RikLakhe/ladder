import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { GET } from "../../src/app/api/primary-functions/[pfId]/standard/route";

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
let pfAId: string;
let pfBId: string;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const competency = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  const competencyId = competency.rows[0].id;

  const pfA = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Architecture"]
  );
  pfAId = pfA.rows[0].id;

  const pfB = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Mentoring"]
  );
  pfBId = pfB.rows[0].id;

  await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
    pfAId,
    "P7",
    "A-P7 body",
  ]);
  await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
    pfAId,
    "P2",
    "A-P2 body",
  ]);
  await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
    pfBId,
    "P2",
    "B-P2 body",
  ]);
});

afterAll(async () => {
  await client.end();
});

function makeRequest(pfId: string, level?: string) {
  const url = level
    ? `http://localhost/api/primary-functions/${pfId}/standard?level=${level}`
    : `http://localhost/api/primary-functions/${pfId}/standard`;
  return GET(new Request(url), { params: Promise.resolve({ pfId }) });
}

describe("B-4: GET /api/primary-functions/:pfId/standard", () => {
  it("returns all of the target PF's standards in level order, none from another PF", async () => {
    const response = await makeRequest(pfAId);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual([
      { level: "P2", body: "A-P2 body" },
      { level: "P7", body: "A-P7 body" },
    ]);
  });

  it("?level= narrows the response to exactly that level's row", async () => {
    const response = await makeRequest(pfAId, "P2");
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual([{ level: "P2", body: "A-P2 body" }]);
  });
});
