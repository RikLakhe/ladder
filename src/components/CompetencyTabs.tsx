"use client";

import { useState, type ReactNode } from "react";

type TabKey = "standard" | "assessment" | "training" | "evidence";

const TABS: { key: TabKey; label: string }[] = [
  { key: "standard", label: "Standard" },
  { key: "assessment", label: "Assessment" },
  { key: "training", label: "Training" },
  { key: "evidence", label: "Evidence" },
];

export function CompetencyTabs({
  standard,
  assessment,
  training,
  evidence,
}: {
  standard: ReactNode;
  assessment: ReactNode;
  training: ReactNode;
  evidence: ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("standard");
  const panels: Record<TabKey, ReactNode> = { standard, assessment, training, evidence };

  return (
    <div>
      <div>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={active === tab.key}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{panels[active]}</div>
    </div>
  );
}
