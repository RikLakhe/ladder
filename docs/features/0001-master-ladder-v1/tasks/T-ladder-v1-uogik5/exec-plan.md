---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "2"
approved_sha256: "f91056f5008b4fdfe5a3c76f45cfcdf05ae2fe046c92c2ad4b80f03fa67632b6"
---
## Exec Plan — Task T-ladder-v1-uogik5
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Modify `src/components/CompetencyAssessmentView.tsx` — add focused view toggle (reads/writes `focusedView` from store); when `focusedView=true` render only currentLevel + next level cards (or just currentLevel if p7) (AC-1, AC-2, AC-3, AC-4)
- `src/components/StoreHydration.tsx` — renders nothing; calls `useLadderStore.persist.rehydrate()` in `useEffect` exactly once (AC-5, AC-6, AC-7)
- Modify `src/app/layout.tsx` — add `<StoreHydration />` to root layout (AC-7)
- `src/components/__tests__/StoreHydration.test.tsx` — unit tests for StoreHydration (AC-5, AC-6)
- Modify `src/components/__tests__/CompetencyAssessmentView.test.tsx` — add focused view tests (AC-1, AC-2, AC-3, AC-4)

**Approach:**
Two RED/GREEN cycles. B-1: focused view in `CompetencyAssessmentView` — add toggle control + conditional card rendering. B-2: `StoreHydration` — post-mount rehydrate, renders null. Root layout gets `<StoreHydration />` in B-2 GREEN.

**Boundaries & mocks:**
- Boundary: browser localStorage via Zustand persist. Faked in unit tests via `setState`. For `StoreHydration`, mock `useLadderStore.persist.rehydrate` via `vi.spyOn` to assert call count and timing.

**Behaviors (TDD order):**

B-1 (tracer bullet): CompetencyAssessmentView focused view
- RED: add focused view tests to existing test file — tests fail (feature not yet implemented)
- GREEN: add toggle + conditional rendering to CompetencyAssessmentView
- Tests:
  - focusedView=false, currentLevel=p3 → 6 level badges (P2–P7) visible
  - focusedView=true, currentLevel=p3 → only P3 and P4 badges visible; P2/P5/P6/P7 absent from DOM
  - focusedView=true, currentLevel=p7 → only P7 badge visible; "You're at the highest level" message present

B-2: StoreHydration component
- RED: `StoreHydration.test.tsx` imports `StoreHydration` — fails (module missing)
- GREEN: create `StoreHydration.tsx`; add to layout.tsx
- Tests:
  - rehydrate() called exactly once after mount (useEffect)
  - rehydrate() not called synchronously during render
  - component renders no DOM elements

**PR will contain:**
- `src/components/CompetencyAssessmentView.tsx` (modified)
- `src/components/__tests__/CompetencyAssessmentView.test.tsx` (modified — new focused view tests)
- `src/components/StoreHydration.tsx`
- `src/components/__tests__/StoreHydration.test.tsx`
- `src/app/layout.tsx` (modified — add StoreHydration)

**Open questions / ambiguities:**
- TSD B-4: "no local useState/useReducer manages focused view" — toggle reads `focusedView` from store directly and calls `setFocusedView`. No local state needed; store is the source of truth.
- TSD B-5/B-6: `useLadderStore.persist.rehydrate()` is the Zustand persist API. `skipHydration: true` in store config means we must call rehydrate manually. StoreHydration calls it in `useEffect(() => { useLadderStore.persist.rehydrate() }, [])`.
- TSD B-3: "exactly one card rendered" at p7 means the component renders only the p7 card, not p7 + next (there is no next). The "highest level" message replaces the "next level" card slot.
- Adding focused view tests to existing CompetencyAssessmentView test file: these are new tests added to committed file. Must route through RED→GREEN (tests fail first because feature doesn't exist yet).

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
