import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34301;
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
  await migrate(ADMIN_URL);
  const client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  for (const table of TABLES) {
    await client.query(`TRUNCATE TABLE ${table} CASCADE`);
  }
  await client.end();

  devServer = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
    detached: true,
  });
  await waitForServer();
}, 60000);

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

describe("Admin banner — B-2", () => {
  it("GET / with admin_session cookie includes banner text", async () => {
    const res = await fetch(`${BASE_URL}/`, {
      headers: { Cookie: "admin_session=system" },
    });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Signed in as system");
  });

  it("GET / without admin_session cookie does not include banner text", async () => {
    const res = await fetch(`${BASE_URL}/`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).not.toContain("Signed in as system");
  });
});
