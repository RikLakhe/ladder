import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const ENTITY_TYPES = [
  "competency",
  "primary-function",
  "standard",
  "assessment",
  "training-item",
  "badge",
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
        {ENTITY_TYPES.map((type) => (
          <li key={type}>
            <Link href={`/admin/${type}`}>{type}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
