import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetencyById } from "../../../lib/competencies";
import { getPrimaryFunctionsWithBadgeCount } from "../../../lib/primary-functions";
import { getFunctionalAnalysisForCompetency } from "../../../lib/functional-analyses";
import FACollapsible from "../../../components/FACollapsible";

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

  const primaryFunctions = await getPrimaryFunctionsWithBadgeCount(DATABASE_URL, id);
  const fa = await getFunctionalAnalysisForCompetency(DATABASE_URL, id);

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 4 }}>
          <h1 style={{ margin: 0 }}>{competency.name}</h1>
          <Link
            href={`/competencies/${id}/history`}
            style={{ fontSize: 12.5, color: "var(--text-3)", whiteSpace: "nowrap" }}
          >
            View History
          </Link>
        </div>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-3)" }}>
          {competency.domains.join(", ")}
        </p>
        {competency.description && (
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--text-2)" }}>
            {competency.description}
          </p>
        )}
      </div>

      {/* Functional Analysis toggle */}
      {fa && <FACollapsible content={fa.content} />}

      {/* Primary Functions */}
      <div style={{ marginBottom: 8 }}>
        <p className="section-label" style={{ margin: "0 0 10px" }}>Primary Functions</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {primaryFunctions.map((pf) => (
            <div
              key={pf.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-3)", minWidth: 48 }}>
                {pf.pf_number}
              </span>
              <Link href={`/primary-functions/${pf.id}`} style={{ fontWeight: 500, flex: 1 }}>
                {pf.name}
              </Link>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>
                {pf.domain_classification}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-2)",
                  minWidth: 20,
                  textAlign: "right",
                }}
              >
                {pf.badgeCount}
              </span>
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
    </div>
  );
}
