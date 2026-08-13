import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingListView } from "../../src/components/TrainingListView";
import type { TrainingUnitRow } from "../../src/lib/training-units";

afterEach(cleanup);

const EXACT_COPY =
  "Growth at this level is demonstrated through real project scope, not simulated exercises.";

const conceptNote: TrainingUnitRow = {
  id: "cn1",
  type: "concept_notes",
  level: "P3",
  sequenceOrder: 1,
  name: "Intro concepts",
  hasSequencingIssue: false,
  prereqIds: [],
};

const guidedExercise: TrainingUnitRow = {
  id: "ge1",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 2,
  name: "Guided practice",
  hasSequencingIssue: false,
  prereqIds: [],
};

describe("B-1: EmptyState renders when no guided_exercise or autonomous_project units", () => {
  it("shows EmptyState with exact copy for P3 level with only concept_notes (no exercise units)", () => {
    // Currently fails: TrainingListView restricts EmptyState to P6/P7 only
    render(<TrainingListView units={[conceptNote]} level="P3" />);
    expect(screen.getByText(EXACT_COPY)).toBeDefined();
  });

  it("shows EmptyState with exact copy when units array is empty", () => {
    render(<TrainingListView units={[]} level="P3" />);
    expect(screen.getByText(EXACT_COPY)).toBeDefined();
  });

  it("does NOT show EmptyState when a guided_exercise unit is present", () => {
    render(<TrainingListView units={[conceptNote, guidedExercise]} level="P3" />);
    expect(screen.queryByText(EXACT_COPY)).toBeNull();
  });
});
