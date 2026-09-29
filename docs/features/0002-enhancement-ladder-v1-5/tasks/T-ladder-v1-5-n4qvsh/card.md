---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "d486d3604cf7f2017805250971f914d3d1d66fe25988492595d1702d97b88531"
---
## Task T-ladder-v1-5-n4qvsh — Guided Workshop Wizard (S-0002.03)
**Parent:** story S-0002.03 · feature 0002-enhancement-ladder-v1-5
**Slice:** `/[track]/workshop` route + `WorkshopWizard` client component + `workshopPosition` Zustand slice + `WorkshopPosition` type + resume detection + mobile swipe

**Acceptance criteria:**
- [ ] AC-1 [behavior]: `/dev/workshop` renders a full-screen wizard with header (track name + "X of N" + `<progress>` bar), non-clickable breadcrumb, criterion text card, single checkbox, and rating radio group (Developing / Meeting / Exceeding)
- [ ] AC-2 [behavior]: Criteria sequenced for `currentLevel`: universal domains first (Delivery → Leadership → FCC → Strategic Impact), then Technical Skills; coming-soon domains skipped
- [ ] AC-3 [behavior]: "Next →" advances criterion; "← Back" decrements (no-op at 0); "Skip" advances without toggling checkbox
- [ ] AC-4 [behavior]: Checkbox and rating writes persist to `assessments` store via existing `toggleCriterion` / `setRating` actions
- [ ] AC-5 [behavior]: `workshopPosition` (`{ track, level, scope, criterionIndex, totalCriteria, startedAt }`) persists to localStorage on every advance; on return visit a "Continue?" banner shows with Continue / Restart actions
- [ ] AC-6 [behavior]: Completing all criteria shows completion screen with "Workshop complete" heading, summary counts, and CTAs "See my results" → `/dev/results` and "Review by domain" → `/dev`; sets `workshopPosition = null`
- [ ] AC-7 [behavior]: Swipe left (pointer delta > 60px) = Next; swipe right = Back
- [ ] AC-8 [invariant]: `workshopPosition` is additive to localStorage — existing keys (`assessments`, `currentTrack`, `currentLevel`, `focusedView`) unchanged
- [ ] AC-9 [e2e]: A user navigating to `/dev/workshop` can step through criteria, check/rate each, and reach the completion screen

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7
**Tests:** `src/components/__tests__/WorkshopWizard.test.tsx`
**Done =** reviewable PR, all tests pass, links to chain. One PR per task.
