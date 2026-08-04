---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "e0e0f82e47d414f7ea2783bbd7a1f8725b1d77d748a1f1d33d6881d083c44179"
---
## Task T-competency-browser-18gycw — Browse competencies
**Parent:** story S-0002.01 · feature 0002-master-competency-browser (docs/features/0002-master-competency-browser/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `GET /` lists every competency in `competencies` as a card, each showing its name and its count of rows in `primary_functions`.
- [ ] AC-2 [e2e]: Visiting `/` unauthenticated renders the competency list without any login prompt.
- [ ] AC-3 [behavior]: `GET /api/competencies` returns a JSON array of `{id, name, primaryFunctionCount}`, one entry per competency, matching TSD S-0002.01.
**End-to-end AC:** AC-2 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet

## Amendment 1 — 2026-08-05
**Type:** Shallow
**Trigger:** verification finding
**What changed:** added AC-3 — TSD S-0002.01 specifies a `GET /api/competencies` JSON interface; original card only covered the HTML route.
**Why:** card was scoped from ACs alone and missed the JSON interface row in the TSD; closing the gap now rather than leaving unimplemented spec surface.
**Cascade:** TSD unchanged (already specified it) / this card only / code
**ADR update:** No
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-competency-browser-18gycw/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
