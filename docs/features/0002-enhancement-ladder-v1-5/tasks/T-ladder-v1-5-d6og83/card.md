---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "ffb2061af230f85bf7665fa9463c8ad4971cb872f92e0df71bfc2af36e24113f"
---
## Task T-ladder-v1-5-d6og83 — Matrix Heat-Map (S-0002.02)
**Parent:** story S-0002.02 · feature 0002-enhancement-ladder-v1-5
**Slice:** `MatrixHeatMap` component + `RadarChartSmall` + track overview page restructure with heat-map, "Start Workshop" CTA, and legacy domain cards collapse

**Acceptance criteria:**
- [ ] AC-1 [behavior]: Track overview renders a `MatrixHeatMap` grid with 5 domain rows × 6 level columns; each cell coloured by completion: 0%=grey, 1–49%=`#B4FFD6`, 50–79%=`#79D9A5`, 80–99%=`#3EB474`, 100%=`#038E43` + checkmark
- [ ] AC-2 [behavior]: Current-level column has a left border accent and "You" badge in its header
- [ ] AC-3 [behavior]: Clicking a live domain cell navigates to `/{track.id}/{domain.id}`; coming-soon cells are non-interactive
- [ ] AC-4 [behavior]: Each cell has a `title` attribute: "{domain} · {LEVEL} — X of Y criteria met"
- [ ] AC-5 [behavior]: "Start Workshop" button above the grid navigates to `/{track.id}/workshop`
- [ ] AC-6 [behavior]: Radar chart (5 axes, one per domain) renders below the grid when ≥1 criterion is checked; hidden otherwise
- [ ] AC-7 [behavior]: Legacy domain cards (v1 ring pattern) are inside a `<details>` element labelled "Browse by domain", collapsed by default
- [ ] AC-8 [e2e]: A user on `/dev` sees the heat-map grid with their current level highlighted and can click a cell to reach the domain

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-6
**Tests:** `src/components/__tests__/MatrixHeatMap.test.tsx`, `src/components/__tests__/RadarChartSmall.test.tsx`
**Done =** reviewable PR, all tests pass, links to chain. One PR per task.
