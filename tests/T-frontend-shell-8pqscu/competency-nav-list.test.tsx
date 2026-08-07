import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { CompetencyNavList } from "../../src/components/CompetencyNavList";

afterEach(cleanup);

describe("B-5: competency nav list is expandable/collapsible", () => {
  it("hides competency links until toggled, then can be collapsed again", () => {
    render(
      <CompetencyNavList
        competencies={[
          { id: "c1", name: "Engineering" },
          { id: "c2", name: "Design" },
        ]}
      />
    );

    expect(screen.queryByRole("link", { name: "Engineering" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Design" })).toBeNull();

    fireEvent.click(screen.getByText("Competencies"));
    expect(screen.getByRole("link", { name: "Engineering" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Design" })).toBeDefined();

    fireEvent.click(screen.getByText("Competencies"));
    expect(screen.queryByRole("link", { name: "Engineering" })).toBeNull();
  });
});
