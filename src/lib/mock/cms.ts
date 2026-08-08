export type EntityType =
  | "competency"
  | "primary-function"
  | "standard"
  | "assessment"
  | "training-item"
  | "badge";

export type Entity = Record<string, string> & { id: string };

const store = new Map<EntityType, Map<string, Entity>>();

function seed(type: EntityType, entities: Omit<Entity, "id">[]) {
  const m = new Map<string, Entity>();
  entities.forEach((e, i) => {
    const id = `${type}-${i + 1}`;
    m.set(id, { ...e, id });
  });
  store.set(type, m);
}

seed("competency", [{ name: "Leadership" }, { name: "Communication" }]);
seed("primary-function", [{ name: "Engineering", competency_id: "competency-1" }]);
seed("standard", [{ body: "Leads team meetings", level: "3", pf_id: "primary-function-1" }]);
seed("assessment", [{ competency_id: "competency-1", summary: "360 review" }]);
seed("training-item", [{ competency_id: "competency-1", summary: "Leadership course" }]);
seed("badge", [
  { name: "Junior Engineer", level: "1", pf_id: "primary-function-1" },
  { name: "Senior Engineer", level: "3", pf_id: "primary-function-1" },
]);

export function listEntities(type: EntityType): Entity[] {
  return Array.from(store.get(type)?.values() ?? []);
}

export function getEntity(type: EntityType, id: string): Entity | undefined {
  return store.get(type)?.get(id);
}

export function addEntity(type: EntityType, values: Record<string, string>): Entity {
  const m = store.get(type) ?? new Map<string, Entity>();
  const id = `${type}-${Date.now()}`;
  const entity: Entity = { ...values, id };
  m.set(id, entity);
  store.set(type, m);
  return entity;
}

export function editEntity(
  type: EntityType,
  id: string,
  values: Record<string, string>
): Entity | undefined {
  const m = store.get(type);
  if (!m?.has(id)) return undefined;
  const updated: Entity = { ...m.get(id)!, ...values, id };
  m.set(id, updated);
  return updated;
}
