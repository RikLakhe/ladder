import { Client } from "pg";

export type FunctionalAnalysis = {
  level: string;
  body: string | null;
};

export async function getFunctionalAnalysisForCompetency(
  connectionString: string,
  competencyId: string
): Promise<{ content: string } | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT content FROM functional_analyses WHERE competency_id = $1 LIMIT 1",
      [competencyId]
    );
    if (result.rows.length === 0) return null;
    return { content: result.rows[0].content };
  } finally {
    await client.end();
  }
}

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
