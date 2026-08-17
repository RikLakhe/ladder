import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getFunctionalAnalysisForCompetency } from "../../src/lib/functional-analyses";

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

describe("B-3: getFunctionalAnalysisForCompetency", () => {
  it("returns { content } when a row exists for the competency", async () => {
    const compResult = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["FA Competency"]
    );
    const competencyId = compResult.rows[0].id;

    const pfResult = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Some PF"]
    );
    const pfId = pfResult.rows[0].id;

    await client.query(
      "INSERT INTO functional_analyses (pf_id, competency_id, content) VALUES ($1, $2, $3)",
      [pfId, competencyId, "This competency covers analytical thinking."]
    );

    const result = await getFunctionalAnalysisForCompetency(ADMIN_URL, competencyId);

    expect(result).not.toBeNull();
    expect(result!.content).toBe("This competency covers analytical thinking.");
  });

  it("returns null when no functional analysis row exists for the competency", async () => {
    const compResult = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Empty FA Competency"]
    );
    const competencyId = compResult.rows[0].id;

    const result = await getFunctionalAnalysisForCompetency(ADMIN_URL, competencyId);

    expect(result).toBeNull();
  });
});
