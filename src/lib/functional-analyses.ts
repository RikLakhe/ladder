import { Client } from "pg";

export type FunctionalAnalysis = {
  level: string;
  body: string | null;
};

export async function getFunctionalAnalysesForPrimaryFunction(
  connectionString: string,
  pfId: string
): Promise<FunctionalAnalysis[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT level, body FROM functional_analyses WHERE pf_id = $1",
      [pfId]
    );
    return result.rows.map((row) => ({ level: row.level, body: row.body }));
  } finally {
    await client.end();
  }
}
