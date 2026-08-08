## Verification — Task T-training-viewer-inlybt — 2026-08-09
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- All required columns present: `id` (uuid PK), `competency_id` (uuid FK), `type` (training_unit_type enum), `level` (text), `sequence_order` (integer), `content` (text), `prereqs` (jsonb). Migration 0002 adds type/sequence_order/content as nullable (no default needed — no existing rows broken).
- Enum `training_unit_type` has all 6 required values: `learning_path`, `concept_notes`, `guided_exercise`, `autonomous_project`, `onboarding`, `reference_card`.
- Migration is idempotent: DO block uses `IF NOT EXISTS` for enum creation; `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` for each column. Test confirms re-running produces no error (migrate called twice in beforeAll).
- Seed data present: `seed()` inserts 3 training_units (P2 guided_exercise, P3 guided_exercise, P4 autonomous_project) for the 'Technical Skill' competency. All seeded rows are queryable via `GET /api/training-units` (unauthenticated, using public RLS SELECT policy from 0001_init.sql).
- Public RLS SELECT access confirmed: route uses `app_user`-readable query; T-001/rls.test passes.
- API `GET /api/training-units` returns JSON array with all 7 required fields (id, competency_id, type, level, sequence_order, content, prereqs). Test asserts this.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- *(None identified.)*  TSD says seed data inserted "by the migration **or** a companion seed script" — implementation uses companion script, which conforms. TSD says "No public API surface" for migration script (✅ correct — migrate.ts is internal), and "queryable via public SELECT" for data (✅ correct — RLS policy allows SELECT). The `GET /api/training-units` endpoint is application-layer exposure of that public SELECT, necessary for Training Viewer to function and not prohibited by spec.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
-

❌ **Missing:** acceptance criteria not addressed
-

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: seeded training_units rows returned by GET /api/training-units | ✅ commit b3e2915 | ✅ commit 428f4f9 | ✅ test exercises API not internals | ✅ tests only public HTTP + DB | ✅ no mocks (real DB + dev server) |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts. Test uses real DB + real Next.js dev server. No mocks.
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness). B-1 is a behavior AC verified via interface (HTTP GET + JSON response).
- [x] Boundary contract asserted richly (args/content), not bare "was called". Test asserts: status 200, array length ≥1, all 7 fields present on each row.
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system). `training-units-migration.e2e.test.ts` exercises the running dev server.
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging). TSD marks Boundaries as "none"; e2e test provides smoke coverage anyway.

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** ✅ **CLEAN** — all TSD criteria met, no actual divergences, checklist complete. Ready to merge.
