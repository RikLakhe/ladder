## Task T-admin-cms-43de1e — Instrument editor
**Parent:** story S-0006.06 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Instrument editor presents `name` (text), `pf_id` (select from existing PFs), and `type` (rubric / checklist / portfolio select). All required.
- [ ] AC-2 [behavior] — A row-based table editor allows adding rows (level P2–P7 tag + content text), removing rows, and reordering rows (up/down). Row order is preserved on save.
- [ ] AC-3 [behavior] — Editor participates in the shared save flow: change note required, diff preview shown, atomic transaction.
- [ ] AC-4 [e2e] — An admin adds two rows to an Instrument, reorders them, and saves. A `document_versions` row is produced. The `rows` field reflects the new order. The Badge editor's row picker shows the updated rows for that instrument.

**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-admin-cms-43de1e/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
