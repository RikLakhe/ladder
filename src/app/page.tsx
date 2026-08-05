import Link from "next/link";
import { getCompetenciesWithPfCount } from "../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function HomePage() {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);

  return (
    <main>
      {competencies.map((competency) => (
        <article key={competency.id}>
          <Link href={`/competencies/${competency.id}`}>
            <h2>{competency.name}</h2>
          </Link>
          <p>{competency.pfCount} primary functions</p>
        </article>
      ))}
    </main>
  );
}
