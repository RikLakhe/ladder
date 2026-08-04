---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "fb9b910870c1f9b0775d21a2784e58c625d2fa5b2d56f5e4ac2b7746f19434ab"
---
# TSD 0001 — Ladder: Project Initialization & Shared Foundation
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

## TSD S-0001.01 — Shared data model migration (PRD §S-0001.01)
| Aspect | Spec |
|--------|------|
| Interfaces | A single repeatable, idempotent migration operation, invoked with no runtime arguments, applicable to a fresh database. |
| Data / State | Tables: `competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`. FKs: `primary_functions.competency_id → competencies.id`, `standards.pf_id → primary_functions.id`, `badges.pf_id → primary_functions.id`, `instruments.pf_id → primary_functions.id`, `training_units.competency_id → competencies.id`, `document_versions.changed_by → admin_users.id`. Row-level access policy per content table: read unrestricted, write restricted to rows present in `admin_users`. |
| Behavior | After running the migration against a fresh database, every table above exists with its documented columns and constraints; a read against any of them succeeds (empty result set is valid, missing table/column is not). |
| Access | Schema itself has no runtime caller; access policy behavior is exercised through S-0001.03 and the sibling features. |
| Boundaries | The database service itself (external, not owned by this story) — schema application depends on connecting to a real or ephemeral instance of it. |
| Tests | Integration: after migration, assert every listed table exists with its FK constraints enforced (an insert violating a FK is rejected) and that the write-policy rejects an unauthenticated/non-admin write while allowing an admin write. Smoke: run the migration against a fresh database end-to-end and query each table once. |

## TSD S-0001.02 — App scaffold & routing shell (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | One HTTP route (`/`) serving a placeholder response. Four shared UI contracts other features depend on: a level-tag display taking a single level value (P2–P7); a level-tab strip taking a current level and enough context to know which levels are inapplicable (rendered disabled, not hidden); a layout container exposing named sub-slots for standard/badge/training content; an empty-state display taking a variant identifier and rendering variant-appropriate copy. |
| Data / State | None — this story ships structure and empty/minimal component behavior, no persisted state. |
| Behavior | A request to `/` returns a successful response with placeholder content. Each shared UI contract renders without a runtime error for any valid input, including a level marked inapplicable and an unrecognized-but-declared empty-state variant (renders a safe fallback, never crashes). |
| Access | Fully public, no session/authentication involved anywhere in this story. |
| Boundaries | None — no external service, clock, randomness, or filesystem dependency in this story's scope. |
| Tests | Unit: each shared UI contract renders correctly for its documented input range (valid level, inapplicable level, each declared empty-state variant, an undeclared variant). Smoke: start the app and fetch `/`, confirming a successful response end to end. |

## TSD S-0001.03 — Seed data for local development (PRD §S-0001.03)
| Aspect | Spec |
|--------|------|
| Interfaces | A single seed operation, invoked with no runtime arguments, run against an already-migrated database. |
| Data / State | Populates: one competency and its primary functions; at least one standard per applicable level; at least one badge whose evidence reference resolves to a real row in a real instrument; at least one training-unit sequence whose prerequisites only ever point to earlier-sequenced units. Includes at minimum one primary-function/level pair with no standard row (an inapplicable-at-level gap) and one competency/level with no guided-exercise or autonomous-project training units (the P6/P7 gap). |
| Behavior | After running against a freshly migrated, empty database, querying the seeded competency returns matching rows across every table from S-0001.01; the seeded badge's evidence reference resolves to real instrument row content; the seeded training sequence's prerequisites all point backward; the two intentional gap cases are present and queryable. |
| Access | Development/test tooling only — not reachable through any application-facing route or by an unauthenticated/non-admin caller. |
| Boundaries | The database service (external) — seeding requires a live connection to a migrated instance. |
| Tests | Integration: run the seed operation against a fresh migrated database, then assert row presence and shape for the full vertical slice and both intentional gap cases. Smoke: fresh database → migrate → seed → one manual read of the seeded competency, end to end. |
