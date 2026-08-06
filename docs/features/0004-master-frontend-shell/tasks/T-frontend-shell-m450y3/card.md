---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "95071326c823f395098577310ea97d9e13876e41453a96ed5a56272f86fb2ef7"
---
## Task T-frontend-shell-m450y3 — Search
**Parent:** story S-0004.05 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Submitting the header search shows a results list (competency, PF, doc type, title, matched snippet).
- [ ] AC-2 [behavior]: An exact badge-code match and a partial PF-name match both return results.
- [ ] AC-3 [e2e]: Clicking a search result navigates to the corresponding PF page with the correct level tab selected.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-m450y3/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
