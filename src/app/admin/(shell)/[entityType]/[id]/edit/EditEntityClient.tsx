"use client";

import { useRouter } from "next/navigation";
import { GenericEntityEditor } from "../../../../../../components/GenericEntityEditor";
import { editorConfigs } from "../../../../../../lib/admin-editor-config";
import type { EntityType } from "../../../../../../lib/mock/cms";

export default function EditEntityClient({
  entityType,
  entity,
}: {
  entityType: string;
  entity: Record<string, string>;
}) {
  const router = useRouter();
  const type = entityType as EntityType;
  const fieldConfig = editorConfigs[type] ?? [];
  const initialValues = Object.fromEntries(
    fieldConfig.map((f) => [f.key, entity[f.key] ?? ""])
  );

  async function handleSave(values: Record<string, string>) {
    await fetch(`/api/admin/cms/${entityType}/${entity.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    router.push(`/admin/${entityType}`);
  }

  return (
    <GenericEntityEditor
      fieldConfig={fieldConfig}
      initialValues={initialValues}
      onSave={handleSave}
    />
  );
}
