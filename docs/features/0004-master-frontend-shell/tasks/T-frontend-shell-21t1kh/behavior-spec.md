# Behavior Spec — T-frontend-shell-21t1kh: Competency page with document tabs
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-21t1kh/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Competency page shows name, domain, PF pills, and a tab strip (Standard/Assessment/Training/Evidence); switching tabs swaps the panel client-side, no reload.
- Given: `<CompetencyTabs>` rendered with distinct panel content for Standard/Assessment/Training/Evidence tabs.
- When: user clicks the "Assessment" tab button.
- Then: the Assessment panel content is shown and the Standard panel content is no longer shown, with no navigation/page reload (component state only).

## B-2: AC-2 [behavior]: Standard tab renders from the real standards API; Assessment/Training/Evidence tabs render from a mock data service when no real API exists.
- Given:
- When:
- Then:

## B-3: AC-4 [e2e]: Clicking a PF pill navigates to that PF's page with the level tab strip.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: A tab with no backing content shows `<EmptyState>`, never a blank panel or crash. — coverage:

