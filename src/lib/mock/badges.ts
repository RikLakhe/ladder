export type MockBadge = {
  id: string;
  competencyId: string;
  level: string;
  badge_code: string;
  name: string;
  tier: string;
  certifies: string;
};

const FIXTURES: MockBadge[] = [
  {
    id: "demo-p3",
    competencyId: "demo",
    level: "P3",
    badge_code: "DEMO-P3",
    name: "P3 Demo Badge",
    tier: "Bronze",
    certifies: "Demonstrates P3 core skills.",
  },
  {
    id: "demo-p4",
    competencyId: "demo",
    level: "P4",
    badge_code: "DEMO-P4",
    name: "P4 Demo Badge",
    tier: "Silver",
    certifies: "Demonstrates P4 core skills.",
  },
];

export function getBadges(filters?: { level?: string }): MockBadge[] {
  let result = FIXTURES;
  if (filters?.level) {
    result = result.filter((b) => b.level === filters.level);
  }
  return result;
}

export function getBadgeById(id: string): MockBadge | null {
  return FIXTURES.find((b) => b.id === id) ?? null;
}
