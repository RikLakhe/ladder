---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "f2ad31444ac5170b399effaef520ca513204b49ed73ae945f49ba2fdaa5a57ab"
---
## Task T-competency-browser-5prcuf — Drill into a competency's primary functions
**Parent:** story S-0002.02 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `GET /competencies/:id` shows only primary functions whose `competency_id` equals `:id`.
- [ ] AC-2 [invariant]: Primary functions of other competencies never appear on this page.
- [ ] AC-3 [e2e]: Clicking a competency card on the home page navigates to that competency's page and shows its primary functions.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-5prcuf/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
