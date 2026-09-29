# Behavior Spec — T-ladder-v1-5-d6og83: Matrix Heat-Map (S-0002.02)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-d6og83/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Track overview renders a `MatrixHeatMap` grid with 5 domain rows × 6 level columns; each cell coloured by completion: 0%=grey, 1–49%=`#B4FFD6`, 50–79%=`#79D9A5`, 80–99%=`#3EB474`, 100%=`#038E43` + checkmark
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Current-level column has a left border accent and "You" badge in its header
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Clicking a live domain cell navigates to `/{track.id}/{domain.id}`; coming-soon cells are non-interactive
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: Each cell has a `title` attribute: "{domain} · {LEVEL} — X of Y criteria met"
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: "Start Workshop" button above the grid navigates to `/{track.id}/workshop`
- Given:
- When:
- Then:

## B-6: AC-6 [behavior]: Radar chart (5 axes, one per domain) renders below the grid when ≥1 criterion is checked; hidden otherwise
- Given:
- When:
- Then:

## B-7: AC-7 [behavior]: Legacy domain cards (v1 ring pattern) are inside a `<details>` element labelled "Browse by domain", collapsed by default
- Given:
- When:
- Then:

## B-8: AC-8 [e2e]: A user on `/dev` sees the heat-map grid with their current level highlighted and can click a cell to reach the domain
- Given:
- When:
- Then:

