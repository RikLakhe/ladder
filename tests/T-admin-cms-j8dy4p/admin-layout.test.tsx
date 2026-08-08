import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: (name: string) =>
      name === "admin_session" ? { value: "admin@example.com" } : undefined,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("B-1: admin shell layout renders AdminBanner; login page does not", () => {
  it("shell layout renders AdminBanner with identity and logout button", async () => {
    const { default: AdminShellLayout } = await import(
      "../../src/app/admin/(shell)/layout"
    );
    const result = await AdminShellLayout({
      children: <div>page-content</div>,
    });
    render(result as React.ReactElement);
    expect(screen.getByText("admin@example.com")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /logout/i })
    ).toBeDefined();
    expect(screen.getByText("page-content")).toBeDefined();
  });

  it("login page does not render a logout button", async () => {
    const { default: LoginPage } = await import(
      "../../src/app/admin/login/page"
    );
    render(<LoginPage />);
    expect(screen.queryByRole("button", { name: /logout/i })).toBeNull();
  });
});
