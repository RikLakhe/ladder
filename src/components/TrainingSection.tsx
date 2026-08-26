"use client";

import type { TrainingUnitRow } from "../lib/training-units";
import { EmptyState } from "./EmptyState";

const TYPE_ORDER: Record<string, number> = {
  concept_notes: 0,
  guided_exercise: 1,
  autonomous_project: 2,
  onboarding: 3,
  reference_card: 4,
  learning_path: 99,
};

const SIMULATED_TYPES = new Set(["guided_exercise", "autonomous_project"]);

type Props = {
  units: TrainingUnitRow[];
  level?: string;
};

export function TrainingSection({ units, level }: Props) {
  const isGrowthLevel = level === "P6" || level === "P7";
  const hasSimulatedUnits = units.some((u) => SIMULATED_TYPES.has(u.type));

  if (isGrowthLevel && !hasSimulatedUnits) {
    return <EmptyState variant="no-simulated-training" />;
  }

  if (units.length === 0) {
    return <p>No training units</p>;
  }

  const sorted = [...units].sort((a, b) => {
    const orderA = TYPE_ORDER[a.type] ?? 99;
    const orderB = TYPE_ORDER[b.type] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.sequenceOrder - b.sequenceOrder;
  });

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.sequenceOrder}</td>
              <td>{unit.name}</td>
              <td>
                {unit.type}
                {unit.hasSequencingIssue && (
                  <span> ⚠ sequencing issue</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
