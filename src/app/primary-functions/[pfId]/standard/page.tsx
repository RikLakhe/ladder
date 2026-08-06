import { getStandardId, getStandardsForPrimaryFunction } from "../../../../lib/standards";
import { getDocumentVersions } from "../../../../lib/document-versions";

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

  const versions = level
    ? await (async () => {
        const standardId = await getStandardId(DATABASE_URL, pfId, level);
        return standardId ? getDocumentVersions(DATABASE_URL, "standards", standardId) : [];
      })()
    : [];

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
      {level && (
        <section>
          {versions.length === 0 ? (
            <p>No history for this document.</p>
          ) : (
            <>
              <p>Last updated: {versions[0].createdAt}</p>
              <ul>
                {versions.map((v, i) => (
                  <li key={i}>
                    {v.createdAt}: {v.changeNote}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </main>
  );
}
