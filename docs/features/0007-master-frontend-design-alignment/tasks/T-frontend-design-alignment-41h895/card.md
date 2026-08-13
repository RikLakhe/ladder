---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "463021dbd45ef29fa0660ef7b3985e630ef64ae60ba28c82aec685b1e6365d84"
---
## Task T-frontend-design-alignment-41h895 — Competency Page Completeness
**Parent:** story S-0007.02 · feature 0007-master-frontend-design-alignment
**Slice:** Remove CompetencyTabs; add competency description to header; add collapsible FA summary; replace PF list with cards showing pf_number, domain_classification, badge count; wire history link
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Competency page header shows competency name and description
- [ ] AC-2 [behavior]: FA summary section renders collapsed by default; clicking it expands to show full functional analysis content
- [ ] AC-3 [behavior]: PF list renders as cards each showing pf_number, name, domain_classification, and badge count
- [ ] AC-4 [behavior]: A "View history" link at the top of the page navigates to `/competencies/[id]/history`
- [ ] AC-5 [behavior]: `CompetencyTabs` component is no longer rendered on this page
- [ ] AC-6 [e2e]: A user clicking a competency from home lands on a page with description in header, FA toggle, PF cards with badge counts, and history link visible
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
**Test scope:** tests/T-frontend-design-alignment-41h895/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
