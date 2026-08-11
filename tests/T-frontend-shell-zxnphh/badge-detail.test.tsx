import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { BadgeDetail, EvidenceResult } from "../../src/lib/badges";

vi.mock("../../src/lib/badges", () => ({
  getBadgeByCode: vi.fn(),
  getEvidenceForBadge: vi.fn(),
}));

import { getBadgeByCode, getEvidenceForBadge } from "../../src/lib/badges";
import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";

const DEMO_P3: BadgeDetail = {
  badgeCode: "DEMO-P3",
  name: "P3 Demo Badge",
  tier: "Bronze",
  level: "P3",
  certifies: "Demonstrates P3 core skills.",
  completionBar: "2 of 3 tasks complete",
  verifierRole: "Engineering Lead",
  cosignerRequired: true,
};

const DEMO_P4: BadgeDetail = {
  badgeCode: "DEMO-P4",
  name: "P4 Demo Badge",
  tier: "Silver",
  level: "P4",
  certifies: "Demonstrates P4 core skills.",
  completionBar: "0 of 2 tasks complete",
  verifierRole: "Principal Engineer",
  cosignerRequired: false,
};

const P3_EVIDENCE: EvidenceResult[] = [
  { instrumentId: "instr-001", rowKey: "row-a", resolved: true, rowText: "Completed foundational assessment." },
];

const P4_EVIDENCE: EvidenceResult[] = [
  { instrumentId: "instr-999", rowKey: "row-x", resolved: false },
];

afterEach(cleanup);

describe("B-2: Badge detail page renders full detail", () => {
  it("shows co-signer indicator when cosigner_required is true", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue(DEMO_P3);
    vi.mocked(getEvidenceForBadge).mockResolvedValue(P3_EVIDENCE);
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByTestId("cosigner-indicator")).toBeDefined();
  });

  it("does not show co-signer indicator when cosigner_required is false", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue(DEMO_P4);
    vi.mocked(getEvidenceForBadge).mockResolvedValue(P4_EVIDENCE);
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P4" }) });
    render(page);
    expect(screen.queryByTestId("cosigner-indicator")).toBeNull();
  });

  it("shows resolved evidence row text", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue(DEMO_P3);
    vi.mocked(getEvidenceForBadge).mockResolvedValue(P3_EVIDENCE);
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByText("Completed foundational assessment.")).toBeDefined();
  });

  it("shows broken-link state for unresolved evidence — never dropped", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue(DEMO_P4);
    vi.mocked(getEvidenceForBadge).mockResolvedValue(P4_EVIDENCE);
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P4" }) });
    render(page);
    expect(screen.getByText(/evidence link broken/i)).toBeDefined();
  });

  it("shows certifies, completion bar, verifier, and status legend", async () => {
    vi.mocked(getBadgeByCode).mockResolvedValue(DEMO_P3);
    vi.mocked(getEvidenceForBadge).mockResolvedValue(P3_EVIDENCE);
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByText("Demonstrates P3 core skills.")).toBeDefined();
    expect(screen.getByText("2 of 3 tasks complete")).toBeDefined();
    expect(screen.getByText("Engineering Lead")).toBeDefined();
    expect(screen.getByTestId("badge-status-legend")).toBeDefined();
  });
});
