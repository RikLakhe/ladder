---
approved_by: "Rikesh"
approved_at: "2026-09-29"
planned_behaviors: "5"
approved_sha256: "0f85e4277fa21cf346df372c06860caf1898bf0989f00e4e09e12bbfcd6b7051"
---
## Exec Plan — Task T-ladder-v1-5-kp8mp7
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:**
- `src/components/RadarChart.tsx` — dual-polygon SVG; props `data: { domain: string; metPct: number; exceedingPct: number }[]`; 5 axes, filled polygon (met), outline polygon (exceeding)
- `src/components/DomainScorecard.tsx` — props `domain, metCount, total, ratings, href`; name, "X / Y" text, rating pills
- `src/components/FocusAreaCard.tsx` — props `competency, domain, metCount, total, href`; competency name + score + link
- `src/components/ResultsDashboard.tsx` — `'use client'`; reads store; computes domain stats + focus areas (3 lowest-scoring) + nudge; Export button calls `window.print()`
- `src/app/[track]/results/page.tsx` — server component; resolves track; `notFound()` if missing; passes track to ResultsDashboard

**Approach:**
RadarChart first (tracer). DomainScorecard (simple). ResultsDashboard composition last: domain stats from assessments + currentLevel; focus areas = 3 lowest `metCount/total` competencies (ties broken alphabetically); nudge when all non-coming-soon domains ≥ 80%.

**Boundaries & mocks:** `window.print()` — browser API; not called in unit tests; Export button checked by label text only.

**Behaviors (TDD order):**
- B-1 (tracer): RadarChart renders SVG with 5 `<text>` axis labels and 2 `<polygon>` elements
- B-2: DomainScorecard renders "X / Y" text with correct metCount and total
- B-3: ResultsDashboard shows 3 lowest-scoring competencies in Focus Areas given seeded assessments
- B-4: ResultsDashboard nudge shown when all non-coming-soon domains ≥ 80% met; hidden otherwise
- B-5: Results route page renders ResultsDashboard for valid track

**PR will contain:**
- `src/components/RadarChart.tsx` (new)
- `src/components/DomainScorecard.tsx` (new)
- `src/components/FocusAreaCard.tsx` (new)
- `src/components/ResultsDashboard.tsx` (new)
- `src/app/[track]/results/page.tsx` (new)
- `src/components/__tests__/RadarChart.test.tsx` (new)
- `src/components/__tests__/ResultsDashboard.test.tsx` (new)
- `src/app/[track]/results/__tests__/page.test.tsx` (new)

**Open questions / ambiguities:**
- Focus area ties broken alphabetically by competency.name — in sort comparator
- RadarChart uses `<polygon>` not `<path>` for testable points attribute

**Path:** L (lean, default)
**Escalation signals hit:** None.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
