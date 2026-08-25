interface Unit {
  id: string;
  content: string;
  sequenceOrder: number;
}

interface Props {
  allUnits: Unit[];
  prereqIds: string[];
  currentSequenceOrder: number;
}

export function PrereqStepper({ allUnits, prereqIds, currentSequenceOrder }: Props) {
  return (
    <div
      data-testid="prereq-stepper"
      style={{
        display: "flex",
        gap: "2px",
        padding: "8px",
        background: "oklch(96% 0.003 260)",
        borderRadius: "6px",
        alignItems: "stretch",
      }}
    >
      <ul>
        {prereqIds.map((id) => {
          const unit = allUnits.find((u) => u.id === id);
          const hasIssue = !unit || unit.sequenceOrder >= currentSequenceOrder;
          return (
            <li key={id}>
              {unit ? unit.content : id}
              {hasIssue && <span> ⚠ sequencing issue</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
