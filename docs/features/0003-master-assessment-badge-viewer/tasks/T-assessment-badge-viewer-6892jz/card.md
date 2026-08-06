---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "4a896d5d4ba4ee0b208fb71e204be09601985bdcb984f2f36ef14ef2e86218fe"
---
## Task T-assessment-badge-viewer-6892jz — Evidence resolution + broken-link warning
**Parent:** story S-0003.03 · feature 0003-master-assessment-badge-viewer (docs/features/0003-master-assessment-badge-viewer/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Each `evidence_required` entry renders as an expandable reference chip; expanding it shows the resolved `instruments.rows[row_key]` text inline.
- [ ] AC-2 [invariant]: An `evidence_required` entry whose `row_key`/`instrument_id` doesn't resolve shows a visible "evidence link broken" state — never silently dropped or blank.
- [ ] AC-3 [e2e]: A badge detail page with ≥1 resolvable and ≥1 unresolvable evidence entry shows both the resolved row text and the broken-link warning in the same render.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-assessment-badge-viewer-6892jz/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
