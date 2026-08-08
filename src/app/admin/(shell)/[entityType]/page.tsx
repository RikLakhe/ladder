import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { listEntities } from "../../../../lib/mock/cms";
import type { EntityType } from "../../../../lib/mock/cms";

export default async function EntityListPage({
  params,
}: {
  params: Promise<{ entityType: string }>;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.has("admin_session")) {
    redirect("/admin/login");
  }

  const { entityType } = await params;
  const entities = listEntities(entityType as EntityType);

  return (
    <main style={{ padding: 32 }}>
      <h1>{entityType}</h1>
      <Link href={`/admin/${entityType}/new`}>Add new</Link>
      <ul style={{ marginTop: 16 }}>
        {entities.map((entity) => (
          <li key={entity.id} style={{ marginBottom: 8 }}>
            {entity.name ?? entity.id}{" "}
            <Link href={`/admin/${entityType}/${entity.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
