---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "c1ae94b7e288fac188397ab47f87a2a634e95c50de063a117bd416e882092233"
---
## Task T-frontend-shell-8pqscu — Global shell: header, nav, breadcrumb, level-set modal
**Parent:** story S-0004.01 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Every page renders inside a shared shell: header (home link, search input, level selector, current-level indicator) + left nav (Home, Level View, Transition Guide, Badges, Version History, expandable competency list).
- [ ] AC-2 [behavior]: A breadcrumb reflecting current route position renders above content on every non-home page.
- [ ] AC-3 [behavior]: First-visit-this-session shows the level-set modal (role + level picker); dismissing/completing it sets the level indicator and the modal doesn't reappear that session.
- [ ] AC-4 [e2e]: From any page, every nav-sidebar link and header logo link navigates to a real, rendering page — no dead links.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-8pqscu/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
