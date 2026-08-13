---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "ff4fff26447a1275407d197e8ba10de6abc5d69f72044bd38c4fad47ee39c8e2"
---
## Task T-frontend-design-alignment-cika92 — Badge Detail Correctness
**Parent:** story S-0007.04 · feature 0007-master-frontend-design-alignment
**Slice:** Wire evidence resolution display, broken-link warning, co-signer indicator with tooltip, TierChip in header, and BadgeStatusLegend on badge detail page
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Each resolved evidence entry renders row text inline in an expandable element; no resolved entry is silently blank
- [ ] AC-2 [behavior]: Each unresolved evidence entry renders a visible "⚠ evidence link broken" warning in place of the row
- [ ] AC-3 [behavior]: Co-signer indicator (with tooltip: "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency.") renders only when `cosignerRequired` is true
- [ ] AC-4 [behavior]: `BadgeStatusLegend` renders exactly once on the badge detail page
- [ ] AC-5 [behavior]: Badge header shows badge_code in monospace, name, and `TierChip` using the badge's tier value
- [ ] AC-6 [e2e]: A user on a badge detail page sees resolved instrument row text, the status legend, and a co-signer indicator only when cosignerRequired is true; a badge with a broken reference shows the warning state
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
**Test scope:** tests/T-frontend-design-alignment-cika92/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
