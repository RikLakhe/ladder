import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FACollapsible from "../../src/components/FACollapsible";

describe("B-4: FACollapsible renders collapsed by default; click expands", () => {
  it("hides content text by default and shows it after clicking the toggle", () => {
    render(<FACollapsible content="This is the FA content text." />);

    expect(screen.queryByText("This is the FA content text.")).toBeNull();

    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);

    expect(screen.getByText("This is the FA content text.")).toBeDefined();
  });
});
