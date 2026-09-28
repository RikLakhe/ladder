# Behavior Spec — T-ladder-v1-uogik5: Focused View Toggle and SSR-Safe Hydration
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-uogik5/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1/AC-2/AC-3 — CompetencyAssessmentView focused view
- Given: `CompetencyAssessmentView` rendered with store at various focusedView + currentLevel combinations
- When: focusedView=false; focusedView=true+p3; focusedView=true+p7
- Then: focusedView=false → all 6 level badges (P2–P7) in DOM; focusedView=true+p3 → only P3 and P4 badges present, P2/P5/P6/P7 absent from DOM; focusedView=true+p7 → only P7 badge present + "You're at the highest level" message visible

## B-2: AC-5/AC-6/AC-7 — StoreHydration component
- Given: `StoreHydration` component rendered with mocked `persist.rehydrate`
- When: component renders then mounts
- Then: renders no DOM elements; rehydrate() called exactly once after mount (useEffect); not called synchronously during render

## B-3: AC-8 [e2e]: focused view persists across reload; no flash of 6-card layout
- Given: app running in browser with focused view enabled
- When: user reloads page
- Then: focused view remains; no 6-card flash — manual verification

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: No `useState`/`useReducer` manages focused view; store-only via `setFocusedView` — coverage: B-1 (toggle writes directly to store; no local state in component)
- AC-6 [invariant]: `persist.rehydrate()` only in StoreHydration useEffect — coverage: B-2 (spy confirms; grep confirms no other call site)

