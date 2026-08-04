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

let readClient: Client;

beforeAll(async () => {
  const cleanupClient = new Client({ connectionString: ADMIN_URL });
  await cleanupClient.connect();
  for (const table of TABLES) {
    await cleanupClient.query(`TRUNCATE TABLE ${table} CASCADE`);
  }
  await cleanupClient.end();

  await migrate(ADMIN_URL);
  await seed(ADMIN_URL);

  readClient = new Client({ connectionString: ADMIN_URL });
  await readClient.connect();
});

afterAll(async () => {
  await readClient.end();
});

describe("B-2: fresh database -> migrate -> seed -> manual read, end to end", () => {
  it("returns matching rows for the seeded competency across every table", async () => {
    const competency = await readClient.query(
      "SELECT id, name FROM competencies WHERE name = 'Technical Skill'"
    );
    expect(competency.rows).toHaveLength(1);
    const competencyId = competency.rows[0].id;

    const pf = await readClient.query(
      "SELECT id FROM primary_functions WHERE competency_id = $1",
      [competencyId]
    );
    expect(pf.rows.length).toBeGreaterThan(0);
    const pfId = pf.rows[0].id;

    const standards = await readClient.query(
      "SELECT id FROM standards WHERE pf_id = $1",
      [pfId]
    );
    expect(standards.rows.length).toBeGreaterThan(0);

    const badges = await readClient.query("SELECT id, evidence_required FROM badges WHERE pf_id = $1", [
      pfId,
    ]);
    expect(badges.rows.length).toBeGreaterThan(0);

    const instrument = await readClient.query("SELECT id FROM instruments WHERE id = $1", [
      badges.rows[0].evidence_required.instrument_id,
    ]);
    expect(instrument.rows).toHaveLength(1);

    const units = await readClient.query(
      "SELECT id FROM training_units WHERE competency_id = $1",
      [competencyId]
    );
    expect(units.rows.length).toBeGreaterThan(0);
  });
});
