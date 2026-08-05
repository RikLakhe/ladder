import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getPrimaryFunctionsForCompetency } from "../../src/lib/primary-functions";

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

describe("B-1: primary functions for a competency are scoped by competency_id", () => {
  it("returns only the target competency's primary functions, none from another competency", async () => {
    const a = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Technical Skill"]
    );
    const aId = a.rows[0].id;
    await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
      aId,
      "Architecture",
    ]);
    await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
      aId,
      "Quality & Testing",
    ]);

    const b = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Leadership"]
    );
    const bId = b.rows[0].id;
    await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
      bId,
      "Mentoring",
    ]);

    const result = await getPrimaryFunctionsForCompetency(ADMIN_URL, aId);

    expect(result.map((pf) => pf.name).sort()).toEqual(["Architecture", "Quality & Testing"]);
    expect(result.some((pf) => pf.name === "Mentoring")).toBe(false);
  });
});
