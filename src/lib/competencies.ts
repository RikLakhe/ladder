import { Client } from "pg";

export type CompetencyWithPfCount = {
  id: string;
  name: string;
  description: string;
  domains: string[];
  pfCount: number;
  lastUpdated: string | null;
};

export async function getCompetenciesWithPfCount(
  connectionString: string
): Promise<CompetencyWithPfCount[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT c.id, c.name, c.description, c.domains,
              COUNT(DISTINCT pf.id) AS pf_count,
              (
                SELECT MAX(dv.created_at)
                FROM document_versions dv
                WHERE dv.entity_id = c.id
                   OR dv.entity_id IN (
                     SELECT pf2.id FROM primary_functions pf2 WHERE pf2.competency_id = c.id
                   )
              ) AS last_updated
       FROM competencies c
       LEFT JOIN primary_functions pf ON pf.competency_id = c.id
       GROUP BY c.id, c.name, c.description, c.domains
       ORDER BY c.name`
    );
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description ?? "",
      domains: row.domains,
      pfCount: Number(row.pf_count),
      lastUpdated: row.last_updated ? (row.last_updated as Date).toISOString() : null,
    }));
  } finally {
    await client.end();
  }
}

export async function getCompetencyById(
  connectionString: string,
  id: string
): Promise<{ id: string; name: string; domains: string[] } | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT id, name, domains FROM competencies WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      domains: result.rows[0].domains,
    };
  } finally {
    await client.end();
  }
}
