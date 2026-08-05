import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getBadgesForPrimaryFunction } from "../../src/lib/badges";
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
let pfBadgesId: string;
let pfAnalysisId: string;
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

  const pfBadges = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Architecture"]
  );
  pfBadgesId = pfBadges.rows[0].id;

  const pfAnalysis = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Mentoring"]
  );
  pfAnalysisId = pfAnalysis.rows[0].id;

  const pfEmpty = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Delivery"]
  );
  pfEmptyId = pfEmpty.rows[0].id;

  await client.query(
    "INSERT INTO badges (pf_id, name, level) VALUES ($1, $2, $3)",
    [pfBadgesId, "Architecture Star", "P4"]
  );
  await client.query(
    "INSERT INTO badges (pf_id, name, level) VALUES ($1, $2, $3)",
    [pfAnalysisId, "Mentor Badge", "P2"]
  );
  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfAnalysisId, "P2", "Mentoring analysis"]
  );
});

afterAll(async () => {
  await client.end();
});

describe("B-2: getBadgesForPrimaryFunction", () => {
  it("returns exactly the target PF's badges rows (name+level), none of another PF's", async () => {
    const rows = await getBadgesForPrimaryFunction(ADMIN_URL, pfBadgesId);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ name: "Architecture Star", level: "P4" });
  });

  it("returns empty arrays (not an error) for a PF with no rows in either table", async () => {
    const badges = await getBadgesForPrimaryFunction(ADMIN_URL, pfEmptyId);
    const analyses = await getFunctionalAnalysesForPrimaryFunction(ADMIN_URL, pfEmptyId);
    expect(badges).toEqual([]);
    expect(analyses).toEqual([]);
  });
});
