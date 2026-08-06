---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "4c0c2d42dcc2b676f7237c4d4d2a3e99c850fb3eb7d2e588ee42934f34afc872"
---
## Task T-competency-browser-i1zgmq — Styled app shell + level-tab PF page (design/01-competency-browser.md)
**Parent:** story S-0002.01 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: The home page renders inside a shared app shell — a header (app name + search input) and a left sidebar — and lists each competency as a card within that shell.
- [ ] AC-2 [behavior]: A competency page renders inside the same shared shell and lists that competency's primary functions as clickable pills, each linking to its primary-function page.
- [ ] AC-3 [behavior]: A primary-function page renders its Standard content (grouped by level) behind a level-tab control (P2–P7): selecting a tab shows only that level's standard/functional-analysis/badges content, with no full-page navigation required.
- [ ] AC-4 [e2e]: Navigating Home → Competency → Primary Function → a level tab on a running server reaches content sourced from the DB for the selected level, with the shared header/sidebar present at every step.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-i1zgmq/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
