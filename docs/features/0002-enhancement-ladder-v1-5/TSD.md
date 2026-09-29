---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "dc1943cf506982406892e3b1967d69ebc62c5db12fc2500bd6c7363ba7e0a2b9"
---
# TSD 0002 — Ladder v1.5: UI/UX Overhaul  (PRD §S-0002.01–05)

> Behavior + contracts ONLY. Stack: Next.js 16 App Router, Zustand persist, Tailwind, shadcn/ui, Vitest + RTL.
> Extends v1 without breaking existing localStorage keys or component contracts.

---

## TSD S-0002.01 — Visual Refresh  (PRD §S-0002.01)

| Aspect | Spec |
|--------|------|
| Interfaces | **Tailwind config** — extend `theme.colors` with `leapverse` tint tokens (`leapverse-10` through `leapverse-100` matching Leapfrog green ramp) and `level-p2` through `level-p7` border-colour tokens. **`CompetencyDetail`** — level card left border reads `level-{levelId}` token. **`CompetencyAssessmentView`** — self-rating buttons change from plain buttons to pill toggles (visually rounded, `aria-pressed` preserved). **`DomainDetail`** — replaces `<ProgressRing>` with a horizontal `<ProgressBar>` element showing `width: {pct}%`. All existing props and data contracts unchanged. |
| Data / State | No state changes. Reads existing `assessments` and `currentLevel` from store. |
| Behavior | (B-1) Each level card on competency detail (`/[track]/[domain]/[competency]`) has a left border coloured by its level: P2=`level-p2`, P3=`level-p3`, P4=`level-p4`, P5=`level-p5`, P6=`level-p6`, P7=`level-p7`. (B-2) Self-rating buttons on competency detail render as pill-shaped toggles; `aria-pressed` attribute unchanged. (B-3) Domain detail competency list replaces circular SVG rings with horizontal progress bars. (B-4) CTA buttons site-wide use `leapverse-100` (`#038E43`) as primary background, replacing Tailwind `blue-600`. |
| Access | Any user. |
| Boundaries | None. |
| Tests | Unit — `ProgressBar` renders correct `width` style for given `percentage` prop. Vitest + RTL. Existing `ProgressRing` tests unaffected (ring still used in `TrackOverview`). |

---

## TSD S-0002.02 — Matrix Heat-Map  (PRD §S-0002.02)

| Aspect | Spec |
|--------|------|
| Interfaces | **`MatrixHeatMap`** client component — props: `track: Track`. Renders a CSS grid: 5 domain rows × 6 level columns. Each cell is a `<button>` (or `<a>`) navigating to `/{track.id}/{domain.id}`. **`TrackOverview`** (existing, refactored) — restructured to render `<MatrixHeatMap>` above a `<details>` disclosure containing the legacy domain cards. **`RadarChartSmall`** client component — props: `data: { domain: string; pct: number }[]`; renders 5-axis SVG polygon; hidden when all `pct === 0`. |
| Data / State | Reads `currentLevel` and `assessments` from store. Domain progress computed client-side: for each domain at a given level, count criteria checked across all competencies ÷ total criteria × 100. Coming-soon domains: `pct = 0`, cell non-interactive (no link). |
| Behavior | (B-1) Grid cells coloured by completion: 0% or no data → surface-grey; 1–49% → `#B4FFD6`; 50–79% → `#79D9A5`; 80–99% → `#3EB474`; 100% → `#038E43` + checkmark icon. (B-2) Current-level column has a left border accent and "You" badge in the column header. (B-3) Clicking a live cell navigates to `/{track.id}/{domain.id}`. (B-4) Each cell has `title` attribute: "{domain.name} · {LEVEL} — X of Y criteria met" (tooltip). (B-5) "Start Workshop" button above grid navigates to `/{track.id}/workshop`. (B-6) Radar chart renders below grid when at least one criterion is checked across any domain; hidden otherwise. (B-7) Legacy domain cards rendered inside a `<details>` element labelled "Browse by domain", collapsed by default. |
| Access | Any user. Coming-soon domain cells are non-interactive (no role="link"/"button"). |
| Boundaries | None. |
| Tests | Unit — `MatrixHeatMap`: correct cell count (30 cells for dev track); current-level column renders "You" badge; 100%-complete cell has checkmark; coming-soon cell has no link. `RadarChartSmall`: hidden when all pct=0; renders SVG when ≥1 pct > 0. |

---

## TSD S-0002.03 — Guided Workshop Wizard  (PRD §S-0002.03)

