import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34199;
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
  // AC-2: run migrate twice — second run must not throw
  await migrate(ADMIN_URL);
  await migrate(ADMIN_URL);

  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();

  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
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

describe("B-1: seeded training_units rows returned by unauthenticated GET /api/training-units", () => {
  it("returns 200 JSON array with ≥1 row after migration and seed", async () => {
    const res = await fetch(`${BASE_URL}/api/training-units`);
    expect(res.status).toBe(200);
    const rows = await res.json();
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it("each row has the required fields from AC-1 (proves columns exist)", async () => {
    const res = await fetch(`${BASE_URL}/api/training-units`);
    const rows = await res.json();
    const row = rows[0];
    expect(row).toHaveProperty("id");
    expect(row).toHaveProperty("competency_id");
    expect(row).toHaveProperty("type");
    expect(row).toHaveProperty("level");
    expect(row).toHaveProperty("sequence_order");
    expect(row).toHaveProperty("content");
    expect(row).toHaveProperty("prereqs");
  });
});
