---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "1c6c3316e85b699647bcbd95886551e7f86d6b65a2ecefb9505d9ac1401dfbd9"
---
## Task T-002 — App scaffold & routing shell
**Parent:** story S-0001.02 · feature 0001-master-initialization (docs/features/0001-master-initialization/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: each shared UI contract (level-tag, level-tab strip, layout container with named sub-slots, empty-state display) renders without a runtime error across its documented input range, including an inapplicable level and an undeclared empty-state variant (safe fallback, never a crash).
- [ ] AC-2 [e2e]: starting the app and requesting `/` returns a successful response with placeholder content.
**End-to-end AC:** AC-2 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2  ← ordered; first = tracer bullet
**Test scope:** tests/T-002/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
