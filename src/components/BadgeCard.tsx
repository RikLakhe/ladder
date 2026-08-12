import { TierChip } from "./TierChip";
import type { Badge } from "../lib/badges";

function truncateCertifies(text?: string) {
  if (!text) return "";
  return text.split(".")[0] + ".";
}

export function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {badge.badgeCode && (
          <code style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            background: "var(--accent-soft)",
            color: "var(--accent)",
            padding: "2px 7px",
            borderRadius: 4,
            fontWeight: 600,
          }}>
            {badge.badgeCode}
          </code>
        )}
        {badge.tier && <TierChip tier={badge.tier} />}
        <span style={{
          marginLeft: "auto",
          fontSize: 12,
          color: "var(--text-3)",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>⚪ Not attempted</span>
      </div>

      <h3 style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-1)" }}>
        {badge.name}
      </h3>

      {badge.certifies && (
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
          {truncateCertifies(badge.certifies)}
        </p>
      )}
    </div>
  );
}
