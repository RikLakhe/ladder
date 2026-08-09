import { NextRequest, NextResponse } from "next/server";
import { getCompetenciesWithPfCount } from "../../../lib/competencies";
import { getAllPrimaryFunctions } from "../../../lib/primary-functions";
import { getBadges } from "../../../lib/mock/badges";
import { buildSearchIndex, queryIndex } from "../../../lib/search";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return NextResponse.json([]);

  const [competencies, primaryFunctions] = await Promise.all([
    getCompetenciesWithPfCount(DATABASE_URL),
    getAllPrimaryFunctions(DATABASE_URL),
  ]);
  const index = buildSearchIndex({ competencies, primaryFunctions, badges: getBadges() });
  const results = queryIndex(index, q);
  return NextResponse.json(results);
}
