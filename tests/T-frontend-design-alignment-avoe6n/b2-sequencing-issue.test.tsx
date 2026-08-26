import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingSection } from "../../src/components/TrainingSection";
import type { TrainingUnitRow } from "../../src/lib/training-units";

afterEach(cleanup);

const unit = (overrides: Partial<TrainingUnitRow> = {}): TrainingUnitRow => ({
  id: "u1",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 2,
  name: "Build something",
  hasSequencingIssue: false,
  prereqIds: [],
  ...overrides,
});

describe("B-2: training unit row shows sequencing issue indicator when hasSequencingIssue=true", () => {
  it("renders ⚠ sequencing issue text when hasSequencingIssue is true", () => {
    render(<TrainingSection units={[unit({ hasSequencingIssue: true })]} level="P3" />);
    expect(screen.getByText(/⚠ sequencing issue/)).toBeDefined();
  });

  it("does NOT render sequencing issue text when hasSequencingIssue is false", () => {
    render(<TrainingSection units={[unit({ hasSequencingIssue: false })]} level="P3" />);
    expect(screen.queryByText(/⚠ sequencing issue/)).toBeNull();
  });
});
