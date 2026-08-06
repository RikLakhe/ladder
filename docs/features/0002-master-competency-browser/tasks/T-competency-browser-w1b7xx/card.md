---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "b4baf335a42e336cee490ca025b3eab0feb8be7bf94c0eea9391400723a21dd5"
---
## Task T-competency-browser-w1b7xx — Version history on a document
**Parent:** story S-0002.05 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: A document view shows "last updated" derived from the most recent `document_versions` row for that `entity_table`/`entity_id`.
- [ ] AC-2 [behavior]: A history control lists all `document_versions` rows for that entity in reverse-chronological order; an entity with zero versions shows a "no history" state, not an error.
- [ ] AC-3 [e2e]: Opening the history control on a real doc with ≥2 versions lists them in reverse-chronological order.
- [ ] AC-4 [behavior]: `GET /api/documents/:entityTable/:entityId/versions` returns a JSON array of `{changeNote, changedBy, createdAt}` ordered most-recent-first for that entity (per TSD S-0002.05 Interfaces).
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-w1b7xx/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
