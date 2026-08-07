export type MockTraining = {
  competencyId: string;
  summary: string;
};

const FIXTURES: MockTraining[] = [];

const DEFAULT_SUMMARY =
  "Training materials for this competency are being migrated — mock preview shown pending the real training API.";

export function getTrainingForCompetency(competencyId: string): MockTraining | null {
  const fixture = FIXTURES.find((f) => f.competencyId === competencyId);
  if (fixture) return fixture;
  return { competencyId, summary: DEFAULT_SUMMARY };
}
