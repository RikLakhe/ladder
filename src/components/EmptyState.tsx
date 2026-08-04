export type EmptyStateVariant = "no-standard" | "no-badge" | "no-training";

const COPY: Record<EmptyStateVariant, string> = {
  "no-standard": "No standard defined for this level yet.",
  "no-badge": "No badge available for this level yet.",
  "no-training": "No training assigned for this level yet.",
};

export function EmptyState({ variant }: { variant: EmptyStateVariant }) {
  const copy = COPY[variant] ?? "Nothing here yet.";
  return <p>{copy}</p>;
}