| Aspect | Spec |
|--------|------|
| Interfaces | **Route** `src/app/[track]/workshop/page.tsx` — server component; resolves track via `getTrack`; `notFound()` if missing; passes `track` to `<WorkshopWizard>`. **`WorkshopWizard`** — `'use client'`; props: `track: Track`. Reads/writes `workshopPosition`, `currentLevel`, `assessments` from store. **Store additions** — `workshopPosition: WorkshopPosition \| null` persisted field; `setWorkshopPosition(pos: WorkshopPosition \| null): void` action. **`WorkshopPosition` type** (add to `src/lib/types.ts`): `{ track: TrackId; level: LevelId; scope: string \| null; criterionIndex: number; totalCriteria: number; startedAt: string }`. |
| Data / State | `workshopPosition` is new in the Zustand store — additive; does not touch `currentTrack`, `currentLevel`, `focusedView`, or `assessments` keys. Criterion sequence built client-side: all `LevelDescriptor.criteria` for `currentLevel` across non-coming-soon domains, ordered Delivery → Leadership → FCC → Strategic Impact → Technical Skills. If `scope` is non-null, sequence filtered to that competency only. Sequence length stored as `totalCriteria` at workshop start. |
| Behavior | (B-1) Workshop renders header with track name, "X of N" counter, and a `<progress>` bar. (B-2) Main area shows: non-clickable breadcrumb (domain / competency / level), criterion text in a prominent card, a single checkbox ("I do this regularly"), and a rating radio group (Developing / Meeting / Exceeding). (B-3) Checkbox and rating state write to `assessments[key].criteriaChecked` and `assessments[key].selfRating` via existing `toggleCriterion` / `setRating` store actions. (B-4) "Next →" advances `criterionIndex`; reaching end of sequence transitions to completion screen. "← Back" decrements `criterionIndex`; no-op at 0. "Skip" advances without toggling checkbox. (B-5) On page load: if `workshopPosition` exists and matches current track and level, render "You left off at criterion {n} of {N}. Continue?" banner with Continue / Restart actions. (B-6) Completion screen: heading "Workshop complete", summary counts, CTAs "See my results" → `/{track.id}/results` and "Review by domain" → `/{track.id}`; sets `workshopPosition = null`. (B-7) Swipe gesture: `pointerdown` records `clientX`; `pointerup` delta > 60px right → Back, > 60px left → Next. (B-8) `workshopPosition` persisted to localStorage on every criterion advance. |
| Access | Any user. Competency-scoped entry via `/{track.id}/workshop?scope={competencyId}` — query param read server-side and passed to `WorkshopWizard`. |
| Boundaries | localStorage (existing Zustand persist middleware). |
| Tests | Unit — `WorkshopWizard`: renders criterion text for index 0; Next increments index; Back no-ops at 0; Skip increments without checkbox change; reaching last criterion shows completion screen; "Continue?" banner shown when `workshopPosition` matches; resume continues from saved index. Integration — criterion checkbox/rating writes to `assessments` store key correctly. |

---

## TSD S-0002.04 — Results Dashboard  (PRD §S-0002.04)

| Aspect | Spec |
|--------|------|
| Interfaces | **Route** `src/app/[track]/results/page.tsx` — server component; resolves track; `notFound()` if missing; passes `track` to `<ResultsDashboard>`. **`ResultsDashboard`** — `'use client'`; props: `track: Track`. Reads `currentLevel`, `assessments` from store. **`RadarChart`** — props: `data: { domain: string; metPct: number; exceedingPct: number }[]`; renders dual-polygon SVG (filled = met, outline = exceeding). **`DomainScorecard`** — props: `domain: Domain; metCount: number; total: number; ratings: { developing: number; meeting: number; exceeding: number }; href: string`. **`FocusAreaCard`** — props: `competency: Competency; domain: Domain; metCount: number; total: number; href: string`. |
| Data / State | All data derived client-side from `assessments` store. Domain stats: per domain, sum checked criteria and total criteria across all non-coming-soon competencies at `currentLevel`. Focus areas: 3 competencies with lowest `metCount / total` ratio at `currentLevel` (ties broken by competency name alphabetically). |
| Behavior | (B-1) Radar chart renders with 5 axes (one per non-coming-soon domain); two polygons — filled (% criteria met) and outline (% criteria exceeding) at `currentLevel`. (B-2) Domain scorecards render horizontally: name, progress bar (X / Y), rating pills. (B-3) Focus Areas section shows exactly 3 lowest-scoring competencies; if fewer than 3 competencies exist with assessable criteria, shows as many as available. (B-4) "Export summary" button triggers `window.print()` on a print-optimised layout (radar + scorecards visible, nav hidden via `@media print`); no external library required. (B-5) "Ready for P{n+1}?" nudge renders when `currentLevel !== 'p7'` and every non-coming-soon domain is ≥ 80% met. |
| Access | Any user. |
| Boundaries | Browser print API (`window.print()`) — not faked in tests. |
| Tests | Unit — `RadarChart`: renders SVG with 5 axis labels; two polygon paths present. `DomainScorecard`: correct "X / Y" text. `ResultsDashboard`: focus areas show the 3 lowest-scoring competencies given mock `assessments`; nudge shown when all domains ≥ 80%; nudge hidden otherwise. |

---

## TSD S-0002.05 — Polish and Accessibility  (PRD §S-0002.05)

| Aspect | Spec |
|--------|------|
| Interfaces | No new public interfaces. Modifications to `WorkshopWizard` (keyboard handler), `MatrixHeatMap` (aria-labels), and global CSS (reduced-motion media query for wizard transitions). |
| Data / State | None. |
| Behavior | (B-1) `WorkshopWizard` listens to `keydown` on the document: `ArrowRight` or `Enter` (when focus not on an input) = Next; `ArrowLeft` = Back; `Escape` = Skip. (B-2) Each `MatrixHeatMap` cell has `aria-label="{domain.name}, {LEVEL}, {X} of {Y} criteria met"`. (B-3) Wizard slide transitions wrapped in `@media (prefers-reduced-motion: reduce) { transition: none; animation: none }`. (B-4) `npm run build` exits 0. `npx tsc --noEmit` exits 0. (B-5) Lighthouse ≥ 90 all four categories on production build (manual audit). |
| Access | Keyboard users, screen-reader users, reduced-motion users. |
| Boundaries | None. |
| Tests | Unit — keyboard handler: ArrowRight calls Next; ArrowLeft calls Back; Escape calls Skip; Enter while checkbox focused does NOT trigger Next. `MatrixHeatMap`: cell `aria-label` includes domain name, level code, and criterion counts. |
