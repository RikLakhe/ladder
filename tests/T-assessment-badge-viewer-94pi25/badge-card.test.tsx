import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BadgeCard } from "../../src/components/BadgeCard";

afterEach(cleanup);

describe("B-1: BadgeCard renders badge_code, name, TierChip, truncated certifies, Not-attempted", () => {
  const mockBadge = {
    id: "badge-1",
    badgeCode: "ABC-123",
    name: "Communication Skills",
    tier: "Gold",
    certifies: "This badge certifies you have strong communication skills. You can present effectively. You listen actively.",
    level: "intermediate",
  };

  it("renders badge_code in monospace element", () => {
    const { container } = render(<BadgeCard badge={mockBadge} />);
    const codeElement = screen.getByText("ABC-123");
    expect(codeElement).toBeDefined();
    const codeTag = container.querySelector("code");
    expect(codeTag?.textContent).toBe("ABC-123");
    expect(codeTag?.style.fontFamily).toContain("monospace");
  });

  it("renders badge name", () => {
    render(<BadgeCard badge={mockBadge} />);
    const nameElement = screen.getByText("Communication Skills");
    expect(nameElement).toBeDefined();
  });

  it("renders TierChip component", () => {
    render(<BadgeCard badge={mockBadge} />);
    const tierElement = screen.getByText("Gold");
    expect(tierElement).toBeDefined();
  });

  it("truncates certifies to first sentence only", () => {
    render(<BadgeCard badge={mockBadge} />);
    const certifiesText = screen.getByText(/This badge certifies you have strong communication skills\./);
    expect(certifiesText).toBeDefined();
    expect(certifiesText.textContent).not.toContain("You can present effectively");
  });

  it("shows Not-attempted status marker", () => {
    render(<BadgeCard badge={mockBadge} />);
    const statusText = screen.getByText(/Not-attempted/);
    expect(statusText).toBeDefined();
  });
});
