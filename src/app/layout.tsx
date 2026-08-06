import { Shell } from "../components/Shell";
import { getCompetenciesWithPfCount } from "../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);

  return (
    <html lang="en">
      <body>
        <Shell competencies={competencies}>{children}</Shell>
      </body>
    </html>
  );
}
