"use client";

import { TierChip } from "./TierChip";
import type { Badge } from "../lib/badges";

export function BadgeCard({ badge }: { badge: Badge }) {
  // Truncate certifies to first sentence
  const truncateCertifies = (text?: string) => {
    if (!text) return "";
    const firstSentence = text.split(".")[0] + ".";
    return firstSentence;
  };

  return (
    <div>
      <code style={{ fontFamily: "monospace" }}>{badge.badgeCode}</code>
      <h3>{badge.name}</h3>
      <TierChip tier={badge.tier} />
      <p>{truncateCertifies(badge.certifies)}</p>
      <span>⚪ Not-attempted</span>
    </div>
  );
}
