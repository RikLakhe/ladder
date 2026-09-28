## Task T-ladder-v1-lqeif5 — Data Model and Assessment Store
**Story:** S-0001.02 · feature 0001-master-ladder-v1
**Milestone:** M1 (v0.1.0)
**Depends on:** T-ladder-v1-uofvx6
**Slice:** Full vertical — defines all types and the persisted store that all UI tasks depend on
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `src/lib/types.ts` exports all 11 named symbols: `LevelId`, `TrackId`, `SelfRating`, `Criterion`, `LevelDescriptor`, `Competency`, `Domain`, `Track`, `CompetencyAssessment`, `AssessmentStore`, `LEVELS`
- [ ] AC-2 [invariant]: `LEVELS` is `readonly ['p2','p3','p4','p5','p6','p7']` (as-const tuple); `Domain.comingSoon` is a required boolean
- [ ] AC-3 [behavior]: `src/lib/store.ts` uses persisted store with `{ name: 'ladder-store', skipHydration: true }`; default state: `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`
- [ ] AC-4 [invariant]: Assessment key = `{trackId}/{domainId}/{competencyId}` (forward slashes); `setRating(key, rating)` 2-arg; `toggleCriterion(key, criterionId)` 2-arg
- [ ] AC-5 [behavior]: `setRating` merges `selfRating`, preserves `criteriaChecked`, initialises `criteriaChecked: []` if absent, sets `updatedAt` ISO timestamp
- [ ] AC-6 [behavior]: `toggleCriterion` adds criterion ID if absent; removes if present; preserves `selfRating`; sets `updatedAt`
- [ ] AC-7 [invariant]: Operation on key A has zero effect on any other key B
- [ ] AC-8 [behavior]: All 8 store unit tests pass; `tsc --noEmit` exits 0; no `any` types
- [ ] AC-9 [e2e]: Assessment state written to browser-local storage survives a page reload and is restored on next visit
**End-to-end AC:** AC-9 [e2e] — localStorage round-trip verified in browser
**Tests:** AC-1 through AC-8 — ordered; tracer bullet = AC-3 (store module import + default state)
**Test scope:** src/lib/__tests__/store.test.ts
**Done =** reviewable PR, all 8 store unit tests green, `tsc --noEmit` clean, no `any` types.
