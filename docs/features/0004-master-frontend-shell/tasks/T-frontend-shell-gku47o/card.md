---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "1bd2ce135a9c5a6c52caf1e0b3b50a34ec76cfbe8d701399f67bd03db3420e23"
---
## Task T-frontend-shell-gku47o — Training viewer (mock-backed)
**Parent:** story S-0004.07 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: A competency's Training tab / detail page renders the correct subtype view (Learning Path/Concept Notes/Guided Exercises/Autonomous Projects/Onboarding Track) from a mock data service.
- [ ] AC-2 [behavior]: Learning Path shows prerequisites + ordered sequence with level gates; other subtypes show their own structured fields (goal/setup/steps, brief/AC, day/week/month).
- [ ] AC-3 [e2e]: Navigating from a competency's Training tab to a specific item renders that item's detail page.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-gku47o/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
