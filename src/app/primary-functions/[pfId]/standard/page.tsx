import { getStandardsForPrimaryFunction } from "../../../../lib/standards";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function StandardPage({
  params,
  searchParams,
}: {
  params: Promise<{ pfId: string }>;
  searchParams: Promise<{ level?: string }>;
}) {
  const { pfId } = await params;
  const { level } = await searchParams;
  const standards = await getStandardsForPrimaryFunction(DATABASE_URL, pfId, level);

  return (
    <main>
      <h1>Standard</h1>
      {standards.length === 0 ? (
        <p>No standard defined for this level.</p>
      ) : (
        <ul>
          {standards.map((standard) => (
            <li key={standard.level}>
              <strong>{standard.level}</strong>: {standard.body}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
