---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "bb233761c995f8e77683f0413813ced92aabc38258b1833ec32096f26b3a6696"
---
## Task T-frontend-design-alignment-4ry6ei — PF Page Structure Correction
**Parent:** story S-0007.03 · feature 0007-master-frontend-design-alignment
**Slice:** Restructure PF page to use LevelTabStrip with Standard/Badge/Training slots inside each tab; add pf_number + domain_classification to header; disabled tabs for N/A levels with EmptyState
**Acceptance criteria:**
- [ ] AC-1 [behavior]: PF page header shows pf_number, name, and domain_classification
- [ ] AC-2 [behavior]: LevelTabStrip renders P2–P7; tabs with no standards row are disabled and visually distinct
- [ ] AC-3 [behavior]: Clicking a disabled tab shows `EmptyState variant="not-applicable"` as the content body — not blank, not a crash
- [ ] AC-4 [behavior]: Standard, Badge, and Training sections render inside the active tab body, not at competency scope
- [ ] AC-5 [e2e]: A user navigating to a PF page sees P2–P7 tabs; clicking an N/A tab shows the empty state; clicking a valid tab shows Standard/Badge/Training content
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-frontend-design-alignment-4ry6ei/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
