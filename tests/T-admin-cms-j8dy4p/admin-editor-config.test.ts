import { describe, expect, it } from "vitest";

const NEW_ENTITY_TYPES = ["instrument", "training-unit", "functional-analysis"] as const;
const ALL_ENTITY_TYPES = [
  "competency",
  "primary-function",
  "standard",
  "badge",
  "instrument",
  "training-unit",
  "functional-analysis",
] as const;

describe("B-4: editorConfigs covers all 7 entity types", () => {
  it("editorConfigs has non-empty field arrays for the three new entity types", async () => {
    const { editorConfigs } = await import("../../src/lib/admin-editor-config");
    for (const type of NEW_ENTITY_TYPES) {
      const fields = (editorConfigs as Record<string, unknown[]>)[type];
      expect(fields, `editorConfigs["${type}"] should exist`).toBeDefined();
      expect(fields!.length, `editorConfigs["${type}"] should have fields`).toBeGreaterThan(0);
    }
  });

  it("editorConfigs has exactly the 7 TSD entity types as keys (no stale types)", async () => {
    const { editorConfigs } = await import("../../src/lib/admin-editor-config");
    const keys = Object.keys(editorConfigs).sort();
    expect(keys).toEqual([...ALL_ENTITY_TYPES].sort());
  });
});

describe("B-4: CMS API routes accept all 7 entity type slugs", () => {
  it("GET /api/admin/cms/instrument returns 200, not 404", async () => {
    const { GET } = await import(
      "../../src/app/api/admin/cms/[entityType]/route"
    );
    const req = new Request("http://localhost/api/admin/cms/instrument");
    const res = await GET(req, { params: Promise.resolve({ entityType: "instrument" }) });
    expect(res.status).toBe(200);
  });

  it("GET /api/admin/cms/training-unit returns 200, not 404", async () => {
    const { GET } = await import(
      "../../src/app/api/admin/cms/[entityType]/route"
    );
    const req = new Request("http://localhost/api/admin/cms/training-unit");
    const res = await GET(req, { params: Promise.resolve({ entityType: "training-unit" }) });
    expect(res.status).toBe(200);
  });

  it("GET /api/admin/cms/functional-analysis returns 200, not 404", async () => {
    const { GET } = await import(
      "../../src/app/api/admin/cms/[entityType]/route"
    );
    const req = new Request("http://localhost/api/admin/cms/functional-analysis");
    const res = await GET(req, { params: Promise.resolve({ entityType: "functional-analysis" }) });
    expect(res.status).toBe(200);
  });
});
