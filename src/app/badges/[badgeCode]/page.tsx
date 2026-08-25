import { getBadgeByCode, getEvidenceForBadge } from "../../../lib/badges";
import { BadgeStatusLegend } from "../../../components/BadgeStatusLegend";
import { TierChip } from "../../../components/TierChip";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function BadgeDetailPage({
  params,
}: {
  params: Promise<{ badgeCode: string }>;
}) {
  const { badgeCode } = await params;

  const badge = await getBadgeByCode(DATABASE_URL, badgeCode);

  if (!badge) {
    return <main><p>Badge not found.</p></main>;
  }

  const evidence = await getEvidenceForBadge(DATABASE_URL, badgeCode);

  return (
    <main>
      <h1>{badge.name}</h1>
      <code>{badge.badgeCode}</code>
      <TierChip tier={badge.tier} />
      <p>{badge.certifies}</p>
      <p>{badge.completionBar}</p>
      <p>{badge.verifierRole}</p>
      {badge.cosignerRequired && (
        <span data-testid="cosigner-indicator" title="Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency.">Co-signer required</span>
      )}
      {evidence.length > 0 && (
        <section>
          <h2>Assessed via</h2>
          <ul>
            {evidence.map((entry, i) =>
              entry.resolved ? (
                <li key={i}>
                  <details>
                    <summary data-testid="evidence-resolved">{entry.rowText ?? `${entry.instrumentId} / ${entry.rowKey}`}</summary>
                  </details>
                </li>
              ) : (
                <li key={i}>
                  <span data-testid="evidence-broken">evidence link broken — {entry.instrumentId} / {entry.rowKey}</span>
                </li>
              )
            )}
          </ul>
        </section>
      )}
      <BadgeStatusLegend />
    </main>
  );
}
