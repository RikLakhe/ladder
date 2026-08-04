# Behavior Spec — T-competency-browser-18gycw: Browse competencies
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-18gycw/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /` lists every competency in `competencies` as a card, each showing its name and its count of rows in `primary_functions`.
- Given: a database with one competency that has two `primary_functions` rows and one competency with zero.
- When: the home-page data function is called.
- Then: it returns one entry per competency, each with the competency's name and its correct `primary_functions` count (2 and 0 respectively).

## B-2: AC-2 [e2e]: Visiting `/` unauthenticated renders the competency list without any login prompt.
- Given: the running app, a database seeded with at least one competency, and no auth session/cookie sent.
- When: an unauthenticated HTTP GET is made to `/`.
- Then: the response is 200, the body contains the seeded competency's name, and contains no login/sign-in prompt markup.

