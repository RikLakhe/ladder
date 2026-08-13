import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getCompetencyById } from "../../src/lib/competencies";

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

describe("B-1: getCompetencyById returns description field", () => {
  it("returns description from a competency row", async () => {
    const result = await client.query(
      "INSERT INTO competencies (name, description) VALUES ($1, $2) RETURNING id",
      ["Critical Thinking Competency", "Tests critical thinking"]
    );
    const id = result.rows[0].id;

    const competency = await getCompetencyById(ADMIN_URL, id);

    expect(competency).not.toBeNull();
    expect((competency as { description: string }).description).toBe(
      "Tests critical thinking"
    );
  });
});
