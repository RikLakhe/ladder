"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShellCompetency } from "./Shell";

const navLinkStyle = {
  display: "block",
  padding: "8px 10px",
  fontSize: 13,
  color: "oklch(30% 0.02 260)",
  borderRadius: 6,
};

export function CompetencyNavList({ competencies }: { competencies: ShellCompetency[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "8px 10px",
          fontSize: 13,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Competencies
      </button>
      {expanded &&
        competencies.map((competency) => (
          <Link key={competency.id} href={`/competencies/${competency.id}`} style={navLinkStyle}>
            {competency.name}
          </Link>
        ))}
    </div>
  );
}
