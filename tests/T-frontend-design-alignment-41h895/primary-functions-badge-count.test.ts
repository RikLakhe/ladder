import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getPrimaryFunctionsWithBadgeCount } from "../../src/lib/primary-functions";

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

describe("B-2: getPrimaryFunctionsWithBadgeCount returns correct badgeCount per PF", () => {
  it("returns badgeCount for each PF including zero when no badges", async () => {
    const compResult = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Test Competency"]
    );
    const competencyId = compResult.rows[0].id;

    const pf1Result = await client.query(
      "INSERT INTO primary_functions (competency_id, name, pf_number, domain_classification) VALUES ($1, $2, $3, $4) RETURNING id",
      [competencyId, "Analyse Data", "PF-01", "Technical"]
    );
    const pf1Id = pf1Result.rows[0].id;

    const pf2Result = await client.query(
      "INSERT INTO primary_functions (competency_id, name, pf_number, domain_classification) VALUES ($1, $2, $3, $4) RETURNING id",
      [competencyId, "Communicate Findings", "PF-02", "Professional"]
    );
    const pf2Id = pf2Result.rows[0].id;

    // pf1 gets 2 badges; pf2 gets 0
    await client.query(
      "INSERT INTO badges (pf_id, name, level) VALUES ($1, $2, $3), ($1, $4, $5)",
      [pf1Id, "Badge A", "1", "Badge B", "2"]
    );

    const results = await getPrimaryFunctionsWithBadgeCount(ADMIN_URL, competencyId);

    expect(results).toHaveLength(2);

    const pf1 = results.find((r) => r.pf_number === "PF-01");
    const pf2 = results.find((r) => r.pf_number === "PF-02");

    expect(pf1).toBeDefined();
    expect(pf1!.name).toBe("Analyse Data");
    expect(pf1!.domain_classification).toBe("Technical");
    expect(pf1!.badgeCount).toBe(2);

    expect(pf2).toBeDefined();
    expect(pf2!.name).toBe("Communicate Findings");
    expect(pf2!.domain_classification).toBe("Professional");
    expect(pf2!.badgeCount).toBe(0);
  });
});
