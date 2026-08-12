import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetencyById } from "../../../lib/competencies";
import { getPrimaryFunctionsForCompetency } from "../../../lib/primary-functions";
import { getStandardsForPrimaryFunction } from "../../../lib/standards";
import { getAssessmentForCompetency } from "../../../lib/mock/assessments";
import { getTrainingForCompetency } from "../../../lib/mock/training";
import { getEvidenceForCompetency } from "../../../lib/mock/evidence";
import { getBadgesForCompetency } from "../../../lib/mock/badges";
import { CompetencyTabs } from "../../../components/CompetencyTabs";
import { EmptyState } from "../../../components/EmptyState";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function CompetencyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const competency = await getCompetencyById(DATABASE_URL, id);
  if (!competency) {
    notFound();
  }

  const primaryFunctions = await getPrimaryFunctionsForCompetency(DATABASE_URL, id);
  const standardsByPf = await Promise.all(
    primaryFunctions.map((pf) => getStandardsForPrimaryFunction(DATABASE_URL, pf.id))
  );
  const assessment = getAssessmentForCompetency(id);
  const training = getTrainingForCompetency(id);
  const evidence = getEvidenceForCompetency(id);
  const badges = getBadgesForCompetency(id);

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 4 }}>
          <h1 style={{ margin: 0 }}>{competency.name}</h1>
          <Link
            href={`/version-history?entityType=competency&entityId=${id}`}
            style={{ fontSize: 12.5, color: "var(--text-3)", whiteSpace: "nowrap" }}
          >
            View History
          </Link>
        </div>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-3)" }}>
          {competency.domains.join(", ")}
        </p>
      </div>

      {/* Primary functions */}
      <div style={{ marginBottom: 8 }}>
        <p className="section-label" style={{ margin: "0 0 10px" }}>Primary Functions</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {primaryFunctions.map((pf) => (
            <div key={pf.id} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}>
              <Link href={`/primary-functions/${pf.id}`} style={{ fontWeight: 500, flex: 1 }}>
                {pf.name}
              </Link>
              <Link
                href={`/primary-functions/${pf.id}/standard`}
                style={{ fontSize: 12, color: "var(--text-3)" }}
              >
                Standard →
              </Link>
            </div>
          ))}
        </div>
      </div>
      <CompetencyTabs
        standard={
          primaryFunctions.some((_, i) => standardsByPf[i].length > 0) ? (
            <ul>
              {primaryFunctions.map((pf, i) => (
                <li key={pf.id}>
                  <Link href={`/primary-functions/${pf.id}/standard`}>{pf.name}</Link>
                  {standardsByPf[i].map((standard) => (
                    <p key={standard.level}>
                      {standard.level}: {standard.body}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState variant="no-standard" />
          )
        }
        assessment={
          badges.length > 0 ? (
            <ul>
              {badges.map((badge) => (
                <li key={badge.id}>
                  <Link href={`/badges/${badge.badge_code}`}>
                    {badge.badge_code} — {badge.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : assessment ? (
            <p>{assessment.summary}</p>
          ) : (
            <EmptyState variant="no-assessment" />
          )
        }
        training={training ? <p>{training.summary}</p> : <EmptyState variant="no-training" />}
        evidence={evidence ? <p>{evidence.summary}</p> : <EmptyState variant="no-evidence" />}
      />
    </div>
  );
}
