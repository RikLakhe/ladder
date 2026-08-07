## Task T-admin-cms-n0orz1 — Shared save flow
**Parent:** story S-0006.02 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Submitting an edit form without a non-empty `change_note` is blocked with a visible inline validation message. No database write occurs.
- [ ] AC-2 [behavior] — After entering a change note and clicking Save, a diff preview screen renders showing only the fields whose values changed (old value vs. new value). Unchanged fields are not shown.
- [ ] AC-3 [invariant] — On Confirm, exactly one `document_versions` row is inserted in the same database transaction as the entity UPDATE. `version_number` is `MAX(version_number) + 1` for that `(entity_type, entity_id)` pair (first save produces version 1). If either operation fails, both roll back — no partial writes.
- [ ] AC-4 [invariant] — The `document_versions` row contains: `entity_type`, `entity_id`, `version_number`, a full `snapshot` jsonb of the entity's new state, `changed_by` (current admin user id), `change_note`, and `created_at`.
- [ ] AC-5 [e2e] — An admin edits a Competency, provides a change note, confirms the diff, and sees the updated value on the listing page. Querying `document_versions` for that entity returns exactly one new row with the correct change note and version number.

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-admin-cms-n0orz1/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
