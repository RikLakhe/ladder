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
- Given: a freshly migrated database with RLS policies applied, one row present in `admin_users`, and one content table (e.g. `competencies`) with an existing row.
- When: (1) an unauthenticated connection attempts an INSERT/UPDATE/DELETE against the content table; (2) a connection authenticated as a non-admin (no matching `admin_users` row) attempts the same; (3) a connection authenticated as the admin user attempts the same; (4) any of the above attempts a SELECT.
- Then: (1) and (2) are rejected by the database; (3) succeeds; (4) succeeds for all three connection types.

## B-2: AC-3 [e2e]: running the migration against a fresh database end-to-end, then querying every listed table once, succeeds with no missing-table/column error.
- Given: a fresh, empty Postgres instance (Docker Compose) with no schema applied.
- When: the migration is run against it, then a SELECT is issued once against each of the 9 tables (`competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`).
- Then: the migration completes without error; every SELECT succeeds (empty result set is valid); none fails with a missing-table/column error. Additionally (AC-1 coverage): an INSERT violating any documented FK is rejected.

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-1 [invariant]: after running the migration against a fresh database, every table (`competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`) exists with its documented FKs enforced — an insert violating a FK is rejected. — coverage: asserted within B-2 (fresh-DB pass), locked as a regression guard via `lane red --regression` alongside B-2.
