---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "44cdb3fd2f4515b67bc1f21c59602fbabab244cbaaf3c25aa057f02db5186928"
---
## Task T-frontend-shell-zxnphh — Badges list and detail (mock-backed)
**Parent:** story S-0004.06 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Badges page lists badge cards (scope/competency/level filters) with code, name, tier, certifies snippet — from a mock data service.
- [ ] AC-2 [behavior]: Opening a badge card shows full detail (certifies, completion bar, verifier/co-signer, evidence refs resolved-or-broken-link, status legend).
- [ ] AC-3 [e2e]: Clicking a badge card on the Badges page or a competency's Assessment tab navigates to that badge's detail page.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-zxnphh/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
