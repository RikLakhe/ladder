import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";
import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";

const BASE_BADGE = {
  badgeCode: "TS-B1",
  name: "Test Badge B1",
  tier: "Gold",
  level: "P3",
  certifies: "Certifies something",
  completionBar: "1/1",
  verifierRole: "Lead",
  cosignerRequired: false,
};

describe("B-1: resolved evidence entry renders as <details> with rowText visible", () => {
  beforeEach(() => {
    vi.mocked(getBadgeByCode).mockResolvedValue(BASE_BADGE);
    vi.mocked(getEvidenceForBadge).mockResolvedValue([
      {
        resolved: true,
        rowText: "Demonstrated X",
        instrumentId: "I-1",
        rowKey: "r1",
      },
    ]);
  });

  it("renders a <details> element in the evidence list", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B1" }),
    });
    const { container } = render(element as React.ReactElement);
    const details = container.querySelector("details");
    expect(details).not.toBeNull();
  });

  it("rowText 'Demonstrated X' is visible in the <summary> — the always-visible part of <details>", async () => {
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B1" }),
    });
    const { container } = render(element as React.ReactElement);
    const summary = container.querySelector("details summary");
    expect(summary?.textContent).toContain("Demonstrated X");
  });
});
