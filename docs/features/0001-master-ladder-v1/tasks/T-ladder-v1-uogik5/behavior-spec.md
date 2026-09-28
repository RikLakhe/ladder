# Behavior Spec — T-ladder-v1-uogik5: Focused View Toggle and SSR-Safe Hydration
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-uogik5/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `focusedView=false` (default): all 6 level cards visible in `CompetencyAssessmentView`
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: `focusedView=true`, `currentLevel=p3`: exactly P3 and P4 cards in DOM; P2/P5/P6/P7 absent (not hidden)
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: `focusedView=true`, `currentLevel=p7`: exactly P7 card in DOM; "You're at the highest level — P7 is the top of the Leapfrog career ladder." visible; no runtime error
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: `StoreHydration` renders null; calls `persist.rehydrate()` exactly once inside post-mount effect; never at module level or during SSR
- Given:
- When:
- Then:

## B-5: AC-7 [behavior]: `StoreHydration` is rendered in root layout, executing on every page load
- Given:
- When:
- Then:

## B-6: AC-8 [e2e]: Enabling focused view then reloading: focused view remains enabled with no flash of the 6-card layout before hydration
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: No `useState`/`useReducer` manages focused view in any component; state lives only in Zustand store via `setFocusedView(value: boolean)` — coverage:
- AC-6 [invariant]: `persist.rehydrate()` exists only inside `useEffect` in `StoreHydration.tsx` — grep confirms no other call site — coverage:

