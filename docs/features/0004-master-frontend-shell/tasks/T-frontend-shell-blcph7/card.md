---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "428051cb0ddf4a3e9bd496c3dca7f2e84d8eda9b96bdd54176fd8529df3e7d1a"
---
## Task T-frontend-shell-blcph7 — Admin login and generic entity editor (mock-backed)
**Parent:** story S-0004.09 · feature 0004-master-frontend-shell (docs/features/0004-master-frontend-shell/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `/admin/login` shows a username/password form; hardcoded credentials `system`/`TEST@123` sign in as admin, any other combination shows an invalid-credentials error.
- [ ] AC-2 [behavior]: While signed in as admin, an admin-mode banner (email + logout) persists across public pages; logout returns to the public app.
- [ ] AC-3 [behavior]: Each entity type (competency, primary function, standard, assessment, training item, badge) has both an add form and an edit form, reachable from that entity's admin listing/detail; each shows form → required change-note → diff preview → confirm-save, against a mock data service.
- [ ] AC-4 [invariant]: Add and edit forms for every entity type share one generic editor component (fields config per entity type), not one bespoke form per entity.
- [ ] AC-5 [e2e]: Login with `system`/`TEST@123` → banner appears → add a new entity of one type → preview → confirm-save → edit an existing entity of another type → preview → confirm-save → logout, all without a dead link or console error.
**End-to-end AC:** AC-5 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-frontend-shell-blcph7/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
