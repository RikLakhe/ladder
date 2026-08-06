---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "dc827f72789da84a247ff17e5b6d340235159e480f2dbfe461ba78f51be5a256"
---
# Briefing 0004 — Frontend Shell (full app build against HTML mock)

## Why
Real feature work (0002, 0003) built pages/APIs piecemeal, story by story. Result: the running app's feel/flow doesn't match the intended prototype (`design/Competency Review App.dc (1).html`) — nav, empty states, admin mode, search, level-prompt modal etc. are partial or missing. Stakeholder needs to click through the WHOLE app end-to-end and feel it's right before more backend-shaped feature work continues. This briefing drives a pass that completes every screen in the prototype using mock data where a real API isn't there yet, so navigation/flow/feel can be reviewed as a whole, not story-by-story.

## Hypothesis
Walk the full `design/Competency Review App.dc (1).html` prototype screen-by-screen, build/complete the matching Next.js page for each (reusing `src/components/*` already built: Shell, LevelTag, LevelTabStrip, ContentLayout, EmptyState), backing any page whose real API/table doesn't exist yet (badges detail, evidence, training, version history, admin/auth) with a mock-data service layer with the same shape the real API will eventually have — so swapping mock→real later is a one-line change. Every link/button in the prototype must resolve to a real route (no dead links). Existing real-data pages (competencies, PF standard tabs) stay wired to their real APIs — do not mock those.

## Mocks / references
- `design/Competency Review App.dc (1).html` — full prototype, source of truth for flow/feel/copy. 2493 lines, covers: level-set modal, admin login/logout, home, competency page, PF page + level tabs, badges list/detail, training, version history, search, admin CMS screens.
- `design/01-competency-browser.md` through `06-auth.md` — PRD-per-slice specs already written for the real backend features; use these for data shapes when mocking.
- Existing real pages: `src/app/competencies`, `src/app/primary-functions/[pfId]`, `src/app/primary-functions/[pfId]/standard`.
- Existing shared components: `src/components/{Shell,LevelTag,LevelTabStrip,ContentLayout,EmptyState}.tsx` — reuse, extend, don't redefine.

## Scope hints
**Probably in:**
- Full click-through: every nav link / button in the HTML prototype lands on a real (even if mock-backed) page — no dead links.
- Mock API service layer (e.g. `src/lib/mock/*`) for screens without a real backend yet: badge list/detail/evidence, training viewer, version history, admin CMS, admin auth — shaped to match the already-written PRD/TSD docs (02-06) so it's a drop-in swap later.
- Common/shared UI components pulled out of the prototype's repeated patterns (cards, tags, modals, tooltips, legend, search bar) for reuse across pages — not one-off inline styles per page.
- Fix/complete any broken or dead-end link found while walking the prototype (e.g. missing detail page, missing route param).
- Level-set modal, search, global nav/header — currently only partially present.
- Visual/feel parity: fonts, spacing, color scale (oklch tokens), card style match the prototype closely enough that the "goal not aligning" gap closes.

**Probably out:**
- Replacing any already-working real-data page/route with mock data.
- Real backend/migration work for badges/training/history/admin (that's 0003 and future features — this is frontend-only, mock-backed).
- Pixel-perfect mobile polish (prototype itself is desktop-primary).
- Real auth (magic link email sending) — admin login can be mocked/dev-login only.

## Open questions
(none — proceeding straight to PRD drafting from the prototype walkthrough)

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
