import { NextResponse } from "next/server";
import { getCompetenciesWithPfCount } from "../../../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET() {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);
  return NextResponse.json(
    competencies.map((c) => ({
      id: c.id,
      name: c.name,
      primaryFunctionCount: c.pfCount,
    }))
  );
}
