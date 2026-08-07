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

describe("B-1: home page data lists every competency with its primary-function count", () => {
  it("returns one row per competency, each with the correct primary_functions count", async () => {
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

    const rows = await getCompetenciesWithPfCount(ADMIN_URL);

    const withPfsRow = rows.find((r) => r.id === withPfsId);
    const emptyRow = rows.find((r) => r.id === emptyId);
    expect(withPfsRow).toEqual({ id: withPfsId, name: "Technical Skill", domains: [], pfCount: 2 });
    expect(emptyRow).toEqual({ id: emptyId, name: "Leadership", domains: [], pfCount: 0 });
  });

  it("returns a competency's domains, which may hold multiple values", async () => {
    const multi = await client.query(
      "INSERT INTO competencies (name, domains) VALUES ($1, $2) RETURNING id",
      ["Full Stack", ["development", "devops", "ai", "data"]]
    );
    const multiId = multi.rows[0].id;

    const rows = await getCompetenciesWithPfCount(ADMIN_URL);
    const multiRow = rows.find((r) => r.id === multiId);

    expect(multiRow?.domains).toEqual(["development", "devops", "ai", "data"]);
  });
});
