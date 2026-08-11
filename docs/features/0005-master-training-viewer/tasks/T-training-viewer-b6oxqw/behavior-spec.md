# Behavior Spec — T-training-viewer-b6oxqw: Training / learning path page
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-b6oxqw/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /[competency]/training?level=X` renders all training_units for that competency+level ordered by fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order`.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Guided exercises and autonomous projects each render a `<PrereqStepper>` showing this unit's position relative to its direct prereqs.
- Given:
- When:
- Then:

## B-3: AC-4 [behavior]: A unit with a prereq referencing a later sequence_order renders the sequencing-issue warning instead of crashing or silently working.
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: When no guided_exercise or autonomous_project rows exist for P6 or P7 in a competency, `<EmptyState variant="no-simulated-training">` renders with exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." — no blank section is shown.
- Given:
- When:
- Then:

## B-5: AC-6 [e2e]: A user navigates to `/[competency]/training?level=P4` for a seeded competency and sees the ordered list with prereq steppers and no crash.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: `<PrereqStepper>` is defined exactly once by this feature — no sibling feature redefines it (per BLUEPRINT §Boundary Rules shared-primitive rule). — coverage:

