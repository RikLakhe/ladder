import Link from "next/link";
import { getAllStandardsGrouped } from "../../lib/standards";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const LEVEL_ORDER = ["P2", "P3", "P4", "P5", "P6", "P7"];

type Transition = {
  pfId: string;
  pfName: string;
  fromLevel: string;
  toLevel: string;
  before: string;
  after: string;
};

export default async function TransitionGuidePage() {
  const rows = await getAllStandardsGrouped(DATABASE_URL);

  const byCompetency = new Map<
    string,
    { competencyName: string; transitions: Transition[] }
  >();

  const byPf = new Map<
    string,
    { competencyId: string; competencyName: string; pfName: string; levels: Map<string, string> }
  >();
  for (const row of rows) {
    const pf = byPf.get(row.pfId) ?? {
      competencyId: row.competencyId,
      competencyName: row.competencyName,
      pfName: row.pfName,
      levels: new Map<string, string>(),
    };
    pf.levels.set(row.level, row.body);
    byPf.set(row.pfId, pf);
  }

  for (const [pfId, pf] of byPf) {
    for (let i = 0; i < LEVEL_ORDER.length - 1; i++) {
      const fromLevel = LEVEL_ORDER[i];
      const toLevel = LEVEL_ORDER[i + 1];
      const before = pf.levels.get(fromLevel);
      const after = pf.levels.get(toLevel);
      if (!before || !after) continue;

      const bucket = byCompetency.get(pf.competencyId) ?? {
        competencyName: pf.competencyName,
        transitions: [],
      };
      bucket.transitions.push({ pfId, pfName: pf.pfName, fromLevel, toLevel, before, after });
      byCompetency.set(pf.competencyId, bucket);
    }
  }

  return (
    <main>
      <h1>Transition Guide</h1>
      {Array.from(byCompetency.values()).map((bucket) => (
        <section key={bucket.competencyName}>
          <h2>{bucket.competencyName}</h2>
          <ul>
            {bucket.transitions.map((t) => (
              <li key={`${t.pfId}-${t.fromLevel}-${t.toLevel}`}>
                <details>
                  <summary>
                    <Link href={`/primary-functions/${t.pfId}?level=${t.toLevel}`}>
                      {t.pfName}
                    </Link>
                    {`: ${t.fromLevel} → ${t.toLevel}`}
                  </summary>
                  <p>{`Before: ${t.before}`}</p>
                  <p>{`After: ${t.after}`}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
