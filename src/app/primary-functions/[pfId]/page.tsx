import Link from "next/link";
import { notFound } from "next/navigation";
import { getFunctionalAnalysesForPrimaryFunction } from "../../../lib/functional-analyses";
import { getBadgesForPrimaryFunction } from "../../../lib/badges";
import { getStandardsForPrimaryFunction } from "../../../lib/standards";
import { getPrimaryFunctionById, computeInapplicableLevels } from "../../../lib/primary-functions";
import { getTrainingUnitsForCompetencyAndLevel } from "../../../lib/training-units";
import { TrainingSection } from "../../../components/TrainingSection";
import { LevelTabStrip } from "../../../components/LevelTabStrip";
import { EmptyState } from "../../../components/EmptyState";
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
  const currentLevel = (level ?? "P2") as Level;

  const pf = await getPrimaryFunctionById(DATABASE_URL, pfId);
  if (!pf) notFound();

  const [allStandards, analyses, badges, trainingUnits] = await Promise.all([
    getStandardsForPrimaryFunction(DATABASE_URL, pfId),
    getFunctionalAnalysesForPrimaryFunction(DATABASE_URL, pfId),
    getBadgesForPrimaryFunction(DATABASE_URL, pfId, currentLevel),
    getTrainingUnitsForCompetencyAndLevel(DATABASE_URL, pf.competency_id, currentLevel),
  ]);

  const levelsWithStandards = [...new Set(allStandards.map((s) => s.level))] as Level[];
  const inapplicableLevels = computeInapplicableLevels(LEVELS, levelsWithStandards);

  const standards = allStandards.filter((s) => s.level === currentLevel);
  const levelAnalyses = analyses.filter((a) => a.level === currentLevel);

  return (
    <main>
      <h1>
        {pf.pf_number && <span>{pf.pf_number}</span>} {pf.name}
        {pf.domain_classification && <span>{pf.domain_classification}</span>}
      </h1>
      <Link href={`/competencies/${pf.competency_id}`}>Back to Competency</Link>
      <LevelTabStrip
        currentLevel={currentLevel}
        levels={LEVELS}
        inapplicableLevels={inapplicableLevels}
      />
      {inapplicableLevels.includes(currentLevel) ? (
        <EmptyState variant="not-applicable" />
      ) : (
        <>
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
            <h2>Training</h2>
            <TrainingSection units={trainingUnits} />
          </section>
          <section>
            <h2>Badges</h2>
            {badges.length === 0 ? (
              <p>No badges defined.</p>
            ) : (
              <ul>
                {badges.map((badge) => (
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
        </>
      )}
    </main>
  );
}
