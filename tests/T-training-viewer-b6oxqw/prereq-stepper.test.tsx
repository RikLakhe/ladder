import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrereqStepper } from "../../src/components/PrereqStepper";

const unitA = { id: "a", content: "Unit Alpha", sequenceOrder: 1 };
const unitB = { id: "b", content: "Unit Beta", sequenceOrder: 2 };
const unitC = { id: "c", content: "Unit Current", sequenceOrder: 3 };

describe("B-2: PrereqStepper renders step position", () => {
  it("renders one list item per prereq ID", () => {
    render(
      <PrereqStepper
        allUnits={[unitA, unitB, unitC]}
        prereqIds={["a", "b"]}
        currentSequenceOrder={3}
      />
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  it("shows prereq content in the stepper", () => {
    render(
      <PrereqStepper
        allUnits={[unitA, unitC]}
        prereqIds={["a"]}
        currentSequenceOrder={3}
      />
    );
    expect(screen.getByText("Unit Alpha")).toBeDefined();
  });

  it("shows sequencing-issue warning for a prereq with sequence_order >= currentSequenceOrder", () => {
    const forwardPrereq = { id: "x", content: "Forward Prereq", sequenceOrder: 5 };
    render(
      <PrereqStepper
        allUnits={[forwardPrereq]}
        prereqIds={["x"]}
        currentSequenceOrder={3}
      />
    );
    expect(screen.getByText(/⚠ sequencing issue/)).toBeDefined();
  });

  it("shows unresolved warning for a prereq ID not found in allUnits", () => {
    render(
      <PrereqStepper
        allUnits={[]}
        prereqIds={["missing-id"]}
        currentSequenceOrder={3}
      />
    );
    expect(screen.getByText(/⚠ sequencing issue/)).toBeDefined();
  });

  it("renders empty stepper when prereqIds is empty", () => {
    render(
      <PrereqStepper allUnits={[unitA]} prereqIds={[]} currentSequenceOrder={1} />
    );
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(0);
  });
});
