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

export function computeHasSequencingIssue(
  unit: { sequence_order: number | null; prereqs: unknown },
  allUnitsById: Map<string, { sequence_order: number | null }>
): boolean {
  if (!unit.prereqs) return false;
  const prereqsArray = Array.isArray(unit.prereqs) ? unit.prereqs : [];
  if (prereqsArray.length === 0) return false;

  for (const prereq of prereqsArray) {
    const prereqId = (prereq as { training_unit_id?: string }).training_unit_id;
    if (!prereqId) continue;
    const prereqUnit = allUnitsById.get(prereqId);
    if (
      prereqUnit &&
      prereqUnit.sequence_order !== null &&
      unit.sequence_order !== null &&
      prereqUnit.sequence_order > unit.sequence_order
    ) {
      return true;
    }
  }
  return false;
}
