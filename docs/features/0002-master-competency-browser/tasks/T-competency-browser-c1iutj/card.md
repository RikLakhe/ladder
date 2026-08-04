---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "6164e97ab69fd0dbe8a07dbc0376c20db5300de37329e36285111a3faa8463ec"
---
## Task T-competency-browser-c1iutj — View a standard document by level
**Parent:** story S-0002.03 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `GET /primary-functions/:pfId/standard` renders performance criteria from `standards` grouped by level, in level order (P2–P7), for that `pf_id`.
- [ ] AC-2 [behavior]: `?level=<level>` narrows the view to that level's criteria only; a level with no `standards` row renders an explicit empty state, not an error.
- [ ] AC-3 [e2e]: Navigating from a primary-function pill to its standard doc renders content for that `pf_id`.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-c1iutj/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
