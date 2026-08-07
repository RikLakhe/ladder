# Behavior Spec — T-frontend-shell-blcph7: Admin login and generic entity editor (mock-backed)
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-blcph7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `/admin/login` shows a username/password form; hardcoded credentials `system`/`TEST@123` sign in as admin, any other combination shows an invalid-credentials error.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: While signed in as admin, an admin-mode banner (email + logout) persists across public pages; logout returns to the public app.
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Each entity type (competency, primary function, standard, assessment, training item, badge) has both an add form and an edit form, reachable from that entity's admin listing/detail; each shows form → required change-note → diff preview → confirm-save, against a mock data service.
- Given:
- When:
- Then:

## B-4: AC-5 [e2e]: Login with `system`/`TEST@123` → banner appears → add a new entity of one type → preview → confirm-save → edit an existing entity of another type → preview → confirm-save → logout, all without a dead link or console error.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: Add and edit forms for every entity type share one generic editor component (fields config per entity type), not one bespoke form per entity. — coverage:

