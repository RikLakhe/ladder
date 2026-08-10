import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const PORT = 34320;
const BASE_URL = `http://localhost:${PORT}`;
const ADMIN_URL = process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";
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
let client: Client;
let competencyId: string;
let pfId1: string;
let pfId2: string;
let badgeId1: string;
let badgeId2: string;

async function truncateTables() {
  const client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  try {
    for (const table of TABLES) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE;`);
    }
  } finally {
    await client.end();
  }
}

async function seedData() {
  const client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
  try {
    // Create competency
    const compResult = await client.query(
      "INSERT INTO competencies (name, domains) VALUES ($1, $2) RETURNING id",
      ["Test Competency", ["test"]]
    );
    competencyId = compResult.rows[0].id;

    // Create two primary functions
    const pf1Result = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Primary Function 1"]
    );
    pfId1 = pf1Result.rows[0].id;

    const pf2Result = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Primary Function 2"]
    );
    pfId2 = pf2Result.rows[0].id;

    // Create badge for PF1, level 'intermediate'
    const badge1Result = await client.query(
      "INSERT INTO badges (pf_id, level, name, badge_code, tier, certifies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        pfId1,
        "intermediate",
        "Communication Skills",
        "COMM-001",
        "Gold",
        "This badge certifies you have strong communication skills. You can present effectively.",
      ]
    );
    badgeId1 = badge1Result.rows[0].id;

    // Create badge for PF1, level 'advanced'
    await client.query(
      "INSERT INTO badges (pf_id, level, name, badge_code, tier, certifies) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        pfId1,
        "advanced",
        "Advanced Communication",
        "COMM-002",
        "Platinum",
        "This badge certifies advanced communication skills.",
      ]
    );

    // Create badge for PF2, level 'intermediate' (different PF, should not appear)
    const badge2Result = await client.query(
      "INSERT INTO badges (pf_id, level, name, badge_code, tier, certifies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        pfId2,
        "intermediate",
        "Different Badge",
        "DIFF-001",
        "Silver",
        "This is a different badge.",
      ]
    );
    badgeId2 = badge2Result.rows[0].id;
  } finally {
    await client.end();
  }
}

beforeAll(async () => {
  // Truncate tables and seed data
  await truncateTables();
  await migrate(ADMIN_URL);
  await seedData();

  // Start Next.js dev server
  devServer = spawn("npm", ["run", "dev", "--", "--port", PORT.toString()], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  // Wait for server to be ready
  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 30) {
    try {
      const response = await fetch(`${BASE_URL}/`);
      ready = response.ok;
    } catch {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  if (!ready) {
    throw new Error("Dev server failed to start");
  }
});

afterAll(async () => {
  devServer?.kill();
  await truncateTables();
});

describe("B-2: PF page Badge sub-slot", () => {
  it("renders one card per badge for the PF and level", async () => {
    const response = await fetch(`${BASE_URL}/primary-functions/${pfId1}?level=intermediate`);
    const html = await response.text();

    // Should render badge 1
    expect(html).toContain("COMM-001");
    expect(html).toContain("Communication Skills");

    // Should not render badge 2 (different level)
    expect(html).not.toContain("COMM-002");
    // Should not render badge from different PF
    expect(html).not.toContain("DIFF-001");
  });

  it("renders badge card links with correct href", async () => {
    const response = await fetch(`${BASE_URL}/primary-functions/${pfId1}?level=intermediate`);
    const html = await response.text();

    // Should have link with correct href
    const linkPattern = new RegExp(
      `href="/primary-functions/${pfId1}/badges/COMM-001"`
    );
    expect(html).toMatch(linkPattern);
  });

  it("zero badges from other pf_id/level", async () => {
    const response = await fetch(`${BASE_URL}/primary-functions/${pfId1}?level=intermediate`);
    const html = await response.text();

    // Should only have 1 badge card (COMM-001)
    // Count occurrences of badge_code pattern
    const badgeCount = (html.match(/COMM-001/g) || []).length;
    expect(badgeCount).toBeGreaterThan(0);

    // Should not have any other badges
    expect(html).not.toContain("COMM-002");
    expect(html).not.toContain("DIFF-001");
  });
});
