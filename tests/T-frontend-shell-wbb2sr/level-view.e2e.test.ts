import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34270;
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

  const pfWithStandard = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Coding"]
  );
  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfWithStandard.rows[0].id, "P3", "Writes correct, tested code for well-scoped tasks."]
  );

  await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Architecture"]
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

describe("B-1: Level View shows a tab strip and lists applicable PFs' criteria at the selected level, grouped by competency", () => {
  it("renders a P2-P7 tab strip with the selected level marked, shows the PF with a standard, and omits the PF without one", async () => {
    const res = await fetch(`${BASE_URL}/level-view?level=P3`);
    expect(res.status).toBe(200);
    const body = await res.text();

    for (const level of ["P2", "P3", "P4", "P5", "P6", "P7"]) {
      expect(body).toContain(`>${level}<`);
    }
    expect(body).toMatch(/aria-selected="true"[^>]*>P3</);

    expect(body).toContain("Technical Skill");
    expect(body).toContain("Coding");
    expect(body).toContain("Writes correct, tested code for well-scoped tasks.");

    expect(body).not.toContain("Architecture");
  });
});
