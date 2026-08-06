---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "5ecf7955daf348db871a02ced8c49b1b9e2c022c66e5b00b0272312e60e880d4"
---
## Task T-assessment-badge-viewer-94pi25 — Badge summary card in PF page
**Parent:** story S-0003.01 · feature 0003-master-assessment-badge-viewer (docs/features/0003-master-assessment-badge-viewer/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: A badge card shows `badge_code` (monospace), `name`, `<TierChip>` (reused, not redefined), and a truncated `certifies` sentence.
- [ ] AC-2 [invariant]: Badge card always shows the Not-attempted status (⚪) — no other state is ever rendered in v1.
- [ ] AC-3 [e2e]: The PF page's Badge sub-slot renders one card per badge tied to that `pf_id`/level, each linking to its (future) detail page.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-assessment-badge-viewer-94pi25/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
