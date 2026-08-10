import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { ChildProcess, spawn } from "child_process";
import { migrate } from "../../scripts/migrate";

const PORT = 34321;
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

describe("B-3: E2E — Badge detail page renders from database", () => {
  let client: Client;
  let serverProcess: ChildProcess;

  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    // Truncate tables
    for (const table of TABLES_TO_TRUNCATE) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }

    // Seed a badge for testing
    const adminRes = await client.query(
      "INSERT INTO admin_users (email) VALUES ($1) RETURNING id",
      ["test@example.com"]
    );
    const adminId = adminRes.rows[0].id;

    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Backend"]
    );
    const compId = compRes.rows[0].id;

    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [compId, "API Design"]
    );
    const pfId = pfRes.rows[0].id;

    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        pfId,
        "Test Badge",
        "P3",
        "B69-TEST",
        "Gold",
        "Test Badge Certification",
        "1/1",
        "Test Verifier",
        true,
      ]
    );

    // Start Next.js dev server on PORT
    serverProcess = spawn("npm", ["run", "dev", "--", "--port", PORT.toString()], {
      cwd: process.cwd(),
      stdio: "pipe",
      env: { ...process.env, DATABASE_URL },
    });

    // Wait for server to start
    await new Promise((resolve) => {
      let startTime = Date.now();
      const checkServer = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:${PORT}/badges/B69-TEST`);
          if (response.status === 200) {
            clearInterval(checkServer);
            resolve(null);
          }
        } catch (e) {
          // Server not ready yet
        }
        if (Date.now() - startTime > 30000) {
          clearInterval(checkServer);
          resolve(null);
        }
      }, 500);
    });
  }, 60000);

  afterAll(async () => {
    if (serverProcess) {
      serverProcess.kill();
    }
    await client.end();
  });

  it("fetches badge page and renders database data", async () => {
    const response = await fetch(`http://localhost:${PORT}/badges/B69-TEST`);
    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("B69-TEST");
    expect(html).toContain("Test Badge");
    expect(html).toContain("Gold");
  });
});
