---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "45cc1529722b6068b5e1707796b4219327bceb1332c20768b5ac4fd34626da17"
---
## Task T-frontend-design-alignment-7etjh7 — Home Page Completeness
**Parent:** story S-0007.01 · feature 0007-master-frontend-design-alignment
**Slice:** Extend competency query to return description + last-updated date; add level quick-jump client component; render both on home page
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Each competency card on `/` shows the competency description text below the name
- [ ] AC-2 [behavior]: Each competency card shows a formatted last-updated date (or omits the date element when no version history exists for that competency)
- [ ] AC-3 [behavior]: A level quick-jump control (P2–P7) renders on the home page; selecting a level navigates to the first competency's first PF at that level
- [ ] AC-4 [e2e]: A user on `/` sees description and last-updated date for every competency card without navigating away; selecting a level from the quick-jump control navigates correctly
**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-frontend-design-alignment-7etjh7/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
