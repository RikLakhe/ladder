import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TrainingUnitView } from "../../src/components/TrainingUnitView";
import { EmptyState } from "../../src/components/EmptyState";
import type { MockTrainingUnit } from "../../src/lib/mock/training";

afterEach(cleanup);

const cn1: MockTrainingUnit = {
  id: "cn1",
  competencyId: "c1",
  type: "concept_notes",
  level: "P3",
  sequenceOrder: 1,
  content: "Concept notes.",
  prereqs: [],
};

const ge1: MockTrainingUnit = {
  id: "ge1",
  competencyId: "c1",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 2,
  content: "Guided kata.",
  prereqs: ["cn1"],
};

const ap1: MockTrainingUnit = {
  id: "ap1",
  competencyId: "c1",
  type: "autonomous_project",
  level: "P4",
  sequenceOrder: 5,
  content: "AP.",
  prereqs: [],
};

const geBad: MockTrainingUnit = {
  id: "ge-bad",
  competencyId: "c1",
  type: "guided_exercise",
  level: "P3",
  sequenceOrder: 2,
  content: "Bad prereq unit.",
  prereqs: ["ap1"],
};

const lp1: MockTrainingUnit = {
  id: "lp1",
  competencyId: "c1",
  type: "learning_path",
  level: "P3",
  sequenceOrder: 10,
  content: "Full path.",
  prereqs: ["cn1", "ge1"],
};

describe("B-2: guided_exercise, learning_path, and EmptyState variant", () => {
  describe("Given A: guided_exercise with valid backward prereq", () => {
    it("renders PrereqStepper", () => {
      render(<TrainingUnitView unit={ge1} allUnits={[cn1, ge1]} />);
      expect(screen.getByTestId("prereq-stepper")).toBeDefined();
    });
    it("shows prereq content text in stepper", () => {
      render(<TrainingUnitView unit={ge1} allUnits={[cn1, ge1]} />);
      expect(screen.getByText("Concept notes.")).toBeDefined();
    });
    it("does not show sequencing issue for valid backward prereq", () => {
      render(<TrainingUnitView unit={ge1} allUnits={[cn1, ge1]} />);
      expect(screen.queryByText(/⚠ sequencing issue/)).toBeNull();
    });
  });

  describe("Given B: guided_exercise with forward prereq", () => {
    it("shows sequencing issue warning in stepper", () => {
      render(<TrainingUnitView unit={geBad} allUnits={[cn1, ge1, ap1, geBad]} />);
      expect(screen.getByText(/⚠ sequencing issue/)).toBeDefined();
    });
  });

  describe("Given C: learning_path renders ordered list with level labels", () => {
    it("renders an ordered list with 2 items", () => {
      render(<TrainingUnitView unit={lp1} allUnits={[cn1, ge1, lp1]} />);
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBe(2);
    });
    it("each item shows the level label", () => {
      render(<TrainingUnitView unit={lp1} allUnits={[cn1, ge1, lp1]} />);
      const p3Labels = screen.getAllByText("P3");
      expect(p3Labels.length).toBeGreaterThanOrEqual(2);
    });
    it("each item shows the unit content", () => {
      render(<TrainingUnitView unit={lp1} allUnits={[cn1, ge1, lp1]} />);
      expect(screen.getByText("Concept notes.")).toBeDefined();
      expect(screen.getByText("Guided kata.")).toBeDefined();
    });
  });

  describe("Given D: EmptyState no-simulated-training variant", () => {
    it("renders the correct copy for no-simulated-training", () => {
      render(<EmptyState variant="no-simulated-training" />);
      expect(
        screen.getByText(
          "Growth at this level is demonstrated through real project scope, not simulated exercises."
        )
      ).toBeDefined();
    });
  });
});
