---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "fb24426e0c083880b18f6d5a28359949ff55321c2ba13a13bd5317142cd279f7"
---
## Task T-frontend-shell-779z2k — Version history (mock-backed)
**Parent:** story S-0004.08 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: An entity's Version History view lists prior revisions (date, editor, change-note) from a mock data service, newest first.
- [ ] AC-2 [behavior]: Selecting two revisions shows a diff view highlighting changed fields.
- [ ] AC-3 [e2e]: Navigating from an entity's detail page to Version History and back preserves the entity's state (no dead link, no lost scroll/tab context).
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-779z2k/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
