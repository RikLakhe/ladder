# Behavior Spec — T-competency-browser-4r2pp7: View functional analysis and badges for a primary function
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-4r2pp7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: A primary function's page exposes its `functional_analyses` content by level, filtered to that `pf_id`.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: A primary function's page lists badges (name + level) filtered to that `pf_id`; a primary function with no rows in either table renders an explicit empty state.
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Navigating from a primary function to its functional-analysis/badges view renders data sourced from `functional_analyses` and `badges` for that `pf_id`.
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: `GET /api/primary-functions/:pfId/functional-analysis` returns a JSON array of `{level, body}` for that `pf_id` (per TSD S-0002.04 Interfaces).
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: `GET /api/primary-functions/:pfId/badges` returns a JSON array of `{id, name, level}` for that `pf_id` (per TSD S-0002.04 Interfaces).
- Given:
- When:
- Then:

