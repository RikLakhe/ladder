## Task T-ladder-v1-uogik5 — Focused View Toggle and SSR-Safe Hydration
**Story:** S-0001.09 · feature 0001-master-ladder-v1
**Milestone:** M4 (v0.4.0) — closes M4
**Depends on:** T-ladder-v1-5ajvs2
**Slice:** Full vertical — focused view filtering + StoreHydration component; preference persists SSR-safely
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `focusedView=false` (default): all 6 level cards visible in `CompetencyAssessmentView`
- [ ] AC-2 [behavior]: `focusedView=true`, `currentLevel=p3`: exactly P3 and P4 cards in DOM; P2/P5/P6/P7 absent (not hidden)
- [ ] AC-3 [behavior]: `focusedView=true`, `currentLevel=p7`: exactly P7 card in DOM; "You're at the highest level — P7 is the top of the Leapfrog career ladder." visible; no runtime error
- [ ] AC-4 [invariant]: No `useState`/`useReducer` manages focused view in any component; state lives only in Zustand store via `setFocusedView(value: boolean)`
- [ ] AC-5 [behavior]: `StoreHydration` renders null; calls `persist.rehydrate()` exactly once inside post-mount effect; never at module level or during SSR
- [ ] AC-6 [invariant]: `persist.rehydrate()` exists only inside `useEffect` in `StoreHydration.tsx` — grep confirms no other call site
- [ ] AC-7 [behavior]: `StoreHydration` is rendered in root layout, executing on every page load
- [ ] AC-8 [e2e]: Enabling focused view then reloading: focused view remains enabled with no flash of the 6-card layout before hydration
**End-to-end AC:** AC-8 [e2e] — focused view persists across reload with no hydration flash in browser
**Tests:** AC-1 through AC-7 — ordered; tracer bullet = AC-5 (StoreHydration renders null + rehydrate called once)
**Test scope:** src/components/__tests__/StoreHydration.test.tsx, (focused view tests in CompetencyAssessmentView test file)
**Done =** reviewable PR, all 4 Vitest tests green (3 focused-view + 1 StoreHydration), hydration tested in browser, `tsc --noEmit` clean.
