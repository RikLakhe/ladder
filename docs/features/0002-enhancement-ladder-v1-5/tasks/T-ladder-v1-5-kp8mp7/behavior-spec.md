# Behavior Spec — T-ladder-v1-5-kp8mp7: Results Dashboard (S-0002.04)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-kp8mp7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `/dev/results` renders a radar chart with 5 axes (one per non-coming-soon domain); two overlaid SVG polygons — filled (% criteria met) and outline (% criteria exceeding) at `currentLevel`
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Domain scorecards render horizontally: domain name, progress bar showing "X / Y criteria met", rating pills (N Developing · N Meeting · N Exceeding), "See details →" link to domain page
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Focus Areas shows exactly 3 competencies with lowest `metCount / total` at `currentLevel`; ties broken alphabetically; fewer than 3 if fewer competencies exist
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: "Export summary" button calls `window.print()` on a layout with radar + scorecards visible and navigation hidden via `@media print`
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: "Ready for P{n+1}?" nudge renders when `currentLevel !== 'p7'` and every non-coming-soon domain is ≥ 80% met; hidden otherwise
- Given:
- When:
- Then:

## B-6: AC-6 [e2e]: A user navigating to `/dev/results` after completing assessments sees their radar chart, scorecards, and focus areas
- Given:
- When:
- Then:

