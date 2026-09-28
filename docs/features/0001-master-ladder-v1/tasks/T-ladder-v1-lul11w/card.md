---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "072381535a3ee058826e1452030967d5287c7270038e82dd2c07649e04396b83"
---
## Task T-ladder-v1-lul11w — Competency Detail: Full Level Browse
**Story:** S-0001.07 · feature 0001-master-ladder-v1
**Milestone:** M3 (v0.3.0) — closes M3
**Depends on:** T-ladder-v1-jdsucm
**Slice:** Full vertical — competency detail route; all 6 level cards browseable with current-level highlight
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Page renders exactly 6 level cards (P2–P7) in ascending order; each shows level badge, descriptor text, and criteria as plain text — no checkboxes or rating controls
- [ ] AC-2 [behavior]: Card matching `currentLevel` has blue border + blue background + "Your level" badge exactly once; no other card carries those styles
- [ ] AC-3 [behavior]: Breadcrumb displays `{track.name} / {domain} / {competency.name}` at top; each segment links to its route
- [ ] AC-4 [behavior]: When `currentLevel` is `p7`, P7 card highlighted, page renders without runtime error, no next-level accessor crashes
- [ ] AC-5 [behavior]: When `currentLevel` is null/undefined, no card shows "Your level" badge
- [ ] AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0
- [ ] AC-7 [e2e]: Engineer can browse all 6 level cards for any competency; current level is immediately visible
**End-to-end AC:** AC-7 [e2e] — competency detail page browseable in browser with correct level highlight
**Tests:** AC-1 through AC-5 — ordered; tracer bullet = AC-1 (6 cards rendered for dev/leadership/decision-making)
**Test scope:** src/app/[track]/[domain]/[competency]/__tests__/page.test.tsx
**Done =** reviewable PR, all 4 Vitest tests green (6 cards, badge once, P3 descriptor, P3 criterion), P7 edge case confirmed, `tsc --noEmit` clean.
