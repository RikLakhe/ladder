import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import BadgeDetailPage from "../../src/app/badges/[badgeCode]/page";

afterEach(cleanup);

describe("B-2: Badge detail page renders full detail", () => {
  it("shows co-signer indicator when cosigner_required is true", async () => {
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByTestId("cosigner-indicator")).toBeDefined();
  });

  it("does not show co-signer indicator when cosigner_required is false", async () => {
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P4" }) });
    render(page);
    expect(screen.queryByTestId("cosigner-indicator")).toBeNull();
  });

  it("shows resolved evidence row text", async () => {
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByText("Completed foundational assessment.")).toBeDefined();
  });

  it("shows broken-link state for unresolved evidence — never dropped", async () => {
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P4" }) });
    render(page);
    expect(screen.getByText(/evidence link broken/i)).toBeDefined();
  });

  it("shows certifies, completion bar, verifier, and status legend", async () => {
    const page = await BadgeDetailPage({ params: Promise.resolve({ badgeCode: "DEMO-P3" }) });
    render(page);
    expect(screen.getByText("Demonstrates P3 core skills.")).toBeDefined();
    expect(screen.getByText("2 of 3 tasks complete")).toBeDefined();
    expect(screen.getByText("Engineering Lead")).toBeDefined();
    expect(screen.getByTestId("badge-status-legend")).toBeDefined();
  });
});
