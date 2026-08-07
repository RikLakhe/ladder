# Behavior Spec — T-frontend-shell-wbb2sr: Level View and Transition Guide
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-wbb2sr/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Level View shows a P2–P7 tab strip; selecting a level lists every applicable PF's criteria snippet at that level, grouped by competency.
- Given: two competencies seeded, each with a PF; one PF has a standard at P3, the other has no standard at P3
- When: the Level View page is rendered with level=P3 selected
- Then: a P2–P7 tab strip is shown with P3 marked selected; the PF with a P3 standard appears under its competency's heading showing its criteria snippet; the PF with no P3 standard does not appear as a broken/empty row

## B-2: AC-2 [behavior]: Transition Guide shows a grid of level-transition columns per competency; each row expands to show full before/after text and how it's assessed.
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Clicking a PF row in either view navigates to that PF's page at the matching level.
- Given:
- When:
- Then:

