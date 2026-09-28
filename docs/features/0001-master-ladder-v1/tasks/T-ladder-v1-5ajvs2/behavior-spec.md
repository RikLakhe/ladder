# Behavior Spec — T-ladder-v1-5ajvs2: Self-Assessment: Criteria Checks and Self-Rating
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-5ajvs2/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `CompetencyAssessmentView` renders a checkbox + label for each criterion; checking calls `toggleCriterion(assessmentKey, criterion.id)` on store
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Renders 3 self-rating buttons (Developing, Meeting, Exceeding); each `aria-pressed` reflects store state; clicking calls `setRating(assessmentKey, rating)`
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Current level card has blue border + blue background + "Your level" badge; assessment key = `{trackId}/{domainId}/{competencyId}`
- Given:
- When:
- Then:

## B-4: AC-6 [behavior]: `TrackDomainList` renders clickable card + `ProgressRing` for each non-coming-soon domain; coming-soon domains show badge only — no ring, no link
- Given:
- When:
- Then:

## B-5: AC-7 [e2e]: Checking a criterion updates the domain progress ring immediately; self-rating persists across page reload via localStorage
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: Criterion ID format `{shared|dev}/{domainId}/{competencyId}/{level}/{index}` (0-based) enforced at type or utility level — not ad-hoc string concatenation — coverage:
- AC-5 [invariant]: Operation on key A has zero effect on `criteriaChecked` or `selfRating` of any other key B — coverage:

