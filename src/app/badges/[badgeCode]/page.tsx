import { getBadgeByCode, resolveEvidence } from "../../../lib/mock/badges";
import { BadgeStatusLegend } from "../../../components/BadgeStatusLegend";

export default async function BadgeDetailPage({
  params,
}: {
  params: Promise<{ badgeCode: string }>;
}) {
  const { badgeCode } = await params;
  const badge = getBadgeByCode(badgeCode);

  if (!badge) {
    return <main><p>Badge not found.</p></main>;
  }

  return (
    <main>
      <h1>{badge.name}</h1>
      <p>{badge.certifies}</p>
      <p>{badge.completion_bar}</p>
      <p>{badge.verifier_role}</p>
      {badge.cosigner_required && (
        <span data-testid="cosigner-indicator">Co-signer required</span>
      )}
      <ul>
        {badge.evidence_required.map((ref, i) => {
          const result = resolveEvidence(ref);
          if ("broken" in result) {
            return <li key={i}>⚠ evidence link broken</li>;
          }
          return <li key={i}>{result.text}</li>;
        })}
      </ul>
      <BadgeStatusLegend />
    </main>
  );
}
