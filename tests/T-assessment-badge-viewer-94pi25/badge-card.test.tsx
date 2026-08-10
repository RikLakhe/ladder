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
    render(<BadgeCard badge={mockBadge} />);
    const codeElement = screen.getByText("ABC-123");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveStyle({ fontFamily: expect.stringContaining("monospace") });
  });

  it("renders badge name", () => {
    render(<BadgeCard badge={mockBadge} />);
    expect(screen.getByText("Communication Skills")).toBeInTheDocument();
  });

  it("renders TierChip component", () => {
    render(<BadgeCard badge={mockBadge} />);
    const tierChip = screen.getByText("Gold");
    expect(tierChip).toBeInTheDocument();
  });

  it("truncates certifies to first sentence only", () => {
    render(<BadgeCard badge={mockBadge} />);
    const certifiesText = screen.getByText(/This badge certifies you have strong communication skills\./);
    expect(certifiesText).toBeInTheDocument();
    expect(screen.queryByText(/You can present effectively/)).not.toBeInTheDocument();
  });

  it("shows Not-attempted status marker", () => {
    render(<BadgeCard badge={mockBadge} />);
    expect(screen.getByText(/Not-attempted|⚪/)).toBeInTheDocument();
  });
});
