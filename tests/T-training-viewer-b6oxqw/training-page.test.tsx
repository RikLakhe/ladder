import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrainingListView } from "../../src/components/TrainingListView";
import type { TrainingUnitRow } from "../../src/lib/training-units";

const makeUnit = (overrides: Partial<TrainingUnitRow> & { id: string; type: string; name: string }): TrainingUnitRow => ({
  level: "P4",
  sequenceOrder: 1,
  hasSequencingIssue: false,
  prereqIds: [],
  ...overrides,
});

const conceptUnit = makeUnit({ id: "cn1", type: "concept_notes", name: "Concept Notes Unit", sequenceOrder: 1 });
const guidedUnit = makeUnit({ id: "ge1", type: "guided_exercise", name: "Guided Exercise Unit", sequenceOrder: 2 });
const autonomousUnit = makeUnit({ id: "ap1", type: "autonomous_project", name: "Autonomous Project Unit", sequenceOrder: 3 });
const referenceUnit = makeUnit({ id: "rc1", type: "reference_card", name: "Reference Card Unit", sequenceOrder: 4 });

describe("B-1: TrainingListView renders units in fixed type order", () => {
  it("renders concept_notes before guided_exercise before autonomous_project before reference_card regardless of input order", () => {
    const units = [referenceUnit, autonomousUnit, guidedUnit, conceptUnit];
    render(<TrainingListView units={units} level="P4" />);
    const items = screen.getAllByTestId("training-unit-row");
    expect(items[0]).toHaveTextContent("Concept Notes Unit");
    expect(items[1]).toHaveTextContent("Guided Exercise Unit");
    expect(items[2]).toHaveTextContent("Autonomous Project Unit");
    expect(items[3]).toHaveTextContent("Reference Card Unit");
  });

  it("renders sequenceOrder for each unit", () => {
    render(<TrainingListView units={[conceptUnit, guidedUnit]} level="P4" />);
    expect(screen.getByTestId("training-unit-row-cn1")).toHaveTextContent("1");
    expect(screen.getByTestId("training-unit-row-ge1")).toHaveTextContent("2");
  });

  it("renders unit name for each row", () => {
    render(<TrainingListView units={[conceptUnit, guidedUnit]} level="P4" />);
    expect(screen.getByText("Concept Notes Unit")).toBeDefined();
    expect(screen.getByText("Guided Exercise Unit")).toBeDefined();
  });

  it("PrereqStepper is exported from exactly one source file", async () => {
    const { execSync } = await import("node:child_process");
    const result = execSync(
      'grep -rl "export function PrereqStepper\\|export const PrereqStepper" src/components src/app 2>/dev/null || true',
      { cwd: process.cwd(), encoding: "utf8" }
    ).trim();
    const files = result.split("\n").filter(Boolean);
    expect(files).toHaveLength(1);
    expect(files[0]).toContain("PrereqStepper");
  });
});

describe("B-3: P6/P7 with no guided/autonomous shows EmptyState", () => {
  const onlyConceptP6 = [makeUnit({ id: "cn-p6", type: "concept_notes", name: "Concept P6", level: "P6" })];
  const withGuidedP7 = [
    makeUnit({ id: "cn-p7", type: "concept_notes", name: "Concept P7", level: "P7" }),
    makeUnit({ id: "ge-p7", type: "guided_exercise", name: "Guided P7", level: "P7" }),
  ];

  it("shows EmptyState when level is P6 and no guided/autonomous units exist", () => {
    render(<TrainingListView units={onlyConceptP6} level="P6" />);
    expect(screen.getByText(/Growth at this level is demonstrated through real project scope/)).toBeDefined();
  });

  it("shows EmptyState when level is P7 and no guided/autonomous units exist", () => {
    render(<TrainingListView units={[makeUnit({ id: "cn-p7b", type: "concept_notes", name: "Concept", level: "P7" })]} level="P7" />);
    expect(screen.getByText(/Growth at this level is demonstrated through real project scope/)).toBeDefined();
  });

  it("does NOT show EmptyState when level is P6/P7 but guided_exercise rows exist", () => {
    render(<TrainingListView units={withGuidedP7} level="P7" />);
    expect(screen.queryByText(/Growth at this level/)).toBeNull();
  });

  it("does NOT show EmptyState for non-P6/P7 levels even without guided units", () => {
    render(<TrainingListView units={[conceptUnit]} level="P4" />);
    expect(screen.queryByText(/Growth at this level/)).toBeNull();
  });
});

describe("B-4: Forward-prereq unit shows sequencing-issue warning", () => {
  const issueUnit = makeUnit({ id: "issue1", type: "guided_exercise", name: "Issue Unit", hasSequencingIssue: true });
  const okUnit = makeUnit({ id: "ok1", type: "guided_exercise", name: "OK Unit", hasSequencingIssue: false });

  it("shows warning for unit with hasSequencingIssue: true", () => {
    render(<TrainingListView units={[issueUnit, okUnit]} level="P4" />);
    const warnings = screen.getAllByText(/⚠/);
    expect(warnings.length).toBeGreaterThanOrEqual(1);
  });

  it("does not show warning for unit with hasSequencingIssue: false", () => {
    render(<TrainingListView units={[okUnit]} level="P4" />);
    expect(screen.queryByText(/⚠/)).toBeNull();
  });
});
