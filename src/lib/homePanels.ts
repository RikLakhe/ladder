export type FocusPanelContent = { title: string; description: string };
export type WhatsNextContent = { title: string; description: string };

const FOCUS_BY_LEVEL: Record<string, FocusPanelContent> = {
  L1: { title: "Focus: Foundations", description: "Build core skills in your primary function." },
  L2: { title: "Focus: Ownership", description: "Take ownership of small, well-scoped tasks." },
};

const WHATS_NEXT_BY_LEVEL: Record<string, WhatsNextContent> = {
  L1: { title: "What's Next", description: "Aim for L2 by demonstrating independent delivery." },
  L2: { title: "What's Next", description: "Aim for L3 by mentoring newer teammates." },
};

export function getFocusPanel(level: string | null): FocusPanelContent | null {
  if (!level) return null;
  return FOCUS_BY_LEVEL[level] ?? null;
}

export function getWhatsNextPanel(level: string | null): WhatsNextContent | null {
  if (!level) return null;
  return WHATS_NEXT_BY_LEVEL[level] ?? null;
}
