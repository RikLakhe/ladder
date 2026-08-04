import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";

export async function migrate(connectionString: string): Promise<void> {
  const sql = readFileSync(join(__dirname, "..", "migrations", "0001_init.sql"), "utf8");
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query(sql);
  } finally {
    await client.end();
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
