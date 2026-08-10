import { NextResponse } from "next/server";
import { getBadgesForPrimaryFunction } from "../../../../../lib/badges";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pfId: string }> }
) {
  const { pfId } = await params;
  const url = new URL(request.url);
  const level = url.searchParams.get("level") ?? undefined;
  const badges = await getBadgesForPrimaryFunction(DATABASE_URL, pfId, level);
  return NextResponse.json(badges);
}
