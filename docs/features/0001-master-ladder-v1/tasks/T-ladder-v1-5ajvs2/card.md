---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "fdad24689318383a798889d785bcb592eb1c4c2985a202dec7050c75b3efe7a6"
---
## Task T-ladder-v1-5ajvs2 — Self-Assessment: Criteria Checks and Self-Rating
**Story:** S-0001.08 · feature 0001-master-ladder-v1
**Milestone:** M4 (v0.4.0)
**Depends on:** T-ladder-v1-lul11w
**Slice:** Full vertical — checkboxes, self-rating buttons, and progress rings wired end-to-end to store
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `CompetencyAssessmentView` renders a checkbox + label for each criterion; checking calls `toggleCriterion(assessmentKey, criterion.id)` on store
- [ ] AC-2 [behavior]: Renders 3 self-rating buttons (Developing, Meeting, Exceeding); each `aria-pressed` reflects store state; clicking calls `setRating(assessmentKey, rating)`
- [ ] AC-3 [behavior]: Current level card has blue border + blue background + "Your level" badge; assessment key = `{trackId}/{domainId}/{competencyId}`
- [ ] AC-4 [invariant]: Criterion ID format `{shared|dev}/{domainId}/{competencyId}/{level}/{index}` (0-based) enforced at type or utility level — not ad-hoc string concatenation
- [ ] AC-5 [invariant]: Operation on key A has zero effect on `criteriaChecked` or `selfRating` of any other key B
- [ ] AC-6 [behavior]: `TrackDomainList` renders clickable card + `ProgressRing` for each non-coming-soon domain; coming-soon domains show badge only — no ring, no link
- [ ] AC-7 [e2e]: Checking a criterion updates the domain progress ring immediately; self-rating persists across page reload via localStorage
**End-to-end AC:** AC-7 [e2e] — criterion check + self-rating persist in browser after reload
**Tests:** AC-1 through AC-6 — ordered; tracer bullet = AC-1 (CompetencyAssessmentView renders checkboxes for dev/leadership/decision-making at p3)
**Test scope:** src/components/__tests__/TrackDomainList.test.tsx, src/components/__tests__/CompetencyAssessmentView.test.tsx
**Done =** reviewable PR, all 7 Vitest tests green (2 TrackDomainList + 5 CompetencyAssessmentView), criteria isolation verified, `tsc --noEmit` clean.
