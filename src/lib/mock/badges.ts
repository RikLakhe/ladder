export type MockInstrument = {
  id: string;
  rows: { key: string; text: string }[];
};

export type MockEvidenceRef = {
  instrument_id: string;
  row_key: string;
  note?: string;
};

export type MockBadge = {
  id: string;
  competencyId: string;
  level: string;
  badge_code: string;
  name: string;
  tier: string;
  certifies: string;
  completion_bar: string;
  verifier_role: string;
  cosigner_required: boolean;
  evidence_required: MockEvidenceRef[];
};

const INSTRUMENTS: MockInstrument[] = [
  {
    id: "instr-001",
    rows: [
      { key: "row-a", text: "Completed foundational assessment." },
      { key: "row-b", text: "Peer review sign-off received." },
    ],
  },
];

const FIXTURES: MockBadge[] = [
  {
    id: "demo-p3",
    competencyId: "demo",
    level: "P3",
    badge_code: "DEMO-P3",
    name: "P3 Demo Badge",
    tier: "Bronze",
    certifies: "Demonstrates P3 core skills.",
    completion_bar: "2 of 3 tasks complete",
    verifier_role: "Engineering Lead",
    cosigner_required: true,
    evidence_required: [{ instrument_id: "instr-001", row_key: "row-a" }],
  },
  {
    id: "demo-p4",
    competencyId: "demo",
    level: "P4",
    badge_code: "DEMO-P4",
    name: "P4 Demo Badge",
    tier: "Silver",
    certifies: "Demonstrates P4 core skills.",
    completion_bar: "0 of 2 tasks complete",
    verifier_role: "Principal Engineer",
    cosigner_required: false,
    evidence_required: [{ instrument_id: "instr-999", row_key: "row-x" }],
  },
];

export function getBadges(filters?: { level?: string }): MockBadge[] {
  let result = FIXTURES;
  if (filters?.level) {
    result = result.filter((b) => b.level === filters.level);
  }
  return result;
}

export function getBadgeByCode(badge_code: string): MockBadge | null {
  return FIXTURES.find((b) => b.badge_code === badge_code) ?? null;
}

export function getBadgeById(id: string): MockBadge | null {
  return FIXTURES.find((b) => b.id === id) ?? null;
}

export function resolveEvidence(
  ref: MockEvidenceRef
): { text: string } | { broken: true } {
  const instrument = INSTRUMENTS.find((i) => i.id === ref.instrument_id);
  if (!instrument) return { broken: true };
  const row = instrument.rows.find((r) => r.key === ref.row_key);
  if (!row) return { broken: true };
  return { text: row.text };
}
