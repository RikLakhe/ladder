# T2 — Types and Store
**Epic:** Data Model & State Foundation
**Milestone:** M1 (v0.1.0)
**Branch:** feature/T2-types-store

## Epic

Establish the complete TypeScript type system and Zustand store that all Ladder UI components depend on for career matrix browsing, self-assessment, and persistent state.

## User Stories

1. **As a Leapfrog engineer**, I want my track selection, level, and self-assessment ratings to persist across page refreshes so that I don't lose my progress between sessions.

2. **As a Leapfrog engineer**, I want to toggle individual observable criteria as checked or unchecked so that I can track which behaviours I've demonstrated at my current level.

3. **As a Leapfrog engineer**, I want to set a self-rating (developing / meeting / exceeding) for each competency independently of which criteria I've checked, so that both dimensions of my assessment are preserved simultaneously.

4. **As a developer building on the Ladder platform**, I want fully-typed interfaces for all domain entities (Track, Domain, Competency, LevelDescriptor, Criterion) so that I can implement UI components with confidence and zero `any` escapes.

## Tasks

1. **Create `src/lib/types.ts`**
   - Define `LevelId` as a string union: `'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'`
   - Define `TrackId` as a string union: `'dev' | 'qa' | 'data' | 'ai'`
   - Define `SelfRating` as a string union: `'developing' | 'meeting' | 'exceeding'`
   - Define `Criterion` interface: `{ id: string; text: string }`
   - Define `LevelDescriptor` interface: `{ level: LevelId; descriptor: string; criteria: Criterion[] }`
   - Define `Competency` interface: `{ id: string; name: string; description: string; levels: LevelDescriptor[] }`
   - Define `Domain` interface: `{ id: string; name: string; description: string; comingSoon: boolean; competencies: Competency[] }`
   - Define `Track` interface: `{ id: TrackId; name: string; description: string; domains: Domain[] }`
   - Define `CompetencyAssessment` interface: `{ selfRating?: SelfRating; criteriaChecked: string[]; updatedAt: string }`
   - Define `AssessmentStore` interface with state fields (`currentTrack`, `currentLevel`, `focusedView`, `assessments`) and action signatures (`setTrack`, `setLevel`, `toggleFocusedView`, `setRating`, `toggleCriterion`)
   - Export `LEVELS` constant array: `['p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const`

2. **Write 8 failing unit tests in `src/lib/__tests__/store.test.ts`** (TDD — tests first)
   - Test: initial state has correct defaults (`currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`)
   - Test: `setTrack('dev')` updates `currentTrack` to `'dev'`
   - Test: `setLevel('p5')` updates `currentLevel` to `'p5'`
   - Test: `toggleFocusedView()` sets `focusedView` to `true` when initially `false`
   - Test: `toggleFocusedView()` sets `focusedView` to `false` when called again
   - Test: `setRating('comp-1', 'p3', 'meeting')` creates a `CompetencyAssessment` with `selfRating: 'meeting'` and empty `criteriaChecked: []`
   - Test: `toggleCriterion('comp-1', 'p3', 'crit-a')` adds `'crit-a'` to `criteriaChecked`
   - Test: calling `toggleCriterion('comp-1', 'p3', 'crit-a')` a second time removes `'crit-a'` from `criteriaChecked`

3. **Create `src/lib/store.ts`**
   - Install `zustand` if not already present
   - Implement `useAssessmentStore` using Zustand's `create` with `persist` middleware
   - Persist config: `{ name: 'ladder-store', skipHydration: true }` — `skipHydration` is mandatory
   - Default state: `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`
   - `setTrack`: sets `currentTrack` to the given `TrackId`
   - `setLevel`: sets `currentLevel` to the given `LevelId`
   - `toggleFocusedView`: inverts the current `focusedView` boolean
   - `setRating`: merges `selfRating` into the existing assessment for `(competencyId, level)`, preserving any existing `criteriaChecked`; initialises `criteriaChecked: []` if no prior assessment exists; sets `updatedAt` to ISO timestamp
   - `toggleCriterion`: adds criterion ID to `criteriaChecked` if absent; removes it if present; preserves `selfRating`; sets `updatedAt` to ISO timestamp

4. **Run tests and confirm all 8 pass** — `npm test` must exit green with no TypeScript errors

5. **TypeScript strict check** — run `npx tsc --noEmit` and fix any errors before opening PR

## Acceptance Criteria

1. `src/lib/types.ts` exists and exports all 10 named types/interfaces/constants (`LevelId`, `TrackId`, `SelfRating`, `Criterion`, `LevelDescriptor`, `Competency`, `Domain`, `Track`, `CompetencyAssessment`, `AssessmentStore`, `LEVELS`).

2. `LEVELS` is typed as `readonly ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']` (or equivalent `as const` tuple), not `string[]`.

3. `Domain.comingSoon` is a required boolean field — the compiler rejects any `Domain` object that omits it.

4. `AssessmentStore` declares all five actions with correct signatures; the store implementation satisfies this interface without casting.

5. `src/lib/store.ts` uses Zustand `persist` with exactly `{ name: 'ladder-store', skipHydration: true }` — the `skipHydration` key must be present and `true`.

6. **Test: initial state** — a fresh store instance (no persisted data) has `currentTrack === null`, `currentLevel === 'p3'`, `focusedView === false`, `assessments` deep-equals `{}`.

7. **Test: setTrack / setLevel** — calling `setTrack('qa')` and then reading `currentTrack` returns `'qa'`; calling `setLevel('p6')` and reading `currentLevel` returns `'p6'`.

8. **Test: toggleFocusedView** — after one call `focusedView` is `true`; after a second call it is `false`.

9. **Test: setRating isolation** — `setRating('comp-1', 'p3', 'meeting')` produces `assessments['comp-1']['p3'].selfRating === 'meeting'` and `assessments['comp-1']['p3'].criteriaChecked` is an empty array. A subsequent call with `'exceeding'` updates `selfRating` to `'exceeding'` but does not clear any existing `criteriaChecked` items.

10. **Test: toggleCriterion add/remove** — first `toggleCriterion('comp-1', 'p3', 'crit-a')` call results in `criteriaChecked` containing `'crit-a'`; second call results in `criteriaChecked` not containing `'crit-a'`. The `selfRating` field is untouched by both calls.

11. All 8 unit tests pass under Vitest (`npm test` exits 0). No Jest imports, matchers, or config are used anywhere in the test file.

12. `npx tsc --noEmit` exits 0 with `strict: true`. No `any` type appears in `types.ts` or `store.ts`.

13. No `console.error` or unhandled promise rejections appear in the Vitest output.

## Definition of Done

- `src/lib/types.ts` contains all specified types, interfaces, and constants with no `any` escapes
- `src/lib/store.ts` implements all five actions with Zustand `persist` and `skipHydration: true`
- All 8 store unit tests pass under Vitest; test file uses only Vitest imports
- `setRating` merges with existing `criteriaChecked` and never overwrites it
- `toggleCriterion` correctly adds on first call and removes on second call for the same criterion ID
- `npx tsc --noEmit` exits clean with TypeScript strict mode enabled
- PR opened against `develop`, branch named `feature/T2-types-store`, all CI checks green
- No changes to files outside `src/lib/` (types, store, and their test) unless build config requires it
