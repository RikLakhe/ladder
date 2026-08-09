import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { buildSearchIndex, queryIndex } from "../../src/lib/search";

const PORT = 34310;
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
let pfId: string;

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

  const compResult = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Software Engineering"]
  );
  const competencyId: string = compResult.rows[0].id;

  const pfResult = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Backend Development"]
  );
  pfId = pfResult.rows[0].id;

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

describe("B-3: badge search result links to PF page at badge level", () => {
  it("badge with pfId generates href /primary-functions/:pfId?level=:level", () => {
    const index = buildSearchIndex({
      competencies: [{ id: "comp-1", name: "Software Engineering" }],
      primaryFunctions: [{ id: "pf-1", name: "Backend Development" }],
      badges: [
        {
          id: "b-1",
          badge_code: "BE-P3",
          name: "Backend Practitioner P3",
          pfId: "pf-1",
          level: "P3",
          certifies: "Demonstrates backend proficiency",
        },
      ],
    });
    const results = queryIndex(index, "BE-P3");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("badge");
    expect(results[0].href).toBe("/primary-functions/pf-1?level=P3");
  });

  it("fetching PF page at ?level=P3 shows P3 tab aria-selected=true", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}?level=P3`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toMatch(/role="tab"[^>]*aria-selected="true"[^>]*>P3/);
  });
});
