# T10 — Polish, Accessibility, Coming-Soon Placeholders

**Epic:** Production Readiness — Accessibility, Performance, Coming-Soon UX
**Milestone:** M5 (v0.5.0) — closes M5; triggers M6 (v1.0.0)
**Branch:** `feature/T10-polish`

---

## Epic

Make Ladder production-ready by enforcing WCAG AA accessibility, achieving Lighthouse ≥ 90 across all four categories, and surfacing clear "coming soon" placeholders for tracks whose technical-skill domain pages are not yet populated.

---

## User Stories

1. **As an engineer browsing Ladder**, I want QA, Data, and AI technical-skill domain pages to show a clear "Coming soon" message — rather than an empty or broken competency list — so I understand that content is in progress and I am not confused by a missing page.

2. **As an engineer using assistive technology (screen reader, keyboard navigation)**, I want every interactive element — buttons, links, checkboxes — to have an accessible name, correct ARIA state, and a logical focus order, so I can navigate Ladder without a mouse and receive accurate announcements.

3. **As a Leapfrog engineering manager**, I want Ladder to score ≥ 90 on Lighthouse Performance, Accessibility, Best Practices, and SEO, so the platform meets the organisation's quality bar and is discoverable without friction.

4. **As a release manager**, I want a green static build (no TypeScript errors, no type `any`), passing E2E tests against all four coming-soon scenarios, and documented M5 and M6 release procedures, so the v0.5.0 and v1.0.0 releases can be cut with confidence.

---

## Tasks

1. **Coming-soon placeholders**
   1.1. Audit the `technical-skill` domain page component to confirm which tracks render a competency list vs. a placeholder.
   1.2. For `QA`, `Data`, and `AI` tracks: render a "Coming soon" placeholder (e.g., a styled card with the text "Coming soon") instead of a competency list on the `technical-skill` domain page.
   1.3. For the `Dev` track: confirm the `technical-skill` domain page continues to render competency links (e.g., "Writing Code") with no placeholder.
   1.4. Ensure placeholder and competency-list paths are driven by data/config — no hard-coded per-track conditionals scattered across components.

2. **Accessibility fixes**
   2.1. Audit all `<button>` elements; add `aria-label` to any button whose visible text is absent or ambiguous (e.g., icon-only buttons).
   2.2. Audit all `<a>` elements; replace generic link text ("click here", "more") with descriptive text.
   2.3. Audit all `<input type="checkbox">` elements; associate each with a `<label>` via `htmlFor` / `id` pairing or wrapping label.
   2.4. Confirm track and level selection buttons carry `aria-pressed` (from T4); if any are missing, add the attribute.
   2.5. Audit level card tab order; reorder DOM or add `tabindex` where focus sequence does not follow top-to-bottom visual order.
   2.6. Audit all `<img>` elements (and `next/image` usage); add non-empty `alt` text to all meaningful images; add `alt=""` to decorative images.
   2.7. Verify blue-600 (`#2563EB`) on white background passes WCAG AA contrast ratio (4.5:1 at normal text, 3:1 at large text) — document result in PR description.

3. **Lighthouse / SEO requirements**
   3.1. Add `lang="en"` to the `<html>` element in `app/layout.tsx`.
   3.2. Add `<meta name="description" content="...">` in `app/layout.tsx` using the Next.js Metadata API.
   3.3. Add a `<title>` to each page using the Next.js Metadata API (`export const metadata`); titles should be descriptive and unique per route.
   3.4. Review for render-blocking resources (third-party scripts, synchronous CSS imports); eliminate or defer any identified.
   3.5. Run `npm run build` — resolve all TypeScript strict errors and remove any `any` types before proceeding to Lighthouse.
   3.6. Run Lighthouse (production build) across at least the home page and one domain page; confirm all four category scores ≥ 90.

4. **E2E tests — `e2e/coming-soon.spec.ts`**
   4.1. Write test 1: Navigate to QA `/technical-skill` → assert "coming soon" text is visible; assert "Writing Code" link is NOT visible.
   4.2. Write test 2: Navigate to Data `/technical-skill` → assert "coming soon" text is visible.
   4.3. Write test 3: Navigate to AI `/technical-skill` → assert "coming soon" text is visible.
   4.4. Write test 4: Navigate to Dev `/technical-skill` → assert "coming soon" text is NOT visible; assert "Writing Code" link is visible.
   4.5. Confirm tests are excluded from CI configuration (`.github/workflows` or `playwright.config.ts` CI flag); document that tests are run manually before each release PR.

5. **Build verification**
   5.1. Run `npm run build` — confirm clean exit with zero TypeScript errors.
   5.2. Confirm no `any` types are introduced in T10 changes (run `tsc --noEmit`).
   5.3. Run E2E tests manually against the production build; all four passing before release PR.

