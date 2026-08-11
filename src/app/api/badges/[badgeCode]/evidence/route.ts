import { NextResponse } from "next/server";
import { getEvidenceForBadge, getBadgeByCode } from "../../../../../lib/badges";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ badgeCode: string }> }
) {
  const { badgeCode } = await params;
  const badge = await getBadgeByCode(DATABASE_URL, badgeCode);
  if (!badge) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const evidence = await getEvidenceForBadge(DATABASE_URL, badgeCode);
  return NextResponse.json(evidence);
}
