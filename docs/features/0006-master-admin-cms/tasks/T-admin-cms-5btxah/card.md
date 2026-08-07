## Task T-admin-cms-5btxah — Training Unit editor
**Parent:** story S-0006.07 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Training Unit editor presents: `type` (select: concept_notes | guided_exercise | autonomous_project | onboarding | reference_card), `level` (P2–P7 select), `sequence_order` (numeric input with an auto-suggest for next available value within the competency+level), `content` (plain text), `competency_id` (select).
- [ ] AC-2 [behavior] — `prereqs` is a multi-select picker constrained to only show Training Units within the same competency whose `sequence_order` is strictly less than the current unit's `sequence_order`. A unit with an equal or greater sequence_order cannot be selected.
- [ ] AC-3 [behavior] — The editor participates in the shared save flow (S-0006.02).
- [ ] AC-4 [e2e] — An admin creates a Training Unit at `sequence_order` 3 and sets a prereq to a unit at `sequence_order` 1. Save produces a `document_versions` row. The training viewer (PRD 03) renders no sequencing-issue warning for this unit. Attempting to set a prereq to a unit at `sequence_order` 4 (forward) is not possible — that unit does not appear in the picker.

**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-admin-cms-5btxah/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
