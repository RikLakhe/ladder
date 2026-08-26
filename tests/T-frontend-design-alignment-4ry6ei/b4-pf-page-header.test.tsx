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
    { level: "P4", body: "P4 standard body." },
  ]);
  vi.mocked(getFunctionalAnalysesForPrimaryFunction).mockResolvedValue([]);
  vi.mocked(getBadgesForPrimaryFunction).mockResolvedValue([]);
  vi.mocked(getTrainingUnitsForCompetencyAndLevel).mockResolvedValue([]);
});

describe("B-4: PF page header shows pf_number, name, domain_classification", () => {
  it("renders pf_number, name, and domain_classification in the header", async () => {
    const jsx = await PrimaryFunctionPage({
      params: Promise.resolve({ pfId: "pf-1" }),
      searchParams: Promise.resolve({ level: "P4" }),
    });
    render(jsx);

    expect(screen.getByText("PF-3")).toBeDefined();
    expect(screen.getByText("System Design", { exact: false })).toBeDefined();
    expect(screen.getByText("Execution")).toBeDefined();
  });
});
