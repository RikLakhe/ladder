import { TierChip } from "./TierChip";
import type { Badge } from "../lib/badges";

function truncateCertifies(text?: string) {
  if (!text) return "";
  const firstSentence = text.split(".")[0] + ".";
  return firstSentence;
}

export function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <div>
      {badge.badgeCode && (
        <code style={{ fontFamily: "monospace" }}>{badge.badgeCode}</code>
      )}
      <h3>{badge.name}</h3>
      <TierChip tier={badge.tier} />
      {badge.certifies && <p>{truncateCertifies(badge.certifies)}</p>}
      <span>⚪ Not-attempted</span>
    </div>
  );
}
