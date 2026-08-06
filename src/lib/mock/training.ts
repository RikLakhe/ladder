export type MockTraining = {
  competencyId: string;
  summary: string;
};

const FIXTURES: MockTraining[] = [];

export function getTrainingForCompetency(competencyId: string): MockTraining | null {
  return FIXTURES.find((f) => f.competencyId === competencyId) ?? null;
}
