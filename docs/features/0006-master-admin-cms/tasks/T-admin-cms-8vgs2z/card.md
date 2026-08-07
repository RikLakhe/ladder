## Task T-admin-cms-8vgs2z — DB migrations for missing badge and instrument columns
**Parent:** story S-0006.08 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [invariant] — Migration adds to `badges`: `badge_code text`, `certifies text`, `completion_bar text`, `verifier_role text`, `cosigner_required boolean DEFAULT false`, `tier integer` — all nullable/defaulted, backward-compatible with existing rows.
- [ ] AC-2 [invariant] — Migration adds to `instruments`: `type text`, `level text` — nullable/defaulted, backward-compatible with existing rows.
- [ ] AC-3 [invariant] — Migration runs without error on a clean database and is idempotent on a database that already has some or all of the listed columns.
- [ ] AC-4 [e2e] — After migration, the badge editor and instrument editor can create records with all fields populated. Existing `badges` and `instruments` rows are unchanged.

**Tests:** N/A — migration
**Test scope:** tests/T-admin-cms-8vgs2z/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
