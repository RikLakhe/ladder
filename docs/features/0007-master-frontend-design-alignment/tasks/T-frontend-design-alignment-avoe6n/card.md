---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "c5c239616943e4f567d102d9478c49ed08d534629b0b39cda04a46e24eec8da6"
---
## Task T-frontend-design-alignment-avoe6n — Training Viewer Corrections
**Parent:** story S-0007.05 · feature 0007-master-frontend-design-alignment
**Slice:** Wire P6/P7 no-simulated-training EmptyState and sequencing-issue warning into the training section of the PF page level tab
**Acceptance criteria:**
- [ ] AC-1 [behavior]: When no guided_exercise or autonomous_project units exist for the active level, `EmptyState variant="no-simulated-training"` renders with exact copy "Growth at this level is demonstrated through real project scope, not simulated exercises."
- [ ] AC-2 [behavior]: Any training unit with `hasSequencingIssue=true` renders a visible "⚠ sequencing issue" indicator alongside its row
- [ ] AC-3 [e2e]: A user on the training section for a P6 or P7 level (with no seeded exercises) sees the exact fixed copy, not a blank section or generic "no data"
**Tests:** AC-1, AC-2, AC-3
**Test scope:** tests/T-frontend-design-alignment-avoe6n/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
