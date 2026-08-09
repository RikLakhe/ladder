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

const navLinkStyle = {
  display: "block",
  padding: "8px 10px",
  fontSize: 13,
  color: "oklch(30% 0.02 260)",
  borderRadius: 6,
};

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
        <div
          style={{
            background: "oklch(93% 0.04 250)",
            borderBottom: "1px solid oklch(85% 0.05 250)",
            padding: "6px 20px",
          }}
        >
          {adminBanner}
        </div>
      )}
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
        <SearchBox />
        <LevelBar />
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
          {STATIC_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}
          <CompetencyNavList competencies={competencies} />
        </nav>
        <main style={{ flex: 1, minWidth: 0 }}>
          <ShellBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
