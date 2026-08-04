import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { seed } from "../../scripts/seed";

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
  await seed(ADMIN_URL);
});

afterAll(async () => {
  await client.end();
});

describe("B-1: seeding a freshly migrated, empty database", () => {
  it("populates one competency's full vertical slice", async () => {
    const competency = await client.query(
      "SELECT id FROM competencies WHERE name = 'Technical Skill'"
    );
    expect(competency.rows).toHaveLength(1);
    const competencyId = competency.rows[0].id;

    const pf = await client.query(
      "SELECT id FROM primary_functions WHERE competency_id = $1 AND name = 'Quality & Testing'",
      [competencyId]
    );
    expect(pf.rows).toHaveLength(1);
    const pfId = pf.rows[0].id;

    const standards = await client.query(
      "SELECT level FROM standards WHERE pf_id = $1",
      [pfId]
    );
    expect(standards.rows.length).toBeGreaterThan(0);

    const badge = await client.query(
      "SELECT id, evidence_required FROM badges WHERE pf_id = $1",
      [pfId]
    );
    expect(badge.rows).toHaveLength(1);
    const instrumentId = badge.rows[0].evidence_required.instrument_id;
    const instrument = await client.query("SELECT id FROM instruments WHERE id = $1", [
      instrumentId,
    ]);
    expect(instrument.rows).toHaveLength(1);

    const units = await client.query(
      "SELECT id, prereqs FROM training_units WHERE competency_id = $1 ORDER BY level",
      [competencyId]
    );
    expect(units.rows.length).toBeGreaterThan(1);
    const seenIds = new Set<string>();
    for (const row of units.rows) {
      const prereqs: string[] = row.prereqs ?? [];
      for (const prereqId of prereqs) {
        expect(seenIds.has(prereqId)).toBe(true);
      }
      seenIds.add(row.id);
    }
  });

  it("has the inapplicable-at-level gap: a level with no standard row", async () => {
    const pf = await client.query(
      "SELECT id FROM primary_functions WHERE name = 'Quality & Testing'"
    );
    const pfId = pf.rows[0].id;
    const p6 = await client.query(
      "SELECT * FROM standards WHERE pf_id = $1 AND level = 'P6'",
      [pfId]
    );
    expect(p6.rows).toHaveLength(0);
  });

  it("has the P6/P7 gap: a competency/level with no guided-exercise/autonomous-project training units", async () => {
    const competency = await client.query(
      "SELECT id FROM competencies WHERE name = 'Technical Skill'"
    );
    const competencyId = competency.rows[0].id;
    const p7Units = await client.query(
      "SELECT * FROM training_units WHERE competency_id = $1 AND level = 'P7'",
      [competencyId]
    );
    expect(p7Units.rows).toHaveLength(0);
  });
});
