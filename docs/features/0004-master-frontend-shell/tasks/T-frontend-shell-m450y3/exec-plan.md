---
approved_by: "unknown"
approved_at: "2026-08-08"
planned_behaviors: "3"
approved_sha256: "f3af0a3ecf9dd440a02cc20516538a7969e1fc29999ec708265d43669bdd5cc9"
---
## Exec Plan — Task T-frontend-shell-m450y3
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `src/lib/search.ts` — `buildSearchIndex(data)` + `queryIndex(index, q)` pure functions; index entries carry type/title/snippet/href; results include competency, PF, doc type
- AC-1: `SearchBox` client component in `src/components/SearchBox.tsx` — wraps the existing `<form role="search">` input in Shell, shows results list below header on submit
- AC-2: exact badge-code match and partial PF-name match both handled in `queryIndex` (case-insensitive substring; badge_code exact prefix match ranks first)
- AC-3: each result href points to `/primary-functions/{pfId}?level={level}`; clicking navigates there via Next.js router (router.push in client component)

**Approach:** high-level only — NOT implementation prescription
- Build a pure `buildSearchIndex` function that takes competencies + PFs + mock badges and emits a flat array of `SearchEntry` objects (type, title, snippet, href, sortKey)
- `queryIndex` does case-insensitive substring match on title + snippet; badge_code exact match is a secondary check; returns `SearchResult[]` sorted by relevance (exact match first)
- `SearchBox` is a `"use client"` component; receives `index: SearchEntry[]` as a prop (pre-built server-side, passed down); no client-side data fetching
- Shell passes the pre-built index from layout (layout fetches competencies+PFs, builds index, passes to Shell → SearchBox)
- AC-3 navigation: result href already encodes level; `<Link>` handles navigation without JS router call needed

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED vs REAL
- Boundaries: none (TSD). No network calls, no new DB reads for search itself.
- Index data comes from already-fetched real DB data (competencies, PFs) + mock fixtures (badges). No new boundary introduced.
- Tests: mock `lib/competencies` + `lib/primary-functions` + `lib/badges` (mock/badges) at module boundary for unit tests; e2e test hits running app.

**Behaviors (TDD order):**
- B-1 [tracer]: search index + query logic pure functions — `buildSearchIndex` + `queryIndex` in `src/lib/search.ts`; test file `tests/T-frontend-shell-m450y3/search-index.test.ts`; tests: exact badge-code match returns result, partial PF-name match returns result, no-match returns empty
- B-2 [behavior]: `SearchBox` component renders results list when form submitted — test file `tests/T-frontend-shell-m450y3/search-box.test.tsx`; tests: submitting a query shows matching results list with type/title/snippet
- B-3 [e2e]: clicking a search result navigates to PF page with correct level tab — test file `tests/T-frontend-shell-m450y3/search-nav.e2e.test.ts`; hits running app, submits search, clicks result, asserts PF page at correct level

**PR will contain:**
- `src/lib/search.ts` — index builder + query function
- `src/components/SearchBox.tsx` — client component
- `src/app/layout.tsx` (or Shell call site) — wire index build + pass to SearchBox
- `src/components/Shell.tsx` — replace static `<form role="search">` input with `<SearchBox>`
- `tests/T-frontend-shell-m450y3/` — 3 test files

**Open questions / ambiguities:**
- Layout.tsx currently builds competency list for nav; index needs PFs too — layout will need an extra `getPrimaryFunctions` call (acceptable, same DB connection pattern). No ambiguity.
- Level in result href: badge entries map to a level field; PF entries don't have a "level" naturally — result href for a PF match will use the PF's primary level from the standards data or default to `P2`. Will default to `P2` since PF pages default to `P2` and no AC asserts a specific level for PF-name matches.
- Snippet content: TSD says "matched snippet" — will use the first ~80 chars of the matched field (name or certifies for badges; name for PFs/competencies). No external data needed.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** none
- [ ] Refactor pass done (on green; tests unchanged) — before PR
