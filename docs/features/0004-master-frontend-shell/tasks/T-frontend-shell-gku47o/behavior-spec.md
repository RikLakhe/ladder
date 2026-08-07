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

## B-2: AC-2 [behavior]: guided_exercise shows PrereqStepper (valid prereq and forward-ref); learning_path shows ordered items with level labels; EmptyState no-simulated-training variant has correct copy.
- Given: four cases — (A) guided_exercise with a valid backward prereq, (B) guided_exercise with an invalid forward-ref prereq, (C) a learning_path unit with two prereqs, (D) the EmptyState "no-simulated-training" variant
- When: each is rendered via `<TrainingUnitView>` / `<EmptyState>`
- Then: (A) shows PrereqStepper with prereq content and no sequencing warning; (B) shows a "⚠ sequencing issue" warning; (C) shows an ordered list of 2 items each with level + content; (D) shows the no-simulated-training copy

- Given A (guided_exercise, backward prereq): `<TrainingUnitView>` rendered with fixture `{ id: "ge1", competencyId: "c1", type: "guided_exercise", level: "P3", sequenceOrder: 2, content: "Guided kata.", prereqs: ["cn1"] }` and `allUnits` containing `{ id: "cn1", ..., sequenceOrder: 1, content: "Concept notes.", prereqs: [] }`
- When: rendered
- Then: `data-testid="prereq-stepper"` is present; "Concept notes." text is visible; no "⚠ sequencing issue" text

- Given B (guided_exercise, forward prereq): same `allUnits` but unit is `{ id: "ge-bad", ..., sequenceOrder: 2, prereqs: ["ap1"] }` and allUnits includes `{ id: "ap1", sequenceOrder: 5, content: "AP." }`
- When: rendered
- Then: "⚠ sequencing issue" text is present in the stepper

- Given C (learning_path): `<TrainingUnitView>` with `{ id: "lp1", type: "learning_path", sequenceOrder: 10, prereqs: ["cn1", "ge1"] }` and allUnits containing cn1 (level "P3", content "Concept notes.", seq 1) and ge1 (level "P3", content "Guided kata.", seq 2)
- When: rendered
- Then: an ordered list (`<ol>`) is present; it contains 2 list items; each item shows the unit's level ("P3") and content text

- Given D (EmptyState variant): `<EmptyState variant="no-simulated-training" />` rendered
- When: rendered
- Then: contains "Growth at this level is demonstrated through real project scope, not simulated exercises."

## B-3: AC-3 [e2e]: Navigating from a competency's Training tab to a specific item renders that item's detail page.
- Given:
- When:
- Then:

