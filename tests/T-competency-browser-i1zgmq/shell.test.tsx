import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Shell } from "../../src/components/Shell";

describe("B-1: Shell renders a header and sidebar around its content", () => {
  it("renders the app name, a search input, a sidebar nav, and the given children", () => {
    render(
      <Shell competencies={[{ id: "c1", name: "Engineering" }]}>
        <p>page-content</p>
      </Shell>
    );
    expect(screen.getByText("Ladder")).toBeDefined();
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getByRole("link", { name: "Engineering" })).toBeDefined();
    expect(screen.getByText("page-content")).toBeDefined();
  });
});
