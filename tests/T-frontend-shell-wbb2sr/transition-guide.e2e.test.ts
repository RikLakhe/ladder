import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34271;
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

let server: ChildProcess;
let pfId: string;

async function waitForServer(timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error("Next.js dev server did not become ready in time");
}

beforeAll(async () => {
  await migrate(ADMIN_URL);
  const client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }

  const competency = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  const competencyId = competency.rows[0].id;

  const pf = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Coding"]
  );
  pfId = pf.rows[0].id;
  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfId, "P3", "Writes correct, tested code for well-scoped tasks."]
  );
  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfId, "P4", "Writes correct, tested code for ambiguous tasks."]
  );

  await client.end();

  server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitForServer(30_000);
}, 40_000);

afterAll(() => {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // already exited
    }
  }
});

describe("B-2: Transition Guide shows level-transition columns per competency with expandable before/after text", () => {
  it("shows a P3->P4 transition row for the PF with a before/after text expansion", async () => {
    const res = await fetch(`${BASE_URL}/transition-guide`);
    expect(res.status).toBe(200);
    const body = await res.text();

    expect(body).toContain("Technical Skill");
    expect(body).toMatch(/P3\s*→\s*P4/);
    expect(body).toContain(`href="/primary-functions/${pfId}?level=P4"`);
    expect(body).toContain("Before: Writes correct, tested code for well-scoped tasks.");
    expect(body).toContain("After: Writes correct, tested code for ambiguous tasks.");
    expect(body).not.toMatch(/Before: Writes correct, tested code for ambiguous tasks\./);
  });
});
