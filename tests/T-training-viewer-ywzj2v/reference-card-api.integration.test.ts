import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getReferenceCardRows } from "../../src/lib/reference-card";

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
let competencyId: string;
let pfId: string;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();

  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  // Seed competency and primary function
  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  competencyId = compRes.rows[0].id;

  const pfRes = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Quality & Testing"]
  );
  pfId = pfRes.rows[0].id;

  // Seed 3 badges × 4 training_units × 4 instruments at P3 → 48 Cartesian product rows
  const badges: string[] = [];
  for (let b = 0; b < 3; b++) {
    const badgeRes = await client.query(
      "INSERT INTO badges (pf_id, name, level, badge_code) VALUES ($1, $2, $3, $4) RETURNING id",
      [pfId, `Badge ${b + 1}`, "P3", `BADGE_${b + 1}`]
    );
    badges.push(badgeRes.rows[0].id);
  }

  const trainingUnits: string[] = [];
  for (let t = 0; t < 4; t++) {
    const tuRes = await client.query(
      "INSERT INTO training_units (competency_id, type, level, sequence_order, content) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [competencyId, "guided_exercise", "P3", t + 1, `Training Unit ${t + 1}`]
    );
    trainingUnits.push(tuRes.rows[0].id);
  }

  const instruments: string[] = [];
  for (let i = 0; i < 4; i++) {
    const instRes = await client.query(
      "INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3) RETURNING id",
      [pfId, `Instrument ${i + 1}`, JSON.stringify({ criteria: [] })]
    );
    instruments.push(instRes.rows[0].id);
  }
}, 30000);

afterAll(async () => {
  await client.end();
});

describe("B-2: getReferenceCardRows integration", () => {
  it("returns >40 rows for seeded competency+level (Cartesian join)", async () => {
    const rows = await getReferenceCardRows(ADMIN_URL, competencyId, "P3");
    expect(rows.length).toBeGreaterThan(40);
  });

  it("returns correct shape {badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}", async () => {
    const rows = await getReferenceCardRows(ADMIN_URL, competencyId, "P3");
    expect(rows.length).toBeGreaterThan(0);
    const row = rows[0];
    expect(row).toHaveProperty("badgeCode");
    expect(row).toHaveProperty("badgeName");
    expect(row).toHaveProperty("trainingUnitId");
    expect(row).toHaveProperty("trainingUnitName");
    expect(row).toHaveProperty("instrumentId");
    expect(row).toHaveProperty("instrumentName");
  });

  it("returns no rows from other competency_ids", async () => {
    const otherCompRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Other Competency"]
    );
    const otherCompId = otherCompRes.rows[0].id;

    const rows = await getReferenceCardRows(ADMIN_URL, otherCompId, "P3");
    expect(rows.length).toBe(0);
  });

  it("returns no rows for different level", async () => {
    const rows = await getReferenceCardRows(ADMIN_URL, competencyId, "P5");
    expect(rows.length).toBe(0);
  });

  it("returns empty array for fake competency_id", async () => {
    const fakeUuid = "00000000-0000-0000-0000-000000000000";
    const rows = await getReferenceCardRows(ADMIN_URL, fakeUuid, "P3");
    expect(rows.length).toBe(0);
  });
});
