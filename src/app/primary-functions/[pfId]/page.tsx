import { getFunctionalAnalysesForPrimaryFunction } from "../../../lib/functional-analyses";
import { getBadgesForPrimaryFunction } from "../../../lib/badges";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function PrimaryFunctionPage({
  params,
}: {
  params: Promise<{ pfId: string }>;
}) {
  const { pfId } = await params;
  const analyses = await getFunctionalAnalysesForPrimaryFunction(DATABASE_URL, pfId);
  const badges = await getBadgesForPrimaryFunction(DATABASE_URL, pfId);

  return (
    <main>
      <h1>Primary Function</h1>
      <section>
        <h2>Functional Analysis</h2>
        {analyses.length === 0 ? (
          <p>No functional analysis defined.</p>
        ) : (
          <ul>
            {analyses.map((analysis) => (
              <li key={analysis.level}>
                <strong>{analysis.level}</strong>: {analysis.body}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Badges</h2>
        {badges.length === 0 ? (
          <p>No badges defined.</p>
        ) : (
          <ul>
            {badges.map((badge) => (
              <li key={badge.id}>
                {badge.name} ({badge.level})
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
