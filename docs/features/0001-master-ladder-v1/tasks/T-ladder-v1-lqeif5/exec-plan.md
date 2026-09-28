---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "1"
approved_sha256: "d4140ddaba5ff7298a904a7e62f4e6595e940263d26fbfa274b748d046c6b6b8"
---
## Exec Plan — Task T-ladder-v1-lqeif5

> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/lib/types.ts` — 11 exported symbols: `LevelId`, `TrackId`, `SelfRating`, `Criterion`, `LevelDescriptor`, `Competency`, `Domain`, `Track`, `CompetencyAssessment`, `AssessmentStore`, `LEVELS` (AC-1, AC-2)
- `src/lib/store.ts` — Zustand persist store with `skipHydration: true`, default state, 6 actions: `setTrack`, `setLevel`, `toggleFocusedView`, `setFocusedView`, `setRating(key, rating)`, `toggleCriterion(key, criterionId)` (AC-3, AC-4, AC-5, AC-6, AC-7)
- `src/lib/__tests__/store.test.ts` — 8 unit tests covering B-1 through B-8 (AC-8)

**Approach:**
Write types first (no deps), then store (depends on types). TDD: write each failing test, implement minimally to pass, move to next. localStorage is faked via Zustand persist storage mock — no real browser storage in unit tests.

**Boundaries & mocks:**
- Browser localStorage: faked — Zustand persist `storage` option replaced with in-memory mock in tests. No real localStorage in unit tests.
- Smoke AC: AC-9 — localStorage round-trip in real browser after dev server; tested manually, not in CI.

**Behaviors (TDD order):**

B-1 (tracer bullet): Store initialises with default state
- RED: import store, assert `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`
- GREEN: write `src/lib/store.ts` with Zustand persist + `skipHydration: true` + defaults + install zustand

B-2: `setTrack` updates `currentTrack`
- RED: call `setTrack('dev')`, assert `currentTrack === 'dev'`
- GREEN: implement `setTrack` action

B-3: `setLevel` updates `currentLevel`
- RED: call `setLevel('p5')`, assert `currentLevel === 'p5'`
- GREEN: implement `setLevel` action

B-4: `toggleFocusedView` inverts `focusedView`
- RED: call `toggleFocusedView()` twice, assert true then false
- GREEN: implement `toggleFocusedView` action

B-5: `setRating` creates new assessment entry
- RED: call `setRating('dev/leadership/decision-making', 'meeting')`, assert `selfRating === 'meeting'` and `criteriaChecked: []`
- GREEN: implement `setRating` action

B-6: `setRating` second call preserves `criteriaChecked`
- RED: set rating, toggle criterion, set rating again — assert `criteriaChecked` still contains the criterion ID
- GREEN: update `setRating` to merge instead of overwrite

B-7: `toggleCriterion` adds criterion ID on first call
- RED: call `toggleCriterion('dev/leadership/decision-making', 'dev/leadership/decision-making/p3/0')`, assert ID in `criteriaChecked`
- GREEN: implement `toggleCriterion` add-path

B-8: `toggleCriterion` removes on second call, `selfRating` untouched
- RED: add then remove same criterion, assert `criteriaChecked` empty, `selfRating` preserved
- GREEN: update `toggleCriterion` toggle logic

**PR will contain:**
- `src/lib/types.ts`
- `src/lib/store.ts`
- `src/lib/__tests__/store.test.ts`

**Open questions / ambiguities:** None — TSD contracts are precise.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
