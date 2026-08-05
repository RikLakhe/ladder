import { NextResponse } from "next/server";
import { getCompetencyById } from "../../../../../lib/competencies";
import { getPrimaryFunctionsForCompetency } from "../../../../../lib/primary-functions";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const competency = await getCompetencyById(DATABASE_URL, id);
  if (!competency) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const primaryFunctions = await getPrimaryFunctionsForCompetency(DATABASE_URL, id);
  return NextResponse.json(primaryFunctions);
}
