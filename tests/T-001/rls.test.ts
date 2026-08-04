import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";
import { migrate } from "../../scripts/migrate";

const ADMIN_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";
const APP_URL = "postgres://app_user:app_user@localhost:55432/ladder";

let adminClient: Client;
let competencyId: string;
let adminUserId: string;

async function appClient(currentUserId: string | null): Promise<Client> {
  const client = new Client({ connectionString: APP_URL });
  await client.connect();
  await client.query("BEGIN");
  if (currentUserId) {
    await client.query("SELECT set_config('app.current_user_id', $1, true)", [currentUserId]);
  }
  return client;
}

beforeAll(async () => {
  await migrate(ADMIN_URL);
  adminClient = new Client({ connectionString: ADMIN_URL });
  await adminClient.connect();
  await adminClient.query(
    "TRUNCATE competencies, admin_users RESTART IDENTITY CASCADE"
  );
  const adminRes = await adminClient.query(
    "INSERT INTO admin_users (email) VALUES ('admin@ladder.dev') RETURNING id"
  );
  adminUserId = adminRes.rows[0].id;
  const compRes = await adminClient.query(
    "INSERT INTO competencies (name) VALUES ('Engineering') RETURNING id"
  );
  competencyId = compRes.rows[0].id;
});

afterAll(async () => {
  await adminClient.end();
});

describe("B-1: content-table write/read access under RLS", () => {
  it("rejects an unauthenticated write", async () => {
    const client = await appClient(null);
    await expect(
      client.query("INSERT INTO competencies (name) VALUES ('Unauthed')")
    ).rejects.toThrow();
    await client.query("ROLLBACK");
    await client.end();
  });

  it("rejects a non-admin authenticated write", async () => {
    const client = await appClient("00000000-0000-0000-0000-000000000000");
    await expect(
      client.query("INSERT INTO competencies (name) VALUES ('NonAdmin')")
    ).rejects.toThrow();
    await client.query("ROLLBACK");
    await client.end();
  });

  it("allows an admin authenticated write", async () => {
    const client = await appClient(adminUserId);
    await expect(
      client.query("INSERT INTO competencies (name) VALUES ('AdminWrite')")
    ).resolves.toBeDefined();
    await client.query("ROLLBACK");
    await client.end();
  });

  it("allows unrestricted read regardless of authentication", async () => {
    for (const userId of [null, "00000000-0000-0000-0000-000000000000", adminUserId]) {
      const client = await appClient(userId);
      const res = await client.query("SELECT * FROM competencies WHERE id = $1", [
        competencyId,
      ]);
      expect(res.rows).toHaveLength(1);
      await client.query("ROLLBACK");
      await client.end();
    }
  });
});
