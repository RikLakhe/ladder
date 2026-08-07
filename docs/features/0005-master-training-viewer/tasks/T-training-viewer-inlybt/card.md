---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "833470870aa54318e15e33bddbb843d81f7525f12508b1f6d2ff83f21936bcd7"
---
## Task T-training-viewer-inlybt — DB migration: training_units table
**Parent:** story S-0005.04 · feature 0005-master-training-viewer (docs/features/0005-master-training-viewer/PRD.md + TSD.md)
**Slice:** migration + seed — no viewer code, but blocks all other training-viewer tasks
**Acceptance criteria:**
- [ ] AC-1 [invariant]: `training_units` table exists with columns `id, competency_id, type, level, sequence_order, content, prereqs jsonb`; all new columns nullable or defaulted.
- [ ] AC-2 [invariant]: Re-running migration on an already-migrated DB produces no error and no duplicate columns/constraints.
- [ ] AC-3 [invariant]: RLS allows public SELECT on `training_units`; no auth required to read rows.
- [ ] AC-4 [e2e]: After migration, seeded training_units rows for at least one competency+level are returned by a public GET request with no auth.
**End-to-end AC:** AC-4 [e2e] — seeded rows queryable via public API after migration applied.
**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-training-viewer-inlybt/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
