"use client";

import { useState } from "react";

export type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
};

type Values = Record<string, string>;

export function GenericEntityEditor({
  fieldConfig,
  initialValues,
  onSave,
}: {
  fieldConfig: FieldConfig[];
  initialValues: Values;
  onSave: (values: Values, changeNote: string) => void;
}) {
  const [values, setValues] = useState<Values>(initialValues);
  const [changeNote, setChangeNote] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleFieldChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleConfirmSave() {
    onSave(values, changeNote);
    setSaved(true);
  }

  if (saved) {
    return <div>Saved.</div>;
  }

  if (previewing) {
    const changedFields = fieldConfig.filter((f) => values[f.key] !== initialValues[f.key]);
    return (
      <div>
        <h3>Preview changes</h3>
        {changedFields.length === 0 ? (
          <p>No fields changed.</p>
        ) : (
          <ul>
            {changedFields.map((f) => (
              <li key={f.key}>
                <strong>{f.label}:</strong> {initialValues[f.key] || "(empty)"} → {values[f.key]}
              </li>
            ))}
          </ul>
        )}
        <p>Change note: {changeNote}</p>
        <button onClick={() => setPreviewing(false)}>Back</button>
        <button onClick={handleConfirmSave}>Confirm save</button>
      </div>
    );
  }

  return (
    <div>
      {fieldConfig.map((field) => (
        <div key={field.key} style={{ marginBottom: 12 }}>
          <label htmlFor={`field-${field.key}`}>{field.label}</label>
          {field.type === "select" && field.options ? (
            <select
              id={`field-${field.key}`}
              value={values[field.key] ?? ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
            >
              <option value="">—</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`field-${field.key}`}
              type="text"
              value={values[field.key] ?? ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
            />
          )}
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <label htmlFor="change-note">Change note</label>
        <input
          id="change-note"
          type="text"
          placeholder="Change note (required)"
          value={changeNote}
          onChange={(e) => setChangeNote(e.target.value)}
        />
      </div>
      <button
        disabled={changeNote.trim() === ""}
        onClick={() => setPreviewing(true)}
      >
        Preview
      </button>
    </div>
  );
}
