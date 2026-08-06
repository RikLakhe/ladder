import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34212;
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
  const competencyId = competencyResult.rows[0].id;

  const pfResult = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competencyId, "Data Analysis"]
  );
  primaryFunctionId = pfResult.rows[0].id;

  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P2", "P2 standard body"]
  );
  await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P3", "P3 standard body"]
  );
  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P2", "P2 functional analysis body"]
  );
  await client.query(
    "INSERT INTO functional_analyses (pf_id, level, body) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P3", "P3 functional analysis body"]
  );
  await client.query(
    "INSERT INTO badges (pf_id, level, name) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P2", "P2 Badge Name"]
  );
  await client.query(
    "INSERT INTO badges (pf_id, level, name) VALUES ($1, $2, $3)",
    [primaryFunctionId, "P3", "P3 Badge Name"]
  );

  devServer = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
  });
  await waitForServer();
}, 60000);

afterAll(async () => {
  await client.end();
  devServer.kill();
});

describe("B-4: PF page renders a level-tab control filtering standard/FA/badge content", () => {
  it("shows a tablist with P2 active and only P2 content, when ?level=P2", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${primaryFunctionId}?level=P2`);
    expect(res.status).toBe(200);
    const html = await res.text();

    expect(html).toContain('role="tablist"');
    expect(html).toMatch(/role="tab"[^>]*>P2</);

    expect(html).toContain("P2 standard body");
    expect(html).toContain("P2 functional analysis body");
    expect(html).toContain("P2 Badge Name");

    expect(html).not.toContain("P3 standard body");
    expect(html).not.toContain("P3 functional analysis body");
    expect(html).not.toContain("P3 Badge Name");
  });
});
