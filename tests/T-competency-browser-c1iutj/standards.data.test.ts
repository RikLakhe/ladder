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

describe("B-1: standards for a primary function, ordered by level", () => {
  it("returns exactly the target PF's standards, ordered P2, P4, P7", async () => {
    const competency = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Technical Skill"]
    );
    const competencyId = competency.rows[0].id;

    const pfA = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Architecture"]
    );
    const pfAId = pfA.rows[0].id;

    const pfB = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Mentoring"]
    );
    const pfBId = pfB.rows[0].id;

    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfAId,
      "P7",
      "A-P7 body",
    ]);
    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfAId,
      "P2",
      "A-P2 body",
    ]);
    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfAId,
      "P4",
      "A-P4 body",
    ]);
    await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
      pfBId,
      "P2",
      "B-P2 body",
    ]);

    const rows = await getStandardsForPrimaryFunction(ADMIN_URL, pfAId);

    expect(rows).toEqual([
      { level: "P2", body: "A-P2 body" },
      { level: "P4", body: "A-P4 body" },
      { level: "P7", body: "A-P7 body" },
    ]);
  });
});
