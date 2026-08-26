import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getPrimaryFunctionById } from "../../src/lib/primary-functions";

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
let pfId: string;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const competency = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Engineering"]
  );
  const competencyId = competency.rows[0].id;

  const pf = await client.query(
    `INSERT INTO primary_functions (competency_id, name, pf_number, domain_classification)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [competencyId, "System Design", "PF-3", "Execution"]
  );
  pfId = pf.rows[0].id;
});

afterAll(async () => {
  await client.end();
});

describe("B-1: getPrimaryFunctionById returns pf_number and domain_classification", () => {
  it("returns pf_number field matching seeded value", async () => {
    const result = await getPrimaryFunctionById(ADMIN_URL, pfId);
    expect(result).not.toBeNull();
    expect(result?.pf_number).toBe("PF-3");
  });

  it("returns domain_classification field matching seeded value", async () => {
    const result = await getPrimaryFunctionById(ADMIN_URL, pfId);
    expect(result).not.toBeNull();
    expect(result?.domain_classification).toBe("Execution");
  });
});
