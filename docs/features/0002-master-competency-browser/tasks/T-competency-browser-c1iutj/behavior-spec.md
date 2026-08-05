# Behavior Spec — T-competency-browser-c1iutj: View a standard document by level
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-c1iutj/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /primary-functions/:pfId/standard` renders performance criteria from `standards` grouped by level, in level order (P2–P7), for that `pf_id`.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: `?level=<level>` narrows the view to that level's criteria only; a level with no `standards` row renders an explicit empty state, not an error.
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Navigating from a primary-function pill to its standard doc renders content for that `pf_id`.
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: `GET /api/primary-functions/:pfId/standard` returns a JSON array of `{level, body}` ordered by level for that `pf_id`; `?level=<level>` narrows the JSON response to that level's row only (per TSD S-0002.03 Interfaces).
- Given:
- When:
- Then:

