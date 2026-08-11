# Behavior Spec — T-training-viewer-b6oxqw: Training / learning path page
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-b6oxqw/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.

## B-1 (tracer bullet): Training page renders units in fixed type order
- Given: a TrainingUnitRow[] with units of types concept_notes, guided_exercise, autonomous_project, and reference_card in mixed sequence_order
- When: the TrainingPage component renders with those units and level="P4"
- Then: units appear in DOM order: concept_notes first, then guided_exercise, then autonomous_project, then reference_card; within same type, by ascending sequenceOrder; each row shows sequenceOrder and name; PrereqStepper defined in exactly one source file (src/components/PrereqStepper.tsx)

## B-2: `<PrereqStepper>` renders step position given prereq list
- Given: prereqUnits [{id:"a", name:"A", sequenceOrder:1}, {id:"b", name:"B", sequenceOrder:2}] and currentUnit {id:"c", name:"C", sequenceOrder:3}
- When: PrereqStepper renders
- Then: exactly 3 step nodes visible in DOM; current unit ("C") appears at position 3 (last)

## B-3: P6/P7 with no guided_exercise or autonomous_project renders EmptyState
- Given: a TrainingUnitRow[] with only concept_notes units and level P6 (or P7)
- When: TrainingPage renders
- Then: EmptyState with text "Growth at this level is demonstrated through real project scope, not simulated exercises." is visible; when same level but units include a guided_exercise, EmptyState is absent

## B-4: Forward-prereq unit shows sequencing-issue warning
- Given: a TrainingUnitRow[] including a unit with hasSequencingIssue:true and another with hasSequencingIssue:false
- When: TrainingPage renders
- Then: the unit with hasSequencingIssue:true shows "⚠ sequencing issue" warning text; the unit with hasSequencingIssue:false does not show the warning

## B-5: E2e — navigate to training page, see ordered units and stepper
- Given: a running app with seeded competency, training_units (guided_exercise with prereqs, a forward-prereq unit), level P4
- When: GET /competencies/:id/training?level=P4
- Then: page returns 200; training unit rows present in HTML; "PrereqStepper" rendered for the guided exercise (prereq circle visible); "⚠ sequencing issue" warning present for forward-prereq unit; no crash or 500
