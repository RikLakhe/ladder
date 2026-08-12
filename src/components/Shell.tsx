import Link from "next/link";
import type { ReactNode } from "react";
import { ShellBreadcrumb } from "./ShellBreadcrumb";
import { LevelBar } from "./LevelBar";
import { CompetencyNavList } from "./CompetencyNavList";
import { SearchBox } from "./SearchBox";

export type ShellCompetency = { id: string; name: string };

const STATIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/level-view", label: "Level View" },
  { href: "/transition-guide", label: "Transition Guide" },
  { href: "/badges", label: "Badges" },
  { href: "/version-history", label: "Version History" },
];

export function Shell({
  competencies,
  children,
  adminBanner,
}: {
  competencies: ShellCompetency[];
  children: ReactNode;
  adminBanner?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {adminBanner && (
        <div style={{
          background: "var(--accent-soft)",
          borderBottom: "1px solid var(--border)",
          padding: "6px 20px",
          fontSize: 13,
          color: "var(--accent)",
          fontWeight: 500,
        }}>
          {adminBanner}
        </div>
      )}

      {/* Header */}
      <header style={{
        height: 60,
        flex: "0 0 60px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 20px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 700,
          fontSize: 15,
          color: "var(--text-1)",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          flexShrink: 0,
        }}>
          <span style={{
            width: 28,
            height: 28,
            background: "var(--accent)",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
            fontFamily: "var(--font-mono)",
          }}>L</span>
          Ladder
        </Link>

        <div style={{ flex: 1, maxWidth: 360 }}>
          <SearchBox />
        </div>

        <div style={{ marginLeft: "auto" }}>
          <LevelBar />
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Sidebar */}
        <nav style={{
          width: 248,
          flex: "0 0 248px",
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          {STATIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "7px 10px",
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--text-2)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                transition: "background .1s, color .1s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)";
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ height: 1, background: "var(--border)", margin: "10px 4px" }} />

          <CompetencyNavList competencies={competencies} />
        </nav>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          <ShellBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
