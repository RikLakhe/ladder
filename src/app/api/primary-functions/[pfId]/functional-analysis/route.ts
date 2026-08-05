import { NextResponse } from "next/server";
import { getFunctionalAnalysesForPrimaryFunction } from "../../../../../lib/functional-analyses";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pfId: string }> }
) {
  const { pfId } = await params;
  const analyses = await getFunctionalAnalysesForPrimaryFunction(DATABASE_URL, pfId);
  return NextResponse.json(analyses);
}
