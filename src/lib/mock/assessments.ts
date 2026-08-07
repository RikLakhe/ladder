export type MockAssessment = {
  competencyId: string;
  summary: string;
};

const FIXTURES: MockAssessment[] = [];

const DEFAULT_SUMMARY =
  "Assessment tasks for this competency are being migrated — mock preview shown pending the real assessment API.";

export function getAssessmentForCompetency(competencyId: string): MockAssessment | null {
  const fixture = FIXTURES.find((f) => f.competencyId === competencyId);
  if (fixture) return fixture;
  return { competencyId, summary: DEFAULT_SUMMARY };
}
