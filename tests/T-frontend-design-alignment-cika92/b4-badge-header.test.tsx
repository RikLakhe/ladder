import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";
import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";

const BASE_BADGE = {
  badgeCode: "TS-B4",
  name: "Architecture Foundations",
  tier: "P3",
  level: "P3",
  certifies: "Certifies something",
  completionBar: "0/1",
  verifierRole: "Manager",
  cosignerRequired: false,
};

describe("B-4: badge header shows badge_code in monospace, name, TierChip", () => {
  beforeEach(() => {
    vi.mocked(getBadgeByCode).mockResolvedValue(BASE_BADGE);
    vi.mocked(getEvidenceForBadge).mockResolvedValue([]);
  });

  it("renders badge_code in a code element", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B4" }),
    });
    const { container } = render(element as React.ReactElement);
    const codeEl = container.querySelector("code");
    expect(codeEl).not.toBeNull();
    expect(codeEl?.textContent).toContain("TS-B4");
  });

  it("renders TierChip with the badge tier", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B4" }),
    });
    const { container } = render(element as React.ReactElement);
    const chip = container.querySelector('[data-testid="tier-chip"]');
    expect(chip).not.toBeNull();
    expect(chip?.textContent).toBe("P3");
  });
});
