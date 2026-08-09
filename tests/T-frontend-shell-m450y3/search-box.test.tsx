import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SearchBox } from "../../src/components/SearchBox";
import { buildSearchIndex } from "../../src/lib/search";

afterEach(cleanup);

const INDEX = buildSearchIndex({
  competencies: [{ id: "comp-1", name: "Software Engineering" }],
  primaryFunctions: [
    { id: "pf-1", name: "Backend Development" },
    { id: "pf-2", name: "Frontend Systems" },
  ],
  badges: [
    {
      id: "b-1",
      badge_code: "SE-P3",
      name: "SE Practitioner P3",
      certifies: "Demonstrates backend proficiency",
      level: "P3",
    },
  ],
});

describe("B-2: SearchBox shows results list on submit", () => {
  it("shows results with type, title, snippet after form submit", () => {
    render(<SearchBox index={INDEX} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "backend" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByRole("list")).toBeTruthy();
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Backend Development/i).length).toBeGreaterThan(0);
    screen.getByText(/primary-function/i);
  });

  it("shows badge result with snippet on exact code match", () => {
    render(<SearchBox index={INDEX} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "SE-P3" } });
    fireEvent.submit(input.closest("form")!);
    screen.getByText(/SE-P3/);
    screen.getByText(/backend proficiency/i);
  });

  it("shows no results message when query matches nothing", () => {
    render(<SearchBox index={INDEX} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "xyznotfound" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.queryByRole("list")).toBeNull();
    screen.getByText(/no results/i);
  });
});
