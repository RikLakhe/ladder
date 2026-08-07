import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34134;
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
  const withPfs = await client.query(
    "INSERT INTO competencies (name, domains) VALUES ($1, $2) RETURNING id",
    ["Technical Skill", ["engineering"]]
  );
  const withPfsId = withPfs.rows[0].id;
  await client.query("INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2)", [
    withPfsId,
    "Quality & Testing",
  ]);
  await client.query("INSERT INTO competencies (name) VALUES ($1)", ["Leadership"]);
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
      server.on('exit', () => setTimeout(resolve, 2000));
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

describe("B-1: Home lists every competency as a card (name, domain, PF count)", () => {
  it("renders one card per competency with its name, domain, and PF count", async () => {
    const res = await fetch(BASE_URL);
    expect(res.status).toBe(200);
    const body = await res.text();

    expect(body).toContain("Technical Skill");
    expect(body).toContain("engineering");
    expect(body).toMatch(/1(<!--\s*-->)?\s*primary functions/);

    expect(body).toContain("Leadership");
    expect(body).toMatch(/0(<!--\s*-->)?\s*primary functions/);
  });
});
