import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getFunctionalAnalysesForPrimaryFunction } from "../../src/lib/functional-analyses";

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
let pfEmptyId: string;

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

  const pfEmpty = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Empty PF"]
  );
  pfEmptyId = pfEmpty.rows[0].id;

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

describe("B-1: getFunctionalAnalysesForPrimaryFunction", () => {
  it("returns exactly the target PF's functional_analyses rows, none of another PF's", async () => {
    const rows = await getFunctionalAnalysesForPrimaryFunction(ADMIN_URL, pfAId);
    expect(rows).toEqual([{ level: "P4", body: "A-P4 analysis" }]);
  });

  it("returns an empty array (not an error) for a PF with no functional_analyses rows", async () => {
    const rows = await getFunctionalAnalysesForPrimaryFunction(ADMIN_URL, pfEmptyId);
    expect(rows).toEqual([]);
  });
});
