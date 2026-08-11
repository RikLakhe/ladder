# Behavior Spec — T-training-viewer-749xok: Training unit list in PF level tab
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-749xok/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): `computeHasSequencingIssue(unit, allUnitsById)` pure function — unit function that detects when a unit has a prerequisite with a higher sequence_order.
- Given: a unit with sequence_order and prereqs (jsonb array of {training_unit_id}), and a Map of all units by id
- When: computeHasSequencingIssue is called with the unit and allUnitsById
- Then: returns true if any prereq has sequence_order > unit.sequence_order; false if all prereqs have sequence_order <= unit.sequence_order or no prereqs exist

## B-2: AC-2 [behavior]: Training sub-slot inside the PF page level tab renders one row per unit showing sequenceOrder and name, grouped by type in the fixed order.
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: A unit whose prereqs contain any training_unit_id with a higher sequence_order than itself renders a visible sequencing-issue warning on that row and is never omitted from the list.
- Given:
- When:
- Then:

## B-4: AC-4 [e2e]: A user navigating to a PF page and selecting a level tab sees the training unit list without error for all seeded competencies.
- Given:
- When:
- Then:

