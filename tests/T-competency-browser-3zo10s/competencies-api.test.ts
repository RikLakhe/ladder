import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { GET } from "../../src/app/api/competencies/route";

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

describe("B-1: GET /api/competencies returns JSON array with primaryFunctionCount", () => {
  it("returns one entry per competency, count matching primary_functions rows", async () => {
    const withPfs = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Technical Skill"]
    );
    const withPfsId = withPfs.rows[0].id;
    await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
      withPfsId,
      "Quality & Testing",
    ]);
    await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
      withPfsId,
      "Architecture",
    ]);

    const empty = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Leadership"]
    );
    const emptyId = empty.rows[0].id;

    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();

    const withPfsEntry = body.find((r: { id: number }) => r.id === withPfsId);
    const emptyEntry = body.find((r: { id: number }) => r.id === emptyId);
    expect(withPfsEntry).toEqual({ id: withPfsId, name: "Technical Skill", primaryFunctionCount: 2 });
    expect(emptyEntry).toEqual({ id: emptyId, name: "Leadership", primaryFunctionCount: 0 });
  });
});
