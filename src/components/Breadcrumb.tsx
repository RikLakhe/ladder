import Link from "next/link";

export function Breadcrumb({ pathname }: { pathname: string | null }) {
  const segments = (pathname ?? "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  let href = "";
  const crumbs = segments.map((segment) => {
    href += `/${segment}`;
    return { label: segment, href };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      style={{ display: "flex", gap: 6, fontSize: 13, padding: "10px 20px", color: "oklch(40% 0.02 260)" }}
    >
      <Link href="/">Home</Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} style={{ display: "flex", gap: 6 }}>
          <span>/</span>
          <Link href={crumb.href}>{crumb.label}</Link>
        </span>
      ))}
    </nav>
  );
}
