# Behavior Spec — T-ladder-v1-lul11w: Competency Detail: Full Level Browse
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-lul11w/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Page renders exactly 6 level cards (P2–P7) in ascending order; each shows level badge, descriptor text, and criteria as plain text — no checkboxes or rating controls
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Card matching `currentLevel` has blue border + blue background + "Your level" badge exactly once; no other card carries those styles
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Breadcrumb displays `{track.name} / {domain} / {competency.name}` at top; each segment links to its route
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: When `currentLevel` is `p7`, P7 card highlighted, page renders without runtime error, no next-level accessor crashes
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: When `currentLevel` is null/undefined, no card shows "Your level" badge
- Given:
- When:
- Then:

## B-6: AC-7 [e2e]: Engineer can browse all 6 level cards for any competency; current level is immediately visible
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0 — coverage:

