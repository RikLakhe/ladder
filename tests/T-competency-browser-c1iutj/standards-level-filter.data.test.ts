import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getStandardsForPrimaryFunction } from "../../src/lib/standards";

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

describe("B-2: level filter narrows to one row, or an empty state when absent", () => {
  it("returns exactly one row for a level that has a standards row", async () => {
    const competency = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Technical Skill"]
    );
    const competencyId = competency.rows[0].id;

    const pf = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Architecture"]
    );
    const pfId = pf.rows[0].id;

    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfId,
      "P2",
      "P2 body",
    ]);

    const rows = await getStandardsForPrimaryFunction(ADMIN_URL, pfId, "P2");
    expect(rows).toEqual([{ level: "P2", body: "P2 body" }]);
  });

  it("returns an empty array, not an error, for a level with no row", async () => {
    const competency = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Technical Skill"]
    );
    const competencyId = competency.rows[0].id;

    const pf = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Architecture"]
    );
    const pfId = pf.rows[0].id;

    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfId,
      "P2",
      "P2 body",
    ]);

    const rows = await getStandardsForPrimaryFunction(ADMIN_URL, pfId, "P4");
    expect(rows).toEqual([]);
  });
});
