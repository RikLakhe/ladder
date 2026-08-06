export type MockAssessment = {
  competencyId: string;
  summary: string;
};

const FIXTURES: MockAssessment[] = [];

export function getAssessmentForCompetency(competencyId: string): MockAssessment | null {
  return FIXTURES.find((f) => f.competencyId === competencyId) ?? null;
}
