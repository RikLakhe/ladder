import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("next/link", () => ({ default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }));

vi.mock("../../src/lib/primary-functions", () => ({
  getPrimaryFunctionById: vi.fn(),
  computeInapplicableLevels: vi.fn(),
}));
vi.mock("../../src/lib/standards", () => ({
  getStandardsForPrimaryFunction: vi.fn(),
}));
vi.mock("../../src/lib/functional-analyses", () => ({
  getFunctionalAnalysesForPrimaryFunction: vi.fn(),
}));
vi.mock("../../src/lib/badges", () => ({
  getBadgesForPrimaryFunction: vi.fn(),
}));
vi.mock("../../src/lib/training-units", () => ({
  getTrainingUnitsForCompetencyAndLevel: vi.fn(),
}));

import { getPrimaryFunctionById, computeInapplicableLevels } from "../../src/lib/primary-functions";
import { getStandardsForPrimaryFunction } from "../../src/lib/standards";
import { getFunctionalAnalysesForPrimaryFunction } from "../../src/lib/functional-analyses";
import { getBadgesForPrimaryFunction } from "../../src/lib/badges";
import { getTrainingUnitsForCompetencyAndLevel } from "../../src/lib/training-units";
import PrimaryFunctionPage from "../../src/app/primary-functions/[pfId]/page";

beforeEach(() => {
  vi.mocked(getPrimaryFunctionById).mockResolvedValue({
    id: "pf-1",
    name: "System Design",
    competency_id: "comp-1",
    pf_number: "PF-3",
    domain_classification: "Execution",
  });
  vi.mocked(computeInapplicableLevels).mockReturnValue([]);
  vi.mocked(getStandardsForPrimaryFunction).mockResolvedValue([
    { level: "P4", body: "Design scalable systems." },
  ]);
  vi.mocked(getFunctionalAnalysesForPrimaryFunction).mockResolvedValue([]);
  vi.mocked(getBadgesForPrimaryFunction).mockResolvedValue([
    { id: "b-1", name: "Systems Badge", badgeCode: "SYS-P4", tier: null, certifies: null, level: "P4" },
  ]);
  vi.mocked(getTrainingUnitsForCompetencyAndLevel).mockResolvedValue([
    { id: "tu-1", name: "System Design Fundamentals", type: "concept_notes", level: "P4", sequenceOrder: 1, hasSequencingIssue: false, prereqIds: [] },
  ]);
});

describe("B-2: PF page at valid level renders Standard, Badge, Training sections", () => {
  it("renders Standard, Badge, and Training sections for a level with content", async () => {
    const jsx = await PrimaryFunctionPage({
      params: Promise.resolve({ pfId: "pf-1" }),
      searchParams: Promise.resolve({ level: "P4" }),
    });
    render(jsx);

    // LevelTabStrip renders buttons, not links
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0].tagName).toBe("BUTTON");

    expect(screen.getByText("Standard")).toBeDefined();
    expect(screen.getByText("Design scalable systems.")).toBeDefined();

    expect(screen.getByText("Badges")).toBeDefined();
    expect(screen.getByText("SYS-P4")).toBeDefined();

    expect(screen.getByText("Training")).toBeDefined();
    expect(screen.getByText("System Design Fundamentals")).toBeDefined();
  });
});
