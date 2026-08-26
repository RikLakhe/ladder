import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BadgesPage from "../../src/app/badges/page";

vi.mock("../../src/lib/competencies", () => ({
  getCompetencyById: vi.fn().mockResolvedValue({
    id: "demo",
    name: "Demo Competency",
    description: null,
    domains: ["Engineering"],
  }),
}));

vi.mock("../../src/lib/primary-functions", () => ({
  getPrimaryFunctionsWithBadgeCount: vi.fn().mockResolvedValue([]),
}));

vi.mock("../../src/lib/functional-analyses", () => ({
  getFunctionalAnalysisForCompetency: vi.fn().mockResolvedValue(null),
}));

afterEach(cleanup);

describe("B-3: Badge card links navigate to badge detail", () => {
  it("each badge card on BadgesPage is a link to /badges/:badgeCode", async () => {
    const page = await BadgesPage({ searchParams: Promise.resolve({}) });
    render(page);
    const linkP3 = screen.getByRole("link", { name: /DEMO-P3/i });
    const linkP4 = screen.getByRole("link", { name: /DEMO-P4/i });
    expect(linkP3.getAttribute("href")).toBe("/badges/DEMO-P3");
    expect(linkP4.getAttribute("href")).toBe("/badges/DEMO-P4");
  });

  it("CompetencyPage renders without CompetencyTabs (assessment tab removed per AC-5)", async () => {
    const CompetencyPage = (await import("../../src/app/competencies/[id]/page")).default;
    const page = await CompetencyPage({ params: Promise.resolve({ id: "demo" }) });
    render(page);
    expect(screen.queryByRole("button", { name: "Assessment" })).toBeNull();
  });
});
