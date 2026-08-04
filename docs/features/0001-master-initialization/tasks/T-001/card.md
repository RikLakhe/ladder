---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "469504627894a9496ef37b8173b0adbd6b1d6e03c6015bd42f6c127b2a5c37e3"
---
## Task T-001 — Shared data model migration
**Parent:** story S-0001.01 · feature 0001-master-initialization (docs/features/0001-master-initialization/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [invariant]: after running the migration against a fresh database, every table (`competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`) exists with its documented FKs enforced — an insert violating a FK is rejected.
- [ ] AC-2 [behavior]: an unauthenticated/non-admin write against any content table is rejected; an authenticated admin write succeeds; unrestricted read succeeds either way.
- [ ] AC-3 [e2e]: running the migration against a fresh database end-to-end, then querying every listed table once, succeeds with no missing-table/column error.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
**Test scope:** tests/T-001/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
