import { Client } from "pg";

export type Badge = {
  id: string;
  badgeCode?: string;
  name: string;
  tier?: string | null;
  certifies?: string;
  level: string;
};

export async function getBadgesForPrimaryFunction(
  connectionString: string,
  pfId: string,
  level?: string
): Promise<Badge[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    let query = "SELECT id, badge_code, name, tier, certifies, level FROM badges WHERE pf_id = $1";
    const params: (string | undefined)[] = [pfId];

    if (level !== undefined) {
      query += " AND level = $2";
      params.push(level);
    }

    const result = await client.query(query, params);
    return result.rows.map((row) => ({
      id: row.id,
      badgeCode: row.badge_code,
      name: row.name,
      tier: row.tier,
      certifies: row.certifies,
      level: row.level,
    }));
  } finally {
    await client.end();
  }
}
