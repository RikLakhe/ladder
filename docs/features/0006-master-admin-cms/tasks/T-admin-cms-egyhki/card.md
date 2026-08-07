## Task T-admin-cms-egyhki — Badge editor
**Parent:** story S-0006.05 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Badge editor presents `badge_code`, `name`, `certifies`, `completion_bar`, `verifier_role`, `cosigner_required` (checkbox, defaults false), and `tier` (1–6 select). All required except `cosigner_required`.
- [ ] AC-2 [behavior] — `badge_code` is validated on submit: format must match `<CODE>-<PF#>-<Level>` (e.g. `TS-1-P4`); value must be unique across all badges (excluding the current badge on edit). An invalid format or duplicate code shows a visible inline error and blocks save.
- [ ] AC-3 [behavior] — `evidence_required` is an add-item control: first select an Instrument, then select a row within that instrument (options populated from that instrument's rows only). A row from a different instrument cannot be selected. Each item stored as `{instrument_id, row_key, note}`.
- [ ] AC-4 [behavior] — Editor participates in the shared save flow: change note required, diff preview shown, atomic transaction.
- [ ] AC-5 [e2e] — An admin creates a Badge with two evidence items drawn from a seeded instrument. A `document_versions` row is produced. The badge detail viewer resolves both evidence items as `resolved: true`.

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-admin-cms-egyhki/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
