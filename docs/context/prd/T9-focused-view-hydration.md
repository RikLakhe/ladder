# T9 — Focused View Toggle + Store Hydration
**Epic:** Self-Assessment — Focus Mode and SSR-Safe Hydration
**Milestone:** M4 (v0.4.0) — closes M4
**Branch:** feature/T9-focused-view

---

## Epic

Enable engineers to reduce visual noise in the career matrix by toggling a focused view that shows only their current and next career level, while ensuring Zustand persisted state is safely rehydrated from localStorage on every page load without breaking SSR.

---

## User Stories

1. **As an engineer browsing the career matrix**, I want to toggle a "focused view" so that I only see my current level and the next level, reducing the cognitive load of seeing all six level cards at once.

2. **As a P7 engineer in focused view**, I want to see a clear message confirming I am at the top of the career ladder so that I understand there is no next level to display, and the interface does not break or show an empty state.

3. **As an engineer who has set focused view to on**, I want that preference to persist across page refreshes and browser sessions so that I do not have to re-enable it every time I return to the platform.

4. **As a user of the platform**, I want the application to correctly restore my saved preferences (track, level, assessment data, focused view) on every page load without hydration errors or mismatches caused by localStorage reads during SSR.

---

## Tasks

1. **Add `focusedView` to the Zustand store**
   - Add `focusedView: boolean` field (default: `false`) to the persisted store slice.
   - Add `setFocusedView(value: boolean): void` action.
   - Confirm `focusedView` is included in the keys persisted to localStorage.

2. **Implement focused view filtering in `CompetencyAssessmentView`**
   - When `focusedView === false`: render all six level cards (P2–P7) as today.
   - When `focusedView === true`:
     - Call `getNextLevel(currentLevel)` to determine the next level.
     - If `currentLevel` is not P7: render only the current-level card and the next-level card.
     - If `currentLevel` is P7 (i.e., `getNextLevel` returns `null`): render only the P7 card and display the message: "You're at the highest level — P7 is the top of the Leapfrog career ladder."
   - Ensure no crash path when `getNextLevel` returns `null`.

3. **Add focused view toggle UI control**
   - Render a sticky toggle control inside `CompetencyAssessmentView` (e.g., a labelled switch or button).
   - On change, dispatch `setFocusedView` to the Zustand store.
   - Reflect current `focusedView` state as the toggle's checked/active value.
   - Do not use local component state — bind directly to the store.

4. **Create `StoreHydration` component at `src/components/StoreHydration.tsx`**
   - Mark as a client component (`'use client'`).
   - Component returns `null` (renders nothing to the DOM).
   - In a `useEffect` with an empty dependency array, call `useStore.persist.rehydrate()` exactly once on mount.
   - No other code paths may call `persist.rehydrate()` — remove any module-level calls if present.

5. **Wire `StoreHydration` into `src/app/layout.tsx`**
   - Import and render `<StoreHydration />` in the root layout so it executes on every page load.
   - Placement: inside the `<body>` but outside any page content wrappers to ensure it mounts early.

6. **Write Vitest + RTL tests**
   - `CompetencyAssessmentView` focused view tests (cover at minimum dev track; include leadership and decision-making tracks as additional cases per spec):
     - `focusedView=false`, `currentLevel=p3`: all six level cards (P2–P7) are visible.
     - `focusedView=true`, `currentLevel=p3`: P3 and P4 cards are visible; P2 and P5 cards are NOT visible.
     - `focusedView=true`, `currentLevel=p7`: only P7 card is visible, P6 card is NOT visible, and the message "You're at the highest level" is visible.
   - `StoreHydration` component test:
     - `persist.rehydrate()` is called exactly once after mount.
     - `persist.rehydrate()` is not called during render (only in `useEffect`).

7. **Type-safety audit**
   - Confirm no `any` types are introduced.
   - Confirm `getNextLevel` return type is `Level | null` and the null branch is handled explicitly.

---

## Acceptance Criteria

1. **Focused view — default off:** On initial load with no stored preference, all six level cards (P2–P7) are rendered in `CompetencyAssessmentView`. The toggle control is visible and shows an "off" state.

2. **Focused view — P3 (mid-level) on:** When `focusedView` is `true` and `currentLevel` is `p3`, exactly two cards are rendered: P3 and P4. Cards for P2, P5, P6, and P7 are absent from the DOM (not merely hidden).

3. **Focused view — P7 edge case on:** When `focusedView` is `true` and `currentLevel` is `p7`, exactly one level card is rendered (P7). The P6 card is absent from the DOM. The string "You're at the highest level — P7 is the top of the Leapfrog career ladder." is present and visible in the UI. No JavaScript error is thrown.

4. **Focused view — P7 edge case never crashes:** `getNextLevel('p7')` returning `null` does not produce an unhandled exception, blank render, or React error boundary trigger in any scenario.

5. **focusedView toggle persists across page reload:** Enabling focused view, then reloading the page, results in focused view remaining enabled with no flash of the six-card layout before hydration.

6. **focusedView state lives in the store:** No `useState` or `useReducer` call manages the focused view toggle inside `CompetencyAssessmentView` or any child component. State is read from and written to the Zustand store only.

7. **`StoreHydration` renders nothing:** `<StoreHydration />` produces no DOM output — querying the rendered tree for any child elements returns empty.

8. **`persist.rehydrate()` called exactly once on mount:** In the `StoreHydration` unit test, the mock confirms `rehydrate` is invoked one time after the component mounts, and zero times synchronously during render.

9. **`persist.rehydrate()` not called at module level:** A codebase search confirms no call to `persist.rehydrate()` exists outside of a `useEffect` callback. SSR does not trigger rehydration.

10. **No `any` types:** TypeScript strict-mode compile (`tsc --noEmit`) passes with zero errors on all files touched by this task.

11. **All tests pass:** `vitest run` exits with zero failures. The four new test cases (three for `CompetencyAssessmentView`, one for `StoreHydration`) are present and green.

12. **`StoreHydration` is registered in root layout:** `src/app/layout.tsx` imports and renders `<StoreHydration />` — confirmed by code inspection and by the absence of hydration mismatch warnings in the browser console during local dev.

---

## Definition of Done

- [ ] All twelve acceptance criteria above pass, verified by the implementer and confirmed by at least one reviewer.
- [ ] `vitest run` exits clean — zero failures, all four new tests present and green.
- [ ] `tsc --noEmit` exits clean — no TypeScript errors in files touched by this task.
- [ ] `persist.rehydrate()` grep confirms the call exists only inside `useEffect` in `StoreHydration.tsx` and nowhere else in the codebase.
- [ ] PR against `main` (or integration branch) is open with a description covering: what changed, how the P7 edge case is handled, and how hydration safety is guaranteed.
- [ ] PR is reviewed and approved; all CI checks pass.
- [ ] **M4 release procedure completed:**
  - Release branch `release/v0.4.0` cut from the merged feature branch.
  - `package.json` version bumped to `0.4.0` and committed.
  - PR from `release/v0.4.0` to `main` opened, approved, and merged.
  - Git tag `v0.4.0` created on the merge commit on `main`.
  - GitHub Release published for `v0.4.0` with a changelog summarising M4 deliverables (T7–T9).