6. **M5 release (v0.5.0)**
   6.1. Cut release branch `release/v0.5.0` from `develop`.
   6.2. Bump `package.json` version to `0.5.0`; update `CHANGELOG.md`.
   6.3. Open PR: `release/v0.5.0` → `main`; require review and green build.
   6.4. On merge: tag `v0.5.0`, create GitHub Release for M5.

7. **M6 release (v1.0.0)**
   7.1. After final integration checks on `main`, cut `release/v1.0.0`.
   7.2. Bump `package.json` version to `1.0.0`; update `CHANGELOG.md`.
   7.3. Open PR: `release/v1.0.0` → `main`; require review and green build.
   7.4. On merge: tag `v1.0.0`, create GitHub Release marked as **Latest** — this triggers production deploy on Vercel.

---

## Acceptance Criteria

### Coming-Soon Placeholders

1. Navigating to the QA track's `technical-skill` domain page renders a visible "Coming soon" placeholder and does **not** render any competency link (e.g., "Writing Code" must not appear in the DOM).
2. Navigating to the Data track's `technical-skill` domain page renders a visible "Coming soon" placeholder.
3. Navigating to the AI track's `technical-skill` domain page renders a visible "Coming soon" placeholder.
4. Navigating to the Dev track's `technical-skill` domain page renders competency links (including "Writing Code") and does **not** render any "Coming soon" placeholder text.

### E2E Tests

5. `e2e/coming-soon.spec.ts` contains exactly four tests covering criteria 1–4 above.
6. All four E2E tests pass when run manually against the production build (`npm run build && npx playwright test e2e/coming-soon.spec.ts`).
7. E2E tests are **not** included in CI runs (verified via `playwright.config.ts` or CI workflow configuration).

### Accessibility

8. Every `<button>` in the application has an accessible name — either visible text content or a non-empty `aria-label`.
9. Every `<a>` element has descriptive link text (no "click here" or bare URL text).
10. Every `<input type="checkbox">` has an associated `<label>` (verified via `htmlFor`/`id` pairing or wrapping element).
11. Track and level selection buttons carry `aria-pressed="true"` when selected and `aria-pressed="false"` when not selected.
12. Level cards on any domain page have a logical top-to-bottom tab/focus order with no unexpected focus jumps.
13. No `<img>` or `next/image` element lacks an `alt` attribute; decorative images use `alt=""`.
14. Blue-600 (`#2563EB`) on white background achieves a minimum contrast ratio of 4.5:1 at normal text sizes (WCAG AA) — result documented in PR description.

### Lighthouse

15. Lighthouse Performance score ≥ 90 on the production build.
16. Lighthouse Accessibility score ≥ 90 on the production build.
17. Lighthouse Best Practices score ≥ 90 on the production build.
18. Lighthouse SEO score ≥ 90 on the production build.

### Build & Type Safety

19. `npm run build` exits cleanly with zero TypeScript errors.
20. `tsc --noEmit` reports no errors; no `any` types are present in T10-introduced code.
21. `app/layout.tsx` contains `<html lang="en">`, a `<meta name="description">`, and a default `<title>` via the Next.js Metadata API.
22. Each page route exports a unique, descriptive `metadata` object (at minimum `title` and `description`).

### Release Gate (v1.0.0)

23. `v0.5.0` GitHub Release exists on `main`, tagged `v0.5.0`, with release notes covering M5.
24. `v1.0.0` GitHub Release exists on `main`, tagged `v1.0.0`, marked as **Latest**, and the Vercel production deployment reflects this tag.

---

## Definition of Done

- [ ] `npm run build` passes with zero TypeScript errors and no `any` types in T10 code.
- [ ] All four coming-soon E2E tests in `e2e/coming-soon.spec.ts` pass manually against the production build; tests are excluded from CI.
- [ ] All accessibility acceptance criteria (AC 8–14) verified — either by automated axe scan, manual screen reader spot-check, or Lighthouse Accessibility score ≥ 90.
- [ ] Lighthouse scores ≥ 90 on Performance, Accessibility, Best Practices, and SEO, run against the Vercel preview or local production build; scores captured in PR description.
- [ ] `feature/T10-polish` PR reviewed, approved, and merged to `develop`.
- [ ] M5 release complete: `release/v0.5.0` branch cut, `package.json` bumped to `0.5.0`, PR merged to `main`, `v0.5.0` tag applied, GitHub Release published.
- [ ] M6 release complete: `release/v1.0.0` branch cut, `package.json` bumped to `1.0.0`, PR merged to `main`, `v1.0.0` tag applied, GitHub Release published as **Latest**, Vercel production deployment live.
- [ ] No regressions on previously passing unit tests (`npm run test`) or existing E2E tests.
