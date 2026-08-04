---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "ca8e11437228b171f0c57019ac9e3d41fcca49b847ebf46713b1d3e6d2e61bf4"
---
## Task T-competency-browser-3zo10s — Competencies JSON API
**Parent:** story S-0002.01 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `GET /api/competencies` returns a JSON array of `{id, name, primaryFunctionCount}`, one entry per competency in `competencies`, count matching rows in `primary_functions`.
- [ ] AC-2 [e2e]: An unauthenticated request to `GET /api/competencies` returns 200 with the JSON array (no auth required, per TSD S-0002.01 Access).
**End-to-end AC:** AC-2 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-3zo10s/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
