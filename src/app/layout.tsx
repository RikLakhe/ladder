import "./globals.css";
import { cookies } from "next/headers";
import { Shell } from "../components/Shell";
import { AdminBanner } from "../components/AdminBanner";
import { getCompetenciesWithPfCount } from "../lib/competencies";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const competencies = await getCompetenciesWithPfCount(DATABASE_URL);
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value ?? "";
  const isAdmin = !!adminSession;

  return (
    <html lang="en">
      <body>
        <Shell competencies={competencies} adminBanner={isAdmin ? <AdminBanner adminEmail={`Signed in as ${adminSession}`} /> : undefined}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
