---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "738636ed73ed303f072fb2f8700143d0da926772a3bd8cd335d5bf95eb90738d"
---
## Task T-ladder-v1-5-kp8mp7 — Results Dashboard (S-0002.04)
**Parent:** story S-0002.04 · feature 0002-enhancement-ladder-v1-5
**Slice:** `/[track]/results` route + `ResultsDashboard` client component + `RadarChart` + `DomainScorecard` + `FocusAreaCard` + print-based export

**Acceptance criteria:**
- [ ] AC-1 [behavior]: `/dev/results` renders a radar chart with 5 axes (one per non-coming-soon domain); two overlaid SVG polygons — filled (% criteria met) and outline (% criteria exceeding) at `currentLevel`
- [ ] AC-2 [behavior]: Domain scorecards render horizontally: domain name, progress bar showing "X / Y criteria met", rating pills (N Developing · N Meeting · N Exceeding), "See details →" link to domain page
- [ ] AC-3 [behavior]: Focus Areas shows exactly 3 competencies with lowest `metCount / total` at `currentLevel`; ties broken alphabetically; fewer than 3 if fewer competencies exist
- [ ] AC-4 [behavior]: "Export summary" button calls `window.print()` on a layout with radar + scorecards visible and navigation hidden via `@media print`
- [ ] AC-5 [behavior]: "Ready for P{n+1}?" nudge renders when `currentLevel !== 'p7'` and every non-coming-soon domain is ≥ 80% met; hidden otherwise
- [ ] AC-6 [e2e]: A user navigating to `/dev/results` after completing assessments sees their radar chart, scorecards, and focus areas

**Tests:** AC-1, AC-2, AC-3, AC-5
**Tests:** `src/components/__tests__/RadarChart.test.tsx`, `src/components/__tests__/ResultsDashboard.test.tsx`
**Done =** reviewable PR, all tests pass, links to chain. One PR per task.
