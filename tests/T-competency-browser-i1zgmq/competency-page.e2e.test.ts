import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34211;
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
let primaryFunctionId: string;

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

  const competencyResult = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  competencyId = competencyResult.rows[0].id;

  const pfResult = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Data Analysis"]
  );
  primaryFunctionId = pfResult.rows[0].id;

  devServer = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
    detached: true,
  });
  await waitForServer();
}, 60000);

afterAll(async () => {
  await client.end();
  if (devServer?.pid) {
    await new Promise<void>((resolve) => {
      devServer.on('exit', () => resolve());
      devServer.on('error', () => resolve());
      setTimeout(resolve, 10_000);
      try {
        process.kill(-devServer.pid, "SIGTERM");
      } catch {
        resolve();
      }
    });
  }
});

describe("B-3: competency page renders inside the shared shell with PF pills", () => {
  it("shows the shell header and a link to each primary function's page", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Ladder");
    expect(html).toContain("Data Analysis");
    expect(html).toContain(`href="/primary-functions/${primaryFunctionId}"`);
  });
});
