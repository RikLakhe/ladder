export interface BadgeDetailProps {
  badgeCode: string;
  name: string;
  tier: string;
  level: string;
  certifies: string;
  completionBar: string;
  verifierRole: string;
  cosignerRequired: boolean;
}

export function BadgeDetail({
  badgeCode,
  name,
  tier,
  level,
  certifies,
  completionBar,
  verifierRole,
  cosignerRequired,
}: BadgeDetailProps) {
  return (
    <div>
      <h1>{name}</h1>
      <code>{badgeCode}</code>
      <span>{tier}</span>
      <p>{level}</p>
      <p>{certifies}</p>
      <p>{completionBar}</p>
      <p>{verifierRole}</p>
      {cosignerRequired && (
        <span data-testid="cosigner-indicator">Co-signer required</span>
      )}
    </div>
  );
}
