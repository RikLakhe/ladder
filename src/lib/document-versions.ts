import { Client } from "pg";

export type DocumentVersion = {
  changeNote: string;
  changedBy: string;
  createdAt: string;
};

export async function getDocumentVersions(
  connectionString: string,
  entityTable: string,
  entityId: string
): Promise<DocumentVersion[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT change_note, changed_by, created_at FROM document_versions WHERE entity_table = $1 AND entity_id = $2 ORDER BY created_at DESC",
      [entityTable, entityId]
    );
    return result.rows.map((row) => ({
      changeNote: row.change_note,
      changedBy: row.changed_by,
      createdAt: row.created_at.toISOString(),
    }));
  } finally {
    await client.end();
  }
}
