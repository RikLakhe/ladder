---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "54e52dba6b96e36c3e2f16dab2db96223273875b464d351e8353ce65b5ab9178"
---
## Task T-training-viewer-ywzj2v — Reference card
**Parent:** story S-0005.03 · feature 0005-master-training-viewer (docs/features/0005-master-training-viewer/PRD.md + TSD.md)
**Slice:** reference card API + paginated table page — full vertical (API → page → rendered table)
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `GET /api/competencies/:competencyId/reference-card?level=X` returns a JSON array of `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}`, one entry per join of badges → training_units → instruments for the requested competency+level; no rows from other competency_ids or levels appear.
- [ ] AC-2 [behavior]: Reference card page renders a paginated table of badge_code → training unit name → instrument name rows; total row count is shown; rows exceeding page size do not render outside the viewport.
- [ ] AC-3 [e2e]: A user views the reference card for a seeded competency+level with more than 40 joined rows and sees a paginated table — first page row count ≤ page size, all rows reachable by paging through, no crash.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app
**Tests:** AC-1, AC-2, AC-3  ← ordered; first = tracer bullet
**Test scope:** tests/T-training-viewer-ywzj2v/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
