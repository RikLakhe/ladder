## TSD S-0004.03 — Competency page with document tabs  (PRD §S-0004.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:id` (existing, Standard tab). Assessment/Training/Evidence tabs read from mock services shaped per `design/02-assessment-badge-viewer.md` / `03-training-viewer.md`, keyed by competency id (+ PF/level where applicable). |
| Data / State | Reads `competencies`, `primary_functions`, `standards` (real, read-only) for Standard tab; mock fixtures for the other 3 tabs. |
| Behavior | Tab strip (Standard/Assessment/Training/Evidence) switches the visible panel client-side, no navigation/reload. A tab with no content for the current competency renders `<EmptyState>`. Selecting a PF pill navigates to that PF's page with its level tab strip. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (empty-state renders when a tab's data source returns nothing) / integration (all 4 tabs render for a seeded competency; PF pill navigation lands on the correct PF/level route) |
