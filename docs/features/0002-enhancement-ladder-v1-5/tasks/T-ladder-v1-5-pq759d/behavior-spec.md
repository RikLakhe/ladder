# Behavior Spec — T-ladder-v1-5-pq759d: Polish and Accessibility (S-0002.05)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-pq759d/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `WorkshopWizard` handles `keydown`: `ArrowRight` / `Enter` (when focus not on an input/checkbox) = Next; `ArrowLeft` = Back; `Escape` = Skip
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Each `MatrixHeatMap` cell has `aria-label="{domain.name}, {LEVEL}, {X} of {Y} criteria met"`
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Wizard slide transitions are wrapped in `@media (prefers-reduced-motion: reduce) { transition: none; animation: none }` — no motion when preference is set
- Given:
- When:
- Then:

## B-4: AC-6 [e2e]: A user can complete the workshop wizard using keyboard only (ArrowRight to advance, ArrowLeft to go back)
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [non-functional]: `npm run build` exits 0 and `npx tsc --noEmit` exits 0 with no `any` types — coverage:
- AC-5 [non-functional]: Lighthouse ≥ 90 all four categories on a production build (manual audit before release PR) — coverage:

