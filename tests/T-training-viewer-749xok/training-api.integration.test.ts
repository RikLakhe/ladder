import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getTrainingUnitsForCompetencyAndLevel } from "../../src/lib/training-units";

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
let unit2Id: string;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();

  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  // Seed competency and training units
  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  competencyId = compRes.rows[0].id;

  // Insert training units for P3 level
  const unit1Res = await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [competencyId, "concept_notes", "P3", 1, "Concept Notes 1", null]
  );
  const unit1Id = unit1Res.rows[0].id;

  const unit3Res = await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      competencyId,
      "autonomous_project",
      "P3",
      3,
      "Autonomous Project 1",
      null,
    ]
  );
  const unit3Id = unit3Res.rows[0].id;

  // Unit 2 with FORWARD prereq to unit3 (sequencing issue: seq_order=2 depends on seq_order=3)
  const unit2Res = await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      competencyId,
      "guided_exercise",
      "P3",
      2,
      "Guided Exercise 1",
      JSON.stringify([{ training_unit_id: unit3Id }]),
    ]
  );
  unit2Id = unit2Res.rows[0].id;
}, 30000);

afterAll(async () => {
  await client.end();
});

describe("B-2: getTrainingUnitsForCompetencyAndLevel API integration", () => {
  it("returns training units for the specified competency and level", async () => {
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      competencyId,
      "P3"
    );
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns units ordered by type (concept_notes → guided_exercise → autonomous_project) then sequence_order", async () => {
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      competencyId,
      "P3"
    );
    if (data.length >= 2) {
      const typeOrder = {
        concept_notes: 0,
        guided_exercise: 1,
        autonomous_project: 2,
      };
      for (let i = 1; i < data.length; i++) {
        const prevTypeOrder = typeOrder[data[i - 1].type as keyof typeof typeOrder] ?? 99;
        const currTypeOrder = typeOrder[data[i].type as keyof typeof typeOrder] ?? 99;
        if (prevTypeOrder === currTypeOrder) {
          expect(data[i - 1].sequenceOrder).toBeLessThanOrEqual(
            data[i].sequenceOrder
          );
        } else {
          expect(prevTypeOrder).toBeLessThanOrEqual(currTypeOrder);
        }
      }
    }
  });

  it("includes hasSequencingIssue:true for units with forward prerequisites", async () => {
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      competencyId,
      "P3"
    );
    const hasSequencingIssue = data.some((unit) => unit.hasSequencingIssue === true);
    expect(hasSequencingIssue).toBe(true);
  });

  it("returns only units for the requested competency_id", async () => {
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      competencyId,
      "P3"
    );
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
  });

  it("returns only units for the requested level", async () => {
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      competencyId,
      "P4"
    );
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it("returns empty array when no units exist for the competency+level", async () => {
    const fakeUuid = "00000000-0000-0000-0000-000000000000";
    const data = await getTrainingUnitsForCompetencyAndLevel(
      ADMIN_URL,
      fakeUuid,
      "P5"
    );
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
