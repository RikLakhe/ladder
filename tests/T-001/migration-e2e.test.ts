import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const ADMIN_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const TABLES = [
  "competencies",
  "primary_functions",
  "standards",
  "functional_analyses",
  "badges",
  "instruments",
  "training_units",
  "document_versions",
  "admin_users",
];

let client: Client;

beforeAll(async () => {
  await migrate(ADMIN_URL);
  client = new Client({ connectionString: ADMIN_URL });
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

describe("B-2: migration end-to-end against a fresh database", () => {
  it("applies cleanly and every table is queryable with no missing-table/column error", async () => {
    for (const table of TABLES) {
      await expect(client.query(`SELECT * FROM ${table} LIMIT 1`)).resolves.toBeDefined();
    }
  });

  it("rejects an insert violating a documented FK (AC-1)", async () => {
    await expect(
      client.query(
        "INSERT INTO primary_functions (competency_id, name) VALUES ('00000000-0000-0000-0000-000000000000', 'Orphan')"
      )
    ).rejects.toThrow();
  });
});
