import { describe, expect, it } from "vitest";
import { paginate } from "../../src/lib/reference-card";

describe("B-1: paginate pure function", () => {
  it("returns rows 0..pageSize-1 for page 1", () => {
    const rows = ["a", "b", "c", "d", "e"];
    const result = paginate(rows, 1, 2);
    expect(result).toEqual(["a", "b"]);
  });

  it("returns rows pageSize..2*pageSize-1 for page 2", () => {
    const rows = ["a", "b", "c", "d", "e"];
    const result = paginate(rows, 2, 2);
    expect(result).toEqual(["c", "d"]);
  });

  it("returns remainder on last page", () => {
    const rows = ["a", "b", "c", "d", "e"];
    const result = paginate(rows, 3, 2);
    expect(result).toEqual(["e"]);
  });

  it("returns empty array for page beyond bounds", () => {
    const rows = ["a", "b", "c"];
    const result = paginate(rows, 5, 2);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    const result = paginate([], 1, 20);
    expect(result).toEqual([]);
  });

  it("handles page size larger than total rows", () => {
    const rows = ["a", "b"];
    const result = paginate(rows, 1, 10);
    expect(result).toEqual(["a", "b"]);
  });
});
