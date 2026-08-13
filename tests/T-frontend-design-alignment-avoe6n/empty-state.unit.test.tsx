import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingSection } from "../../src/components/TrainingSection";
import type { TrainingUnitRow } from "../../src/lib/training-units";

afterEach(cleanup);

const EXACT_COPY =
  "Growth at this level is demonstrated through real project scope, not simulated exercises.";

const conceptNote: TrainingUnitRow = {
  id: "cn1",
  type: "concept_notes",
  level: "P6",
  sequenceOrder: 1,
  name: "Intro concepts",
  hasSequencingIssue: false,
  prereqIds: [],
};

const guidedExercise: TrainingUnitRow = {
  id: "ge1",
  type: "guided_exercise",
  level: "P6",
  sequenceOrder: 2,
  name: "Guided practice",
  hasSequencingIssue: false,
  prereqIds: [],
};

describe("B-1: EmptyState renders when no guided_exercise or autonomous_project units at P6/P7", () => {
  it("shows EmptyState with exact copy when P6 level has only concept_notes units", () => {
    // Currently fails: TrainingSection has no EmptyState logic and no level prop
    render(<TrainingSection units={[conceptNote]} level="P6" />);
    expect(screen.getByText(EXACT_COPY)).toBeDefined();
  });

  it("shows EmptyState with exact copy when P6 level has no units at all", () => {
    render(<TrainingSection units={[]} level="P6" />);
    expect(screen.getByText(EXACT_COPY)).toBeDefined();
  });

  it("does NOT show EmptyState when a guided_exercise unit is present at P6", () => {
    render(<TrainingSection units={[conceptNote, guidedExercise]} level="P6" />);
    expect(screen.queryByText(EXACT_COPY)).toBeNull();
  });

  it("does NOT show EmptyState for non-P6/P7 levels without exercise units", () => {
    const p4Note: TrainingUnitRow = { ...conceptNote, level: "P4" };
    render(<TrainingSection units={[p4Note]} level="P4" />);
    expect(screen.queryByText(EXACT_COPY)).toBeNull();
  });
});
