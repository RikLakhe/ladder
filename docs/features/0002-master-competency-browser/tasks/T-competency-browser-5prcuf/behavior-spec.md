# Behavior Spec — T-competency-browser-5prcuf: Drill into a competency's primary functions
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-5prcuf/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /competencies/:id` shows only primary functions whose `competency_id` equals `:id`.
- Given: fixture DB with two competencies, each with its own set of primary_functions rows.
- When: calling the data function for a given competency id (or requesting `/competencies/:id`).
- Then: returns exactly that competency's primary functions, none from the other competency.

## B-2: AC-3 [e2e]: Clicking a competency card on the home page navigates to that competency's page and shows its primary functions.
- Given: running app, seeded DB with one competency and its primary functions.
- When: unauthenticated GET `/` then GET `/competencies/:id` for that competency's id (following the card's link).
- Then: home page card links to `/competencies/:id`; that page returns 200 and renders the competency's primary function names.

## B-3: AC-4 [behavior]: `GET /api/competencies/:id/primary-functions` returns a JSON array of `{id, name}` for primary functions whose `competency_id` equals `:id` (per TSD S-0002.02 Interfaces).
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: unknown competency id returns a 404 / not-found state, for both the page and the API.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: Primary functions of other competencies never appear on this page. — coverage: B-1 (query scoped by competency_id; test asserts absence of the other competency's PFs).

