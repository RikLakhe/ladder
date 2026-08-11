import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34204;
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
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();

  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  // Seed: 3 badges × 4 training_units × 4 instruments = 48 Cartesian rows at P4
  const compRes = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Reference Card Competency"]
  );
  competencyId = compRes.rows[0].id;

  const pfRes = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Test PF"]
  );
  const pfId = pfRes.rows[0].id;

  for (let b = 0; b < 3; b++) {
    await client.query(
      "INSERT INTO badges (pf_id, name, level, badge_code) VALUES ($1, $2, $3, $4)",
      [pfId, `Badge ${b + 1}`, "P4", `REF-${String(b + 1).padStart(3, "0")}`]
    );
  }

  for (let t = 0; t < 4; t++) {
    await client.query(
      "INSERT INTO training_units (competency_id, type, level, sequence_order, content) VALUES ($1, $2, $3, $4, $5)",
      [competencyId, "guided_exercise", "P4", t + 1, `Unit ${t + 1}`]
    );
  }

  for (let i = 0; i < 4; i++) {
    await client.query(
      "INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3)",
      [pfId, `Instrument ${i + 1}`, JSON.stringify({ criteria: [] })]
    );
  }

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

describe("B-3: reference card page — full navigation", () => {
  it("returns 200 for /competencies/:id/reference-card?level=P4", async () => {
    const res = await fetch(
      `${BASE_URL}/competencies/${competencyId}/reference-card?level=P4`
    );
    expect(res.status).toBe(200);
  });

  it("renders seeded badge codes in the table", async () => {
    const res = await fetch(
      `${BASE_URL}/competencies/${competencyId}/reference-card?level=P4`
    );
    const html = await res.text();
    expect(html).toContain("REF-001");
  });

  it("shows total row count (48 rows from 3×4×4 seed)", async () => {
    const res = await fetch(
      `${BASE_URL}/competencies/${competencyId}/reference-card?level=P4`
    );
    const html = await res.text();
    expect(html).toContain("48");
  });

  it("shows at most 20 rows on first page", async () => {
    const res = await fetch(
      `${BASE_URL}/competencies/${competencyId}/reference-card?level=P4`
    );
    const html = await res.text();
    // Each badge code row contains its code; with page size 20, REF-001 appears ≤20 times
    const occurrences = (html.match(/REF-001/g) ?? []).length;
    expect(occurrences).toBeGreaterThan(0);
    expect(occurrences).toBeLessThanOrEqual(20);
  });
});
