---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "a4afaf5672f457a77d367c2ca3576348ecde10d804a9026b3dab562f68701955"
---
## Task T-admin-cms-5btxah — Training Unit editor
**Parent:** story S-0006.07 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Training Unit editor presents `type` (concept_notes / guided_exercise / autonomous_project / onboarding / reference_card select), `level` (P2–P7 select), `sequence_order` (numeric input with auto-suggest of next available value for the competency+level), `content` (plain text), and `competency_id` (select). All required.
- [ ] AC-2 [behavior] — `prereqs` is a multi-select picker showing only Training Units within the same competency whose `sequence_order` is strictly less than the current unit's `sequence_order`. Units with equal or greater `sequence_order` do not appear in the picker.
- [ ] AC-3 [behavior] — Editor participates in the shared save flow: change note required, diff preview shown, atomic transaction.
- [ ] AC-4 [e2e] — An admin creates a Training Unit at `sequence_order` 3 with a prereq set to a unit at `sequence_order` 1. A `document_versions` row is produced. The training viewer renders no sequencing-issue warning for this unit. A unit at `sequence_order` 4 is absent from the prereq picker.

**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-admin-cms-5btxah/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
