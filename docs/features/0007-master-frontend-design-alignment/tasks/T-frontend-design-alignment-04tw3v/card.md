---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "629b2338eca3c3f343f10d0ec5a7212936b056e0dc3431559e2a9536d9119f7f"
---
## Task T-frontend-design-alignment-04tw3v — Version History Route
**Parent:** story S-0007.06 · feature 0007-master-frontend-design-alignment
**Slice:** Add `/competencies/[id]/history` and `/[entityType]/[entityId]/history` routes with competency-scoped and entity-scoped changelog lists, expandable field-level diff, and empty state
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `/competencies/[id]/history` renders a newest-first list of version entries across all entity types belonging to that competency; each row shows date, editor name, entity type + display name, change note
- [ ] AC-2 [behavior]: Expanding a version row shows a field-level before/after diff; changed fields are highlighted; unchanged fields are not shown; a first version (no prior snapshot) renders without crash
- [ ] AC-3 [behavior]: `/[entityType]/[entityId]/history` renders the same row format filtered to one entity's versions only
- [ ] AC-4 [behavior]: Zero version rows renders `EmptyState variant="no-history-yet"`, not an error or blank
- [ ] AC-5 [e2e]: A user navigates to `/competencies/[id]/history`, sees a changelog list, expands a row, and sees changed fields highlighted
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-frontend-design-alignment-04tw3v/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
