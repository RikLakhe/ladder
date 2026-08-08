## TSD S-0005.04 — DB migration for training_units  (PRD §S-0005.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Database migration script applied before any training viewer code runs. No public API surface. |
| Data / State | Creates or alters `training_units` to ensure columns: `id`, `competency_id`, `type` (enum: learning_path, concept_notes, guided_exercise, autonomous_project, onboarding, reference_card), `level`, `sequence_order`, `content`, `prereqs jsonb`. All new columns added as nullable or with defaults — no existing rows broken. |
| Behavior | Migration applies once; re-running on an already-migrated database produces no error and no duplicate columns/constraints. Seed data for at least one competency+level is inserted by the migration or a companion seed script, queryable via public SELECT after migration. |
| Access | Migration runs with DB admin credentials (not exposed to public routes). Resulting table is readable by the public RLS role (SELECT allowed, no auth). |
| Boundaries | none |
| Tests | integration (clean DB → migration runs without error → training_units queryable → seeded rows present; already-migrated DB → re-run produces no error) |
