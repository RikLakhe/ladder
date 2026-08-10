export function TierChip({ tier }: { tier: string | null | undefined }) {
  if (!tier) {
    return null;
  }

  return <span>{tier}</span>;
}
