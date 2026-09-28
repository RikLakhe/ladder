---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "6c299eabe4b3381c81810a498d45c51375b7f7b8030ea34dcbe81846665f9504"
---
# PRD 0001 — Ladder v1: LFT Engineering Career Matrix Platform

> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.

**Source:** Briefing 0001 — Ladder v1 (docs/features/0001-master-ladder-v1/BRIEFING.md)
**Design spec:** docs/context/2026-09-26-ladder-design.md

---

## Story S-0001.01 — Repository & Toolchain Foundation

As a developer, I want a Next.js 15 App Router project with strict TypeScript, Vitest, React Testing Library, Playwright, Tailwind CSS, shadcn/ui, and Zustand configured so that all subsequent feature work begins from a verified, consistent foundation with automated CI.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `npm test` exits 0 and reports at least one passing test; no Jest references exist in any config or lock file
- [ ] AC-2 [behavior] — `npx tsc --noEmit` exits 0 with `strict: true`, `noImplicitAny: true`, `strictNullChecks: true` in `tsconfig.json`
- [ ] AC-3 [behavior] — `npm run build` exits 0 and produces a valid Next.js build artefact in `.next/`
- [ ] AC-4 [behavior] — `vitest.config.ts` exists at project root specifying `environment: 'jsdom'` and a `setupFiles` entry; no `any` type appears in any file under `src/`
- [ ] AC-5 [behavior] — `playwright.config.ts` exists with `testDir: './e2e'`; no Playwright step is present in CI workflow
- [ ] AC-6 [behavior] — `.github/workflows/ci.yml` triggers on PRs to `main` and `develop`, runs `npm ci`, `npm test`, `npm run build` on Node 20
- [ ] AC-7 [e2e] — A CI run is observable on a feature PR and shows all steps green

**Success metric:** `npm test`, `npm run build`, and `npx tsc --noEmit` all pass on a clean `npm ci` from any teammate's machine.

---

## Story S-0001.02 — Data Model & Assessment Store

As a Leapfrog engineer, I want my track selection, level, and self-assessment ratings to persist across page refreshes so I don't lose progress between sessions; and as a developer, I want fully-typed interfaces for all domain entities so I can build UI components without `any` escapes.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `src/lib/types.ts` exports all 11 named symbols: `LevelId`, `TrackId`, `SelfRating`, `Criterion`, `LevelDescriptor`, `Competency`, `Domain`, `Track`, `CompetencyAssessment`, `AssessmentStore`, `LEVELS`
- [ ] AC-2 [invariant] — `LEVELS` is `readonly ['p2','p3','p4','p5','p6','p7']` (as-const tuple, not `string[]`); `Domain.comingSoon` is a required boolean
- [ ] AC-3 [behavior] — `src/lib/store.ts` uses Zustand `persist` with `{ name: 'ladder-store', skipHydration: true }`; default state: `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`
- [ ] AC-4 [behavior] — Assessment key format is `{trackId}/{domainId}/{competencyId}` (forward slashes); `setRating(key, rating)` is 2-arg; `toggleCriterion(key, criterionId)` is 2-arg
- [ ] AC-5 [behavior] — `setRating` merges `selfRating` into `assessments[key]`, preserving existing `criteriaChecked`; initialises `criteriaChecked: []` if no prior entry; sets `updatedAt` to ISO timestamp
- [ ] AC-6 [behavior] — `toggleCriterion` adds criterion ID if absent; removes it if present; preserves `selfRating`; sets `updatedAt`
- [ ] AC-7 [invariant] — Checking a criterion under key A has zero effect on `criteriaChecked` or `selfRating` under any other key B
- [ ] AC-8 [behavior] — All 8 store unit tests pass under Vitest; `tsc --noEmit` exits 0; no `any` types
- [ ] AC-9 [e2e] — Assessment state written to localStorage survives a page reload and is restored on next visit

**Success metric:** All 8 store unit tests green; `tsc --noEmit` clean; localStorage round-trip verified in a browser session.

---

## Story S-0001.03 — Career Ladder Content Data

As a Leapfrog engineer, I want to browse competency domains for any of the 4 engineering tracks (Dev, QA, Data, AI) at any level P2–P7 so I can understand what capabilities are expected at my current and target levels.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `src/content/tracks.ts` exports `tracks: Track[]` containing exactly 4 track objects with IDs `dev`, `qa`, `data`, `ai`
- [ ] AC-2 [invariant] — Universal domain constants (`DELIVERY_DOMAIN`, `LEADERSHIP_DOMAIN`, `FCC_DOMAIN`, `STRATEGIC_IMPACT_DOMAIN`) are defined once and referenced by all 4 tracks — no structural duplication in source
- [ ] AC-3 [behavior] — Every non-coming-soon competency has level entries for all 6 levels (P2–P7) with non-empty descriptor and at least 1 criterion per level
- [ ] AC-4 [invariant] — All criterion IDs match `/^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/`; universal domain criteria use `shared/` prefix; dev technical-skill criteria use `dev/technical-skill/` prefix
- [ ] AC-5 [behavior] — Dev track has 5 domains (4 universal + `technical-skill` with 9 competencies, `comingSoon: false`); QA/Data/AI tracks have 4 universal + `technical-skill` stub (`comingSoon: true`, `competencies: []`)
- [ ] AC-6 [invariant] — No `JSON.parse`, `fs.readFile`, or dynamic import in `src/content/tracks.ts`; all data is static TypeScript
- [ ] AC-7 [behavior] — All 9 schema tests pass; `tsc --noEmit` exits 0; no `any` types
- [ ] AC-8 [e2e] — The app builds and serves competency content for all 4 tracks without runtime errors

**Success metric:** All 9 schema tests green; dev track shows 9 technical-skill competencies; QA/Data/AI show "coming soon" placeholder.

---

## Story S-0001.04 — Home Page: Track & Level Selection

As a Leapfrog engineer, I want to land on a home page, select my track and current level, see my selection visually highlighted, and navigate to my track's domain overview in one click.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Home page renders exactly 4 track buttons (Development, Quality Assurance, Data, AI / ML) and exactly 6 level buttons (P2–P7)
- [ ] AC-2 [behavior] — Each track and level button carries `aria-pressed="true"` when selected and `aria-pressed="false"` otherwise
- [ ] AC-3 [behavior] — Clicking a track button calls `setTrack(track.id)` on the Zustand store; clicking a level button calls `setLevel(level)`
- [ ] AC-4 [behavior] — `getNextLevel('p7')` returns `null` under all code paths — no level beyond P7 is ever returned
- [ ] AC-5 [behavior] — `src/lib/content.ts` exports 6 pure utility functions: `getTracks`, `getTrack`, `getDomain`, `getCompetency`, `getNextLevel`, `computeProgress`; `computeProgress` returns 0–100 integer rounded; all utility tests pass
- [ ] AC-6 [e2e] — "View my ladder →" link navigates to `/{currentTrack}` reflecting the active store selection

**Success metric:** All content utility tests and home page component tests green; track/level picker wired to store and confirmed in browser.

---

## Story S-0001.05 — Track Domain Overview with Progress Rings

As an engineer, I want to navigate to my track's overview page (`/{track}`) and see all career domains as cards — each with a real-time progress ring — so I can gauge my readiness across domains at a glance.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `ProgressRing` renders visible `"{percentage}%"` text; `strokeDashoffset` at 0% equals full circumference, at 100% equals 0; `strokeWidth` defaults to 4
- [ ] AC-2 [behavior] — `/dev` renders exactly 5 domain cards; `/qa` renders a "Coming soon" badge on `technical-skill`; a non-existent track returns 404 (`notFound()`)
- [ ] AC-3 [behavior] — Each non-coming-soon domain card is wrapped in a link to `/{track}/{domain}`; coming-soon cards have no link and no `ProgressRing`
- [ ] AC-4 [behavior] — Progress ring percentage = `(checked criteria at currentLevel across domain) / (total criteria at currentLevel across domain) * 100`, rounded; renders `0%` with no assessments; no crash when total criteria = 0
- [ ] AC-5 [invariant] — No `any` types; `tsc --noEmit` exits 0
- [ ] AC-6 [e2e] — Checking a criterion on a competency page updates the domain overview progress ring for that domain without page reload

