# T5 — Track Domain Overview Page
**Epic:** Navigation Shell — Domain Overview with Progress
**Milestone:** M2 (v0.2.0) — closes M2
**Branch:** feature/T5-track-domain-overview

---

## Epic

Enable engineers to land on a track-specific overview page that shows all career domains at a glance, with real-time progress rings reflecting their self-assessed criteria completion at their current level, and clear coming-soon signposting for domains not yet available.

---

## User Stories

1. **As an engineer**, I want to navigate to my track's overview page (e.g. `/dev`) and see all domains in that track so I know what areas the career matrix covers.

2. **As an engineer**, I want each available domain card to show a progress ring reflecting the percentage of criteria I have checked at my current level, so I can instantly gauge where I stand without opening every domain.

3. **As an engineer**, I want coming-soon domains to be visually distinct (badge + reduced opacity, no link) so I am not confused when I attempt to navigate to an unavailable section.

4. **As an engineer**, I want clicking a domain card to take me to `/{track}/{domain}` so I can drill into the full competency detail for that domain.

---

## Tasks

1. **Create `src/components/ProgressRing.tsx`**
   - SVG component accepting `percentage: number`, `size: number`, `strokeWidth?: number` (default `4`)
   - Two `<circle>` elements: gray background track + blue progress arc
   - Arc rendered via `strokeDasharray` / `strokeDashoffset` calculated from circumference and percentage
   - Centered `<text>` element (or absolutely positioned `<span>`) displaying `"{percentage}%"` as visible text
   - No `any` types; all props strictly typed

2. **Add `ProgressRing` unit tests** in `src/components/__tests__/ProgressRing.test.tsx`
   - Test: renders `"75%"` when `percentage=75`
   - Test: renders `"0%"` when `percentage=0`

3. **Create `src/app/[track]/TrackDomainView.tsx`** (client component)
   - Accepts `track` data object as prop (passed from server page)
   - Reads `currentLevel` and `assessments` from Zustand store
   - Renders track name and description
   - Renders a responsive grid of domain cards
   - For each non-coming-soon domain: domain name, description, `<ProgressRing>` with calculated percentage, wrapped in a `<Link href="/{track}/{domain}">`
   - For each coming-soon domain: domain name, "Coming soon" badge, reduced opacity (`opacity-50` or equivalent), no ring, no link
   - Progress calculation per domain: `(sum of checked criteria across all competencies at currentLevel) / (sum of total criteria across all competencies at currentLevel) * 100`; return `0` if denominator is zero

4. **Create `src/app/[track]/page.tsx`** (server component)
   - Read `params.track`
   - Call `getTrack(params.track)`
   - Return `notFound()` if track is not found
   - Pass resolved track data to `<TrackDomainView>`

5. **Add page-level tests** in `src/app/[track]/__tests__/TrackPage.test.tsx`
   - TrackPage (dev): renders 5 domain cards (delivery, leadership, fcc, strategic-impact, technical-skills)
   - TrackPage (dev): each non-coming-soon domain card contains a progress ring element
   - TrackPage (qa): the technical-skills domain card shows a "Coming soon" badge

6. **Verify no TypeScript errors** — run `tsc --noEmit`; all strict mode checks must pass

7. **Cut M2 release**
   - Create release branch `release/v0.2.0` from `feature/T5-track-domain-overview` (after merge to `main`)
   - Bump version to `0.2.0` in `package.json`
   - Open PR to `main`, tag `v0.2.0`, create GitHub release with changelog notes

---

## Acceptance Criteria

**ProgressRing component**

1. Given `percentage=75` and `size=100`, the component renders visible text `"75%"` in the DOM.
2. Given `percentage=0` and `size=100`, the component renders visible text `"0%"` in the DOM.
3. The progress arc `strokeDashoffset` at `percentage=0` equals the full circumference (no arc visible).
4. The progress arc `strokeDashoffset` at `percentage=100` equals `0` (full arc visible).
5. `strokeWidth` defaults to `4` when not provided; passing an explicit value overrides it.
6. The component contains no TypeScript `any` types.

**Track domain overview page — general**

7. Navigating to `/{track}` for a valid track renders the track name and description.
8. Navigating to `/nonexistent-track` returns a 404 (Next.js `notFound()` is called).
9. The domain grid renders one card per domain defined in the track's data.

**Non-coming-soon domain cards**

10. Each non-coming-soon domain card displays the domain name.
11. Each non-coming-soon domain card displays a `ProgressRing` element.
12. The `ProgressRing` percentage equals `(checked criteria at currentLevel) / (total criteria at currentLevel) * 100`, rounded to a whole number; it renders `"0%"` when the engineer has made no assessments.
13. Each non-coming-soon domain card is wrapped in a link navigating to `/{track}/{domain}`.
14. The `ProgressRing` does not throw or render an error when total criteria count is zero (edge case: new domain with no criteria).

**Coming-soon domain cards**

15. Each coming-soon domain card displays a "Coming soon" badge (text visible in DOM).
16. Coming-soon cards are rendered with reduced opacity.
17. Coming-soon cards do not contain a `ProgressRing` element.
18. Coming-soon cards are not wrapped in a navigable link.
19. No criteria rendering is attempted for coming-soon domains.

**Dev track**

20. `/dev` renders exactly 5 domain cards: delivery, leadership, fcc, strategic-impact, technical-skills.
21. All 5 dev domains are non-coming-soon and each contains a progress ring.

**QA track**

22. `/qa` renders the technical-skills domain card with a "Coming soon" badge.

**TypeScript and code quality**

23. `tsc --noEmit` exits with code `0` on the full project after this feature is merged.
24. No `any` types appear in any file introduced or modified by this task.

---

## Definition of Done

- [ ] `ProgressRing` component implemented in `src/components/ProgressRing.tsx` with all props typed, default `strokeWidth=4`, SVG arc logic, and visible percentage text.
- [ ] `TrackDomainView` client component implemented with correct progress calculation, coming-soon guard (no ring, no link, badge shown), and domain grid layout.
- [ ] `src/app/[track]/page.tsx` server component calls `getTrack()` and returns `notFound()` on missing track.
- [ ] All 5 Vitest + RTL tests pass: 2 ProgressRing tests + 3 TrackPage tests (dev ×2, qa ×1).
- [ ] `tsc --noEmit` passes with zero errors on strict mode.
- [ ] No `any` types introduced anywhere in the task scope.
- [ ] Feature branch merged to `main` via PR, all CI checks green.
- [ ] `package.json` version bumped to `0.2.0`, release branch `release/v0.2.0` created, tag `v0.2.0` pushed, GitHub release created with M2 changelog notes.
