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

export interface TrainingUnitRow {
  id: string;
  type: string;
  level: string;
  sequenceOrder: number;
  name: string;
  hasSequencingIssue: boolean;
}

const TYPE_ORDER: Record<string, number> = {
  concept_notes: 0,
  guided_exercise: 1,
  autonomous_project: 2,
  onboarding: 3,
  reference_card: 4,
  learning_path: 99,
};

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

export async function getTrainingUnitsForCompetencyAndLevel(
  connectionString: string,
  competencyId: string,
  level: string
): Promise<TrainingUnitRow[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query<TrainingUnit>(
      "SELECT id, competency_id, type, level, sequence_order, content, prereqs FROM training_units WHERE competency_id = $1 AND level = $2 ORDER BY sequence_order ASC NULLS LAST",
      [competencyId, level]
    );

    const rows = result.rows;
    const unitsById = new Map(rows.map((r) => [r.id, r]));

    const withIssues = rows.map((unit) => ({
      id: unit.id,
      type: unit.type || "unknown",
      level: unit.level,
      sequenceOrder: unit.sequence_order || 0,
      name: unit.content || "",
      hasSequencingIssue: computeHasSequencingIssue(unit, unitsById),
    }));

    withIssues.sort((a, b) => {
      const typeOrderA = TYPE_ORDER[a.type] ?? 99;
      const typeOrderB = TYPE_ORDER[b.type] ?? 99;
      if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;
      return a.sequenceOrder - b.sequenceOrder;
    });

    return withIssues;
  } finally {
    await client.end();
  }
}
