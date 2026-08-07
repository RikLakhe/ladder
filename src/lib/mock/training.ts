export type TrainingUnitType =
  | "concept_notes"
  | "guided_exercise"
  | "autonomous_project"
  | "onboarding"
  | "learning_path"
  | "reference_card";

export type MockTrainingUnit = {
  id: string;
  competencyId: string;
  type: TrainingUnitType;
  level: string;
  sequenceOrder: number;
  content: string;
  prereqs: string[];
};

const FIXTURES: MockTrainingUnit[] = [
  {
    id: "tu-cn-1",
    competencyId: "demo",
    type: "concept_notes",
    level: "P3",
    sequenceOrder: 1,
    content: "Understand the core principles of the domain.",
    prereqs: [],
  },
  {
    id: "tu-ge-2",
    competencyId: "demo",
    type: "guided_exercise",
    level: "P3",
    sequenceOrder: 2,
    content: "Complete the guided kata applying the concepts from unit 1.",
    prereqs: ["tu-cn-1"],
  },
  {
    id: "tu-ge-bad",
    competencyId: "demo",
    type: "guided_exercise",
    level: "P3",
    sequenceOrder: 3,
    content: "A unit with a forward prereq (seeding-issue simulation).",
    prereqs: ["tu-ap-4"],
  },
  {
    id: "tu-ap-4",
    competencyId: "demo",
    type: "autonomous_project",
    level: "P4",
    sequenceOrder: 4,
    content: "Deliver a real feature using the skills from earlier units.",
    prereqs: ["tu-ge-2"],
  },
  {
    id: "tu-on-5",
    competencyId: "demo",
    type: "onboarding",
    level: "P2",
    sequenceOrder: 1,
    content: "Read the team handbook and complete the onboarding checklist.",
    prereqs: [],
  },
  {
    id: "tu-lp-6",
    competencyId: "demo",
    type: "learning_path",
    level: "P3",
    sequenceOrder: 5,
    content: "Full P3 learning path: concepts → guided exercise → project.",
    prereqs: ["tu-cn-1", "tu-ge-2"],
  },
];

export function getTrainingUnitsForCompetency(
  competencyId: string,
  level?: string
): MockTrainingUnit[] {
  return FIXTURES.filter(
    (u) => u.competencyId === competencyId && (!level || u.level === level)
  );
}

export type MockTraining = { competencyId: string; summary: string };

const DEFAULT_SUMMARY =
  "Training materials for this competency are being migrated — mock preview shown pending the real training API.";

export function getTrainingForCompetency(competencyId: string): MockTraining | null {
  return { competencyId, summary: DEFAULT_SUMMARY };
}

export function getTrainingUnitById(
  competencyId: string,
  unitId: string
): MockTrainingUnit | null {
  return (
    FIXTURES.find((u) => u.competencyId === competencyId && u.id === unitId) ?? null
  );
}
