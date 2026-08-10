import Link from "next/link";
import { getFunctionalAnalysesForPrimaryFunction } from "../../../lib/functional-analyses";
import { getBadgesForPrimaryFunction } from "../../../lib/badges";
import { getStandardsForPrimaryFunction } from "../../../lib/standards";
import type { Level } from "../../../components/LevelTag";
import { BadgeCard } from "../../../components/BadgeCard";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const LEVELS: Level[] = ["P2", "P3", "P4", "P5", "P6", "P7"];

export default async function PrimaryFunctionPage({
  params,
  searchParams,
}: {
  params: Promise<{ pfId: string }>;
  searchParams: Promise<{ level?: string }>;
}) {
  const { pfId } = await params;
  const { level } = await searchParams;

  const [standards, analyses, badges] = await Promise.all([
    getStandardsForPrimaryFunction(DATABASE_URL, pfId, level),
    getFunctionalAnalysesForPrimaryFunction(DATABASE_URL, pfId),
    getBadgesForPrimaryFunction(DATABASE_URL, pfId, level),
  ]);

  const levelAnalyses = analyses.filter((analysis) => analysis.level === level);
  const levelBadges = badges;

  return (
    <main>
      <h1>Primary Function</h1>
      <div role="tablist">
        {LEVELS.map((tabLevel) => (
          <Link
            key={tabLevel}
            href={`?level=${tabLevel}`}
            role="tab"
            aria-selected={tabLevel === level}
          >
            {tabLevel}
          </Link>
        ))}
      </div>
      <section>
        <h2>Standard</h2>
        {standards.length === 0 ? (
          <p>No standard defined for this level.</p>
        ) : (
          <ul>
            {standards.map((standard) => (
              <li key={standard.level}>{standard.body}</li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Functional Analysis</h2>
        {levelAnalyses.length === 0 ? (
          <p>No functional analysis defined.</p>
        ) : (
          <ul>
            {levelAnalyses.map((analysis) => (
              <li key={analysis.level}>{analysis.body}</li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Badges</h2>
        {levelBadges.length === 0 ? (
          <p>No badges defined.</p>
        ) : (
          <ul>
            {levelBadges.map((badge) => (
              <li key={badge.id}>
                {badge.badgeCode ? (
                  <Link href={`/primary-functions/${pfId}/badges/${badge.badgeCode}`}>
                    <BadgeCard badge={badge} />
                  </Link>
                ) : (
                  <BadgeCard badge={badge} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
