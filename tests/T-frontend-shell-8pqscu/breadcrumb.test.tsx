import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../../src/components/Breadcrumb";

describe("B-2: Breadcrumb reflects current route position", () => {
  it("renders a Home crumb plus one crumb per path segment on a non-home route", () => {
    render(<Breadcrumb pathname="/competencies/c1" />);

    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("competencies")).toBeDefined();
    expect(screen.getByText("c1")).toBeDefined();
  });

  it("renders nothing on the home route", () => {
    render(<Breadcrumb pathname="/" />);

    expect(screen.queryByRole("navigation", { name: /breadcrumb/i })).toBeNull();
  });
});
