import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { VersionHistoryList } from "../../src/components/VersionHistoryList";
import type { MockDocumentVersion } from "../../src/lib/mock/document-versions";

afterEach(cleanup);

const ENTRIES: MockDocumentVersion[] = [
  {
    id: "v2",
    entityType: "competency",
    entityId: "competency-1",
    versionNumber: 2,
    changeNote: "Updated description",
    changedBy: "alice@example.com",
    createdAt: "2026-08-10T10:00:00Z",
    oldSnapshot: { name: "Leadership", description: "Old description" },
    newSnapshot: { name: "Leadership", description: "Updated description" },
  },
  {
    id: "v1",
    entityType: "competency",
    entityId: "competency-1",
    versionNumber: 1,
    changeNote: "Initial save",
    changedBy: "bob@example.com",
    createdAt: "2026-08-09T08:00:00Z",
    oldSnapshot: null,
    newSnapshot: { name: "Leadership", description: "Old description" },
  },
];

describe("B-1: VersionHistoryList renders entries newest-first and empty state", () => {
  it("renders entries in newest-first order with date, editor, change-note", () => {
    render(<VersionHistoryList entries={ENTRIES} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    // first item is newest
    expect(items[0].textContent).toContain("Updated description");
    expect(items[0].textContent).toContain("alice@example.com");
    expect(items[0].textContent).toContain("2026-08-10");
    // second item is older
    expect(items[1].textContent).toContain("Initial save");
    expect(items[1].textContent).toContain("bob@example.com");
  });

  it("renders EmptyState no-history-yet when entries array is empty", () => {
    render(<VersionHistoryList entries={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
    screen.getByText(/no history yet/i);
  });
});
