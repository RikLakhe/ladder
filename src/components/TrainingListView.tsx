import type { TrainingUnitRow } from "../lib/training-units";
import { PrereqStepper } from "./PrereqStepper";
import { EmptyState } from "./EmptyState";

const TYPE_ORDER: Record<string, number> = {
  concept_notes: 0,
  guided_exercise: 1,
  autonomous_project: 2,
  onboarding: 3,
  reference_card: 4,
  learning_path: 99,
};

const P6P7_SIMULATED_TYPES = new Set(["guided_exercise", "autonomous_project"]);

type Props = {
  units: TrainingUnitRow[];
  level: string;
};

export function TrainingListView({ units, level }: Props) {
  const sorted = [...units].sort((a, b) => {
    const orderA = TYPE_ORDER[a.type] ?? 99;
    const orderB = TYPE_ORDER[b.type] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.sequenceOrder - b.sequenceOrder;
  });

  const unitsById = new Map(units.map((u) => [u.id, u]));

  const showEmptyState =
    (level === "P6" || level === "P7") &&
    !units.some((u) => P6P7_SIMULATED_TYPES.has(u.type));

  return (
    <div>
      {showEmptyState && <EmptyState variant="no-simulated-training" />}
      <ul>
        {sorted.map((unit) => {
          const showStepper =
            (unit.type === "guided_exercise" || unit.type === "autonomous_project") &&
            unit.prereqIds.length > 0;

          return (
            <li key={unit.id} data-testid="training-unit-row">
              <span data-testid={`training-unit-row-${unit.id}`}>
                <span>{unit.sequenceOrder}</span>
                <span>{unit.name}</span>
                {unit.hasSequencingIssue && <span> ⚠ sequencing issue</span>}
              </span>
              {showStepper && (
                <PrereqStepper
                  allUnits={units.map((u) => ({ id: u.id, content: u.name, sequenceOrder: u.sequenceOrder }))}
                  prereqIds={unit.prereqIds}
                  currentSequenceOrder={unit.sequenceOrder}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
