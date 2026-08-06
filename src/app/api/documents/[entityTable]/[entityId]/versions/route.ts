import { NextResponse } from "next/server";
import { getDocumentVersions } from "../../../../../../lib/document-versions";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ entityTable: string; entityId: string }> }
) {
  const { entityTable, entityId } = await params;
  const versions = await getDocumentVersions(DATABASE_URL, entityTable, entityId);
  return NextResponse.json(versions);
}
