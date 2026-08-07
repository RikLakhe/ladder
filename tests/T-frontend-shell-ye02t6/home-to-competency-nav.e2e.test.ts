import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34135;
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
let competencyId: string;

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
  const inserted = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  competencyId = inserted.rows[0].id;
  await client.end();

  server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitForServer(30_000);
}, 40_000);

afterAll(async () => {
  if (server?.pid) {
    await new Promise<void>((resolve) => {
      server.on('exit', () => resolve());
      server.on('error', () => resolve());
      setTimeout(resolve, 10_000);
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        resolve();
      }
    });
  }
});

describe("B-3: clicking a competency card navigates to that competency's page", () => {
  it("home links to /competencies/:id, which renders that competency", async () => {
    const homeRes = await fetch(BASE_URL);
    const homeBody = await homeRes.text();
    expect(homeBody).toContain(`href="/competencies/${competencyId}"`);

    const pageRes = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    expect(pageRes.status).toBe(200);
    const pageBody = await pageRes.text();
    expect(pageBody).toContain("Technical Skill");
  });
});
