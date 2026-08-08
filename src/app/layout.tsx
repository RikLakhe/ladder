import { cookies } from "next/headers";
import { Shell } from "../components/Shell";
import { AdminBanner } from "../components/AdminBanner";
import { getCompetenciesWithPfCount } from "../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_session");

  return (
    <html lang="en">
      <body>
        <Shell competencies={competencies} adminBanner={isAdmin ? <AdminBanner /> : undefined}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
