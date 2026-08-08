"use client";

import { useRouter } from "next/navigation";

export function AdminBanner({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "4px 12px",
        background: "oklch(95% 0.05 250)",
        borderRadius: 6,
        fontSize: 13,
      }}
    >
      <span>{adminEmail}</span>
      <button
        onClick={handleLogout}
        style={{
          fontSize: 12,
          padding: "2px 8px",
          borderRadius: 4,
          border: "1px solid oklch(70% 0.05 250)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
