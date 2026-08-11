# Behavior Spec — T-training-viewer-ywzj2v: Reference card
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-ywzj2v/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /api/competencies/:competencyId/reference-card?level=X` returns a JSON array of `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}`, one entry per join of badges → training_units → instruments for the requested competency+level; no rows from other competency_ids or levels appear.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Reference card page renders a paginated table of badge_code → training unit name → instrument name rows; total row count is shown; rows exceeding page size do not render outside the viewport.
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: A user views the reference card for a seeded competency+level with more than 40 joined rows and sees a paginated table — first page row count ≤ page size, all rows reachable by paging through, no crash.
- Given:
- When:
- Then:

