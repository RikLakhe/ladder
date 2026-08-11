import { describe, expect, it } from "vitest";
import { computeHasSequencingIssue } from "../../src/lib/training-units";

describe("B-1: computeHasSequencingIssue unit function", () => {
  it("returns false when unit has no prereqs", () => {
    const unit = {
      id: "unit-1",
      sequence_order: 5,
      prereqs: null,
    };
    const allUnitsById = new Map();
    expect(computeHasSequencingIssue(unit, allUnitsById)).toBe(false);
  });

  it("returns false when unit has empty prereqs array", () => {
    const unit = {
      id: "unit-1",
      sequence_order: 5,
      prereqs: [],
    };
    const allUnitsById = new Map();
    expect(computeHasSequencingIssue(unit, allUnitsById)).toBe(false);
  });

  it("returns false when all prereqs have sequence_order <= unit's sequence_order", () => {
    const unit = {
      id: "unit-1",
      sequence_order: 5,
      prereqs: [{ training_unit_id: "prereq-1" }, { training_unit_id: "prereq-2" }],
    };
    const allUnitsById = new Map([
      ["prereq-1", { id: "prereq-1", sequence_order: 3 }],
      ["prereq-2", { id: "prereq-2", sequence_order: 5 }],
    ]);
    expect(computeHasSequencingIssue(unit, allUnitsById)).toBe(false);
  });

  it("returns true when any prereq has sequence_order > unit's sequence_order", () => {
    const unit = {
      id: "unit-1",
      sequence_order: 5,
      prereqs: [{ training_unit_id: "prereq-1" }, { training_unit_id: "prereq-2" }],
    };
    const allUnitsById = new Map([
      ["prereq-1", { id: "prereq-1", sequence_order: 3 }],
      ["prereq-2", { id: "prereq-2", sequence_order: 7 }],
    ]);
    expect(computeHasSequencingIssue(unit, allUnitsById)).toBe(true);
  });

  it("handles missing prereq in allUnitsById (treats as not found, no error)", () => {
    const unit = {
      id: "unit-1",
      sequence_order: 5,
      prereqs: [{ training_unit_id: "missing-prereq" }],
    };
    const allUnitsById = new Map();
    expect(() =>
      computeHasSequencingIssue(unit, allUnitsById)
    ).not.toThrow();
  });
});
