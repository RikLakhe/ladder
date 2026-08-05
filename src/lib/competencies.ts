import { Client } from "pg";

export type CompetencyWithPfCount = {
  id: string;
  name: string;
  pfCount: number;
};

export async function getCompetenciesWithPfCount(
  connectionString: string
): Promise<CompetencyWithPfCount[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT c.id, c.name, COUNT(pf.id) AS pf_count
       FROM competencies c
       LEFT JOIN primary_functions pf ON pf.competency_id = c.id
       GROUP BY c.id, c.name
       ORDER BY c.name`
    );
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      pfCount: Number(row.pf_count),
    }));
  } finally {
    await client.end();
  }
}

export async function getCompetencyById(
  connectionString: string,
  id: string
): Promise<{ id: string; name: string } | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(`SELECT id, name FROM competencies WHERE id = $1`, [id]);
    if (result.rows.length === 0) return null;
    return { id: result.rows[0].id, name: result.rows[0].name };
  } finally {
    await client.end();
  }
}
