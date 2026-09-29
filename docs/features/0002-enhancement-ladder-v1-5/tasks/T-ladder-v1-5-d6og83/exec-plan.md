---
approved_by: ""
approved_at: ""
planned_behaviors: "5"
---
## Exec Plan — Task T-ladder-v1-5-d6og83
> Authored during planning, before any code. GATE: approve via `lane approve` BEFORE any code.

**Will build:**
- `src/components/MatrixHeatMap.tsx` — client component; props `track: Track`; reads `currentLevel` + `assessments` from store; renders CSS grid 5 rows × 6 cols; heat colours via inline style; "You" badge on current-level column header (AC-1, AC-2, AC-3, AC-4)
- `src/components/RadarChartSmall.tsx` — client component; props `data: { domain: string; pct: number }[]`; custom SVG 5-axis polygon; hidden when all pct=0 (AC-6)
- `src/app/[track]/TrackOverview.tsx` — restructured: renders `<MatrixHeatMap>` above "Start Workshop" link + `<RadarChartSmall>` + legacy `<details>` disclosure wrapping existing domain cards (AC-5, AC-7)

**Approach:**
New `MatrixHeatMap` first (tracer bullet). Then `RadarChartSmall`. Then restructure `TrackOverview` to compose them. Existing domain-card tests must still pass (cards live inside `<details>`).

**Boundaries & mocks:** None — pure component rendering + real Zustand store.

**Behaviors (TDD order):**
- B-1: `MatrixHeatMap` renders 30 cells (5 domains × 6 levels) for dev track — tracer bullet
- B-2: Current-level column header shows "You" badge; that column has `data-current="true"`
- B-3: Cell with 100% completion has `data-heat="100"`; coming-soon cells have no `<a>` element
- B-4: Each live cell has `title` attribute containing domain name, level, and "X of Y criteria met"
- B-5: `RadarChartSmall` renders SVG with 5 `<text>` axis labels when ≥1 pct > 0; renders nothing when all pct = 0

**PR will contain:**
- `src/components/MatrixHeatMap.tsx` (new)
- `src/components/RadarChartSmall.tsx` (new)
- `src/components/__tests__/MatrixHeatMap.test.tsx` (new)
- `src/components/__tests__/RadarChartSmall.test.tsx` (new)
- `src/app/[track]/TrackOverview.tsx` (restructured)

**Open questions / ambiguities:**
- Existing `TrackOverview` tests assert on `data-testid="domain-card"` and `data-testid="progress-ring"` elements — these must still pass; domain cards live inside `<details>`.
- Heat colour applied via `style={{ background: '...' }}` (data-driven hex); `data-heat={bucket}` attribute used for testing (0/1/50/80/100 buckets).
- "Start Workshop" link renders `<Link href="/{track.id}/workshop">` — route added in T3, link renders regardless.

**Path:** L (lean, default)
**Escalation signals hit:** None.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
