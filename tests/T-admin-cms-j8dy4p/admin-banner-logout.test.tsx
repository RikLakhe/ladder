import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

const mockPush = vi.fn();
const mockFetch = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  redirect: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = mockFetch;
  mockFetch.mockResolvedValue({ ok: true });
});

describe("B-3: AdminBanner logout ends session and redirects", () => {
  it("clicking Logout POSTs to /api/admin/logout then navigates to /admin/login", async () => {
    const { AdminBanner } = await import("../../src/components/AdminBanner");
    render(<AdminBanner adminEmail="admin@example.com" />);

    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/admin/logout", { method: "POST" });
      expect(mockPush).toHaveBeenCalledWith("/admin/login");
    });
  });

  it("does not navigate before the logout API call completes", async () => {
    let resolveFetch!: () => void;
    mockFetch.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveFetch = () => resolve({ ok: true } as Response);
      })
    );

    const { AdminBanner } = await import("../../src/components/AdminBanner");
    render(<AdminBanner adminEmail="admin@example.com" />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(mockPush).not.toHaveBeenCalled();

    resolveFetch();
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin/login");
    });
  });
});
