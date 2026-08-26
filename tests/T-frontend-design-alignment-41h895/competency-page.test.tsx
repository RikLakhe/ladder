import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("next/link", () => ({ default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }));

vi.mock("../../src/lib/competencies", () => ({
  getCompetencyById: vi.fn(),
}));
vi.mock("../../src/lib/primary-functions", () => ({
  getPrimaryFunctionsWithBadgeCount: vi.fn(),
}));
vi.mock("../../src/lib/functional-analyses", () => ({
  getFunctionalAnalysisForCompetency: vi.fn(),
}));

import { getCompetencyById } from "../../src/lib/competencies";
import { getPrimaryFunctionsWithBadgeCount } from "../../src/lib/primary-functions";
import { getFunctionalAnalysisForCompetency } from "../../src/lib/functional-analyses";
import CompetencyPage from "../../src/app/competencies/[id]/page";

const mockCompetency = {
  id: "comp-1",
  name: "Data Analysis",
  description: "This competency covers data analysis skills.",
  domains: ["Technical"],
};

const mockPFs = [
  { id: "pf-1", pf_number: "PF-01", name: "Collect Data", domain_classification: "Technical", badgeCount: 3 },
  { id: "pf-2", pf_number: "PF-02", name: "Interpret Results", domain_classification: "Professional", badgeCount: 0 },
];

beforeEach(() => {
  vi.mocked(getCompetencyById).mockResolvedValue(mockCompetency);
  vi.mocked(getPrimaryFunctionsWithBadgeCount).mockResolvedValue(mockPFs);
  vi.mocked(getFunctionalAnalysisForCompetency).mockResolvedValue(null);
});

describe("B-5: competency page renders required elements", () => {
  it("shows description, PF cards with pf_number/domain_classification/badgeCount, history link, no CompetencyTabs", async () => {
    const jsx = await CompetencyPage({ params: Promise.resolve({ id: "comp-1" }) });
    render(jsx);

    // description in header
    expect(screen.getByText("This competency covers data analysis skills.")).toBeDefined();

    // history link pointing to /competencies/[id]/history
    const historyLink = screen.getByRole("link", { name: /history/i });
    expect(historyLink.getAttribute("href")).toBe("/competencies/comp-1/history");

    // PF cards show pf_number
    expect(screen.getByText("PF-01")).toBeDefined();
    expect(screen.getByText("PF-02")).toBeDefined();

    // domain_classification shown in PF cards
    expect(screen.getAllByText("Technical").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Professional")).toBeDefined();

    // badgeCount
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();

    // no CompetencyTabs (tabs would have tab role)
    expect(screen.queryByRole("tab")).toBeNull();
  });
});
