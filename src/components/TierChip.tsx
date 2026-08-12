const LEVEL_COLOR: Record<string, string> = {
  P2: "var(--p2)",
  P3: "var(--p3)",
  P4: "var(--p4)",
  P5: "var(--p5)",
  P6: "var(--p6)",
  P7: "var(--p7)",
};

export function TierChip({ tier }: { tier: string | null | undefined }) {
  if (!tier) return null;
  const bg = LEVEL_COLOR[tier] ?? "var(--text-3)";
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      color: "#fff",
      background: bg,
      padding: "2px 8px",
      borderRadius: 4,
      lineHeight: 1.6,
      flexShrink: 0,
    }}>
      {tier}
    </span>
  );
}
