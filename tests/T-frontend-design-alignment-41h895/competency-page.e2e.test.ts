import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34326;
const BASE_URL = `http://localhost:${PORT}`;
const DB_URL =
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
  await migrate(DB_URL);
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const compResult = await client.query(
    "INSERT INTO competencies (name, description, domains) VALUES ($1, $2, $3) RETURNING id",
    ["Systems Thinking", "Ability to model and reason about complex systems.", ["Technical"]]
  );
  competencyId = compResult.rows[0].id;

  const pfResult = await client.query(
    "INSERT INTO primary_functions (competency_id, name, pf_number, domain_classification) VALUES ($1, $2, $3, $4) RETURNING id",
    [competencyId, "Model Systems", "PF-01", "Technical"]
  );
  const pfId = pfResult.rows[0].id;

  await client.query(
    "INSERT INTO badges (pf_id, name, level) VALUES ($1, $2, $3), ($1, $4, $5)",
    [pfId, "Foundation Badge", "1", "Advanced Badge", "2"]
  );

  await client.query(
    "INSERT INTO functional_analyses (pf_id, competency_id, content, level) VALUES ($1, $2, $3, $4)",
    [pfId, competencyId, "This analysis covers system modelling techniques.", "1"]
  );

  await client.end();

  devServer = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
    detached: true,
  });
  await waitForServer();
}, 90000);

afterAll(async () => {
  if (devServer?.pid) {
    await new Promise<void>((resolve) => {
      devServer.on("exit", () => setTimeout(resolve, 2000));
      devServer.on("error", () => resolve());
      setTimeout(resolve, 10_000);
      try {
        process.kill(-devServer.pid!, "SIGTERM");
      } catch {
        resolve();
      }
    });
  }
});

describe("B-6 [e2e]: full competency page renders from seeded data", () => {
  it("renders description, pf_number, domain_classification, badgeCount and history link", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    expect(res.status).toBe(200);
    const html = await res.text();

    // description in header
    expect(html).toContain("Ability to model and reason about complex systems.");

    // pf_number
    expect(html).toContain("PF-01");

    // PF name
    expect(html).toContain("Model Systems");

    // domain_classification
    expect(html).toContain("Technical");

    // badgeCount = 2
    expect(html).toContain(">2<");

    // history link to /competencies/:id/history
    expect(html).toContain(`/competencies/${competencyId}/history`);

    // no CompetencyTabs — no "Assessment" tab button
    expect(html).not.toContain('"Assessment"');
  });
});