**Success metric:** 5 Vitest tests green (2 ProgressRing, 3 TrackPage); progress ring updates live in browser after checking a criterion.

---

## Story S-0001.06 — Domain Detail: Competency List

As an engineer, I want to click into a domain and see all its competencies listed as navigable cards, or see a clear coming-soon placeholder for unpublished domains.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `/dev/leadership` renders all leadership competency names (Decision Making, Mentoring, Facilitation, and others); each card links to `/{track}/{domain}/{competency-slug}`
- [ ] AC-2 [behavior] — `/qa/technical-skill` renders "Coming soon" text; renders zero competency links — no link to "Writing Code" or any other competency slug
- [ ] AC-3 [behavior] — Invalid track or domain returns 404 (`notFound()`)
- [ ] AC-4 [behavior] — `ExploreButtonClient` renders accessible button with visible label text; calls `onClick` once on click
- [ ] AC-5 [invariant] — Coming-soon guard: no code path in the domain detail page renders a competency link when `domain.comingSoon === true`
- [ ] AC-6 [e2e] — Engineer can navigate Home → Track overview → Domain detail → Competency without dead ends

**Success metric:** All ExploreButtonClient and DomainPage Vitest tests green; coming-soon guard verified by test and code inspection.

---

## Story S-0001.07 — Competency Detail: Full Level Browse

As an engineer browsing the career matrix, I want to open a competency and see all 6 level cards (P2–P7) in order with descriptor text and criteria, and see my current level highlighted with a "Your level" badge.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Page renders exactly 6 level cards (P2–P7) in ascending order; each card shows level badge, descriptor text, and all criteria as plain text (no checkboxes in browse mode)
- [ ] AC-2 [behavior] — Card matching `currentLevel` has blue border + blue background and a "Your level" badge appearing exactly once; no other card carries those styles
- [ ] AC-3 [behavior] — Breadcrumb displays `{track.name} / {domain} / {competency.name}` at top of page with working back-links
- [ ] AC-4 [behavior] — When `currentLevel` is `p7`, page renders without runtime errors; when `currentLevel` is null/undefined, no card shows "Your level" badge
- [ ] AC-5 [invariant] — No `any` types; `tsc --noEmit` exits 0
- [ ] AC-6 [e2e] — Engineer can browse all 6 level cards for any competency and see their current level highlighted

**Success metric:** All 4 Vitest tests green (6 cards, badge once, P3 descriptor text, P3 criterion text); P7 edge case confirmed in browser.

---

## Story S-0001.08 — Self-Assessment: Criteria Checks & Self-Rating

As an engineer, I want to check individual criteria at any level and set a self-rating (Developing / Meeting / Exceeding) per competency, with progress rings updating live across the domain overview.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `CompetencyAssessmentView` renders `<input type="checkbox">` for each criterion, paired with a `<label>`; checking calls `toggleCriterion(assessmentKey, criterion.id)` on the store
- [ ] AC-2 [behavior] — Renders 3 self-rating buttons (Developing, Meeting, Exceeding); each has `aria-pressed` reflecting store state; clicking calls `setRating(assessmentKey, rating)`
- [ ] AC-3 [behavior] — Current level card highlighted with "Your level" badge; assessment key = `{trackId}/{domainId}/{competencyId}` (forward slashes, no substitution)
- [ ] AC-4 [invariant] — Criterion ID format: `{shared|dev}/{domainId}/{competencyId}/{level}/{index}` (0-based); mismatched IDs cause silent store misses — format is enforced by TypeScript types or shared utility, not ad-hoc concatenation
- [ ] AC-5 [invariant] — Checking criterion under key A has zero effect on `criteriaChecked` or `selfRating` under any other key B
- [ ] AC-6 [behavior] — `TrackDomainList` renders domain cards with `ProgressRing` for non-coming-soon domains; coming-soon domains show badge only, no ring, no link
- [ ] AC-7 [e2e] — Checking a criterion updates the domain progress ring immediately; self-rating persists across page reload via localStorage

**Success metric:** All 7 Vitest tests green (2 TrackDomainList, 5 CompetencyAssessmentView); criteria isolation verified; localStorage round-trip confirmed in browser.

---

## Story S-0001.09 — Focused View Toggle & SSR-Safe Hydration

As an engineer, I want to toggle a focused view showing only my current and next level cards, with my preference persisting across sessions; and I want the app to restore all my preferences on page load without hydration errors.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `focusedView=false` (default): all 6 level cards visible in `CompetencyAssessmentView`
- [ ] AC-2 [behavior] — `focusedView=true`, `currentLevel=p3`: exactly P3 and P4 cards visible; P2, P5, P6, P7 absent from DOM (not hidden)
- [ ] AC-3 [behavior] — `focusedView=true`, `currentLevel=p7`: exactly 1 card (P7) visible; message "You're at the highest level — P7 is the top of the Leapfrog career ladder." visible; no runtime error
- [ ] AC-4 [invariant] — No `useState`/`useReducer` manages focused view in components; state lives only in Zustand store; `setFocusedView(value: boolean)` is the only write path
- [ ] AC-5 [behavior] — `StoreHydration` component renders null; calls `useStore.persist.rehydrate()` exactly once inside `useEffect` on mount; never at module level
- [ ] AC-6 [invariant] — `persist.rehydrate()` exists only inside `useEffect` in `StoreHydration.tsx` — grep confirms no other call site
- [ ] AC-7 [behavior] — `<StoreHydration />` is mounted in `src/app/layout.tsx` so it executes on every page load
- [ ] AC-8 [e2e] — Enabling focused view, reloading page: focused view remains enabled with no flash of the 6-card layout before hydration

**Success metric:** All 4 Vitest tests green (3 focused-view, 1 StoreHydration); hydration tested in browser — no console warnings.

---

## Story S-0001.10 — Production Readiness: Accessibility, Performance, Coming-Soon Polish

As an engineer using assistive technology or a manager evaluating the platform, I want Ladder to meet WCAG AA accessibility, score ≥ 90 on all Lighthouse categories, and show clear coming-soon placeholders for unpublished domains — so the v1.0 release is production-ready.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — QA, Data, AI `technical-skill` domain pages render "Coming soon" placeholder; no competency link appears; Dev `technical-skill` renders competency links; behaviour driven by `comingSoon` flag — no hard-coded per-track conditionals
- [ ] AC-2 [non-functional] — Every `<button>` has accessible name (visible text or `aria-label`); every `<a>` has descriptive text; every `<input type="checkbox">` has associated `<label>`; track/level buttons carry `aria-pressed`
- [ ] AC-3 [non-functional] — Blue-600 (`#2563EB`) on white achieves ≥ 4.5:1 contrast ratio at normal text (WCAG AA) — documented in PR description
- [ ] AC-4 [non-functional] — Lighthouse Performance, Accessibility, Best Practices, SEO all ≥ 90 on production build
- [ ] AC-5 [behavior] — `app/layout.tsx` has `lang="en"` on the html element, a meta description tag, and a default page title via Next.js Metadata API; each route exports unique `metadata` with title and description
- [ ] AC-6 [e2e] — 4 Playwright E2E tests in `e2e/coming-soon.spec.ts` pass manually against production build; excluded from CI
- [ ] AC-7 [invariant] — `npm run build` exits clean; `tsc --noEmit` exits 0; no `any` types in T10 code
- [ ] AC-8 [e2e] — v0.5.0 and v1.0.0 GitHub Releases exist on `main`, tagged and published; v1.0.0 marked as Latest; Vercel production deployment reflects v1.0.0

**Success metric:** Lighthouse ≥ 90 all categories captured in PR description; 4 E2E tests green locally; v1.0.0 live on Vercel.

---

## Cross-cutting success criteria (v1)

- Engineers can self-assess all universal domains across all 4 tracks
- Progress persists across browser sessions (localStorage)
- Focused view reduces noise to current + next level on demand
- New tracks' Technical Skills content slots in without code change (driven by `comingSoon` flag)
- Deploys to Vercel from GitHub `main` in < 5 minutes
- Lighthouse performance score ≥ 90
