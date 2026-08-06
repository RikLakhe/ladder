---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "58b18d1df90fc8e9bf8f6f334497d54794f8fb5475f462c772a55805583eea9f"
---
## Task T-assessment-badge-viewer-vcbuur — Status legend on badge detail page
**Parent:** story S-0003.04 · feature 0003-master-assessment-badge-viewer (docs/features/0003-master-assessment-badge-viewer/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: The badge detail page shows a fixed legend listing 🟢 Earned-eligible, 🟡 Blocked-assignment-limited, ⚪ Not-attempted, each with a one-line explanation.
- [ ] AC-2 [e2e]: The legend renders identically (same three states, same order) on every badge detail page, regardless of that badge's own data.
**End-to-end AC:** AC-2 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-assessment-badge-viewer-vcbuur/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
