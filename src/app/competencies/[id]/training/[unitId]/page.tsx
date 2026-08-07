import { getTrainingUnitById, getTrainingUnitsForCompetency } from "../../../../../lib/mock/training";
import { TrainingUnitView } from "../../../../../components/TrainingUnitView";

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const { id, unitId } = await params;
  const unit = getTrainingUnitById(id, unitId);

  if (!unit) {
    return (
      <main>
        <p>Training unit not found.</p>
      </main>
    );
  }

  const allUnits = getTrainingUnitsForCompetency(id);

  return (
    <main>
      <TrainingUnitView unit={unit} allUnits={allUnits} />
    </main>
  );
}
