import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingSection } from "../../src/components/TrainingSection";
import type { TrainingUnitRow } from "../../src/lib/training-units";

afterEach(cleanup);

const concept1: TrainingUnitRow = {
  id: "cn1",
  type: "concept_notes",
  level: "P3",
  sequenceOrder: 1,
  name: "Concept notes unit",
  hasSequencingIssue: false,
};

const guided1: TrainingUnitRow = {
  id: "ge1",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 2,
  name: "Guided exercise unit",
  hasSequencingIssue: false,
};

const guided2: TrainingUnitRow = {
  id: "ge2",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 3,
  name: "Guided exercise with issue",
  hasSequencingIssue: true,
};

const autonomous1: TrainingUnitRow = {
  id: "ap1",
  type: "autonomous_project",
  level: "P3",
  sequenceOrder: 4,
  name: "Autonomous project",
  hasSequencingIssue: false,
};

describe("B-3: PF training section", () => {
  it("renders concept_notes before guided_exercise (type ordering)", () => {
    const units = [guided1, concept1];
    render(<TrainingSection units={units} />);
    const rows = screen.getAllByRole("row");
    // rows[0] is header, rows[1] should be concept_notes, rows[2] should be guided_exercise
    expect(rows[1]).toHaveTextContent("Concept notes unit");
    expect(rows[2]).toHaveTextContent("Guided exercise unit");
  });

  it("renders each unit's name and sequenceOrder", () => {
    const units = [concept1, guided1];
    render(<TrainingSection units={units} />);
    expect(screen.getByText("Concept notes unit")).toBeDefined();
    expect(screen.getByText("Guided exercise unit")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("shows warning for unit with hasSequencingIssue: true", () => {
    const units = [guided1, guided2];
    render(<TrainingSection units={units} />);
    const warnings = screen.getAllByText(/sequencing|warning|⚠/i);
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("renders empty list gracefully", () => {
    render(<TrainingSection units={[]} />);
    expect(screen.getByText(/no training|empty/i)).toBeDefined();
  });

  it("groups units by type in fixed order: concept_notes, guided_exercise, autonomous_project", () => {
    const units = [autonomous1, guided1, concept1];
    render(<TrainingSection units={units} />);
    const rows = screen.getAllByRole("row");
    // Verify order: header, concept, guided, autonomous
    expect(rows[1]).toHaveTextContent("Concept notes unit");
    expect(rows[2]).toHaveTextContent("Guided exercise unit");
    expect(rows[3]).toHaveTextContent("Autonomous project");
  });
});
