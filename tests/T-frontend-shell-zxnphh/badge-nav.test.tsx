import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import BadgesPage from "../../src/app/badges/page";

vi.mock("../../src/lib/competencies", () => ({
  getCompetencyById: vi.fn().mockResolvedValue({
    id: "demo",
    name: "Demo Competency",
    domains: ["Engineering"],
  }),
}));

vi.mock("../../src/lib/primary-functions", () => ({
  getPrimaryFunctionsForCompetency: vi.fn().mockResolvedValue([]),
}));

vi.mock("../../src/lib/standards", () => ({
  getStandardsForPrimaryFunction: vi.fn().mockResolvedValue([]),
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

  it("CompetencyPage assessment tab shows badge links for the competency's badges", async () => {
    const CompetencyPage = (await import("../../src/app/competencies/[id]/page")).default;
    const page = await CompetencyPage({ params: Promise.resolve({ id: "demo" }) });
    render(page);
    const links = screen.getAllByRole("link", { name: /DEMO-P/i });
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/badges/DEMO-P3");
    expect(hrefs).toContain("/badges/DEMO-P4");
  });
});
