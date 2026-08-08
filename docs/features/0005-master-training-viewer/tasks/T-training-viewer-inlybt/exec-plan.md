---
approved_by: "unknown"
approved_at: "2026-08-08"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "1"
approved_sha256: "1d2c14df533d0601b692886a4f1606d79ba9553a20029eac9f1f155a4df1d7ff"
---
## Exec Plan — Task T-training-viewer-inlybt
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `migrations/0002_training_units_columns.sql` adds `type` (enum), `sequence_order`, `content` columns using `ADD COLUMN IF NOT EXISTS` — all nullable. Migration is idempotent.
- AC-2: Both `0001_init.sql` and `0002_training_units_columns.sql` use `IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` — safe to re-run.
- AC-3: RLS already enabled in `0001_init.sql` (`training_units_select` policy `USING (true)`); `0002` inherits it — no new RLS needed.
- AC-4: New API route `GET /api/training-units` returns all rows as JSON (no auth). Seed in `0002` inserts ≥1 row per competency+level using `INSERT ... ON CONFLICT DO NOTHING`.

**Approach:**
- Add `migrations/0002_training_units_columns.sql`: create enum `training_unit_type`, add missing columns, insert seed rows with `ON CONFLICT DO NOTHING`.
- Update `scripts/migrate.ts` to glob all `*.sql` files in `migrations/` and run them in alphanumeric order (idempotent).
- Add `src/app/api/training-units/route.ts` — simple `GET` returning `SELECT * FROM training_units`.
- One e2e test (B-1): run migrate → start dev server → `GET /api/training-units` → expect ≥1 row with correct shape.

**Boundaries & mocks:** none — tests hit the real DB (postgres via docker compose) and the real Next.js dev server.

**Behaviors (TDD order):**
- B-1 [tracer bullet / e2e — AC-4]: After migrate (both scripts), seeded `training_units` rows for ≥1 competency+level are returned by unauthenticated `GET /api/training-units`.
  - Invariants AC-1, AC-2, AC-3 are validated as properties of B-1: if the endpoint returns correctly-shaped rows, the columns exist (AC-1), if the test runs migrate twice without error (AC-2), if it returns without auth (AC-3).

**PR will contain:**
- `migrations/0002_training_units_columns.sql`
- `scripts/migrate.ts` (updated to run all SQL files in order)
- `src/app/api/training-units/route.ts`
- `src/lib/training-units.ts` (DB query function)
- `tests/T-training-viewer-inlybt/training-units-migration.e2e.test.ts`

**Open questions / ambiguities:** none — existing patterns (migrate.ts, e2e test structure, API route shape) are clear.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** none
- [ ] Refactor pass done (on green; tests unchanged) — before PR
