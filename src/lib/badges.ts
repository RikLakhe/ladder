import { Client } from "pg";

export type Badge = {
  id: string;
  name: string;
  level: string;
};

export async function getBadgesForPrimaryFunction(
  connectionString: string,
  pfId: string
): Promise<Badge[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT id, name, level FROM badges WHERE pf_id = $1",
      [pfId]
    );
    return result.rows.map((row) => ({ id: row.id, name: row.name, level: row.level }));
  } finally {
    await client.end();
  }
}
