# Behavior Spec — T-ladder-v1-jdsucm: Domain Detail: Competency List
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-jdsucm/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `ExploreButtonClient` renders a button with accessible text equal to `label`; calls `onClick` exactly once on click
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: `/dev/leadership` renders all leadership competency names; each card is a link with `href` matching `/{track}/{domain}/{competency-slug}`
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: `/qa/technical-skill` renders "Coming soon" text; zero competency links in DOM under any code path
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: Invalid track or domain returns 404
- Given:
- When:
- Then:

## B-5: AC-6 [e2e]: Engineer navigates Home → Track overview → Domain detail → sees competency list with no dead ends
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: When `domain.comingSoon === true` no anchor pointing to a competency slug is rendered — hard safety constraint, no exceptions — coverage:

