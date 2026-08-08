import { listEntities, addEntity } from "../../../../../lib/mock/cms";
import type { EntityType } from "../../../../../lib/mock/cms";

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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ entityType: string }> }
): Promise<Response> {
  const { entityType } = await params;
  if (!isValidType(entityType)) {
    return new Response(JSON.stringify({ error: "Unknown entity type" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ entities: listEntities(entityType) }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ entityType: string }> }
): Promise<Response> {
  const { entityType } = await params;
  if (!isValidType(entityType)) {
    return new Response(JSON.stringify({ error: "Unknown entity type" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = await req.json().catch(() => ({}));
  const entity = addEntity(entityType, body as Record<string, string>);
  return new Response(JSON.stringify({ entity }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
