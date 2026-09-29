---
approved_by: "Rikesh"
approved_at: "2026-09-29"
planned_behaviors: "4"
approved_sha256: "92cd7a8aa8131574397eee924969d4f185c45b9148c63b3a9e3c5012b1c2116e"
---
## Exec Plan — Task T-ladder-v1-5-xvybnk
> Authored during planning, before any code. GATE: approve via `lane approve` BEFORE any code.

**Will build:**
- Tailwind config: `leapverse-*` colour tokens (10/40/70/100) + `level-p2` through `level-p7` border tokens (AC-1, AC-4)
- `src/components/ProgressBar.tsx`: new horizontal progress bar component, `percentage: number` prop (AC-3)
- `src/app/[track]/[domain]/[competency]/CompetencyDetail.tsx`: add `border-l-4 border-level-p{n}` to each level card; change self-rating buttons to pill shape (AC-1, AC-2)
- `src/app/[track]/[domain]/DomainDetail.tsx`: replace `<ProgressRing>` with `<ProgressBar>` in competency list (AC-3)
- Update CTA button classes site-wide (home page nav link, track overview) from `bg-blue-600` → `bg-leapverse-100` (AC-4)
- Tests: `ProgressBar` unit test; updated competency detail test for border classes + pill buttons

**Approach:**
Add colour tokens to Tailwind config first — all downstream components depend on them. Then new `ProgressBar` component (RED→GREEN). Then competency detail visual changes (border + pills). Brand accent colour sweep last.

**Boundaries & mocks:**
None. All pure component rendering — no external deps, no network, no clock.

**Behaviors (TDD order):**
- B-1: `ProgressBar` renders a div with `width` style matching the `percentage` prop (tracer bullet — new component)
- B-2: Level card in `CompetencyDetail` has `border-l-4` + correct `border-level-p{n}` class for each level
- B-3: Domain detail competency list renders `ProgressBar` elements, not `ProgressRing` SVGs
- B-4: Self-rating buttons in `CompetencyAssessmentView` have `rounded-full` (pill shape) class + correct `aria-pressed`

**B-5 (AC-5, e2e) — Tests: N/A for e2e cycle:** manual confirmation that `/dev/technical-skill/writing-code` shows colour-coded borders + pill buttons. Captured in verification.

**PR will contain:**
- `tailwind.config.ts` (new colour tokens)
- `src/components/ProgressBar.tsx` (new)
- `src/components/__tests__/ProgressBar.test.tsx` (new)
- `src/app/[track]/[domain]/[competency]/CompetencyDetail.tsx` (level border + pill buttons)
- `src/app/[track]/[domain]/DomainDetail.tsx` (ProgressBar swap)
- `src/app/page.tsx` (green CTA)
- `src/app/[track]/TrackOverview.tsx` (green CTA, if applicable)
- Updated snapshot tests if class assertions change

**Open questions / ambiguities:**
- `ProgressRing` in `TrackOverview` (track-level domain progress rings on `/[track]`) — keep as-is; T2 (MatrixHeatMap) will restructure that page. Only `DomainDetail` swaps rings → bars in this task.
- `CompetencyAssessmentView` pill rating buttons: component already uses `aria-pressed`; visual change only (add `rounded-full` + padding). Existing test assertions on `aria-pressed` should still pass.

**Path:** L (lean, default)
**Escalation signals hit:** None.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
