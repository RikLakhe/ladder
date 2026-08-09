# Behavior Spec — T-frontend-shell-m450y3: Search
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-m450y3/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1+AC-2 [behavior]: Search index query functions return typed results with href, title, snippet
- Given: a search index built from competencies, PFs, and mock badges
- When: queried with an exact badge code, a partial PF name, or a non-matching string
- Then: exact badge-code match returns a result with type="badge" and href="/badges/{code}"; partial PF-name match returns type="primary-function" and href containing the PF id; no-match returns an empty array; every result has type, title, snippet, href fields

## B-2: AC-1 [behavior]: Submitting the header search shows a results list (competency, PF, doc type, title, matched snippet).
- Given: a SearchBox component rendered with a pre-built index
- When: user types a query and submits the form
- Then: a results list appears showing each match's doc type, title, and snippet

## B-3: AC-3 [e2e]: Clicking a search result navigates to the corresponding PF page with the correct level tab selected.
- Given: the running app with search wired to real data
- When: user submits a search that matches a PF and clicks the result
- Then: the browser navigates to the PF page at the correct level tab
