# Behavior Spec — T-frontend-design-alignment-avoe6n: Training Viewer Corrections
> Source: task card ACs + docs/features/0007-master-frontend-design-alignment/tasks/T-frontend-design-alignment-avoe6n/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: When no guided_exercise or autonomous_project units exist for the active level, `EmptyState variant="no-simulated-training"` renders with exact copy "Growth at this level is demonstrated through real project scope, not simulated exercises."
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Any training unit with `hasSequencingIssue=true` renders a visible "⚠ sequencing issue" indicator alongside its row
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: A user on the training section for a P6 or P7 level (with no seeded exercises) sees the exact fixed copy, not a blank section or generic "no data"
- Given:
- When:
- Then:

