---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "1ae8ec71edf2cf9a0fe32469e8cc1cbbbd8542fb553c5ad010d1d98a73f57fff"
---
## Task T-003 — Seed data for local development
**Parent:** story S-0001.03 · feature 0001-master-initialization (docs/features/0001-master-initialization/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: running the seed operation against a freshly migrated, empty database populates one competency's full vertical slice (primary functions, standards, a badge whose evidence resolves to a real instrument row, a training sequence whose prereqs only point backward), plus the two intentional gap cases (a level with no standard row; a P6/P7 competency+level with no guided-exercise/autonomous-project rows).
- [ ] AC-2 [e2e]: fresh database → migrate → seed → a manual read of the seeded competency returns matching rows across every table, end to end.
**End-to-end AC:** AC-2 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2  ← ordered; first = tracer bullet
**Test scope:** tests/T-003/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
