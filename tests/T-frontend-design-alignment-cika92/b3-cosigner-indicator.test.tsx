import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";
import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";

const BASE_BADGE = {
  badgeCode: "TS-B3",
  name: "Test Badge B3",
  tier: "Silver",
  level: "P3",
  certifies: "Certifies something",
  completionBar: "0/1",
  verifierRole: "Manager",
  cosignerRequired: true,
};

describe("B-3: co-signer indicator renders conditionally with tooltip", () => {
  beforeEach(() => {
    vi.mocked(getEvidenceForBadge).mockResolvedValue([]);
  });

  it("renders co-signer indicator with tooltip when cosignerRequired=true", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue({ ...BASE_BADGE, cosignerRequired: true });
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B3" }),
    });
    const { container } = render(element as React.ReactElement);
    const indicator = container.querySelector('[data-testid="cosigner-indicator"]');
    expect(indicator).not.toBeNull();
    expect(indicator?.getAttribute("title")).toBe(
      "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency."
    );
  });

  it("does not render co-signer indicator when cosignerRequired=false", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue({ ...BASE_BADGE, cosignerRequired: false });
    const element = await BadgeDetailPage({
      params: Promise.resolve({ badgeCode: "TS-B3" }),
    });
    const { container } = render(element as React.ReactElement);
    const indicator = container.querySelector('[data-testid="cosigner-indicator"]');
    expect(indicator).toBeNull();
  });
});
