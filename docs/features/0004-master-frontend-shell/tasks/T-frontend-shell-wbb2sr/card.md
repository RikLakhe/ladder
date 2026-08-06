---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "b9834a58413bd861a317d94f6c705561b96cf0e8b287d7a987770f152458254e"
---
## Task T-frontend-shell-wbb2sr — Level View and Transition Guide
**Parent:** story S-0004.04 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Level View shows a P2–P7 tab strip; selecting a level lists every applicable PF's criteria snippet at that level, grouped by competency.
- [ ] AC-2 [behavior]: Transition Guide shows a grid of level-transition columns per competency; each row expands to show full before/after text and how it's assessed.
- [ ] AC-3 [e2e]: Clicking a PF row in either view navigates to that PF's page at the matching level.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-wbb2sr/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
