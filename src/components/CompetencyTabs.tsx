"use client";

import { useState, type ReactNode } from "react";

type TabKey = "standard" | "assessment" | "training" | "evidence";

const TABS: { key: TabKey; label: string }[] = [
  { key: "standard",   label: "Standard" },
  { key: "assessment", label: "Assessment" },
  { key: "training",   label: "Training" },
  { key: "evidence",   label: "Evidence" },
];

export function CompetencyTabs({
  standard,
  assessment,
  training,
  evidence,
}: {
  standard:   ReactNode;
  assessment: ReactNode;
  training:   ReactNode;
  evidence:   ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("standard");
  const panels: Record<TabKey, ReactNode> = { standard, assessment, training, evidence };

  return (
    <div style={{ marginTop: 24 }}>
      {/* Tab strip */}
      <div style={{
        display: "flex",
        gap: 0,
        borderBottom: "1px solid var(--border)",
        marginBottom: 24,
      }}>
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tab.key)}
              style={{
                padding: "9px 16px",
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--accent)" : "var(--text-2)",
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1,
                cursor: "pointer",
                transition: "color .15s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div>{panels[active]}</div>
    </div>
  );
}
