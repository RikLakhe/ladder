import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";
import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";

const BASE_BADGE = {
  badgeCode: "TS-B2",
  name: "Test Badge B2",
  tier: "Silver",
  level: "P2",
  certifies: "Certifies something",
  completionBar: "0/1",
  verifierRole: "Manager",
  cosignerRequired: false,
};

describe("B-2: unresolved evidence entry renders visible warning — no blank gap", () => {
  beforeEach(() => {
    vi.mocked(getBadgeByCode).mockResolvedValue(BASE_BADGE);
    vi.mocked(getEvidenceForBadge).mockResolvedValue([
      { resolved: false, instrumentId: "I-1", rowKey: "r1" },
    ]);
  });

  it("renders a visible warning element for a broken evidence reference", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B2" }),
    });
    const { container } = render(element as React.ReactElement);
    const warning = container.querySelector('[data-testid="evidence-broken"]');
    expect(warning).not.toBeNull();
  });

  it("warning element contains 'evidence link broken' text", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B2" }),
    });
    const { container } = render(element as React.ReactElement);
    const warning = container.querySelector('[data-testid="evidence-broken"]');
    expect(warning?.textContent).toContain("evidence link broken");
  });

  it("no blank gap — something visible renders instead of empty space", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B2" }),
    });
    const { container } = render(element as React.ReactElement);
    const listItems = container.querySelectorAll("ul li");
    expect(listItems).toHaveLength(1);
    // The li must not be empty — it must render visible content
    expect(listItems[0].textContent?.trim().length).toBeGreaterThan(0);
  });
});
