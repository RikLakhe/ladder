"use client";

import { useParams, useRouter } from "next/navigation";
import { GenericEntityEditor } from "../../../../components/GenericEntityEditor";
import { editorConfigs } from "../../../../lib/admin-editor-config";
import type { EntityType } from "../../../../lib/mock/cms";

export default function NewEntityPage() {
  const params = useParams<{ entityType: string }>();
  const router = useRouter();
  const entityType = params.entityType as EntityType;
  const fieldConfig = editorConfigs[entityType] ?? [];
  const initialValues = Object.fromEntries(fieldConfig.map((f) => [f.key, ""]));

  async function handleSave(values: Record<string, string>) {
    await fetch(`/api/admin/cms/${entityType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    router.push(`/admin/${entityType}`);
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Add {entityType}</h1>
      <GenericEntityEditor
        fieldConfig={fieldConfig}
        initialValues={initialValues}
        onSave={handleSave}
      />
    </main>
  );
}
