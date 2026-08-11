import { Client } from "pg";

export type PrimaryFunction = {
  id: string;
  name: string;
};

export async function getAllPrimaryFunctions(
  connectionString: string
): Promise<PrimaryFunction[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT id, name FROM primary_functions ORDER BY name`
    );
    return result.rows.map((row) => ({ id: row.id, name: row.name }));
  } finally {
    await client.end();
  }
}

export async function getPrimaryFunctionById(
  connectionString: string,
  pfId: string
): Promise<(PrimaryFunction & { competency_id: string }) | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT id, name, competency_id FROM primary_functions WHERE id = $1`,
      [pfId]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return { id: row.id, name: row.name, competency_id: row.competency_id };
  } finally {
    await client.end();
  }
}

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
