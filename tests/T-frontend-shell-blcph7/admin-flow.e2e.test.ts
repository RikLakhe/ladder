import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34302;
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

describe("Admin full flow — B-4", () => {
  it("login sets session cookie", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "system", password: "TEST@123" }),
    });
    expect(res.status).toBe(200);
    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("admin_session=system");
  });

  it("all admin navigation routes return 200 with valid session", async () => {
    const cookie = "admin_session=system";
    const routes = [
      "/admin",
      "/admin/competency",
      "/admin/competency/new",
      "/admin/badge",
      "/admin/badge/new",
    ];
    for (const route of routes) {
      const res = await fetch(`${BASE_URL}${route}`, {
        headers: { Cookie: cookie },
        redirect: "follow",
      });
      expect(res.status, `expected 200 for ${route}`).toBe(200);
    }
  });

  it("mock CMS badge list returns at least one fixture entity", async () => {
    const cookie = "admin_session=system";
    const res = await fetch(`${BASE_URL}/api/admin/cms/badge`, {
      headers: { Cookie: cookie },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { entities: { id: string }[] };
    expect(body.entities.length).toBeGreaterThan(0);
  });

  it("edit route for fixture badge entity returns 200", async () => {
    const cookie = "admin_session=system";
    const listRes = await fetch(`${BASE_URL}/api/admin/cms/badge`, {
      headers: { Cookie: cookie },
    });
    const { entities } = (await listRes.json()) as { entities: { id: string }[] };
    const badgeId = entities[0].id;

    const res = await fetch(`${BASE_URL}/admin/badge/${badgeId}/edit`, {
      headers: { Cookie: cookie },
      redirect: "follow",
    });
    expect(res.status).toBe(200);
  });

  it("logout clears session and banner is absent from home page", async () => {
    const cookie = "admin_session=system";

    const logoutRes = await fetch(`${BASE_URL}/api/admin/logout`, {
      method: "POST",
      headers: { Cookie: cookie },
    });
    expect(logoutRes.status).toBe(200);

    const homeRes = await fetch(`${BASE_URL}/`);
    expect(homeRes.status).toBe(200);
    const html = await homeRes.text();
    expect(html).not.toContain("Signed in as system");
  });
});
