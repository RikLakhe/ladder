export type EmptyStateVariant =
  | "no-standard"
  | "no-badge"
  | "no-training"
  | "no-assessment"
  | "no-evidence"
  | "no-simulated-training";

const COPY: Record<EmptyStateVariant, string> = {
  "no-standard": "No standard defined for this level yet.",
  "no-badge": "No badge available for this level yet.",
  "no-training": "No training assigned for this level yet.",
  "no-assessment": "No assessment defined for this competency yet.",
  "no-evidence": "No evidence recorded for this competency yet.",
  "no-simulated-training":
    "Growth at this level is demonstrated through real project scope, not simulated exercises.",
};

export function EmptyState({ variant }: { variant: EmptyStateVariant }) {
  const copy = COPY[variant] ?? "Nothing here yet.";
  return <p>{copy}</p>;
}
