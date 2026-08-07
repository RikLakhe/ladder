import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { HomePanels } from "../../src/components/HomePanels";

beforeEach(() => {
  sessionStorage.clear();
});
afterEach(cleanup);

describe("B-2: Focus panel and What's Next panel render only when their data source has content for the current session level", () => {
  it("renders both panels when the stored level has content", async () => {
    sessionStorage.setItem("ladder-level", "L1");
    render(<HomePanels />);

    await waitFor(() => {
      expect(screen.getByRole("region", { name: "Focus" })).toBeDefined();
      expect(screen.getByRole("region", { name: "What's Next" })).toBeDefined();
    });
  });

  it("renders neither panel when the stored level has no content", async () => {
    sessionStorage.setItem("ladder-level", "L5");
    render(<HomePanels />);

    await waitFor(() => {
      expect(screen.queryByRole("region", { name: "Focus" })).toBeNull();
      expect(screen.queryByRole("region", { name: "What's Next" })).toBeNull();
    });
  });
});
