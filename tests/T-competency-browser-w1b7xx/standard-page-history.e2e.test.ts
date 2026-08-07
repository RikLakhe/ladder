import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34133;
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

  const admin = await client.query(
    "INSERT INTO admin_users (email) VALUES ($1) RETURNING id",
    ["admin@example.com"]
  );
  const adminId = admin.rows[0].id;

  const competency = await client.query(
    "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
    ["Technical Skill"]
  );
  const pf = await client.query(
    "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
    [competency.rows[0].id, "Architecture"]
  );
  pfId = pf.rows[0].id;

  const standard = await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3) RETURNING id",
    [pfId, "P4", "Standard P4 body"]
  );
  const standardId = standard.rows[0].id;

  await client.query(
    "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by, created_at) VALUES ($1, $2, $3, $4, $5)",
    ["standards", standardId, "Initial draft", adminId, "2026-01-01T00:00:00Z"]
  );
  await client.query(
    "INSERT INTO document_versions (entity_table, entity_id, change_note, changed_by, created_at) VALUES ($1, $2, $3, $4, $5)",
    ["standards", standardId, "Revised wording", adminId, "2026-02-01T00:00:00Z"]
  );

  const emptyStandard = await client.query(
    "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3) RETURNING id",
    [pfId, "P5", "Standard P5 body"]
  );
  void emptyStandard;

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

describe("B-4: standard page renders last-updated and history", () => {
  it("shows last-updated and reverse-chronological history for a document with versions", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}/standard?level=P4`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Last updated");
    const revisedIdx = html.indexOf("Revised wording");
    const initialIdx = html.indexOf("Initial draft");
    expect(revisedIdx).toBeGreaterThan(-1);
    expect(initialIdx).toBeGreaterThan(-1);
    expect(revisedIdx).toBeLessThan(initialIdx);
  });

  it("shows a no-history state for a document with zero versions", async () => {
    const res = await fetch(`${BASE_URL}/primary-functions/${pfId}/standard?level=P5`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("No history for this document.");
  });
});
