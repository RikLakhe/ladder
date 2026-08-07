---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "4afc96b5a02be6d03f2ab19ab0cf02a73f998998959039ae655bc35cdcd47b22"
---
## Task T-training-viewer-749xok — Training unit list in PF level tab
**Parent:** story S-0005.01 · feature 0005-master-training-viewer (docs/features/0005-master-training-viewer/PRD.md + TSD.md)
**Slice:** API endpoint + training sub-slot inside `<LevelTabContent>` — full vertical (API → component → rendered list)
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `GET /api/competencies/:competencyId/training?level=X` returns a JSON array of `{id, type, level, sequenceOrder, name}` for that competency+level, grouped by fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order`; no rows from other competency_ids or levels appear.
- [ ] AC-2 [behavior]: Training sub-slot inside the PF page level tab renders one row per unit showing sequenceOrder and name, grouped by type in the fixed order.
- [ ] AC-3 [behavior]: A unit whose prereqs contain any training_unit_id with a higher sequence_order than itself renders a visible sequencing-issue warning on that row and is never omitted from the list.
- [ ] AC-4 [e2e]: A user navigating to a PF page and selecting a level tab sees the training unit list without error for all seeded competencies.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
**Test scope:** tests/T-training-viewer-749xok/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
