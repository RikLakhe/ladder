import { getVersionHistory } from "../../lib/mock/document-versions";
import { VersionHistoryList } from "../../components/VersionHistoryList";

export default async function VersionHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ entityType?: string; entityId?: string }>;
}) {
  const { entityType, entityId } = await searchParams;
  const entries =
    entityType && entityId ? getVersionHistory(entityType, entityId) : [];
  return (
    <div style={{ padding: "20px 24px" }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
        Version History
        {entityType && entityId ? ` — ${entityType} ${entityId}` : ""}
      </h1>
      <VersionHistoryList entries={entries} />
    </div>
  );
}
