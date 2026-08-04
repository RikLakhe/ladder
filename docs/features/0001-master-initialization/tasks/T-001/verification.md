---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "1bd5077f989507a24140358e257610c154532b45849a4d155d05a8d984c6fa75"
---
## Verification — Task T-001 — 2026-08-04
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- All 9 tables present: `competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users` (migrations/0001_init.sql lines 5–62).
- All 6 documented FKs enforced: `primary_functions.competency_id→competencies.id` (line 17), `standards.pf_id→primary_functions.id` (line 23), `badges.pf_id→primary_functions.id` (line 36), `instruments.pf_id→primary_functions.id` (line 44), `training_units.competency_id→competencies.id` (line 50), `document_versions.changed_by→admin_users.id` (line 61). Functional_analyses.pf_id FK (line 30) reasonably inferred from table schema.
- Migration idempotent: `CREATE TABLE IF NOT EXISTS`, `CREATE ROLE IF NOT EXISTS`, `DROP POLICY IF EXISTS` + `CREATE OR REPLACE FUNCTION`, `ALTER TABLE ENABLE ROW LEVEL SECURITY` patterns all safe for re-runs (lines 5–97).
- RLS design secure: `is_admin()` uses `NULLIF(current_setting('app.current_user_id', true), '')::uuid` (line 80); missing GUC evaluates to NULL, `EXISTS` matches zero rows, function returns false. Non-superuser `app_user` role created (line 69), RLS enforced at DB boundary (lines 88–96).
- AC-1 [invariant]: FK enforcement tested via FK violation rejection (tests/T-001/migration-e2e.test.ts lines 39–45, rejects orphan competency_id).
- AC-2 [behavior]: RLS write/read tested via real RLS policies on non-superuser role (tests/T-001/rls.test.ts B-1): unauthenticated write rejected (lines 45–51), non-admin write rejected (lines 54–61), admin write succeeds (lines 63–70), unrestricted read succeeds for all (lines 72–82).
- AC-3 [e2e]: Fresh DB → migration → query all 9 tables (tests/T-001/migration-e2e.test.ts B-2, lines 33–37); queries resolve without error, empty result set valid, no missing-table/column.
- No mocks: all tests use real Postgres connections via `pg` library (`Client` from "pg"), real migrations applied, real RLS policies enforced. No internal-collaborator or call-count assertions.
- B-2 regression guard: Git log confirms `2fe0d2a test(T-001): regression guard (passes at RED — non-ledger)` added migration-e2e.test.ts AFTER `6e61fbb feat(T-001): B-1 GREEN`, supporting claim that B-2 locks behavior post-implementation.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- (none)

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- (none)

❌ **Missing:** acceptance criteria not addressed
- (none)

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: AC-2, RLS write/read | `93a6ea6` | `6e61fbb` | rls.test.ts (lines 45–82) | YES (RLS policies via app_user role) | YES (real DB, no mock layers) |
| B-2: AC-3, e2e fresh DB migration | N/A (regression guard) | `2fe0d2a` | migration-e2e.test.ts (lines 33–45) | YES (migration invoked, tables queried) | YES (real Docker Postgres, real schema) |
| AC-1: FK invariant (covered in B-2) | N/A (property) | ✓ in B-2 | FK violation rejection (line 39–45) | N/A (property enforced at schema layer) | N/A |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system)
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging)

**Human verdict:** __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
