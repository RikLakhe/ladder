# Behavior Spec — T-training-viewer-inlybt: DB migration: training_units table
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-inlybt/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-4 [e2e]: After migration, seeded training_units rows for at least one competency+level are returned by a public GET request with no auth.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-1 [invariant]: `training_units` table exists with columns `id, competency_id, type, level, sequence_order, content, prereqs jsonb`; all new columns nullable or defaulted. — coverage:
- AC-2 [invariant]: Re-running migration on an already-migrated DB produces no error and no duplicate columns/constraints. — coverage:
- AC-3 [invariant]: RLS allows public SELECT on `training_units`; no auth required to read rows. — coverage:

