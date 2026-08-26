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

describe("B-1: getCompetenciesWithPfCount returns description field", () => {
  it("returns the description string from the competency row", async () => {
    await client.query(
      "INSERT INTO competencies (name, description) VALUES ($1, $2)",
      ["Technical Skill", "A test description"]
    );

    const rows = await getCompetenciesWithPfCount(ADMIN_URL);
    const row = rows.find((r) => r.name === "Technical Skill");

    expect(row).toBeDefined();
    expect(row?.description).toBe("A test description");
  });
});
