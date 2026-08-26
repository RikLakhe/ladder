import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ChildProcess, spawn } from "node:child_process";
import { Client } from "pg";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { migrate } from "../../scripts/migrate";

const WORKTREE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../");

const PORT = 34325;
const DATABASE_URL =
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

const EMPTY_STATE_COPY =
  "Growth at this level is demonstrated through real project scope, not simulated exercises.";

describe("B-3 [e2e]: P6 training tab with no exercise units shows exact EmptyState copy", () => {
  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    for (const table of TABLES) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }

    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Growth Competency"]
    );
    competencyId = compRes.rows[0].id;

    // Only concept_notes at P6 — no guided_exercise or autonomous_project
    await client.query(
      `INSERT INTO training_units (competency_id, type, level, sequence_order, content, prereqs) VALUES ($1, $2, $3, $4, $5, $6)`,
      [competencyId, "concept_notes", "P6", 1, "Background Reading", JSON.stringify([])]
    );

    devServer = spawn("npm", ["run", "dev", "--", "--port", PORT.toString()], {
      cwd: WORKTREE_ROOT,
      stdio: "pipe",
      env: { ...process.env, DATABASE_URL },
      detached: true,
    });

    await new Promise<void>((resolve) => {
      const startTime = Date.now();
      const check = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:${PORT}/competencies/${competencyId}/training?level=P6`);
          if (res.status === 200) {
            clearInterval(check);
            resolve();
          }
        } catch { /* not ready */ }
        if (Date.now() - startTime > 60000) {
          clearInterval(check);
          resolve();
        }
      }, 500);
    });
  }, 90000);

  afterAll(async () => {
    if (devServer?.pid) {
      try {
        process.kill(-devServer.pid, "SIGKILL");
      } catch {
        devServer.kill();
      }
    }
    await client.end();
  });

  it("B-3: P6 training tab shows exact EmptyState copy when no exercise units", async () => {
    const res = await fetch(`http://localhost:${PORT}/competencies/${competencyId}/training?level=P6`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain(EMPTY_STATE_COPY);
  });
});
