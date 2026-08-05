# Behavior Spec — T-competency-browser-4r2pp7: View functional analysis and badges for a primary function
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-4r2pp7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: A primary function's page exposes its `functional_analyses` content by level, filtered to that `pf_id`.
- Given: fixture DB with two primary functions, each with `functional_analyses` rows at distinct levels with distinct `body` text.
- When: calling the data query function for one PF's `pf_id`.
- Then: returns exactly that PF's `functional_analyses` rows, none of the other PF's.

## B-2: AC-2 [behavior]: A primary function's page lists badges (name + level) filtered to that `pf_id`; a primary function with no rows in either table renders an explicit empty state.
- Given: fixture DB with a PF that has `badges` rows, another PF with `functional_analyses` rows, and a third PF with no rows in either table.
- When: calling the badges data query function for the PF with badges, and both data query functions for the PF with neither table populated.
- Then: badges query returns exactly that PF's badge rows (name+level), none of another PF's; the empty PF's queries both return `[]`, not an error.

## B-3: AC-3 [e2e]: Navigating from a primary function to its functional-analysis/badges view renders data sourced from `functional_analyses` and `badges` for that `pf_id`.
- Given: running app, seeded DB with one competency, one PF under it, one `functional_analyses` row and one `badges` row for that PF.
- When: unauthenticated GET `/competencies/:id`, then GET `/primary-functions/:pfId` for that PF's id (following its link).
- Then: competency page links to `/primary-functions/:pfId`; that page returns 200 and renders both the functional-analysis body text and the badge name for that `pf_id`.

## B-4: AC-4 [behavior]: `GET /api/primary-functions/:pfId/functional-analysis` returns a JSON array of `{level, body}` for that `pf_id` (per TSD S-0002.04 Interfaces).
- Given: fixture DB with two PFs, each with `functional_analyses` rows.
- When: calling the route handler's GET for one PF's id.
- Then: 200 JSON array of exactly that PF's `{level, body}` rows, none of the other PF's.

## B-5: AC-5 [behavior]: `GET /api/primary-functions/:pfId/badges` returns a JSON array of `{id, name, level}` for that `pf_id` (per TSD S-0002.04 Interfaces).
- Given: fixture DB with two PFs, each with `badges` rows.
- When: calling the route handler's GET for one PF's id.
- Then: 200 JSON array of exactly that PF's `{id, name, level}` rows, none of the other PF's.

