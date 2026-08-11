interface StepperUnit {
  id: string;
  name: string;
  sequenceOrder: number;
}

interface Props {
  prereqUnits: StepperUnit[];
  currentUnit: StepperUnit;
}

export function PrereqStepper({ prereqUnits, currentUnit }: Props) {
  const allUnits = [...prereqUnits, currentUnit];
  const currentIndex = prereqUnits.length;

  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        padding: "8px",
        background: "oklch(96% 0.003 260)",
        borderRadius: "6px",
        alignItems: "stretch",
      }}
    >
      {allUnits.map((unit, index) => {
        const isLast = index === allUnits.length - 1;
        const isCurrent = index === currentIndex;

        return (
          <div key={unit.id} style={{ display: "flex", gap: "2px" }}>
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: isCurrent
                    ? "oklch(52% 0.18 265)"
                    : "oklch(52% 0.18 265)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  border: isCurrent ? "2px solid oklch(40% 0.18 265)" : "none",
                  boxSizing: "border-box",
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  color: "oklch(45% 0.01 260)",
                  lineHeight: "1.2",
                }}
              >
                {unit.name.split(" ").slice(0, 2).join(" ")}
              </div>
            </div>
            {!isLast && (
              <div
                style={{
                  width: "1px",
                  background: "oklch(87% 0.005 260)",
                  margin: "0 2px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
