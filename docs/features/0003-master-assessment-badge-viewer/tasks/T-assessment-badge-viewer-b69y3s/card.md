---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "ddede0c5ad1fa4ac328ecbff2284d38caf96d3956e72f6c1329d4be34b81e4ba"
---
## Task T-assessment-badge-viewer-b69y3s — Badge detail page
**Parent:** story S-0003.02 · feature 0003-master-assessment-badge-viewer (docs/features/0003-master-assessment-badge-viewer/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: Visiting `/[competency]/[pf]/badges/[badgeCode]` renders header (badge_code, name, TierChip, level), the full certifies sentence, and `completion_bar` rendered verbatim as pass criterion text.
- [ ] AC-2 [behavior]: Verifier section shows `verifier_role` text; co-signer indicator + tooltip renders only when `cosigner_required` is true, absent otherwise.
- [ ] AC-3 [e2e]: Clicking a badge card on the PF page navigates to that badge's detail page with matching badge_code/name/tier.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
<!-- exception: Tests: N/A — reason: config | scaffolding | spike | refactor | tooling | integration -->
**Test scope:** tests/T-assessment-badge-viewer-b69y3s/   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
<!-- approval: written by `lane approve` as frontmatter (approved_by/at/sha256) after a human confirms — never hand-edit -->
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
