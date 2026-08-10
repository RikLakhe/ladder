"use client";

import { useState } from "react";
import type { MockDocumentVersion } from "../lib/mock/document-versions";
import { EmptyState } from "./EmptyState";

function VersionDiffView({
  oldSnapshot,
  newSnapshot,
}: {
  oldSnapshot: Record<string, string> | null;
  newSnapshot: Record<string, string>;
}) {
  const allKeys = Array.from(
    new Set([...Object.keys(oldSnapshot ?? {}), ...Object.keys(newSnapshot)])
  );
  return (
    <table aria-label="field diff">
      <thead>
        <tr>
          <th>Field</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        {allKeys.map((key) => {
          const before = oldSnapshot?.[key] ?? "";
          const after = newSnapshot[key] ?? "";
          const changed = before !== after;
          return (
            <tr key={key} aria-label={changed ? "changed field" : "unchanged field"}>
              <td>{key}</td>
              <td style={changed ? { background: "oklch(95% 0.05 25)" } : undefined}>
                {before || "—"}
              </td>
              <td style={changed ? { background: "oklch(95% 0.1 145)" } : undefined}>
                {after || "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function VersionHistoryList({
  entries,
}: {
  entries: MockDocumentVersion[];
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  if (entries.length === 0) {
    return <EmptyState variant="no-history-yet" />;
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <span>{entry.createdAt.slice(0, 10)}</span>{" "}
          <span>{entry.changedBy}</span>{" "}
          <span>{entry.changeNote}</span>{" "}
          <button onClick={() => toggle(entry.id)}>
            {expanded.has(entry.id) ? "Collapse" : "Expand"}
          </button>
          {expanded.has(entry.id) && (
            <VersionDiffView
              oldSnapshot={entry.oldSnapshot}
              newSnapshot={entry.newSnapshot}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
