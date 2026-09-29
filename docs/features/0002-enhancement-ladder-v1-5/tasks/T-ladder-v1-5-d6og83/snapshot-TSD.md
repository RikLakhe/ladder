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
