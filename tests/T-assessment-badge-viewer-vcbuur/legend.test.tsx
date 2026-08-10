import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BadgeStatusLegend } from "../../src/components/BadgeStatusLegend";

afterEach(cleanup);

describe("B-1: BadgeStatusLegend renders 3 entries in fixed order", () => {
  it("renders all three status entries", () => {
    render(<BadgeStatusLegend />);
    expect(screen.getByText(/Earned-eligible/)).toBeInTheDocument();
    expect(screen.getByText(/Blocked-assignment-limited/)).toBeInTheDocument();
    expect(screen.getByText(/Not-attempted/)).toBeInTheDocument();
  });

  it("renders entries in correct order (Earned-eligible first, Not-attempted last)", () => {
    const { container } = render(<BadgeStatusLegend />);
    const legend = container.querySelector('[data-testid="badge-status-legend"]');
    expect(legend).toBeTruthy();

    const textContent = legend?.textContent || "";
    const earnedIdx = textContent.indexOf("Earned-eligible");
    const blockedIdx = textContent.indexOf("Blocked-assignment-limited");
    const notAttemptedIdx = textContent.indexOf("Not-attempted");

    expect(earnedIdx).toBeLessThan(blockedIdx);
    expect(blockedIdx).toBeLessThan(notAttemptedIdx);
  });
});
