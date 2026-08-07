# Behavior Spec — T-frontend-shell-gku47o: Training viewer (mock-backed)
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-gku47o/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: concept_notes subtype renders content; no PrereqStepper.
- Given: `<TrainingUnitView>` rendered with a concept_notes fixture `{ id: "u1", competencyId: "c1", type: "concept_notes", level: "P3", sequenceOrder: 1, content: "Learn the basics of X.", prereqs: [] }` and `allUnits={[fixture]}`
- When: rendered
- Then: the output contains the text "Learn the basics of X."
- And: no element with `data-testid="prereq-stepper"` is present

## B-2: AC-2 [behavior]: Learning Path shows prerequisites + ordered sequence with level gates; other subtypes show their own structured fields (goal/setup/steps, brief/AC, day/week/month).
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Navigating from a competency's Training tab to a specific item renders that item's detail page.
- Given:
- When:
- Then:

