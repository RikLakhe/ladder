export type Level = "P2" | "P3" | "P4" | "P5" | "P6" | "P7";

const LEVEL_COLOR: Record<Level, string> = {
  P2: "var(--p2)",
  P3: "var(--p3)",
  P4: "var(--p4)",
  P5: "var(--p5)",
  P6: "var(--p6)",
  P7: "var(--p7)",
};

export function LevelTag({ level }: { level: Level }) {
  return (
    <span
      data-testid="level-tag"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: LEVEL_COLOR[level] ?? "var(--text-3)",
        background: "transparent",
        border: `1.5px solid ${LEVEL_COLOR[level] ?? "var(--text-3)"}`,
        padding: "1px 6px",
        borderRadius: 4,
        lineHeight: 1.6,
      }}
    >
      {level}
    </span>
  );
}
