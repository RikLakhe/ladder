import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import VersionHistoryPage from "../../src/app/version-history/page";

afterEach(cleanup);

describe("B-2: version-history page renders mock list for a known entity", () => {
  it("renders VersionHistoryList entries for competency-1 (has fixture data)", async () => {
    const jsx = await VersionHistoryPage({
      searchParams: Promise.resolve({ entityType: "competency", entityId: "competency-1" }),
    });
    render(jsx);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(1);
    // newest-first: most recent entry date appears before older ones
    expect(items[0].textContent).toContain("2026-08-10");
  });

  it("renders empty state for an entity with no fixture entries", async () => {
    const jsx = await VersionHistoryPage({
      searchParams: Promise.resolve({ entityType: "competency", entityId: "no-such-entity" }),
    });
    render(jsx);
    expect(screen.queryByRole("list")).toBeNull();
    screen.getByText(/no history yet/i);
  });
});
