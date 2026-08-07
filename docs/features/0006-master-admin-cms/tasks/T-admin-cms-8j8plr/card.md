---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "1d3f11220f9470d7ef7cfa16f25669e39b6d5aa598dee5399c6e001521cf835f"
---
## Task T-admin-cms-8j8plr — Simple entity editors: Competency, Primary Function, Functional Analysis
**Parent:** story S-0006.03 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Competency editor presents `name` and `description` fields. Both required; blank submission shows an inline error per field.
- [ ] AC-2 [behavior] — Primary Function editor presents `pf_number`, `slug`, `name`, `domain_classification`, and `competency_id` (select from existing competencies). All required; blank submission shows an inline error per field.
- [ ] AC-3 [behavior] — Functional Analysis editor presents `content`, `coverage_check`, and `competency_id` (select from existing competencies). All required; blank submission shows an inline error per field.
- [ ] AC-4 [behavior] — Each editor participates in the shared save flow: change note required, diff preview shown, atomic transaction producing a `document_versions` row.
- [ ] AC-5 [e2e] — An admin creates a new Competency, edits a Primary Function's name, and updates a Functional Analysis's content. Each save produces a `document_versions` row and updated values appear on the listing page.

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-admin-cms-8j8plr/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
