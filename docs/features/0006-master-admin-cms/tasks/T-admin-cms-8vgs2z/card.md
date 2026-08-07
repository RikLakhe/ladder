## Task T-admin-cms-8vgs2z — DB migrations for missing badge and instrument columns
**Parent:** story S-0006.08 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** database migration (backward-compatible schema additions)
**Acceptance criteria:**
- [ ] AC-1 [invariant] — Migration adds to `badges`: `badge_code text`, `certifies text`, `completion_bar text`, `verifier_role text`, `cosigner_required boolean DEFAULT false`, `tier integer` — all nullable/defaulted, backward-compatible with existing rows.
- [ ] AC-2 [invariant] — Migration adds to `instruments`: `type text` (rubric | checklist | portfolio), `level text` — nullable/defaulted, backward-compatible.
- [ ] AC-3 [invariant] — Migration runs without error on a clean database and is idempotent on a database that already has some or all columns.
- [ ] AC-4 [e2e] — After migration, the badge editor (S-0006.05) and instrument editor (S-0006.06) can create records with all fields populated; existing `badges` and `instruments` rows are unchanged.

**Tests:** N/A — migration
**Test scope:** migration validation via integration tests (AC-3, AC-4)
**Done =** reviewable PR, migration applies cleanly, links to chain. One PR per task (default).
