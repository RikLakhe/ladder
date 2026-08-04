---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "08bba13ffbb340a151d67a929fa9084099e3c32ff82a91f858ef260a3b370b7e"
---
## Task T-competency-browser-4r2pp7 — View functional analysis and badges for a primary function
**Parent:** story S-0002.04 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: A primary function's page exposes its `functional_analyses` content by level, filtered to that `pf_id`.
- [ ] AC-2 [behavior]: A primary function's page lists badges (name + level) filtered to that `pf_id`; a primary function with no rows in either table renders an explicit empty state.
- [ ] AC-3 [e2e]: Navigating from a primary function to its functional-analysis/badges view renders data sourced from `functional_analyses` and `badges` for that `pf_id`.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-4r2pp7/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
