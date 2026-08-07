import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34213;
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

  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P3", "P3 standard body for full nav"]
  );

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
      devServer.on('exit', () => setTimeout(resolve, 2000));
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

describe("B-5: full Home -> Competency -> Primary Function -> level tab navigation", () => {
  it("reaches DB-sourced level content with the shell present at every step", async () => {
    const homeRes = await fetch(`${BASE_URL}/`);
    expect(homeRes.status).toBe(200);
    const homeHtml = await homeRes.text();
    expect(homeHtml).toContain("Ladder");
    expect(homeHtml).toContain(`href="/competencies/${competencyId}"`);

    const competencyRes = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    expect(competencyRes.status).toBe(200);
    const competencyHtml = await competencyRes.text();
    expect(competencyHtml).toContain("Ladder");
    expect(competencyHtml).toContain(`href="/primary-functions/${primaryFunctionId}"`);

    const pfRes = await fetch(`${BASE_URL}/primary-functions/${primaryFunctionId}`);
    expect(pfRes.status).toBe(200);
    const pfHtml = await pfRes.text();
    expect(pfHtml).toContain("Ladder");
    expect(pfHtml).toContain('href="?level=P3"');

    const levelRes = await fetch(
      `${BASE_URL}/primary-functions/${primaryFunctionId}?level=P3`
    );
    expect(levelRes.status).toBe(200);
    const levelHtml = await levelRes.text();
    expect(levelHtml).toContain("Ladder");
    expect(levelHtml).toContain("P3 standard body for full nav");
  });
});
