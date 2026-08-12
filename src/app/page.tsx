import Link from "next/link";
import { getCompetenciesWithPfCount } from "../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const COMPETENCY_ACCENT: Record<string, string> = {
  "Delivery":                            "var(--p3)",
  "Feedback, Communication & Collaboration": "var(--p5)",
  "Leadership":                          "var(--p6)",
  "Strategic Impact":                    "var(--p7)",
  "Technical Skill":                     "var(--p4)",
};

export default async function HomePage() {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ marginBottom: 8 }}>Engineering Competency Framework</h1>
        <p style={{ fontSize: 15, maxWidth: 560, color: "var(--text-2)" }}>
          The performance standard for Leapfrog engineers. Browse expectations across all
          levels and domains — from P2 to P7.
        </p>
      </div>

      {/* Level legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 500, marginRight: 4 }}>Levels</span>
        {(["P2","P3","P4","P5","P6","P7"] as const).map((level) => (
          <span key={level} style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "#fff",
            background: `var(--${level.toLowerCase()})`,
            padding: "2px 8px",
            borderRadius: 4,
          }}>{level}</span>
        ))}
      </div>

      {/* Competency cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}>
        {competencies.map((competency) => {
          const accent = COMPETENCY_ACCENT[competency.name] ?? "var(--accent)";
          return (
            <Link
              key={competency.id}
              href={`/competencies/${competency.id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <article style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "20px 20px 18px",
                boxShadow: "var(--shadow-sm)",
                borderTop: `3px solid ${accent}`,
                transition: "box-shadow .15s, transform .15s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <h2 style={{ margin: "0 0 6px", fontSize: "1rem", color: "var(--text-1)" }}>
                  {competency.name}
                </h2>
                <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--text-3)" }}>
                  {competency.domains?.join(", ")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-2)",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "2px 8px",
                  }}>
                    {competency.pfCount} {competency.pfCount === 1 ? "function" : "functions"}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
