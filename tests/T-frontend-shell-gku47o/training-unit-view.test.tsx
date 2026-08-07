import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingUnitView } from "../../src/components/TrainingUnitView";
import type { MockTrainingUnit } from "../../src/lib/mock/training";

afterEach(cleanup);

const conceptNotesFixture: MockTrainingUnit = {
  id: "u1",
  competencyId: "c1",
  type: "concept_notes",
  level: "P3",
  sequenceOrder: 1,
  content: "Learn the basics of X.",
  prereqs: [],
};

describe("B-1: concept_notes subtype renders content; no PrereqStepper", () => {
  it("renders the unit content text", () => {
    render(<TrainingUnitView unit={conceptNotesFixture} allUnits={[conceptNotesFixture]} />);
    expect(screen.getByText("Learn the basics of X.")).toBeDefined();
  });

  it("does not render a PrereqStepper for concept_notes", () => {
    render(<TrainingUnitView unit={conceptNotesFixture} allUnits={[conceptNotesFixture]} />);
    expect(screen.queryByTestId("prereq-stepper")).toBeNull();
  });
});
