## TSD S-0005.01 — Browse training units in the PF level tab  (PRD §S-0005.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:competencyId/training?level=X` — JSON array of `{id, type, level, sequenceOrder, name}` for that `competency_id` + `level`, ordered by fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order`. Training sub-slot inside `<LevelTabContent>` consumes this list. |
| Data / State | Reads `training_units` (read-only), filtered by `competency_id` and `level`. |
| Behavior | Every returned unit renders one row showing `sequenceOrder` and `name`. Rows grouped by `type` in fixed order. A unit whose `prereqs` contains any `training_unit_id` with a higher `sequence_order` than itself renders a visible sequencing-issue warning on that row — it is never omitted. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (sequencing-issue detection: prereq with higher sequence_order → warning flag; prereq with lower sequence_order → no warning) / integration (seeded competency+level → rows grouped and ordered correctly; no rows from other competency_ids or levels appear; unit with forward prereq → warning present in response) |
