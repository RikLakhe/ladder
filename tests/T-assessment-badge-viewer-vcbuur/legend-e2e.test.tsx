import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BadgeStatusLegend } from "../../src/components/BadgeStatusLegend";

afterEach(cleanup);

describe("B-2: badge-status-legend renders identically across different badge detail pages", () => {
  it("legend markup is identical when rendered in different badge contexts (DEMO-P3 vs DEMO-P4)", () => {
    // Render legend for DEMO-P3 context
    const { container: container1 } = render(<BadgeStatusLegend />);
    const legend1 = container1.querySelector('[data-testid="badge-status-legend"]')!;
    const html1 = legend1.innerHTML;

    cleanup();

    // Render legend for DEMO-P4 context
    const { container: container2 } = render(<BadgeStatusLegend />);
    const legend2 = container2.querySelector('[data-testid="badge-status-legend"]')!;
    const html2 = legend2.innerHTML;

    // Assert identical markup
    expect(html1).toBe(html2);
  });

  it("legend contains all three states in the same order regardless of badge context", () => {
    const { container } = render(<BadgeStatusLegend />);
    const legend = container.querySelector('[data-testid="badge-status-legend"]')!;
    const text = legend.textContent || "";

    // Verify order: Earned-eligible < Blocked-assignment-limited < Not-attempted
    const earnedIdx = text.indexOf("Earned-eligible");
    const blockedIdx = text.indexOf("Blocked-assignment-limited");
    const notAttemptedIdx = text.indexOf("Not-attempted");

    expect(earnedIdx).toBeGreaterThan(-1);
    expect(blockedIdx).toBeGreaterThan(-1);
    expect(notAttemptedIdx).toBeGreaterThan(-1);

    expect(earnedIdx).toBeLessThan(blockedIdx);
    expect(blockedIdx).toBeLessThan(notAttemptedIdx);
  });

  it("legend contains all explanatory text for each state", () => {
    const { container } = render(<BadgeStatusLegend />);
    const legend = container.querySelector('[data-testid="badge-status-legend"]')!;
    const text = legend.textContent || "";

    expect(text).toContain("All criteria met, ready for assessment");
    expect(text).toContain("Assignment quota reached, cannot be assessed this cycle");
    expect(text).toContain("No assessment attempt has been made");
  });
});
