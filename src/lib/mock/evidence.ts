export type MockEvidence = {
  competencyId: string;
  summary: string;
};

const FIXTURES: MockEvidence[] = [];

export function getEvidenceForCompetency(competencyId: string): MockEvidence | null {
  return FIXTURES.find((f) => f.competencyId === competencyId) ?? null;
}
