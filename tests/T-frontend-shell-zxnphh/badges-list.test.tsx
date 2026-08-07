import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import BadgesPage from "../../src/app/badges/page";

afterEach(cleanup);

describe("B-1: Badges page lists badge cards with level filter", () => {
  it("shows all badges when no level filter is applied", async () => {
    const page = await BadgesPage({ searchParams: Promise.resolve({}) });
    render(page);
    expect(screen.getByText("DEMO-P3")).toBeDefined();
    expect(screen.getByText("DEMO-P4")).toBeDefined();
  });

  it("shows only P3 badges when filtered by level=P3", async () => {
    const page = await BadgesPage({ searchParams: Promise.resolve({ level: "P3" }) });
    render(page);
    expect(screen.getByText("DEMO-P3")).toBeDefined();
    expect(screen.queryByText("DEMO-P4")).toBeNull();
  });

  it("each badge card shows code, name, tier, and certifies snippet", async () => {
    const page = await BadgesPage({ searchParams: Promise.resolve({}) });
    render(page);
    expect(screen.getByText("DEMO-P3")).toBeDefined();
    expect(screen.getByText("P3 Demo Badge")).toBeDefined();
    expect(screen.getByText("Bronze")).toBeDefined();
    expect(screen.getByText("Demonstrates P3 core skills.")).toBeDefined();
  });
});
