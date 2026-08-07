---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "86f7491c141ba405ebfa67778666d46448031b74e5212fd42a8e6992f6a5f28e"
---
# TSD 0005 — Training Viewer
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

**Schema note:** `training_units` table requires `(id, competency_id, type, level, sequence_order, content, prereqs jsonb)`. Migration (S-0005.04) adds missing columns nullable/defaulted, backward-compatible, before any viewer story runs.

## TSD S-0005.01 — Browse training units in the PF level tab  (PRD §S-0005.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:competencyId/training?level=X` — JSON array of `{id, type, level, sequenceOrder, name}` for that `competency_id` + `level`, ordered by fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order`. Training sub-slot inside `<LevelTabContent>` consumes this list. |
| Data / State | Reads `training_units` (read-only), filtered by `competency_id` and `level`. |
| Behavior | Every returned unit renders one row showing `sequenceOrder` and `name`. Rows grouped by `type` in fixed order. A unit whose `prereqs` contains any `training_unit_id` with a higher `sequence_order` than itself renders a visible sequencing-issue warning on that row — it is never omitted. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (sequencing-issue detection: prereq with higher sequence_order → warning flag; prereq with lower sequence_order → no warning) / integration (seeded competency+level → rows grouped and ordered correctly; no rows from other competency_ids or levels appear; unit with forward prereq → warning present in response) |

## TSD S-0005.02 — View full training / learning path page  (PRD §S-0005.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /[competency]/training?level=X` — HTML page. Reuses `GET /api/competencies/:competencyId/training?level=X` from S-0005.01 for data. `<PrereqStepper>` is a shared UI primitive (defined once by this feature, imported by any sibling feature — same boundary rule as `<TierChip>` and `<EmptyState>` per BLUEPRINT §Boundary Rules). |
| Data / State | Reads `training_units` (read-only) for requested competency+level. |
| Behavior | Page renders all units ordered by fixed type order then `sequence_order`. Guided exercises and autonomous projects each render a `<PrereqStepper>` showing this unit's position relative to its direct prereqs. A forward-prereq unit renders the sequencing-issue warning (not a crash, not silent). When `level` is P6 or P7 and no `guided_exercise` or `autonomous_project` rows exist for that competency, renders `<EmptyState variant="no-simulated-training">` with exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." — no blank section. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (`<PrereqStepper>` renders correct step position given a prereq list; forward-prereq → sequencing-issue rendered; P6/P7 with no guided/autonomous rows → EmptyState with exact copy; P6/P7 with rows present → EmptyState absent) / integration (full page for seeded competency+level → ordered output, stepper present on correct unit types, warning present on forward-prereq unit, no crash) |

## TSD S-0005.03 — View reference card  (PRD §S-0005.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:competencyId/reference-card?level=X` — JSON array of `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}`, one entry per join of `badges` → `training_units` → `instruments` for the requested competency+level. Reference card page consumes this endpoint and renders a paginated table. |
| Data / State | Reads `badges`, `training_units`, `instruments` (all read-only), joined by competency+level. |
| Behavior | Table rows display badge_code, training unit name, instrument name. Table is paginated — each page renders a bounded subset of rows; total row count is shown. Rows exceeding page size do not render outside the viewport. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (pagination: given N rows and page size P, page 1 returns rows 1–P, page 2 returns P+1–2P, last page returns remainder) / integration (seeded competency+level with >40 joined rows → paginated response, first page row count ≤ page size, all rows reachable across pages; empty competency+level → empty array, no crash) |

## TSD S-0005.04 — DB migration for training_units  (PRD §S-0005.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Database migration script applied before any training viewer code runs. No public API surface. |
| Data / State | Creates or alters `training_units` to ensure columns: `id`, `competency_id`, `type` (enum: learning_path, concept_notes, guided_exercise, autonomous_project, onboarding, reference_card), `level`, `sequence_order`, `content`, `prereqs jsonb`. All new columns added as nullable or with defaults — no existing rows broken. |
| Behavior | Migration applies once; re-running on an already-migrated database produces no error and no duplicate columns/constraints. Seed data for at least one competency+level is inserted by the migration or a companion seed script, queryable via public SELECT after migration. |
| Access | Migration runs with DB admin credentials (not exposed to public routes). Resulting table is readable by the public RLS role (SELECT allowed, no auth). |
| Boundaries | none |
| Tests | integration (clean DB → migration runs without error → training_units queryable → seeded rows present; already-migrated DB → re-run produces no error) |
