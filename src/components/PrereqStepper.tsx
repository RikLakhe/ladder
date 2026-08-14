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
  const unitsById = new Map(allUnits.map((u) => [u.id, u]));

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
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "2px" }}>
        {prereqIds.map((pid) => {
          const unit = unitsById.get(pid);
          const hasIssue = !unit || unit.sequenceOrder >= currentSequenceOrder;
          return (
            <li key={pid} role="listitem" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "10px", textAlign: "center", color: "oklch(45% 0.01 260)", lineHeight: "1.2" }}>
                {unit ? unit.content : pid}
              </span>
              {hasIssue && <span> ⚠ sequencing issue</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
