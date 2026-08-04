---
approved_by: "unknown"
approved_at: "2026-08-04"
planned_behaviors: "1"
approved_sha256: "897e744878f4ab3bcf38f7d4cc4cff428ef18369f5e534d1f8b8b1dbc5cf1875"
---
## Exec Plan — Task T-001
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- A single idempotent SQL migration creating all 9 tables (`competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`) with documented FKs (AC-1).
- Row-level security policies per content table: public SELECT, admin-only INSERT/UPDATE/DELETE, keyed off `admin_users` (AC-2).
- Verification that migration + policies apply cleanly end-to-end against a fresh database (AC-3).

**Approach:** high-level only — NOT implementation prescription
- Plain SQL migration file(s) applied against a real Postgres instance (Docker Compose, `postgres:16`).
- RLS enforced at the database layer (Postgres native RLS + policies), not app-level checks — per CONSTITUTION Hard Rule.
- Tests connect directly to the database (real driver, real instance) and assert schema/constraint/policy behavior — no mocked DB layer.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- Database service: REAL — a Postgres instance provisioned via Docker Compose (`replay_env: docker compose up -d db`), not mocked. B-2 (AC-3, e2e) exercises this directly: fresh container → migration → query every table.
- No other externals (no clock/randomness/filesystem dependency in this story).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: AC-2 [behavior] — RLS write/read enforcement (unauth/non-admin write rejected, admin write succeeds, read unrestricted either way).
- B-2: AC-3 [e2e] — fresh DB → migration → query every table, no missing-table/column error.
- AC-1 [invariant] — FK enforcement — covered as a property asserted within B-2's fresh-DB pass (insert violating each FK rejected), locked via `lane red --regression`.

**PR will contain:**
- Migration SQL file(s) (schema + RLS policies).
- Docker Compose service definition for local/test Postgres.
- Test suite under `tests/T-001/` covering B-1, B-2, and the AC-1 FK regression guard.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None outstanding — DB test harness confirmed (Docker Compose Postgres) by user.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- security signal: RLS/access-control is the core of this task — flagged, but single signal only (not ≥2) — staying Lean.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
