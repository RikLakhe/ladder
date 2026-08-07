import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34132;
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

  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [pfId, "P4", "Designs system boundaries."]
  );
  await client.query(
    "INSERT INTO badges (pf_id, name, level) VALUES ($1, $2, $3)",
    [pfId, "Architecture Star", "P4"]
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

describe("B-3: primary function page renders functional analysis and badges", () => {
  it("competency page links to /primary-functions/:pfId", async () => {
    const res = await fetch(`${BASE_URL}/competencies/${competencyId}`);
    const html = await res.text();
    expect(html).toContain(`/primary-functions/${pfId}`);
  });

  it("primary function page returns 200 and renders functional analysis and badge data", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}?level=P4`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Designs system boundaries.");
    expect(html).toContain("Architecture Star");
  });
});
