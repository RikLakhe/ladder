# T8 — Self-Assessment
**Epic:** Self-Assessment — Criteria Checks and Self-Rating
**Milestone:** M4 (v0.4.0)
**Branch:** feature/T8-self-assessment

---

## Epic

Enable engineers to self-assess against the career matrix by checking criteria at their current level and setting a self-rating per competency, with progress rings updating in real time from persisted Zustand store state.

---

## User Stories

1. **As an engineer browsing a track**, I want to see a progress ring on each domain card showing how many criteria I have checked at my current level, so I can quickly gauge my overall readiness across domains.

2. **As an engineer viewing a competency**, I want to check individual criteria at any P-level (especially my current level) and have those checks persist across sessions, so I can track my evidence of growth over time.

3. **As an engineer viewing a competency**, I want to set a self-rating of Developing, Meeting, or Exceeding, so I can record my own judgment of where I stand and revisit it each quarter.

4. **As an engineer viewing a competency at my current level**, I want my current level card to be visually distinct with a "Your level" badge, so I can immediately focus on the criteria most relevant to me.

---

## Tasks

1. **Create `TrackDomainList` component** at `src/components/TrackDomainList.tsx`
   - Mark as `'use client'`
   - Accept `track: Track` prop (no `any` types)
   - Read `currentLevel` and `assessments` from Zustand store
   - For each non-coming-soon domain: render a clickable card linking to `/{track.id}/{domain.id}` that includes a `ProgressRing`
   - For each coming-soon domain: render a badge-only card with no link and no ring
   - Compute progress per domain: `checked criteria count at currentLevel / total criteria count at currentLevel` across all competencies in the domain
   - Wire `ProgressRing` to the computed percentage (0–100)

2. **Create `CompetencyAssessmentView` component** at `src/components/CompetencyAssessmentView.tsx`
   - Mark as `'use client'`
   - Accept props: `competency: Competency`, `trackId: TrackId`, `domainId: string`
   - Derive assessment key: `{trackId}/{domainId}/{competency.id}` (forward slashes, no substitution)
   - **Self-rating section:** render three buttons — Developing | Meeting | Exceeding — each with `aria-pressed={assessments[key]?.selfRating === '<value>'}`. Clicking calls `setRating(assessmentKey, rating)` on the store.
   - **Level cards:** render one card per level P2–P7 (six total)
     - Current level card: highlighted blue border, "Your level" badge
     - Each card: display level descriptor and its criteria list
     - Each criterion: `<input type="checkbox">` paired with a `<label>`. `checked` reads from `assessments[assessmentKey]?.criteriaChecked`. Clicking calls `toggleCriterion(assessmentKey, criterion.id)`
   - Criterion ID format: `{shared|dev}/{domainId}/{competencyId}/{level}/{index}` (0-indexed, forward slashes)

3. **Write Vitest + RTL tests** for `TrackDomainList`:
   - Renders domain cards for the dev track (includes leadership and delivery domains)
   - Renders at least 4 percentage/progress ring elements

4. **Write Vitest + RTL tests** for `CompetencyAssessmentView` (fixture: `dev/leadership/decision-making`, `currentLevel=p3`):
   - Renders at least 2 checkboxes for P3 decision-making criteria
   - Checking the first checkbox adds the criterion ID to `criteriaChecked` in the store
   - Renders all 3 self-rating buttons (Developing, Meeting, Exceeding)
   - Clicking the Meeting button sets `assessments[key].selfRating` to `'meeting'` in the store
   - The P3 level card shows the "Your level" badge

5. **Verify no `any` types** across both components and their tests. Run `tsc --noEmit` and confirm zero type errors.

6. **Verify criteria isolation**: confirm that checking a criterion in one competency (`dev/leadership/decision-making`) does not set or affect `criteriaChecked` in a different assessment key (e.g., `dev/leadership/communication`).

---

## Acceptance Criteria

1. **AC-01 — Assessment key format:** The assessment key passed to `setRating` and `toggleCriterion` matches the pattern `{trackId}/{domainId}/{competencyId}` using forward slashes. Any deviation (dots, colons, missing segment) is a defect.

2. **AC-02 — Criterion ID format:** Each criterion ID passed to `toggleCriterion` matches `{shared|dev}/{domainId}/{competencyId}/{level}/{index}` where index is 0-based. Mismatched IDs cause silent store misses and are a defect.

3. **AC-03 — Progress ring accuracy:** The percentage shown in a domain's `ProgressRing` equals `(count of criteriaChecked IDs at currentLevel across all competencies in that domain) / (total criteria at currentLevel across all competencies in that domain) * 100`, rounded consistently. Checking a criterion updates the ring without page reload.

4. **AC-04 — Coming-soon domains:** Domains flagged as coming-soon render a badge only. They must not render a `ProgressRing`, must not be wrapped in a link, and must not be clickable.

5. **AC-05 — Self-rating persistence:** Clicking a self-rating button (Developing / Meeting / Exceeding) updates `assessments[key].selfRating` in the Zustand store. The button's `aria-pressed` attribute becomes `true` on the clicked button and `false` on the others. State persists across component unmount/remount via localStorage.

6. **AC-06 — Criteria check persistence:** Clicking a criterion checkbox calls `toggleCriterion(assessmentKey, criterionId)`. The store's `criteriaChecked` array for that key reflects the toggled ID. Clicking again removes it. State persists across remount via localStorage.

7. **AC-07 — Current level card highlight:** The card for `currentLevel` has a visually distinct blue border and displays a "Your level" badge. No other level card shows this badge or this border treatment.

8. **AC-08 — Criteria isolation:** Checking a criterion under assessment key `A` has zero effect on `criteriaChecked` or `selfRating` under any other assessment key `B`. Store shape must scope all data under the full assessment key.

9. **AC-09 — No `any` types:** `tsc --noEmit` exits with code 0. No `@ts-ignore` or `as any` casts are present in the two new component files or their test files.

10. **AC-10 — Test coverage (TrackDomainList):** The two specified tests pass: domain cards for dev track render (including leadership and delivery); at least 4 progress ring percentage elements are present in the rendered output.

11. **AC-11 — Test coverage (CompetencyAssessmentView):** All five specified tests pass for the `dev/leadership/decision-making` fixture at `currentLevel=p3`: checkbox count ≥ 2, checkbox interaction writes to store, all 3 rating buttons present, clicking Meeting sets `selfRating='meeting'`, "Your level" badge on P3 card.

12. **AC-12 — Domain card links:** Non-coming-soon domain cards render as `<a>` elements (or Next.js `<Link>`) with `href="/{track.id}/{domain.id}"`. Link destinations must match this pattern exactly.

---

## Definition of Done

- `src/components/TrackDomainList.tsx` exists, is a client component, and fulfills all TrackDomainList ACs above.
- `src/components/CompetencyAssessmentView.tsx` exists, is a client component, and fulfills all CompetencyAssessmentView ACs above.
- All seven Vitest + RTL tests (2 for TrackDomainList, 5 for CompetencyAssessmentView) pass in CI with no skips.
- `tsc --noEmit` exits clean — no type errors, no `any` types in the two new files or their tests.
- Assessment key format (`{trackId}/{domainId}/{competencyId}`) and criterion ID format (`{shared|dev}/{domainId}/{competencyId}/{level}/{index}`) are enforced by TypeScript types or validated by a shared utility, not left to ad-hoc string concatenation.
- Criteria isolation is verified by a dedicated test or explicit store-shape review — cross-competency bleed is confirmed absent.
- The feature branch `feature/T8-self-assessment` passes the full test suite and merges cleanly onto the T7 base without conflicts.
