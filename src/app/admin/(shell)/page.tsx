import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const ENTITY_TYPES = [
  { slug: "competency", label: "Competency" },
  { slug: "primary-function", label: "Primary Function" },
  { slug: "standard", label: "Standard" },
  { slug: "badge", label: "Badge" },
  { slug: "instrument", label: "Instrument" },
  { slug: "training-unit", label: "Training Unit" },
  { slug: "functional-analysis", label: "Functional Analysis" },
];

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  if (!cookieStore.has("admin_session")) {
    redirect("/admin/login");
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Admin dashboard</h1>
      <ul>
        {ENTITY_TYPES.map(({ slug, label }) => (
          <li key={slug}>
            <Link href={`/admin/${slug}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
