---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "d08273ebacfb330efb42d28b27f3eed302209755f9b8d255059e7fb02b1269fe"
---
## Task T-training-viewer-b6oxqw — Training / learning path page
**Parent:** story S-0005.02 · feature 0005-master-training-viewer (docs/features/0005-master-training-viewer/PRD.md + TSD.md)
**Slice:** dedicated training page + `<PrereqStepper>` shared primitive + P6/P7 empty state — full vertical
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `GET /[competency]/training?level=X` renders all training_units for that competency+level ordered by fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order`.
- [ ] AC-2 [behavior]: Guided exercises and autonomous projects each render a `<PrereqStepper>` showing this unit's position relative to its direct prereqs.
- [ ] AC-3 [invariant]: `<PrereqStepper>` is defined exactly once by this feature — no sibling feature redefines it (per BLUEPRINT §Boundary Rules shared-primitive rule).
- [ ] AC-4 [behavior]: A unit with a prereq referencing a later sequence_order renders the sequencing-issue warning instead of crashing or silently working.
- [ ] AC-5 [behavior]: When no guided_exercise or autonomous_project rows exist for P6 or P7 in a competency, `<EmptyState variant="no-simulated-training">` renders with exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." — no blank section is shown.
- [ ] AC-6 [e2e]: A user navigates to `/[competency]/training?level=P4` for a seeded competency and sees the ordered list with prereq steppers and no crash.
**End-to-end AC:** AC-6 [e2e] — reachable through the running app
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6  ← ordered; first = tracer bullet
**Test scope:** tests/T-training-viewer-b6oxqw/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
