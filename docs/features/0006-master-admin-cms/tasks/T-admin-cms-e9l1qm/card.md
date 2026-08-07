## Task T-admin-cms-e9l1qm — Standard editor
**Parent:** story S-0006.04 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Standard editor presents `level` (P2–P7 selector), `pf_id` (select from existing PFs), `scope`, `required_knowledge`, and `evidence_guide` (text). All required.
- [ ] AC-2 [behavior] — `performance_criteria` is a repeatable-list control: add/remove individual text items; stored as a jsonb array. No single freeform textarea exists for this field.
- [ ] AC-3 [behavior] — `hiring_signals` is a repeatable-list control: add/remove individual text items; stored as a jsonb array. No single freeform textarea exists for this field.
- [ ] AC-4 [behavior] — Editor participates in the shared save flow: change note required, diff preview shown, atomic transaction.
- [ ] AC-5 [e2e] — An admin adds two `performance_criteria` items and one `hiring_signals` item to a Standard and saves. A `document_versions` row is produced. Querying the Standard row returns `performance_criteria` and `hiring_signals` as jsonb arrays with the correct item counts.

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-admin-cms-e9l1qm/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
