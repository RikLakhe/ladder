import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { GET } from "../../src/app/api/primary-functions/[pfId]/functional-analysis/route";

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

  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfAId, "P4", "A-P4 analysis"]
  );
  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfBId, "P2", "B-P2 analysis"]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-4: GET /api/primary-functions/:pfId/functional-analysis", () => {
  it("returns exactly the target PF's functional_analyses rows, none of another PF's", async () => {
    const response = await GET(new Request("http://localhost/api/primary-functions/x/functional-analysis"), {
      params: Promise.resolve({ pfId: pfAId }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual([{ level: "P4", body: "A-P4 analysis" }]);
  });
});
