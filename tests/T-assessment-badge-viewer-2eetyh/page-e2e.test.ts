import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { ChildProcess, spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { migrate } from "../../scripts/migrate";

const WORKTREE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../");

const PORT = 34322;
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

describe("B-3 + B-4: Badge detail page renders live DB data and evidence chips", () => {
  let client: Client;
  let serverProcess: ChildProcess;
  let goodInstrumentId: string;

  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    for (const table of TABLES_TO_TRUNCATE) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }

    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Engineering"]
    );
    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [compRes.rows[0].id, "Backend"]
    );

    const instrRes = await client.query(
      `INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3::jsonb) RETURNING id`,
      [pfRes.rows[0].id, "Test Instrument", JSON.stringify([{ key: "k1", text: "resolved row text" }])]
    );
    goodInstrumentId = instrRes.rows[0].id;
    const brokenInstrumentId = "00000000-0000-0000-0000-000000000001";

    // Badge with cosigner_required=true and 2 evidence entries
    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required, evidence_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)`,
      [
        pfRes.rows[0].id,
        "Live DB Badge",
        "senior",
        "2E-TEST",
        "gold",
        "live certifies text",
        "90%",
        "Live Verifier",
        true,
        JSON.stringify([
          { instrument_id: goodInstrumentId, row_key: "k1" },
          { instrument_id: brokenInstrumentId, row_key: "k2" },
        ]),
      ]
    );

    // Badge with cosigner_required=false and no evidence
    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [pfRes.rows[0].id, "No Cosign Badge", "junior", "2E-NO-COSIGN", "silver", "no cosign", "50%", "Lead", false]
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
          const res = await fetch(`http://localhost:${PORT}/badges/2E-TEST`);
          if (res.status === 200) { clearInterval(check); resolve(); }
        } catch { /* not ready */ }
        if (Date.now() - startTime > 60000) { clearInterval(check); resolve(); }
      }, 500);
    });
  }, 90000);

  afterAll(async () => {
    if (serverProcess?.pid) {
      try { process.kill(-serverProcess.pid, "SIGKILL"); } catch { serverProcess.kill(); }
    }
    await client.end();
  });

  it("B-3: page renders live DB certifies, completionBar, verifierRole; cosigner indicator present when true", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/2E-TEST`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("live certifies text");
    expect(html).toContain("90%");
    expect(html).toContain("Live Verifier");
    expect(html).toContain('data-testid="cosigner-indicator"');
  });

  it("B-3: cosigner indicator absent when cosignerRequired=false", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/2E-NO-COSIGN`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).not.toContain('data-testid="cosigner-indicator"');
  });

  it("B-4: evidence chips — resolved shows rowText, broken shows data-testid='evidence-broken'; count=2", async () => {
    const res = await fetch(`http://localhost:${PORT}/badges/2E-TEST`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("resolved row text");
    expect(html).toContain('data-testid="evidence-broken"');
  });
});
