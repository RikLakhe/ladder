import { NextResponse } from "next/server";
import { getStandardsForPrimaryFunction } from "../../../../../lib/standards";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pfId: string }> }
) {
  const { pfId } = await params;
  const level = new URL(request.url).searchParams.get("level") ?? undefined;
  const standards = await getStandardsForPrimaryFunction(DATABASE_URL, pfId, level);
  return NextResponse.json(standards);
}
