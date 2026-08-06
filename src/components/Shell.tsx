import Link from "next/link";
import type { ReactNode } from "react";

export type ShellCompetency = { id: string; name: string };

export function Shell({
  competencies,
  children,
}: {
  competencies: ShellCompetency[];
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header
        style={{
          height: 56,
          flex: "0 0 56px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 20px",
          background: "#fff",
          borderBottom: "1px solid oklch(90% 0.005 260)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
            fontSize: 14,
            color: "oklch(20% 0.02 260)",
          }}
        >
          Ladder
        </Link>
        <form role="search" style={{ flex: 1, maxWidth: 440 }}>
          <input
            type="text"
            placeholder="Search all docs..."
            style={{
              width: "100%",
              height: 32,
              borderRadius: 6,
              border: "1px solid oklch(88% 0.005 260)",
              padding: "0 10px",
              fontSize: 13,
              background: "oklch(97% 0.003 260)",
              outline: "none",
            }}
          />
        </form>
      </header>
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <nav
          style={{
            width: 248,
            flex: "0 0 248px",
            background: "#fff",
            borderRight: "1px solid oklch(90% 0.005 260)",
            overflowY: "auto",
            padding: "12px 8px",
          }}
        >
          {competencies.map((competency) => (
            <Link
              key={competency.id}
              href={`/competencies/${competency.id}`}
              style={{
                display: "block",
                padding: "8px 10px",
                fontSize: 13,
                color: "oklch(30% 0.02 260)",
                borderRadius: 6,
              }}
            >
              {competency.name}
            </Link>
          ))}
        </nav>
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
