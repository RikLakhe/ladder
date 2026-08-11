import { NextRequest, NextResponse } from "next/server";
import { getTrainingUnitsForCompetencyAndLevel } from "../../../../../lib/training-units";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: competencyId } = await params;
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") || "P2";

  try {
    const units = await getTrainingUnitsForCompetencyAndLevel(
      DATABASE_URL,
      competencyId,
      level
    );
    return NextResponse.json(units);
  } catch (error) {
    console.error("Failed to fetch training units:", error);
    return NextResponse.json(
      { error: "Failed to fetch training units" },
      { status: 500 }
    );
  }
}
