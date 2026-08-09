import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import EditEntityClient from "./EditEntityClient";
import { getEntity } from "../../../../../../lib/mock/cms";
import type { EntityType } from "../../../../../../lib/mock/cms";

export default async function EditEntityPage({
  params,
}: {
  params: Promise<{ entityType: string; id: string }>;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.has("admin_session")) {
    redirect("/admin/login");
  }

  const { entityType, id } = await params;
  const entity = getEntity(entityType as EntityType, id);
  if (!entity) notFound();

  return (
    <main style={{ padding: 32 }}>
      <h1>Edit {entityType}</h1>
      <EditEntityClient entityType={entityType} entity={entity} />
    </main>
  );
}
