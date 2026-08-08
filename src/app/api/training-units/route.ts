import { NextResponse } from "next/server";
import { getTrainingUnits } from "../../../lib/training-units";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export async function GET() {
  const units = await getTrainingUnits(DATABASE_URL);
  return NextResponse.json(units);
}
