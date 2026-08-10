import { getBadgeByCode, resolveEvidence } from "../../../lib/badges";
import { getBadgeByCode as getMockBadgeByCode, resolveEvidence as resolveMockEvidence } from "../../../lib/mock/badges";
import { BadgeStatusLegend } from "../../../components/BadgeStatusLegend";

export default async function BadgeDetailPage({
  params,
}: {
  params: Promise<{ badgeCode: string }>;
}) {
  const { badgeCode } = await params;
  const DATABASE_URL = process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

  // Try to fetch from database first
  let badge = null;
  try {
    badge = await getBadgeByCode(DATABASE_URL, badgeCode);
  } catch (error) {
    // If database query fails, try mock data
    console.error("Database query failed, falling back to mock data:", error);
  }

  // Fall back to mock data if not found in database (for backward compatibility)
  if (!badge) {
    const mockBadge = getMockBadgeByCode(badgeCode);
    if (mockBadge) {
      badge = {
        badgeCode: mockBadge.badge_code,
        name: mockBadge.name,
        tier: mockBadge.tier,
        level: mockBadge.level,
        certifies: mockBadge.certifies,
        completionBar: mockBadge.completion_bar,
        verifierRole: mockBadge.verifier_role,
        cosignerRequired: mockBadge.cosigner_required,
        evidenceRequired: mockBadge.evidence_required,
      };
    }
  }

  if (!badge) {
    return <main><p>Badge not found.</p></main>;
  }

  // Resolve evidence references
  const resolvedEvidence = badge.evidenceRequired
    ? badge.evidenceRequired.map((ref) => {
        const result = resolveMockEvidence(ref);
        return { ref, result };
      })
    : [];

  return (
    <main>
      <h1>{badge.name}</h1>
      <code>{badge.badgeCode}</code>
      <p>{badge.tier}</p>
      <p>{badge.certifies}</p>
      <p>{badge.completionBar}</p>
      <p>{badge.verifierRole}</p>
      {badge.cosignerRequired && (
        <span data-testid="cosigner-indicator">Co-signer required</span>
      )}
      <ul>
        {resolvedEvidence.map((item, i) => {
          if ("broken" in item.result) {
            return <li key={i}>⚠ evidence link broken</li>;
          }
          return <li key={i}>{item.result.text}</li>;
        })}
      </ul>
      <BadgeStatusLegend />
    </main>
  );
}
