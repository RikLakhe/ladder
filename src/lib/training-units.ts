import { Client } from "pg";

export interface TrainingUnit {
  id: string;
  competency_id: string;
  type: string | null;
  level: string;
  sequence_order: number | null;
  content: string | null;
  prereqs: unknown;
}

export async function getTrainingUnits(connectionString: string): Promise<TrainingUnit[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query<TrainingUnit>(
      "SELECT id, competency_id, type, level, sequence_order, content, prereqs FROM training_units ORDER BY sequence_order ASC NULLS LAST"
    );
    return result.rows;
  } finally {
    await client.end();
  }
}
