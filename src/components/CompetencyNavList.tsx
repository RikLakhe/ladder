"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShellCompetency } from "./Shell";

export function CompetencyNavList({ competencies }: { competencies: ShellCompetency[] }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px 10px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: 2,
        }}
      >
        Competencies
        <span style={{ fontSize: 10, opacity: .7 }}>{expanded ? "▾" : "▸"}</span>
      </button>

      {expanded && competencies.map((competency) => (
        <Link
          key={competency.id}
          href={`/competencies/${competency.id}`}
          style={{
            display: "block",
            padding: "6px 10px 6px 18px",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-2)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
          }}
        >
          {competency.name}
        </Link>
      ))}
    </div>
  );
}
