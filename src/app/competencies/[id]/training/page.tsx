import { notFound } from "next/navigation";
import { getCompetencyById } from "../../../../lib/competencies";
import { getTrainingUnitsForCompetencyAndLevel } from "../../../../lib/training-units";
import { TrainingListView } from "../../../../components/TrainingListView";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function TrainingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ level?: string }>;
}) {
  const { id } = await params;
  const { level = "P4" } = await searchParams;

  const competency = await getCompetencyById(DATABASE_URL, id);
  if (!competency) {
    notFound();
  }

  const units = await getTrainingUnitsForCompetencyAndLevel(DATABASE_URL, id, level);

  return (
    <main>
      <h1>{competency.name} — Training ({level})</h1>
      <TrainingListView units={units} level={level} />
    </main>
  );
}
