import { Client } from "pg";

export interface RefCardRow {
  badgeCode: string;
  badgeName: string;
  trainingUnitId: string;
  trainingUnitName: string;
  instrumentId: string;
  instrumentName: string;
}

export function paginate<T>(rows: T[], page: number, pageSize: number): T[] {
  if (page < 1 || pageSize < 1) return [];
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return rows.slice(start, end);
}

export async function getReferenceCardRows(
  connectionString: string,
  competencyId: string,
  level: string
): Promise<RefCardRow[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT
        b.badge_code as "badgeCode",
        b.name as "badgeName",
        tu.id as "trainingUnitId",
        tu.content as "trainingUnitName",
        i.id as "instrumentId",
        i.name as "instrumentName"
      FROM badges b
      JOIN primary_functions pf ON b.pf_id = pf.id
      JOIN training_units tu ON tu.competency_id = pf.competency_id AND tu.level = b.level
      JOIN instruments i ON i.pf_id = pf.id
      WHERE pf.competency_id = $1 AND b.level = $2
      ORDER BY b.badge_code, tu.sequence_order, i.name`,
      [competencyId, level]
    );
    return result.rows;
  } finally {
    await client.end();
  }
}
