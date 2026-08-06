# Behavior Spec — T-competency-browser-i1zgmq: Styled app shell + level-tab PF page (design/01-competency-browser.md)
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-i1zgmq/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: The home page renders inside a shared app shell — a header (app name + search input) and a left sidebar — and lists each competency as a card within that shell.
- Given: a `<Shell>` component given a list of competencies and arbitrary children.
- When: `<Shell>` is rendered.
- Then: it renders the app name ("Ladder"), a sidebar `<nav>` containing a link per given competency, and the given children — proving the shell building block AC-1's shared-shell requirement builds on.

## B-2: AC-2 [behavior]: A competency page renders inside the same shared shell and lists that competency's primary functions as clickable pills, each linking to its primary-function page.
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: A primary-function page renders its Standard content (grouped by level) behind a level-tab control (P2–P7): selecting a tab shows only that level's standard/functional-analysis/badges content, with no full-page navigation required.
- Given:
- When:
- Then:

## B-4: AC-4 [e2e]: Navigating Home → Competency → Primary Function → a level tab on a running server reaches content sourced from the DB for the selected level, with the shared header/sidebar present at every step.
- Given:
- When:
- Then:

