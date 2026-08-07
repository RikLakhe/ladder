# Behavior Spec — T-assessment-badge-viewer-94pi25: Badge summary card in PF page
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-94pi25/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: A badge card shows `badge_code` (monospace), `name`, `<TierChip>` (reused, not redefined), and a truncated `certifies` sentence.
- Given:
- When:
- Then:

## B-2: AC-3 [e2e]: The PF page's Badge sub-slot renders one card per badge tied to that `pf_id`/level, each linking to its (future) detail page.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: Badge card always shows the Not-attempted status (⚪) — no other state is ever rendered in v1. — coverage:

