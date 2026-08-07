import { Client } from "pg";

export type Standard = {
  level: string;
  body: string | null;
};

const LEVEL_RANK = "CASE level WHEN 'P2' THEN 2 WHEN 'P3' THEN 3 WHEN 'P4' THEN 4 WHEN 'P5' THEN 5 WHEN 'P6' THEN 6 WHEN 'P7' THEN 7 ELSE 99 END";

export async function getStandardId(
  connectionString: string,
  pfId: string,
  level: string
): Promise<string | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT id FROM standards WHERE pf_id = $1 AND level = $2",
      [pfId, level]
    );
    return result.rows[0]?.id ?? null;
  } finally {
    await client.end();
  }
}

export type StandardByLevelRow = {
  competencyId: string;
  competencyName: string;
  pfId: string;
  pfName: string;
  body: string;
};

export async function getStandardsAtLevel(
  connectionString: string,
  level: string
): Promise<StandardByLevelRow[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT c.id AS competency_id, c.name AS competency_name,
              pf.id AS pf_id, pf.name AS pf_name, s.body
       FROM standards s
       JOIN primary_functions pf ON pf.id = s.pf_id
       JOIN competencies c ON c.id = pf.competency_id
       WHERE s.level = $1
       ORDER BY c.name, pf.name`,
      [level]
    );
    return result.rows.map((row) => ({
      competencyId: row.competency_id,
      competencyName: row.competency_name,
      pfId: row.pf_id,
      pfName: row.pf_name,
      body: row.body,
    }));
  } finally {
    await client.end();
  }
}

export async function getStandardsForPrimaryFunction(
  connectionString: string,
  pfId: string,
  level?: string
): Promise<Standard[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = level
      ? await client.query(
          `SELECT level, body FROM standards WHERE pf_id = $1 AND level = $2 ORDER BY ${LEVEL_RANK}`,
          [pfId, level]
        )
      : await client.query(
          `SELECT level, body FROM standards WHERE pf_id = $1 ORDER BY ${LEVEL_RANK}`,
          [pfId]
        );
    return result.rows.map((row) => ({ level: row.level, body: row.body }));
  } finally {
    await client.end();
  }
}
