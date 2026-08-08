export type SearchEntry = {
  type: "competency" | "primary-function" | "badge";
  title: string;
  snippet: string;
  href: string;
  _searchText: string;
  _exactCode?: string;
};

export type SearchResult = Pick<SearchEntry, "type" | "title" | "snippet" | "href">;

type Competency = { id: string; name: string; domains?: string[] };
type PrimaryFunction = { id: string; competencyId?: string; name: string };
type Badge = {
  id: string;
  badge_code: string;
  name: string;
  certifies?: string;
  level?: string;
};

export function buildSearchIndex({
  competencies,
  primaryFunctions,
  badges,
}: {
  competencies: Competency[];
  primaryFunctions: PrimaryFunction[];
  badges: Badge[];
}): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const c of competencies) {
    entries.push({
      type: "competency",
      title: c.name,
      snippet: c.name.slice(0, 80),
      href: `/competencies/${c.id}`,
      _searchText: c.name.toLowerCase(),
    });
  }

  for (const pf of primaryFunctions) {
    entries.push({
      type: "primary-function",
      title: pf.name,
      snippet: pf.name.slice(0, 80),
      href: `/primary-functions/${pf.id}`,
      _searchText: pf.name.toLowerCase(),
    });
  }

  for (const b of badges) {
    const title = `${b.badge_code} — ${b.name}`;
    const snippet = b.certifies ? b.certifies.slice(0, 80) : b.name.slice(0, 80);
    entries.push({
      type: "badge",
      title,
      snippet,
      href: `/badges/${b.badge_code}`,
      _searchText: `${b.badge_code} ${b.name} ${b.certifies ?? ""}`.toLowerCase(),
      _exactCode: b.badge_code.toLowerCase(),
    });
  }

  return entries;
}

export function queryIndex(index: SearchEntry[], q: string): SearchResult[] {
  if (!q.trim()) return [];
  const lower = q.trim().toLowerCase();

  const exact: SearchResult[] = [];
  const partial: SearchResult[] = [];

  for (const entry of index) {
    if (entry._exactCode && entry._exactCode === lower) {
      exact.push({ type: entry.type, title: entry.title, snippet: entry.snippet, href: entry.href });
    } else if (entry._searchText.includes(lower)) {
      partial.push({ type: entry.type, title: entry.title, snippet: entry.snippet, href: entry.href });
    }
  }

  return [...exact, ...partial];
}
