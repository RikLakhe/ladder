# Behavior Spec — T-003: Seed data for local development
> Source: task card ACs + docs/features/0001-master-initialization/tasks/T-003/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: running the seed operation against a freshly migrated, empty database populates one competency's full vertical slice (primary functions, standards, a badge whose evidence resolves to a real instrument row, a training sequence whose prereqs only point backward), plus the two intentional gap cases (a level with no standard row; a P6/P7 competency+level with no guided-exercise/autonomous-project rows).
- Given:
- When:
- Then:

## B-2: AC-2 [e2e]: fresh database → migrate → seed → a manual read of the seeded competency returns matching rows across every table, end to end.
- Given:
- When:
- Then:

