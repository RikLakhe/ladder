# Behavior Spec — T-competency-browser-3zo10s: Competencies JSON API
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-3zo10s/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /api/competencies` returns a JSON array of `{id, name, primaryFunctionCount}`, one entry per competency in `competencies`, count matching rows in `primary_functions`.
- Given:
- When:
- Then:

## B-2: AC-2 [e2e]: An unauthenticated request to `GET /api/competencies` returns 200 with the JSON array (no auth required, per TSD S-0002.01 Access).
- Given:
- When:
- Then:

