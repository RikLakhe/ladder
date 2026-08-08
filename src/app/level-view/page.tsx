import Link from "next/link";
import { getStandardsAtLevel } from "../../lib/standards";
import type { Level } from "../../components/LevelTag";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const LEVELS: Level[] = ["P2", "P3", "P4", "P5", "P6", "P7"];

export default async function LevelViewPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level: rawLevel } = await searchParams;
  const level = rawLevel ?? "P2";

  const rows = await getStandardsAtLevel(DATABASE_URL, level);

  const byCompetency = new Map<string, { competencyName: string; rows: typeof rows }>();
  for (const row of rows) {
    const bucket = byCompetency.get(row.competencyId);
    if (bucket) {
      bucket.rows.push(row);
    } else {
      byCompetency.set(row.competencyId, { competencyName: row.competencyName, rows: [row] });
    }
  }

  return (
    <main>
      <h1>Level View</h1>
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
      {Array.from(byCompetency.values()).map((bucket) => (
        <section key={bucket.competencyName}>
          <h2>{bucket.competencyName}</h2>
          <ul>
            {bucket.rows.map((row) => (
              <li key={row.pfId}>
                <Link href={`/primary-functions/${row.pfId}?level=${level}`}>{row.pfName}</Link>
                <p>{row.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
