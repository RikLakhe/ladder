import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LevelTag } from "../../src/components/LevelTag";
import { LevelTabStrip } from "../../src/components/LevelTabStrip";
import { ContentLayout } from "../../src/components/ContentLayout";
import { EmptyState } from "../../src/components/EmptyState";

const LEVELS = ["P2", "P3", "P4", "P5", "P6", "P7"] as const;

describe("B-1: shared UI contracts render without a runtime error", () => {
  it.each(LEVELS)("LevelTag renders level %s", (level) => {
    expect(() => render(<LevelTag level={level} />)).not.toThrow();
    expect(screen.getByText(level)).toBeDefined();
  });

  it("LevelTabStrip renders a tab per level and disables inapplicable ones", () => {
    render(
      <LevelTabStrip
        currentLevel="P4"
        levels={LEVELS}
        inapplicableLevels={["P2", "P7"]}
      />
    );
    for (const level of LEVELS) {
      const tab = screen.getByRole("tab", { name: level });
      if (level === "P2" || level === "P7") {
        expect(tab.hasAttribute("disabled")).toBe(true);
      } else {
        expect(tab.hasAttribute("disabled")).toBe(false);
      }
    }
  });

  it("ContentLayout renders content passed into each named slot", () => {
    render(
      <ContentLayout
        standard={<span>standard-content</span>}
        badge={<span>badge-content</span>}
        training={<span>training-content</span>}
      />
    );
    expect(screen.getByText("standard-content")).toBeDefined();
    expect(screen.getByText("badge-content")).toBeDefined();
    expect(screen.getByText("training-content")).toBeDefined();
  });

  it("EmptyState renders variant-appropriate copy for each declared variant", () => {
    render(<EmptyState variant="no-standard" />);
    expect(screen.getByText(/no standard/i)).toBeDefined();
  });

  it("EmptyState renders a safe fallback for an unrecognized variant, never crashing", () => {
    // @ts-expect-error — deliberately passing an undeclared variant to prove the fallback path
    expect(() => render(<EmptyState variant="totally-unknown-variant" />)).not.toThrow();
    expect(screen.getByText(/nothing here/i)).toBeDefined();
  });
});
