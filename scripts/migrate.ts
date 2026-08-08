import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";

export async function migrate(connectionString: string): Promise<void> {
  const sql = readFileSync(join(__dirname, "..", "migrations", "0001_init.sql"), "utf8");
  // Retry on deadlock (40P01) — previous test's lingering server workers may hold DDL locks
  for (let attempt = 1; attempt <= 5; attempt++) {
    const client = new Client({ connectionString });
    await client.connect();
    try {
      await client.query(sql);
      await client.end();
      return;
    } catch (err: unknown) {
      await client.end();
      const code = (err as { code?: string }).code;
      if ((code === "40P01" || code === "40001") && attempt < 5) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
        continue;
      }
      throw err;
    }
  }
}

if (require.main === module) {
  const connectionString =
    process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";
  migrate(connectionString)
    .then(() => {
      console.log("migration applied");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
