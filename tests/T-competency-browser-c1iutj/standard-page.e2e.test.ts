import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34131;
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
  competencyId = competency.rows[0].id;
  const pf = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Architecture"]
  );
  pfId = pf.rows[0].id;
  await client.query("INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)", [
    pfId,
    "P2",
    "Understands basic architecture patterns.",
  ]);
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

describe("B-3: PF pill on competency page links to its standard doc", () => {
  it("competency page links to /primary-functions/:pfId/standard", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    const body = await res.text();
    expect(body).toContain(`/primary-functions/${pfId}/standard`);
  });

  it("standard page returns 200 and renders the standard's body", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}/standard`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("Understands basic architecture patterns.");
  });
});
