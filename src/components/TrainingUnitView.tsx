"use client";

import type { MockTrainingUnit } from "../lib/mock/training";
import { PrereqStepper } from "./PrereqStepper";

type Props = {
  unit: MockTrainingUnit;
  allUnits: MockTrainingUnit[];
};

export function TrainingUnitView({ unit, allUnits }: Props) {
  const showStepper =
    unit.type === "guided_exercise" ||
    unit.type === "autonomous_project";

  return (
    <div>
      <p data-testid="unit-type">{unit.type.replace(/_/g, " ")}</p>
      <p data-testid="unit-level">{unit.level}</p>
      {unit.type === "learning_path" ? (
        <ol>
          {allUnits
            .filter((u) => unit.prereqs.includes(u.id))
            .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
            .map((u) => (
              <li key={u.id}>
                <span>{u.level}</span> {u.content}
              </li>
            ))}
        </ol>
      ) : (
        <p data-testid="unit-content">{unit.content}</p>
      )}
      {showStepper && (
        <PrereqStepper
          allUnits={allUnits}
          prereqIds={unit.prereqs}
          currentSequenceOrder={unit.sequenceOrder}
        />
      )}
    </div>
  );
}
