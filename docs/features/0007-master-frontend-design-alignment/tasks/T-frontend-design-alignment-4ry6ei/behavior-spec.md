# Behavior Spec — T-frontend-design-alignment-4ry6ei: PF Page Structure Correction
> Source: task card ACs + docs/features/0007-master-frontend-design-alignment/tasks/T-frontend-design-alignment-4ry6ei/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: PF page header shows pf_number, name, and domain_classification
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: LevelTabStrip renders P2–P7; tabs with no standards row are disabled and visually distinct
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Clicking a disabled tab shows `EmptyState variant="not-applicable"` as the content body — not blank, not a crash
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: Standard, Badge, and Training sections render inside the active tab body, not at competency scope
- Given:
- When:
- Then:

## B-5: AC-5 [e2e]: A user navigating to a PF page sees P2–P7 tabs; clicking an N/A tab shows the empty state; clicking a valid tab shows Standard/Badge/Training content
- Given:
- When:
- Then:

