# Behavior Spec — T-competency-browser-c1iutj: View a standard document by level
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-c1iutj/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /primary-functions/:pfId/standard` renders performance criteria from `standards` grouped by level, in level order (P2–P7), for that `pf_id`.
- Given: fixture DB with two primary functions, each with `standards` rows at levels P2, P4, P7 (inserted out of level order), with distinct `body` text.
- When: calling the data query function for one primary function's `pf_id` (no level filter).
- Then: returns exactly that PF's standards rows, ordered P2, P4, P7 (level order), with none of the other PF's rows.

## B-2: AC-2 [behavior]: `?level=<level>` narrows the view to that level's criteria only; a level with no `standards` row renders an explicit empty state, not an error.
- Given: fixture DB with a primary function having a `standards` row at P2 only (no P4 row).
- When: calling the data query function for that `pf_id` with `level="P2"`, and separately with `level="P4"`.
- Then: `level="P2"` returns exactly one row (`{level: "P2", body: ...}`); `level="P4"` returns an empty array (not an error, not a thrown exception).

## B-3: AC-3 [e2e]: Navigating from a primary-function pill to its standard doc renders content for that `pf_id`.
- Given: running app, seeded DB with one competency, one primary function under it, and one `standards` row for that PF at level P2.
- When: unauthenticated GET `/competencies/:id`, then GET `/primary-functions/:pfId/standard` for that PF's id (following the PF pill's link).
- Then: competency page's PF pill links to `/primary-functions/:pfId/standard`; that page returns 200 and renders the standard's body text for that `pf_id`.

## B-4: AC-4 [behavior]: `GET /api/primary-functions/:pfId/standard` returns a JSON array of `{level, body}` ordered by level for that `pf_id`; `?level=<level>` narrows the JSON response to that level's row only (per TSD S-0002.03 Interfaces).
- Given: fixture DB with two primary functions, each with `standards` rows at levels P2 and P7.
- When: calling the route handler's GET for one PF's id with no query, and separately with `?level=P2`.
- Then: no-query response is 200 JSON array of exactly that PF's `{level, body}` rows in level order; `?level=P2` response is 200 JSON array of exactly the one matching row.

