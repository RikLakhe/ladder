---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "2b34a8a2b5715fb3d4f1b1af3c6de549aeb9753bcdc360896a8a448b70fe6516"
---
## Task T-frontend-shell-ye02t6 — Home page
**Parent:** story S-0004.02 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Home lists every competency as a card (name, domain, PF count), sourced from the real competencies API.
- [ ] AC-2 [behavior]: Focus panel and what's-next panel render only when their data source has content for the current session level/role; otherwise omitted entirely (no empty box).
- [ ] AC-3 [e2e]: Clicking a competency card navigates to that competency's page.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-ye02t6/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
