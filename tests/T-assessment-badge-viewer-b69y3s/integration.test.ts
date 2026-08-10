import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";
import { getBadgeByCode } from "../../src/lib/badges";

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

describe("B-2: Integration — getBadgeByCode queries database", () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    await migrate(DATABASE_URL);

    // Truncate tables
    for (const table of TABLES_TO_TRUNCATE) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
    }
  });

  afterAll(async () => {
    await client.end();
  });

  it("returns badge with all fields when cosigner_required=true", async () => {
    // Seed: admin_user → competency → primary_function → badge (cosigner_required=true)
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

    const badgeRes = await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        pfId,
        "API Expert",
        "P3",
        "B69-API",
        "Gold",
        "API Design Mastery",
        "3/5",
        "Tech Lead",
        true,
      ]
    );
    const badgeId = badgeRes.rows[0].id;

    const result = await getBadgeByCode(DATABASE_URL, "B69-API");

    expect(result).not.toBeNull();
    expect(result?.badgeCode).toBe("B69-API");
    expect(result?.name).toBe("API Expert");
    expect(result?.tier).toBe("Gold");
    expect(result?.level).toBe("P3");
    expect(result?.certifies).toBe("API Design Mastery");
    expect(result?.completionBar).toBe("3/5");
    expect(result?.verifierRole).toBe("Tech Lead");
    expect(result?.cosignerRequired).toBe(true);
  });

  it("returns badge with cosigner_required=false and all fields", async () => {
    // Seed: competency → primary_function → badge (cosigner_required=false)
    const compRes = await client.query(
      "INSERT INTO competencies (name) VALUES ($1) RETURNING id",
      ["Frontend"]
    );
    const compId = compRes.rows[0].id;

    const pfRes = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [compId, "UI Design"]
    );
    const pfId = pfRes.rows[0].id;

    await client.query(
      `INSERT INTO badges (pf_id, name, level, badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        pfId,
        "UI Designer",
        "P2",
        "B69-UI",
        "Silver",
        "UI Design Fundamentals",
        "2/4",
        "Design Manager",
        false,
      ]
    );

    const result = await getBadgeByCode(DATABASE_URL, "B69-UI");

    expect(result).not.toBeNull();
    expect(result?.badgeCode).toBe("B69-UI");
    expect(result?.name).toBe("UI Designer");
    expect(result?.tier).toBe("Silver");
    expect(result?.cosignerRequired).toBe(false);
  });

  it("returns null for unknown badge code", async () => {
    const result = await getBadgeByCode(DATABASE_URL, "UNKNOWN");
    expect(result).toBeNull();
  });
});
