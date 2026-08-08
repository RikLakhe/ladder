import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/headers", () => ({
  cookies: () => ({
    has: () => true,
    get: (name: string) =>
      name === "admin_session" ? { value: "admin@example.com" } : undefined,
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href }, children),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const EXPECTED_ENTITIES = [
  { slug: "competency", label: "Competency" },
  { slug: "primary-function", label: "Primary Function" },
  { slug: "standard", label: "Standard" },
  { slug: "badge", label: "Badge" },
  { slug: "instrument", label: "Instrument" },
  { slug: "training-unit", label: "Training Unit" },
  { slug: "functional-analysis", label: "Functional Analysis" },
];

describe("B-2: admin dashboard lists all 7 entity types", () => {
  it("renders exactly 7 entity type links with correct slugs and labels", async () => {
    const { default: AdminDashboardPage } = await import(
      "../../src/app/admin/(shell)/page"
    );
    const result = await AdminDashboardPage();
    render(result as React.ReactElement);

    for (const { slug, label } of EXPECTED_ENTITIES) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeDefined();
      expect(link.getAttribute("href")).toBe(`/admin/${slug}`);
    }
  });

  it("mock CMS store includes seed data for all 7 entity types", async () => {
    const { listEntities } = await import("../../src/lib/mock/cms");
    const types = [
      "competency",
      "primary-function",
      "standard",
      "badge",
      "instrument",
      "training-unit",
      "functional-analysis",
    ] as const;

    for (const type of types) {
      const entities = listEntities(type);
      expect(entities.length, `expected seed data for ${type}`).toBeGreaterThan(0);
    }
  });
});
