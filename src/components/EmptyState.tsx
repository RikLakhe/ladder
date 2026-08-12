export type EmptyStateVariant =
  | "no-standard"
  | "no-badge"
  | "no-training"
  | "no-assessment"
  | "no-evidence"
  | "no-simulated-training"
  | "no-history-yet"
  | "not-applicable";

const CONFIG: Record<EmptyStateVariant, { icon: string; text: string }> = {
  "no-standard":          { icon: "—", text: "No standard defined for this level yet." },
  "no-badge":             { icon: "◎", text: "No badge available for this level yet." },
  "no-training":          { icon: "◎", text: "No training assigned for this level yet." },
  "no-assessment":        { icon: "◎", text: "No assessment defined for this competency yet." },
  "no-evidence":          { icon: "◎", text: "No evidence recorded for this competency yet." },
  "no-simulated-training":{ icon: "↑", text: "Growth at this level is demonstrated through real project scope, not simulated exercises." },
  "no-history-yet":       { icon: "◎", text: "No history yet — changes will appear here after the first edit." },
  "not-applicable":       { icon: "—", text: "Not applicable at this level." },
};

export function EmptyState({ variant }: { variant: EmptyStateVariant }) {
  const { icon, text } = CONFIG[variant] ?? { icon: "◎", text: "Nothing here yet." };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 16px",
      background: "var(--bg)",
      border: "1px dashed var(--border-mid)",
      borderRadius: "var(--radius-sm)",
      color: "var(--text-3)",
      fontSize: 13.5,
    }}>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        fontWeight: 600,
        color: "var(--border-mid)",
        flexShrink: 0,
      }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
