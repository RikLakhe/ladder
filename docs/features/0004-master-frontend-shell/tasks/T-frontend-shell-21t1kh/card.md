---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "a4673f79dfd324d241fc445d4b19c03a18736b8cd71bc4eb2cb686b343790cef"
---
## Task T-frontend-shell-21t1kh — Competency page with document tabs
**Parent:** story S-0004.03 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Competency page shows name, domain, PF pills, and a tab strip (Standard/Assessment/Training/Evidence); switching tabs swaps the panel client-side, no reload.
- [ ] AC-2 [behavior]: Standard tab renders from the real standards API; Assessment/Training/Evidence tabs render from a mock data service when no real API exists.
- [ ] AC-3 [invariant]: A tab with no backing content shows `<EmptyState>`, never a blank panel or crash.
- [ ] AC-4 [e2e]: Clicking a PF pill navigates to that PF's page with the level tab strip.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-21t1kh/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
