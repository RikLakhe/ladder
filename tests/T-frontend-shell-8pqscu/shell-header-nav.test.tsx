import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Shell } from "../../src/components/Shell";

describe("B-1: Shell renders header (home, search, level selector, current-level indicator) and full left nav", () => {
  it("renders header controls, static nav links, competency links, and children", () => {
    render(
      <Shell competencies={[{ id: "c1", name: "Engineering" }]}>
        <p>page-content</p>
      </Shell>
    );

    expect(screen.getByRole("link", { name: "Ladder" })).toBeDefined();
    expect(screen.getByRole("search")).toBeDefined();
    expect(screen.getByRole("combobox", { name: /level/i })).toBeDefined();
    expect(screen.getByTestId("current-level-indicator")).toBeDefined();

    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Level View" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Transition Guide" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Badges" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Version History" })).toBeDefined();

    expect(screen.queryByRole("link", { name: "Engineering" })).toBeNull();
    fireEvent.click(screen.getByText("Competencies"));
    expect(screen.getByRole("link", { name: "Engineering" })).toBeDefined();

    expect(screen.getByText("page-content")).toBeDefined();
  });
});
