import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34323;
const BASE_URL = `http://localhost:${PORT}`;
const DATABASE_URL =
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
let devServer: ChildProcess;
let competencyId: string;

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
  await migrate(DATABASE_URL);
  client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Training Page E2E Competency"]
  );
  competencyId = compRes.rows[0].id;

  // concept_notes unit at P4 (no prereqs)
  await client.query(
    "INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1,$2,$3,$4,$5,$6)",
    [competencyId, "concept_notes", "P4", 1, "Intro Concepts", JSON.stringify([])]
  );

  // guided_exercise unit at P4 with a prereq pointing to a later unit (forward-prereq → issue)
  const laterRes = await client.query(
    "INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",
    [competencyId, "guided_exercise", "P4", 5, "Advanced Exercise", JSON.stringify([])]
  );
  const laterUnitId = laterRes.rows[0].id;

  // guided_exercise at seq=2 with prereq at seq=5 → hasSequencingIssue
  await client.query(
    "INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1,$2,$3,$4,$5,$6)",
    [
      competencyId,
      "guided_exercise",
      "P4",
      2,
      "Basic Exercise",
      JSON.stringify([{ training_unit_id: laterUnitId }]),
    ]
  );

  devServer = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
    detached: true,
  });
  await waitForServer();
}, 90000);

afterAll(async () => {
  await client.end();
  if (devServer?.pid) {
    await new Promise<void>((resolve) => {
      devServer.on("exit", () => setTimeout(resolve, 2000));
      devServer.on("error", () => resolve());
      setTimeout(resolve, 10_000);
      try {
        process.kill(-devServer.pid, "SIGTERM");
      } catch {
        resolve();
      }
    });
  }
});

describe("B-5: Training page e2e — seeded competency at P4", () => {
  it("returns 200 for /competencies/:id/training?level=P4", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}/training?level=P4`);
    expect(res.status).toBe(200);
  });

  it("renders seeded training unit names", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}/training?level=P4`);
    const html = await res.text();
    expect(html).toContain("Intro Concepts");
    expect(html).toContain("Basic Exercise");
    expect(html).toContain("Advanced Exercise");
  });

  it("renders prereq-stepper for guided exercise with prereqs", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}/training?level=P4`);
    const html = await res.text();
    expect(html).toContain("prereq-stepper");
  });

  it("shows sequencing-issue warning for forward-prereq unit", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}/training?level=P4`);
    const html = await res.text();
    expect(html).toMatch(/sequencing issue|⚠/);
  });
});
