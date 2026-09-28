# T7 — Competency Detail Page (Browse Mode)

**Epic:** Browse — Full Competency Level View  
**Milestone:** M3 (v0.3.0) — closes M3  
**Branch:** `feature/T7-competency-detail`  
**Updated:** 2026-09-27  
**Status:** active  
**Pre-condition:** T6 merged; domain detail page routes to `/{track}/{domain}/{competency}`

---

## Epic

Enable any Leapfrog engineer to open a competency detail page, read all six level descriptors and their criteria side-by-side, and immediately see which level is their current one — giving them a clear, read-only view of the full career progression for that competency before any self-assessment begins.

---

## User Stories

1. **As an engineer browsing the career matrix**, I want to open a competency and see all six level cards (P2–P7) in order, so I can understand the full progression from entry to principal without navigating away.

2. **As an engineer who has set my current level**, I want the card matching my level to be visually highlighted with a "Your level" badge, so I can instantly locate where I sit without having to read each descriptor.

3. **As an engineer reading a level card**, I want to see the descriptor text and each criterion as a plain text item (no checkboxes), so I can read and absorb the expectations for that level without triggering any assessment state.

4. **As an engineer navigating the matrix**, I want a breadcrumb showing `{track} / {domain} / {competency}` at the top of the page, so I always know my location and can backtrack in one click.

---

## Tasks

1. **Create the page file** at `src/app/[track]/[domain]/[competency]/page.tsx` as a client component (`'use client'`).

2. **Wire route params** — destructure `params.track`, `params.domain`, `params.competency` from the Next.js 15 App Router `PageProps`.

3. **Resolve data** — call `getTrack(params.track)` and `getCompetency(params.domain, params.competency)`; return `notFound()` if either resolves to null/undefined.

4. **Read current level from Zustand** — call `useStore(state => state.currentLevel)` (no SSR — this is a client component, so hydration is straightforward).

5. **Render breadcrumb** — `{track.name} / {domain} / {competency.name}` using the existing `<Breadcrumb>` component or inline nav. Each segment links to its respective route.

6. **Render six level cards** — iterate the ordered level list `['p2', 'p3', 'p4', 'p5', 'p6', 'p7']`, render a card for each.

7. **Implement current-level highlight** — when `level === currentLevel`, apply blue border + blue background to the card and render a "Your level" badge. Non-current cards use standard styling.

8. **Render criteria as plain text items** — inside each card, list `competency.levels[level].criteria` as `<li>` or `<p>` elements. No checkboxes, no rating controls (browse mode only).

9. **Handle P7 edge case** — `getNextLevel('p7')` returns `null`; ensure no call to a next-level accessor crashes when iterating P7's card.

10. **Write Vitest + RTL tests** — see Acceptance Criteria for required test cases. Place in `src/app/[track]/[domain]/[competency]/page.test.tsx` or `__tests__/`.

11. **Run full test suite** — `pnpm test` (or `vitest run`) must pass with no TypeScript errors (`tsc --noEmit`). No `any` types introduced.

12. **Open PR** against `feature/T7-competency-detail` → `main`; request review; merge.

13. **Release M3 (v0.3.0)** — cut release branch `release/v0.3.0`, bump `package.json` version to `0.3.0`, open PR to `main`, tag `v0.3.0` on merge, publish GitHub release with release notes.

---

## Acceptance Criteria

1. Navigating to `/{track}/{domain}/{competency}` for a valid competency renders the page without error; navigating to an invalid track or competency returns a 404.

2. The breadcrumb displays `{track.name} / {domain} / {competency.name}` in that order and is visible at the top of the page.

3. Exactly six level cards are rendered on the page — one each for P2, P3, P4, P5, P6, and P7 — in ascending order.

4. Each level card displays the level badge (e.g., "P3"), the descriptor text for that level, and all criteria for that level as plain text items. No checkbox inputs or rating controls appear anywhere on the page.

5. When `currentLevel` is set to `p3`, the P3 card has a blue border and blue background applied; no other card carries those styles.

6. The "Your level" badge appears exactly once on the page and is attached to the card matching `currentLevel`.

7. When `currentLevel` is `p7`, the P7 card is highlighted and the page renders without runtime errors (no call to `getNextLevel` crashes).

8. When `currentLevel` is not set (null/undefined), no card shows the "Your level" badge and no card carries the highlighted styles.

9. **Test — all 6 level cards rendered:** Given `track=dev`, `domain=leadership`, `competency=decision-making`, `currentLevel=p3`, the rendered output contains cards with badges P2, P3, P4, P5, P6, and P7.

10. **Test — "Your level" badge exactly once:** The text "Your level" appears in the DOM exactly one time, and it is inside the P3 card.

11. **Test — P3 descriptor text:** The P3 card contains the text `"Makes decisions for own tasks with awareness of bias and accountability."`.

12. **Test — P3 criterion text:** The P3 card contains the text `"Reflects on own cognitive bias when making a decision"`.

13. TypeScript strict mode passes with zero errors; no `any` types are present in the new file or tests.

---

## Definition of Done

- [ ] `src/app/[track]/[domain]/[competency]/page.tsx` exists, is a client component, and satisfies all acceptance criteria above.
- [ ] All four Vitest + RTL test cases pass (all 6 cards, "Your level" badge once, P3 descriptor text, P3 criterion text); full test suite is green.
- [ ] `tsc --noEmit` exits 0 with no `any` types in new or modified files.
- [ ] PR for `feature/T7-competency-detail` is reviewed and merged to `main`.
- [ ] Release branch `release/v0.3.0` is cut, `package.json` version is bumped to `0.3.0`, and a PR to `main` is opened and merged.
- [ ] Git tag `v0.3.0` is applied to the merge commit on `main`.
- [ ] GitHub release `v0.3.0` is published with a changelog summarising M3 (T5, T6, T7).
- [ ] No regressions in T5 or T6 functionality (track list, domain list, domain detail pages continue to pass their existing tests).
