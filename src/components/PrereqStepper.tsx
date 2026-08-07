"use client";

type UnitRef = { id: string; sequenceOrder: number; content: string };

type Props = {
  allUnits: UnitRef[];
  prereqIds: string[];
  currentSequenceOrder: number;
};

export function PrereqStepper({ allUnits, prereqIds, currentSequenceOrder }: Props) {
  const prereqs = prereqIds.map((id) => allUnits.find((u) => u.id === id) ?? null);

  return (
    <ol data-testid="prereq-stepper">
      {prereqs.map((prereq, i) => {
        if (!prereq) {
          return <li key={i}>⚠ sequencing issue (unresolved)</li>;
        }
        if (prereq.sequenceOrder >= currentSequenceOrder) {
          return <li key={prereq.id}>⚠ sequencing issue ({prereq.content})</li>;
        }
        return <li key={prereq.id}>{prereq.content}</li>;
      })}
    </ol>
  );
}
