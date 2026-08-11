import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34311;
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
let devServer: ChildProcess;
let pfId: string;

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

  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Training Viewer Competency"]
  );
  const competencyId = compRes.rows[0].id;

  const pfRes = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Test PF"]
  );
  pfId = pfRes.rows[0].id;

  // Seed two units at P3: unit_later (seq=5) first so we can use its id in unit_forward's prereqs
  const laterRes = await client.query(
    "INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [competencyId, "guided_exercise", "P3", 5, "Later unit", JSON.stringify([])]
  );
  const laterUnitId = laterRes.rows[0].id;

  // unit_forward: seq=1, prereq is later unit (seq=5) → forward prereq → hasSequencingIssue=true
  await client.query(
    "INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      competencyId,
      "concept_notes",
      "P3",
      1,
      "Forward prereq unit",
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

describe("B-4: PF page training section — full navigation", () => {
  it("returns 200 for /primary-functions/:pfId?level=P3", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}?level=P3`);
    expect(res.status).toBe(200);
  });

  it("renders a training section with seeded unit names", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}?level=P3`);
    const html = await res.text();
    expect(html).toContain("Forward prereq unit");
    expect(html).toContain("Later unit");
  });

  it("shows sequencing issue warning for the forward-prereq unit", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}?level=P3`);
    const html = await res.text();
    expect(html).toMatch(/sequencing|warning|⚠/i);
  });
});
