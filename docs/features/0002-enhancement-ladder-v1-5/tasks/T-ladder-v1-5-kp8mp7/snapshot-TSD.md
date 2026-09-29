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
