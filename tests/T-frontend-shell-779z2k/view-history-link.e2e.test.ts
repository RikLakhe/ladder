import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34321;
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
  const result = await client.query(
    "INSERT INTO competencies (name, domains) VALUES ($1, $2) RETURNING id",
    ["Engineering", ["development"]]
  );
  competencyId = result.rows[0].id;
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

describe("B-3: View History link on competency page navigates without dead link", () => {
  it("competency detail page contains a View History link", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("View History");
    expect(html).toContain(`/version-history`);
    expect(html).toContain(`entityType=competency`);
    expect(html).toContain(`entityId=${competencyId}`);
  });

  it("version-history page for the competency returns 200", async () => {
    const url = `${BASE_URL}/version-history?entityType=competency&entityId=${competencyId}`;
    const res = await fetch(url);
    expect(res.status).toBe(200);
  });
});
