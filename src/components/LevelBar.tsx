"use client";

import { useEffect, useState } from "react";

const LEVELS = ["L1", "L2", "L3", "L4", "L5"];
const STORAGE_KEY = "ladder-level";

export function LevelBar() {
  const [level, setLevel] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLevel(stored);
    } else {
      setShowModal(true);
    }
  }, []);

  function pickLevel(picked: string) {
    sessionStorage.setItem(STORAGE_KEY, picked);
    setLevel(picked);
    setShowModal(false);
  }

  return (
    <>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: "oklch(30% 0.02 260)",
        }}
      >
        Level
        <select
          aria-label="Level"
          value={level ?? ""}
          onChange={(event) => pickLevel(event.target.value)}
          style={{
            height: 32,
            borderRadius: 6,
            border: "1px solid oklch(88% 0.005 260)",
            padding: "0 8px",
            fontSize: 13,
          }}
        >
          <option value="" disabled>
            Select level
          </option>
          {LEVELS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <span data-testid="current-level-indicator" style={{ fontSize: 13, fontWeight: 600 }}>
        {level ?? "—"}
      </span>
      {showModal && (
        <div
          role="dialog"
          aria-label="Set your level"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            zIndex: 100,
          }}
        >
          <div style={{ background: "#fff", borderRadius: 8, padding: 24 }}>
            <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Set your level</p>
            <div style={{ display: "flex", gap: 8 }}>
              {LEVELS.map((option) => (
                <button key={option} type="button" onClick={() => pickLevel(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
