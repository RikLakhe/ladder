import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetencyById } from "../../../lib/competencies";
import { getPrimaryFunctionsForCompetency } from "../../../lib/primary-functions";

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

  return (
    <main>
      <h1>{competency.name}</h1>
      <ul>
        {primaryFunctions.map((pf) => (
          <li key={pf.id}>
            <Link href={`/primary-functions/${pf.id}/standard`}>{pf.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
