import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LevelBar } from "../../src/components/LevelBar";

beforeEach(() => {
  sessionStorage.clear();
});
afterEach(cleanup);

describe("B-3: LevelBar shows a level-set modal once per session", () => {
  it("shows the modal on first mount, and picking a level closes it and updates the indicator", () => {
    render(<LevelBar />);

    expect(screen.getByRole("dialog", { name: /set your level/i })).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "L3" }));

    expect(screen.queryByRole("dialog", { name: /set your level/i })).toBeNull();
    expect(screen.getByTestId("current-level-indicator").textContent).toBe("L3");
    expect(sessionStorage.getItem("ladder-level")).toBe("L3");
  });

  it("does not show the modal on a later mount once a level is already stored", () => {
    sessionStorage.setItem("ladder-level", "L2");

    render(<LevelBar />);

    expect(screen.queryByRole("dialog", { name: /set your level/i })).toBeNull();
    expect(screen.getByTestId("current-level-indicator").textContent).toBe("L2");
  });
});
