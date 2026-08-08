import { editEntity } from "../../../../../../lib/mock/cms";
import type { EntityType } from "../../../../../../lib/mock/cms";

const VALID_TYPES = new Set<EntityType>([
  "competency",
  "primary-function",
  "standard",
  "assessment",
  "training-item",
  "badge",
]);

function isValidType(t: string): t is EntityType {
  return VALID_TYPES.has(t as EntityType);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ entityType: string; id: string }> }
): Promise<Response> {
  const { entityType, id } = await params;
  if (!isValidType(entityType)) {
    return new Response(JSON.stringify({ error: "Unknown entity type" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = await req.json().catch(() => ({}));
  const entity = editEntity(entityType, id, body as Record<string, string>);
  if (!entity) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ entity }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
