import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";
import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";

describe("B-4: BadgeStatusLegend present on badge detail page", () => {
  beforeEach(() => {
    vi.mocked(getBadgeByCode).mockResolvedValue({
      badgeCode: "TS-B4L",
      name: "Legend Test Badge",
      tier: "P3",
      level: "P3",
      certifies: "Certifies something",
      completionBar: "0/1",
      verifierRole: "Manager",
      cosignerRequired: false,
    });
    vi.mocked(getEvidenceForBadge).mockResolvedValue([]);
  });

  it("renders BadgeStatusLegend somewhere on the page", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B4L" }),
    });
    const { container } = render(element as React.ReactElement);
    const legend = container.querySelector('[data-testid="badge-status-legend"]');
    expect(legend).not.toBeNull();
  });
});
