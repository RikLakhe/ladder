export type MockDocumentVersion = {
  id: string;
  entityType: string;
  entityId: string;
  versionNumber: number;
  changeNote: string;
  changedBy: string;
  createdAt: string;
  oldSnapshot: Record<string, string> | null;
  newSnapshot: Record<string, string>;
};

const FIXTURES: MockDocumentVersion[] = [
  {
    id: "v3",
    entityType: "competency",
    entityId: "competency-1",
    versionNumber: 3,
    changeNote: "Refined scope",
    changedBy: "carol@example.com",
    createdAt: "2026-08-10T14:00:00Z",
    oldSnapshot: { name: "Leadership", description: "Updated description" },
    newSnapshot: { name: "Leadership", description: "Refined scope description" },
  },
  {
    id: "v2",
    entityType: "competency",
    entityId: "competency-1",
    versionNumber: 2,
    changeNote: "Updated description",
    changedBy: "alice@example.com",
    createdAt: "2026-08-09T10:00:00Z",
    oldSnapshot: { name: "Leadership", description: "Initial description" },
    newSnapshot: { name: "Leadership", description: "Updated description" },
  },
  {
    id: "v1",
    entityType: "competency",
    entityId: "competency-1",
    versionNumber: 1,
    changeNote: "Initial save",
    changedBy: "bob@example.com",
    createdAt: "2026-08-08T08:00:00Z",
    oldSnapshot: null,
    newSnapshot: { name: "Leadership", description: "Initial description" },
  },
];

export function getVersionHistory(
  entityType: string,
  entityId: string
): MockDocumentVersion[] {
  return FIXTURES.filter(
    (v) => v.entityType === entityType && v.entityId === entityId
  ).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
