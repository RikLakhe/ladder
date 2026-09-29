---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "55e76de3dc728678155c834e876cc52f0d3c53f474856f64d2e1330ae3ef1c3f"
---
# Mini PRD 0002 — Ladder v1.5: UI/UX Overhaul
> Builds on 0001-master-ladder-v1 (feature-complete). Pure front-end redesign — no backend, no auth, no data migration.

**Parent:** 0001-master-ladder-v1
**Source:** post-v1 UX review — tree navigation produces high cognitive load and low engagement; reference: `docs/context/prd/Ladder.html` (Leapfrog internal reference implementation of the matrix/workshop/results pattern)

**Brand alignment note:** The reference app uses the Leapfrog Design System (primary `#038E43` green, leapverse tint ramp). v1 used Tailwind blue-600 as a placeholder. v1.5 adopts the correct green brand colour where it applies (heat-map, CTA buttons, accent); existing blue buttons on home/level pages are updated to green in Phase A.

---

## Story S-0002.01 — Visual Refresh
As an engineer I want level cards and domain lists to use colour-coded visual styling so that I can orient at a glance without reading text.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Competency detail level cards have a left border coloured by level (P2=slate, P3=blue, P4=indigo, P5=violet, P6=purple, P7=pink) using Tailwind `level-*` colour tokens added to the config
- [ ] AC-2 [behavior] — Self-rating buttons on competency detail are pill toggles, not plain buttons
- [ ] AC-3 [behavior] — Domain detail replaces progress rings with horizontal progress bars
- [ ] AC-4 [e2e] — A user navigating to any competency detail page sees colour-coded level cards and pill rating buttons

**Success metric:** Visual refresh confirmed via manual review; Lighthouse ≥ 90 maintained.

---

## Story S-0002.02 — Matrix Heat-Map
As an engineer I want a domain × level heat-map on the track overview so that I can see my full assessment state in under 30 seconds.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Track overview renders a `MatrixHeatMap` grid: rows = domains (5), columns = levels (P2–P7); each cell shows completion % coloured by Leapfrog green tint ramp: 0%=surface-grey (no data), 1–49%=`#B4FFD6` (leapverse-10), 50–79%=`#79D9A5` (leapverse-40), 80–99%=`#3EB474` (leapverse-70), 100%=`#038E43` (leapverse-100, full green + checkmark)
- [ ] AC-2 [behavior] — Current level column has a coloured left border and "You" badge at the column header
- [ ] AC-3 [behavior] — Clicking a cell navigates to that domain's page (filtered view of that level)
- [ ] AC-4 [behavior] — Hover tooltip shows domain name, level, "X of Y criteria met"
- [ ] AC-5 [behavior] — "Start Workshop" CTA above the grid links to `/[track]/workshop`
- [ ] AC-6 [behavior] — Radar chart (5 axes, one per domain) renders below the grid once at least one assessment has been started; hidden otherwise
- [ ] AC-7 [behavior] — Legacy domain cards (v1 ring pattern) collapsed under "Browse by domain" disclosure element
- [ ] AC-8 [e2e] — A user on the track overview sees the heat-map, their current level highlighted, and can click a cell to reach the domain

**Success metric:** Heat-map renders correctly for all tracks; time-to-first-view of assessment state < 30s.

---

## Story S-0002.03 — Guided Workshop Wizard
As an engineer I want a step-by-step guided assessment wizard so that completing my self-assessment feels like a structured workshop, not a tree traversal.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `/[track]/workshop` route renders a full-screen wizard showing one criterion per screen with header (track name + "X of N" + progress bar), breadcrumb (domain / competency / level), criterion text, single checkbox, and a rating radio group
- [ ] AC-2 [behavior] — Sequencing: all criteria for current level, universal domains first (Delivery → Leadership → FCC → Strategic Impact), then Technical Skills; coming-soon domains skipped
- [ ] AC-3 [behavior] — Next/Back navigation steps through criteria; Skip moves to the next without toggling the checkbox
- [ ] AC-4 [behavior] — State (checkbox + rating) saves to localStorage on every Next/Back action via the existing assessments store key
- [ ] AC-5 [behavior] — `workshopPosition` Zustand slice persists `{ track, level, scope: string | null, criterionIndex, totalCriteria, startedAt }` to localStorage; `scope` is null for full-track workshop or a competency ID for a scoped workshop; on return visit if position exists, a "Continue?" banner is shown
- [ ] AC-6 [behavior] — Completion screen shows "Workshop complete", summary (domains done, criteria met count, exceeding count), CTAs "See my results" → `/[track]/results` and "Review by domain" → `/[track]`
- [ ] AC-7 [behavior] — Mobile: swipe left = Next, swipe right = Back; rating group rendered in a bottom sheet on small screens
- [ ] AC-8 [invariant] — No existing localStorage assessment keys (`assessments`, `currentTrack`, `currentLevel`, `focusedView`) are modified in schema; `workshopPosition` is additive only
- [ ] AC-9 [e2e] — A user navigating to `/[track]/workshop` can step through all criteria, check/rate each, and reach the completion screen

**Success metric:** Workshop completion rate > 60% (engineer starts → finishes) in first week.

---

## Story S-0002.04 — Results Dashboard
As an engineer I want a results dashboard at `/[track]/results` so that my assessment progress is visual, shareable, and motivating.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `/[track]/results` renders a radar chart: 5 axes (one per domain), two overlaid polygons — "criteria met" (filled) and "criteria exceeding" (outline); implemented with Recharts `RadarChart` or custom SVG (decision at Phase D start based on bundle size)
- [ ] AC-2 [behavior] — Domain scorecards show domain name, progress bar (X / Y criteria met at current level), rating pills (N Developing · N Meeting · N Exceeding), and a "See details →" link
- [ ] AC-3 [behavior] — Focus Areas section shows the 3 competencies with lowest % checked at current level, each with a "Work on this →" link to its competency detail page
- [ ] AC-4 [behavior] — "Export summary" button generates a canvas PNG (via html2canvas) of the radar chart + domain scores; image contains no PII (no name, no email)
- [ ] AC-5 [behavior] — "Ready for P{n+1}?" nudge renders if current level ≥ 80% met across all domains
- [ ] AC-6 [e2e] — A user navigating to `/[track]/results` after completing assessments sees their radar chart, scorecards, and focus areas

**Success metric:** Dashboard renders correctly with real assessment data; export produces a downloadable PNG.

---

## Story S-0002.05 — Polish and Accessibility
As an engineer using a keyboard or assistive technology I want the workshop and heat-map to be fully keyboard-navigable and screen-reader-friendly so that the v1.5 experience is accessible to all.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Workshop wizard supports keyboard navigation: Arrow-right / Enter = Next, Arrow-left = Back, Escape = Skip
- [ ] AC-2 [behavior] — Heat-map cells have `aria-label` with "Domain, Level, X of Y criteria met" format
- [ ] AC-3 [behavior] — Wizard transitions respect `prefers-reduced-motion` — no animation when set
- [ ] AC-4 [non-functional] — `npm run build` and `tsc --noEmit` both exit 0
- [ ] AC-5 [non-functional] — Lighthouse ≥ 90 all four categories on a production build (Performance, Accessibility, Best Practices, SEO)
- [ ] AC-6 [e2e] — A user can complete the workshop wizard using keyboard only

**Success metric:** Lighthouse ≥ 90 maintained; no regression on v1 a11y.
