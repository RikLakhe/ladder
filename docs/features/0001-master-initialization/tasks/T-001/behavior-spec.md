# Behavior Spec — T-001: Shared data model migration
> Source: task card ACs + docs/features/0001-master-initialization/tasks/T-001/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-2 [behavior]: an unauthenticated/non-admin write against any content table is rejected; an authenticated admin write succeeds; unrestricted read succeeds either way.
- Given:
- When:
- Then:

## B-2: AC-3 [e2e]: running the migration against a fresh database end-to-end, then querying every listed table once, succeeds with no missing-table/column error.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-1 [invariant]: after running the migration against a fresh database, every table (`competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`) exists with its documented FKs enforced — an insert violating a FK is rejected. — coverage:

