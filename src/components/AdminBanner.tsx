"use client";

export function AdminBanner() {
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
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
      <span>Signed in as system</span>
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
