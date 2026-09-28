---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "2"
approved_sha256: "e650e057739e047ef0037fb4f493c89d2eeda501fab0c4a092b4cd3ac33df760"
---
## Exec Plan — Task T-ladder-v1-5ajvs2
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/components/CompetencyAssessmentView.tsx` — `'use client'`; accepts `competency`, `trackId`, `domainId`; renders level cards with checkboxes per criterion and 3 self-rating buttons; highlights `currentLevel` card; assessment key = `${trackId}/${domainId}/${competency.id}` (AC-1, AC-2, AC-3, AC-4)
- `src/components/TrackDomainList.tsx` — `'use client'`; accepts `track`; renders non-coming-soon domains as clickable cards with `ProgressRing`; coming-soon domains show badge only (AC-6)
- `src/components/__tests__/CompetencyAssessmentView.test.tsx` — unit tests (AC-1, AC-2, AC-3, AC-4, AC-5)
- `src/components/__tests__/TrackDomainList.test.tsx` — unit tests (AC-6)

**Approach:**
Two RED/GREEN cycles. B-1: `CompetencyAssessmentView` (tracer bullet — checkboxes, rating buttons, current-level highlight, key format). B-2: `TrackDomainList` (domain cards with rings). Both are standalone client components; no new routes needed.

**Boundaries & mocks:**
- Boundary: browser localStorage (Zustand persist). Faked in tests: `useLadderStore.setState(...)` directly — localStorage never touched in unit tests. Smoke AC-7 (e2e): manual verification that checking a criterion persists across reload in a running browser.

**Behaviors (TDD order):**

B-1 (tracer bullet): CompetencyAssessmentView
- RED: test imports `CompetencyAssessmentView` — fails (module missing)
- GREEN: create component
- Tests (fixture: dev/leadership/decision-making, currentLevel=p3):
  - ≥2 checkboxes for P3 criteria rendered
  - checking first P3 checkbox adds criterion ID to store `criteriaChecked`
  - 3 rating buttons present (Developing, Meeting, Exceeding)
  - clicking Meeting → store `selfRating='meeting'`
  - P3 card shows "Your level" badge
  - assessment key = `dev/leadership/decision-making` (verified via store after toggle)

B-2: TrackDomainList
- RED: test imports `TrackDomainList` — fails (module missing)
- GREEN: create component (reuses `ProgressRing` from T5)
- Tests (dev track):
  - leadership and delivery domain names in DOM
  - ≥4 progress ring percentage elements present
  - coming-soon domain card shows no ring and no link

**PR will contain:**
- `src/components/CompetencyAssessmentView.tsx`
- `src/components/__tests__/CompetencyAssessmentView.test.tsx`
- `src/components/TrackDomainList.tsx`
- `src/components/__tests__/TrackDomainList.test.tsx`

**Open questions / ambiguities:**
- AC-4 invariant: assessment key format `{trackId}/{domainId}/{competencyId}` is enforced by constructing it once in the component as a `const key = \`${trackId}/${domainId}/${competency.id}\`` — not via ad-hoc concatenation at each call site. Criterion IDs come directly from `criterion.id` in content data — no construction needed.
- AC-5 invariant: Zustand store `toggleCriterion` and `setRating` use the key to scope writes; covered by existing store tests (T2). Component test verifies that checking competency A does not affect a separately-keyed competency B.
- `TrackDomainList` is a new component alongside `TrackOverview` from T5. TSD names it separately; it wraps domain + progress logic for use on the track page.
- Progress percentage formula: same as TSD S-0001.05 B-7 — aggregate criteria across all competencies in domain at currentLevel.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
