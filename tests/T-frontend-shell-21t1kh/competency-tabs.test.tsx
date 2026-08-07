import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CompetencyTabs } from "../../src/components/CompetencyTabs";

describe("B-1: CompetencyTabs switches panel client-side, no reload", () => {
  it("shows Standard panel by default, then swaps to Assessment panel on click", () => {
    render(
      <CompetencyTabs
        standard={<p>standard-content</p>}
        assessment={<p>assessment-content</p>}
        training={<p>training-content</p>}
        evidence={<p>evidence-content</p>}
      />
    );

    expect(screen.getByText("standard-content")).toBeDefined();
    expect(screen.queryByText("assessment-content")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Assessment" }));

    expect(screen.getByText("assessment-content")).toBeDefined();
    expect(screen.queryByText("standard-content")).toBeNull();
  });
});
