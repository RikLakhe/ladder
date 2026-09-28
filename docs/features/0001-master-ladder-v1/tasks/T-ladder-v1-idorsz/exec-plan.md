---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "5"
approved_sha256: "37d94956081972ecf39fcc378ef0c8c550180d6b0843edce84ceef950ef86e2d"
---
## Exec Plan — Task T-ladder-v1-idorsz
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/components/ProgressRing.tsx` — SVG component: `percentage`, `size`, `strokeWidth?` (default 4); renders `"{n}%"` text; `strokeDashoffset` = circumference at 0%, 0 at 100% (AC-1, AC-2, AC-3)
- `src/app/[track]/page.tsx` — server component resolving track from slug via `getTrack()`; passes domain list to client child; returns 404 for unknown slug (AC-3, AC-4, AC-8)
- `src/app/[track]/TrackOverview.tsx` — client component reading store (`currentLevel`, `assessments`); renders domain cards with `ProgressRing` or "Coming soon" badge (AC-3, AC-4, AC-5)
- `src/components/__tests__/ProgressRing.test.tsx` — unit tests for ProgressRing (AC-1, AC-2, AC-3)
- `src/app/[track]/__tests__/page.test.tsx` — RTL tests for track overview (AC-3, AC-4, AC-5)

**Approach:**
Split into server route + client component. Server page resolves track from params, calls `notFound()` on unknown slug. Client `TrackOverview` reads store for `currentLevel` and `assessments`, computes per-domain progress via `computeProgress`, renders cards. `ProgressRing` is a pure SVG component.

**Boundaries & mocks:**
- No external boundaries. Store accessed via `useLadderStore` in client component — reset via `setState` in tests.
- `next/navigation` mocked where needed (`notFound`).

**Behaviors (TDD order):**

B-1 (tracer bullet): ProgressRing renders visible text
- RED: `src/components/__tests__/ProgressRing.test.tsx` importing `ProgressRing` — fails (module missing)
- GREEN: create `src/components/ProgressRing.tsx` — pure SVG circle with `{percentage}%` text
- Tests: renders "75%" at percentage=75; renders "0%" at percentage=0

B-2: ProgressRing SVG arc strokeDashoffset
- RED: add test asserting `strokeDashoffset` at 0% = full circumference; at 100% = 0
- GREEN: implement circumference math in ProgressRing
- Tests: at percentage=0, dashoffset = `2 * Math.PI * r`; at percentage=100, dashoffset = 0

B-3: ProgressRing strokeWidth default
- RED: add test asserting default `strokeWidth=4` when prop omitted
- GREEN: ensure prop defaults to 4 in component
- Tests: rendered SVG circle has `strokeWidth="4"` when prop not passed

B-4: Track overview renders domain cards
- RED: `src/app/[track]/__tests__/page.test.tsx` importing overview — fails
- GREEN: create server page + client TrackOverview
- Tests: dev track → 5 domain cards; qa track → technical-skill card shows "Coming soon"; non-coming-soon cards contain ProgressRing; coming-soon cards have no link and no ring

B-5: Domain progress calculation
- RED: add test asserting progress = 0% with no assessments; partial with some checked criteria
- GREEN: wire `computeProgress` aggregation across all competencies in domain at `currentLevel`
- Tests: 0% with empty assessments; correct integer for partial; no crash when criteria count = 0

B-6 (e2e/smoke): Checking criterion updates progress ring — manual browser verification (no automated test)

**PR will contain:**
- `src/components/ProgressRing.tsx`
- `src/components/__tests__/ProgressRing.test.tsx`
- `src/app/[track]/page.tsx`
- `src/app/[track]/TrackOverview.tsx`
- `src/app/[track]/__tests__/page.test.tsx`

**Open questions / ambiguities:**
- Domain progress aggregates across ALL competencies in the domain at `currentLevel`. TSD B-7 says "criteria in that domain at currentLevel" — confirmed: sum all criteria across all competencies in domain, count how many are in `criteriaChecked` for assessments keyed to those competencies. Assessment key format: `{trackId}/{domainId}/{competencyId}`.
- `notFound()` in Next.js App Router server component causes 404 automatically — no manual response needed.
- `TrackOverview` must be `'use client'` to read store. Server page passes `track` object as prop.
- B-3, B-4, B-5 share one test file and one RED/GREEN cycle (same component); keeping as separate behaviors but single RED commit covers all three failing tests.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
