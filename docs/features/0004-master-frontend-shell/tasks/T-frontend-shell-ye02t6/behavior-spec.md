# Behavior Spec — T-frontend-shell-ye02t6: Home page
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-ye02t6/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Home lists every competency as a card (name, domain, PF count), sourced from the real competencies API.
- Given: the real competencies API returns a seeded set of competencies, each with a domain and PF count
- When: the Home page renders
- Then: one card renders per competency, each showing the competency's name, domain, and PF count

## B-2: AC-2 [behavior]: Focus panel and what's-next panel render only when their data source has content for the current session level/role; otherwise omitted entirely (no empty box).
- Given: a session level stored in sessionStorage (`ladder-level`) that the mock panel data service has content for, and a level it has no content for
- When: the Home page's panels render for each case
- Then: for the level with content, the Focus panel and What's Next panel render with that content; for the level with no content, neither panel renders any element (no empty box)

## B-3: AC-3 [e2e]: Clicking a competency card navigates to that competency's page.
- Given:
- When:
- Then:

