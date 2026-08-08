import { describe, expect, it } from "vitest";
import { buildSearchIndex, queryIndex } from "../../src/lib/search";

const COMPETENCIES = [
  { id: "comp-1", name: "Software Engineering", domains: ["Engineering"] },
];

const PRIMARY_FUNCTIONS = [
  { id: "pf-1", competencyId: "comp-1", name: "Backend Development" },
  { id: "pf-2", competencyId: "comp-1", name: "Frontend Systems" },
];

const BADGES = [
  {
    id: "b-1",
    competencyId: "comp-1",
    level: "P3",
    badge_code: "SE-P3",
    name: "SE Practitioner P3",
    tier: "practitioner",
    certifies: "Demonstrates backend proficiency",
    completion_bar: "50%",
    verifier_role: "Senior Engineer",
    cosigner_required: false,
    evidence_required: [],
  },
];

describe("B-1: search index + query logic", () => {
  it("exact badge-code match returns a result", () => {
    const index = buildSearchIndex({ competencies: COMPETENCIES, primaryFunctions: PRIMARY_FUNCTIONS, badges: BADGES });
    const results = queryIndex(index, "SE-P3");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain("SE-P3");
    expect(results[0].type).toBe("badge");
    expect(results[0].href).toMatch(/\/badges\/SE-P3/);
  });

  it("partial PF-name match returns a result", () => {
    const index = buildSearchIndex({ competencies: COMPETENCIES, primaryFunctions: PRIMARY_FUNCTIONS, badges: BADGES });
    const results = queryIndex(index, "backend");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("primary-function");
    expect(results[0].title).toMatch(/Backend/i);
    expect(results[0].href).toMatch(/\/primary-functions\/pf-1/);
  });

  it("no-match returns empty array, not an error", () => {
    const index = buildSearchIndex({ competencies: COMPETENCIES, primaryFunctions: PRIMARY_FUNCTIONS, badges: BADGES });
    const results = queryIndex(index, "xyznotfound12345");
    expect(results).toEqual([]);
  });

  it("result includes type, title, snippet, href", () => {
    const index = buildSearchIndex({ competencies: COMPETENCIES, primaryFunctions: PRIMARY_FUNCTIONS, badges: BADGES });
    const results = queryIndex(index, "frontend");
    expect(results.length).toBeGreaterThan(0);
    const result = results[0];
    expect(result).toHaveProperty("type");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("snippet");
    expect(result).toHaveProperty("href");
  });
});
