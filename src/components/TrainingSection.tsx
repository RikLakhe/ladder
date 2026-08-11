"use client";

import type { TrainingUnitRow } from "../lib/training-units";

const TYPE_ORDER: Record<string, number> = {
  concept_notes: 0,
  guided_exercise: 1,
  autonomous_project: 2,
  onboarding: 3,
  reference_card: 4,
  learning_path: 99,
};

type Props = {
  units: TrainingUnitRow[];
};

export function TrainingSection({ units }: Props) {
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
