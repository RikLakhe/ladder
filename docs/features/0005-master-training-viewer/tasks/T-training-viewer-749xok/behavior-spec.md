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

## B-2: `GET /api/competencies/:competencyId/training?level=X` returns training units ordered by type then sequence_order, with hasSequencingIssue flag
- Given: A seeded database with training_units for a competency at a specific level, some with forward prerequisites (sequencing issues)
- When: GET /api/competencies/:competencyId/training?level=P3 is called
- Then: Returns JSON array of {id, type, level, sequenceOrder, name, hasSequencingIssue} for that competency+level only, ordered by type (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then sequence_order; units with forward prereqs have hasSequencingIssue:true

## B-3: PF page training section renders rows grouped by type, with sequencing-issue warning visible
- Given: A <TrainingSection> component with TrainingUnitRow[] including units with hasSequencingIssue:true
- When: The component is rendered
- Then: Renders one row per unit showing sequenceOrder and name; rows grouped by type headers in fixed order; rows with hasSequencingIssue:true display "⚠ sequencing issue" warning text; empty units array renders gracefully

## B-4: E2E full navigation to PF page with training section and sequencing-issue warning visible
- Given: A running app with seeded competencies, primary functions, and training_units (including a unit with forward prereq)
- When: A user navigates to /primary-functions/:pfId?level=P3
- Then: Page loads without error; training <section> is visible with rows; row with hasSequencingIssue shows "⚠" warning; no crash or 500 error

