# T4 — Content Utilities and Home Page
**Epic:** Navigation Shell — Track & Level Selection
**Milestone:** M2 (v0.2.0)
**Branch:** feature/T4-content-utils-home

---

## Epic

Enable engineers to land on the Ladder home page, select their engineering track and career level, and navigate directly to their personalised career matrix view.

---

## User Stories

1. **As a Leapfrog engineer**, I want to see all four engineering tracks on the home page so that I can identify which track applies to my role.

2. **As a Leapfrog engineer**, I want to select my current career level (P2–P7) on the home page so that the app remembers my level as I browse the matrix.

3. **As a Leapfrog engineer**, I want to see my selected track and level visually highlighted so that I always know which context is active.

4. **As a Leapfrog engineer**, I want a "View my ladder →" link that takes me directly to my selected track's matrix view so that I can reach my relevant content in one click.

---

## Tasks

1. **Create `src/lib/content.ts`** with the following exported utility functions:
   - `getTracks()` — returns the array of all 4 track objects from content data
   - `getTrack(id: TrackId)` — returns the matching track object, or `null` if not found
   - `getDomain(trackId: TrackId, domainId: string)` — returns the matching domain within the specified track, or `null` if either is not found
   - `getCompetency(trackId: TrackId, domainId: string, competencyId: string)` — returns the matching competency, or `null` if any segment is not found
   - `getNextLevel(level: LevelId): LevelId | null` — returns the next level in sequence (p2→p3, p3→p4 … p6→p7); returns `null` for `p7` — must never return a value beyond P7
   - `computeProgress(competency: Competency, level: LevelId, checkedIds: string[]): number` — returns a 0–100 integer (rounded) representing the percentage of criteria at the given level that appear in `checkedIds`

2. **Write Vitest unit tests in `src/lib/content.test.ts`** covering all utility functions (see Acceptance Criteria §1–6).

3. **Create `src/app/page.tsx`** as a client component (`'use client'`) containing:
   - A 4-button track selector (Development, Quality Assurance, Data, AI / ML)
   - A 6-button level selector (P2, P3, P4, P5, P6, P7)
   - `aria-pressed` on every track and level button reflecting selected state
   - Blue highlight styling on the active track button and active level button
   - A "View my ladder →" anchor/link whose `href` resolves to `/{currentTrack}`
   - Zustand store calls: track buttons call `setTrack(track.id)`, level buttons call `setLevel(level)`

4. **Write Vitest + RTL component tests in `src/app/page.test.tsx`** covering home page interactions (see Acceptance Criteria §7–10).

5. **Type-check and lint** — `tsc --noEmit` passes; no `any` types introduced; ESLint clean.

6. **Update `CHANGELOG.md`** under the `[Unreleased]` section to note T4 additions.

---

## Acceptance Criteria

### Content utility tests (`src/lib/content.test.ts`)

1. **getTracks — count:** `getTracks()` returns an array of exactly 4 track objects.

2. **getTrack — hit/miss:**
   - `getTrack('dev')` returns the Development track object (non-null, `id === 'dev'`).
   - `getTrack('unknown' as TrackId)` returns `null`.

3. **getDomain — hit/miss:**
   - `getDomain('dev', <valid-domain-id>)` returns the correct domain object (non-null).
   - `getDomain('dev', 'nonexistent')` returns `null`.

4. **getCompetency — hit:**
   - `getCompetency('dev', <valid-domain-id>, <valid-competency-id>)` returns the correct competency object (non-null, matching `id`).

5. **getNextLevel — boundary behaviour:**
   - `getNextLevel('p2')` returns `'p3'`.
   - `getNextLevel('p6')` returns `'p7'`.
   - `getNextLevel('p7')` returns `null` — verified by strict equality (`=== null`), not just falsy.

6. **computeProgress — three states:**
   - Given a competency with 2 criteria at level `p3` and `checkedIds = []`, `computeProgress(...)` returns `0`.
   - Given the same competency and `checkedIds` containing exactly 1 of the 2 criterion IDs, `computeProgress(...)` returns `50`.
   - Given `checkedIds` containing both criterion IDs, `computeProgress(...)` returns `100`.

### Home page component tests (`src/app/page.test.tsx`)

7. **Track buttons rendered:** The page renders exactly 4 buttons labelled (case-insensitive) "Development", "Quality Assurance", "Data", and "AI / ML" (or the track label values from content data).

8. **Level buttons rendered:** The page renders exactly 6 buttons labelled P2, P3, P4, P5, P6, and P7.

9. **Track selection — store update:** Clicking the "Quality Assurance" track button causes the Zustand store's `currentTrack` to equal `'qa'`.

10. **Level selection — store update:** Clicking the "P5" level button causes the Zustand store's `currentLevel` to equal `'p5'`.

### Non-functional / constraint criteria

11. **No `any` types:** `tsc --noEmit --strict` completes with zero errors on the T4 files.

12. **`getNextLevel('p7')` hard constraint:** Under all code paths (not just tests), `getNextLevel` must return `null` when passed `'p7'` — no level beyond P7 may ever be returned.

13. **`aria-pressed` correctness:** Each track and level button has `aria-pressed="true"` when selected and `aria-pressed="false"` when not selected (verified by RTL `getByRole` with `pressed` matcher or attribute assertion).

14. **Navigation link:** The "View my ladder →" element has an `href` attribute equal to `/${currentTrack}` reflecting the currently selected track in the Zustand store.

---

## Definition of Done

- [ ] `src/lib/content.ts` exported with all 6 utility functions; no `any` types; TypeScript strict passes.
- [ ] All 6 content utility test cases pass (`vitest run`).
- [ ] `src/app/page.tsx` implemented as a client component with track selector, level selector, `aria-pressed` states, blue active-state styling, and "View my ladder →" link.
- [ ] All 4 home page component test cases pass (`vitest run`).
- [ ] `getNextLevel('p7')` returns `null` — confirmed by passing test and manual code review.
- [ ] No TypeScript errors (`tsc --noEmit`) and no ESLint warnings in T4 files.
- [ ] Feature branch `feature/T4-content-utils-home` rebased onto `develop` (which contains T3), PR opened, and at least one review approval recorded before merge.
- [ ] `CHANGELOG.md` updated with T4 entries under `[Unreleased]`.
