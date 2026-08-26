import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { ChildProcess, spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { migrate } from "../../scripts/migrate";

const WORKTREE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../");

const PORT = 34324;
const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const TABLES_TO_TRUNCATE = [
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

describe("B-5: badge detail page renders resolved evidence, cosigner indicator, and status legend via live DB", () => {
  let client: Client;
  let serverProcess: ChildProcess;
  let badgeCode: string;

  beforeAll(async () => {
    badgeCode = "CI-E2E-01";

    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    for (const table of TABLES_TO_TRUNCATE) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }

    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["E2E Competency"]
    );
    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [compRes.rows[0].id, "E2E Function"]
    );

    const instrRes = await client.query(
      `INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3::jsonb) RETURNING id`,
      [
        pfRes.rows[0].id,
        "E2E Instrument",
        JSON.stringify([{ key: "r1", text: "e2e resolved row text" }]),
      ]
    );
    const instrumentId = instrRes.rows[0].id;

    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required, evidence_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)`,
      [
        pfRes.rows[0].id,
        "E2E Badge",
        "senior",
        badgeCode,
        "P3",
        "certifies e2e skill",
        "1/1",
        "Tech Lead",
        true,
        JSON.stringify([{ instrument_id: instrumentId, row_key: "r1" }]),
      ]
    );

    serverProcess = spawn("npm", ["run", "dev", "--", "--port", PORT.toString()], {
      cwd: WORKTREE_ROOT,
      stdio: "pipe",
      env: { ...process.env, DATABASE_URL },
      detached: true,
    });

    await new Promise<void>((resolve) => {
      const startTime = Date.now();
      const check = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:${PORT}/badges/${badgeCode}`);
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
    if (serverProcess?.pid) {
      try {
        process.kill(-serverProcess.pid, "SIGKILL");
      } catch {
        serverProcess.kill();
      }
    }
    await client.end();
  });

  it("B-5: page returns 200 and renders resolved evidence rowText in details/summary", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/${badgeCode}`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("e2e resolved row text");
    expect(html).toContain('data-testid="evidence-resolved"');
  });

  it("B-5: cosigner indicator present when cosignerRequired=true", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/${badgeCode}`);
    const html = await res.text();
    expect(html).toContain('data-testid="cosigner-indicator"');
  });

  it("B-5: BadgeStatusLegend present on page", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/${badgeCode}`);
    const html = await res.text();
    expect(html).toContain('data-testid="badge-status-legend"');
  });
});
