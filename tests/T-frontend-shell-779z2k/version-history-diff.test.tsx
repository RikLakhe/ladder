import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { VersionHistoryList } from "../../src/components/VersionHistoryList";
import type { MockDocumentVersion } from "../../src/lib/mock/document-versions";

afterEach(cleanup);

const ENTRY_WITH_DIFF: MockDocumentVersion = {
  id: "v2",
  entityType: "competency",
  entityId: "competency-1",
  versionNumber: 2,
  changeNote: "Updated description",
  changedBy: "alice@example.com",
  createdAt: "2026-08-10T10:00:00Z",
  oldSnapshot: { name: "Leadership", description: "Old description" },
  newSnapshot: { name: "Leadership", description: "New description" },
};

describe("B-2: Expanding entry shows field-by-field diff with changed fields highlighted", () => {
  it("diff is hidden before expand", () => {
    render(<VersionHistoryList entries={[ENTRY_WITH_DIFF]} />);
    expect(screen.queryByRole("table", { name: "field diff" })).toBeNull();
  });

  it("clicking Expand shows old and new values for changed field", () => {
    render(<VersionHistoryList entries={[ENTRY_WITH_DIFF]} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand" }));
    screen.getByRole("table", { name: "field diff" });
    screen.getByText("Old description");
    screen.getByText("New description");
  });

  it("unchanged fields appear without changed-field highlight; changed field rows labelled changed", () => {
    render(<VersionHistoryList entries={[ENTRY_WITH_DIFF]} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand" }));
    const changedRows = screen.getAllByRole("row", { name: "changed field" });
    expect(changedRows.length).toBe(1);
    const unchangedRows = screen.getAllByRole("row", { name: "unchanged field" });
    expect(unchangedRows.length).toBe(1);
  });

  it("clicking Collapse hides the diff", () => {
    render(<VersionHistoryList entries={[ENTRY_WITH_DIFF]} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand" }));
    screen.getByRole("table", { name: "field diff" });
    fireEvent.click(screen.getByRole("button", { name: "Collapse" }));
    expect(screen.queryByRole("table", { name: "field diff" })).toBeNull();
  });
});
