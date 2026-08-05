import { Client } from "pg";

export type PrimaryFunction = {
  id: string;
  name: string;
};

export async function getPrimaryFunctionsForCompetency(
  connectionString: string,
  competencyId: string
): Promise<PrimaryFunction[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT id, name FROM primary_functions WHERE competency_id = $1 ORDER BY name`,
      [competencyId]
    );
    return result.rows.map((row) => ({ id: row.id, name: row.name }));
  } finally {
    await client.end();
  }
}
