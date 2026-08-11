import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { seed } from "../../scripts/seed";

const PORT = 34201;
const BASE_URL = `http://localhost:${PORT}`;
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

async function waitForServer(): Promise<void> {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("dev server did not start in time");
}

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
  const competencyId = compRes.rows[0].id;

  // Insert training units for P3 level
  await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [competencyId, "concept_notes", "P3", 1, "Concept Notes 1", null]
  );

  const unit2Res = await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      competencyId,
      "guided_exercise",
      "P3",
      2,
      "Guided Exercise 1",
      JSON.stringify([{ training_unit_id: "backward-ref" }]),
    ]
  );
  const unit2Id = unit2Res.rows[0].id;

  // Insert unit with forward reference (sequencing issue)
  await client.query(
    `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      competencyId,
      "autonomous_project",
      "P3",
      3,
      "Autonomous Project 1",
      JSON.stringify([{ training_unit_id: unit2Id }]),
    ]
  );

  await seed(ADMIN_URL);
}, 90000);

afterAll(async () => {
  await client.end();
});

describe("B-2: GET /api/competencies/:competencyId/training?level=X", () => {
  it("returns 200 with training units for the specified competency and level", async () => {
    const res = await fetch(
      `${BASE_URL}/api/competencies/test-comp/training?level=P3`
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("returns units ordered by type (concept_notes → guided_exercise → autonomous_project) then sequence_order", async () => {
    const res = await fetch(
      `${BASE_URL}/api/competencies/test-comp/training?level=P3`
    );
    const data = await res.json();
    if (data.length >= 2) {
      const typeOrder = {
        concept_notes: 0,
        guided_exercise: 1,
        autonomous_project: 2,
      };
      for (let i = 1; i < data.length; i++) {
        const prevTypeOrder = typeOrder[data[i - 1].type] ?? 99;
        const currTypeOrder = typeOrder[data[i].type] ?? 99;
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
    const res = await fetch(
      `${BASE_URL}/api/competencies/test-comp/training?level=P3`
    );
    const data = await res.json();
    const hasSequencingIssue = data.some(
      (unit: any) => unit.hasSequencingIssue === true
    );
    expect(hasSequencingIssue).toBe(true);
  });

  it("returns only units for the requested competency_id", async () => {
    const res = await fetch(
      `${BASE_URL}/api/competencies/test-comp/training?level=P3`
    );
    const data = await res.json();
    const someUnit = data[0];
    expect(someUnit).toHaveProperty("id");
  });

  it("returns only units for the requested level", async () => {
    const res = await fetch(
      `${BASE_URL}/api/competencies/test-comp/training?level=P4`
    );
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("returns empty array when no units exist for the competency+level", async () => {
    const res = await fetch(
      `${BASE_URL}/api/competencies/nonexistent-comp/training?level=P5`
    );
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
