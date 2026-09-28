---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "0245975c953fed6816fcf1d214a7b955096ec302c1cb8b727e3f1d5dcc580846"
---
# TSD 0001 — Ladder v1: LFT Engineering Career Matrix Platform
> Behavior + contracts ONLY. Never name the library/method/pattern.
> One section per PRD story. Critic anchors to this as the external executable spec.

---

## TSD S-0001.01 — Repository and Toolchain Foundation  (PRD §S-0001.01)

| Aspect | Spec |
|--------|------|
| Interfaces | `npm test` — runs unit/component test suite, exits 0 on pass, non-zero on any failure. `npm run build` — produces a static build artefact from source. `npx tsc --noEmit` — type-checks entire project, exits 0 with no errors. |
| Data / State | None. |
| Behavior | (B-1) `npm test` exits 0 and reports at least one passing test; no Jest dependency exists anywhere in the project. (B-2) `npm run build` exits 0 and produces a valid build artefact. (B-3) `npx tsc --noEmit` exits 0 with strict mode, `noImplicitAny`, and `strictNullChecks` all active. (B-4) A CI workflow runs `npm ci`, `npm test`, and `npm run build` on every pull request targeting the main and integration branches; the workflow runs on Node 20 and a Linux runner. (B-5) An end-to-end test runner is configured with its test directory set to `e2e/`; it is not invoked by the CI workflow. (B-6) A UI component library is initialised; its configuration file exists at the project root and its generated component directory exists under `src/`. (B-7) No file under `src/` contains a bare `any` type annotation. |
| Access | Developers and CI system. |
| Boundaries | External: GitHub Actions CI environment, Node.js package registry (install-time only). |
| Tests | Unit: sanity test asserting a trivially true expression (proves runner works). Smoke: `npm run build` exits 0 on a clean install — run in CI on every PR. |

---

## TSD S-0001.02 — Data Model and Assessment Store  (PRD §S-0001.02)

| Aspect | Spec |
|--------|------|
| Interfaces | **Type exports** (all from `src/lib/types.ts`): `LevelId` (string union p2–p7), `TrackId` (string union dev/qa/data/ai), `SelfRating` (string union developing/meeting/exceeding), `Criterion { id: string; text: string }`, `LevelDescriptor { level: LevelId; descriptor: string; criteria: Criterion[] }`, `Competency { id: string; name: string; description: string; levels: LevelDescriptor[] }`, `Domain { id: string; name: string; description: string; comingSoon: boolean; competencies: Competency[] }`, `Track { id: TrackId; name: string; description: string; domains: Domain[] }`, `CompetencyAssessment { selfRating?: SelfRating; criteriaChecked: string[]; updatedAt: string }`, `AssessmentStore` (see Behavior), `LEVELS` (readonly tuple of all six LevelId values in ascending order). **Store actions** (all from `src/lib/store.ts`): `setTrack(track: TrackId): void`, `setLevel(level: LevelId): void`, `toggleFocusedView(): void`, `setFocusedView(value: boolean): void`, `setRating(key: string, rating: SelfRating): void`, `toggleCriterion(key: string, criterionId: string): void`. |
| Data / State | Persisted to browser-local key-value storage under the key `ladder-store`. Schema: `{ currentTrack: TrackId \| null, currentLevel: LevelId, focusedView: boolean, assessments: Record<string, CompetencyAssessment> }`. Default state: `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`. Assessment key format: `{trackId}/{domainId}/{competencyId}` (forward slashes, three segments, no substitution). Criterion ID format: `{shared\|dev\|qa\|data\|ai}/{domainId}/{competencyId}/{level}/{index}` (five segments, 0-based index). |
| Behavior | (B-1) Store initialises with default state when no persisted data exists. (B-2) `setTrack` updates `currentTrack` to the given value. (B-3) `setLevel` updates `currentLevel` to the given value. (B-4) `toggleFocusedView` inverts `focusedView`. (B-5) `setFocusedView(value)` sets `focusedView` to `value` directly. (B-6) `setRating(key, rating)` sets `assessments[key].selfRating` to `rating`; preserves any existing `criteriaChecked`; initialises `criteriaChecked: []` if no prior entry exists; sets `updatedAt` to current ISO timestamp. (B-7) `toggleCriterion(key, criterionId)` adds `criterionId` to `assessments[key].criteriaChecked` if absent; removes it if present; preserves `selfRating`; sets `updatedAt`. (B-8) An operation on assessment key A has zero effect on any other assessment key B. (B-9) Store hydration is deferred: it must not be triggered synchronously during module load or server-side render; it must be triggered exactly once after the component responsible for hydration mounts in the browser. |
| Access | Any client-side component that reads or writes user assessment state. Server-side render must not read from the persisted store. |
| Boundaries | Browser-local key-value storage (write and read at runtime). Faked in unit tests. |
| Tests | Unit: (1) initial state matches defaults, (2) `setTrack` updates track, (3) `setLevel` updates level, (4) `toggleFocusedView` toggles true then false, (5) `setRating` creates assessment with correct `selfRating` and empty `criteriaChecked`, (6) second `setRating` call updates `selfRating` without clearing existing `criteriaChecked`, (7) `toggleCriterion` adds criterion ID on first call, (8) `toggleCriterion` removes same criterion ID on second call with `selfRating` untouched. |

---

## TSD S-0001.03 — Career Ladder Content Data  (PRD §S-0001.03)

| Aspect | Spec |
|--------|------|
| Interfaces | **Export** `tracks: Track[]` from `src/content/tracks.ts`. Array contains exactly four elements. Universal domain constants are defined once as named constants and referenced by all tracks that include them — no structural duplication. |
| Data / State | Static, build-time TypeScript. No runtime I/O. Four tracks: `dev`, `qa`, `data`, `ai`. Five domain IDs: `delivery`, `leadership`, `fcc`, `strategic-impact`, `technical-skill`. Dev track: all five domains with `comingSoon: false`; `technical-skill` has nine competencies (`writing-code`, `testing`, `debugging`, `observability`, `understanding-code`, `software-architecture`, `security`, `ai-assisted-engineering`, `ai-judgment-feature-delivery`). QA/Data/AI tracks: four universal domains with `comingSoon: false` plus `technical-skill` with `comingSoon: true` and `competencies: []`. Every non-coming-soon competency has level entries for all six levels (P2–P7). Every level has a non-empty `descriptor` string and at least one `Criterion`. Criterion IDs: universal domain criteria use prefix `shared/`; dev technical-skill criteria use prefix `dev/technical-skill/`; full format `{prefix}/{domainId}/{competencyId}/{level}/{0-based-index}`. |
| Behavior | (B-1) `tracks` contains exactly 4 elements with IDs `dev`, `qa`, `data`, `ai`. (B-2) Every track exposes required fields; no field is undefined or null. (B-3) Every domain exposes required fields including `comingSoon` boolean. (B-4) Every non-coming-soon competency has level entries for all six LevelId values. (B-5) Every level entry has a non-empty descriptor. (B-6) Every level entry in a non-coming-soon domain has a non-empty criteria array. (B-7) Every criterion ID matches the format `{shared\|dev\|qa\|data\|ai}/{segment}/{segment}/{p2-p7}/{digit+}`. (B-8) Competency IDs are unique within any given domain. (B-9) Every domain with `comingSoon: true` has `competencies` equal to `[]`. (B-10) No runtime parsing or I/O occurs; all data is statically declared. |
| Access | Build-time only via `src/lib/content.ts` utility functions. Components must not import `src/content/tracks.ts` directly. |
| Boundaries | None. |
| Tests | Unit (schema tests): all nine behavioral assertions above as individual test cases; all must pass before the content file is considered complete. |

---

## TSD S-0001.04 — Home Page: Track and Level Selection  (PRD §S-0001.04)

| Aspect | Spec |
|--------|------|
| Interfaces | **Content utilities** exported from `src/lib/content.ts`: `getTracks(): Track[]`, `getTrack(id: TrackId): Track \| null`, `getDomain(trackId: TrackId, domainId: string): Domain \| null`, `getCompetency(trackId: TrackId, domainId: string, competencyId: string): Competency \| null`, `getNextLevel(level: LevelId): LevelId \| null`, `computeProgress(competency: Competency, level: LevelId, checkedIds: string[]): number`. **Home page route**: `GET /` renders the home page. |
| Data / State | Reads `currentTrack` and `currentLevel` from the assessment store. Writes `currentTrack` via `setTrack`; writes `currentLevel` via `setLevel`. |
| Behavior | (B-1) `getTracks()` returns all four track objects. (B-2) `getTrack(id)` returns the matching track or null. (B-3) `getDomain` returns the matching domain or null. (B-4) `getCompetency` returns the matching competency or null. (B-5) `getNextLevel` returns the next level in ascending order for P2–P6; returns null for P7; never returns a value beyond P7 under any code path. (B-6) `computeProgress(competency, level, checkedIds)` returns a 0–100 integer (rounded) representing the fraction of criteria at `level` whose IDs appear in `checkedIds`; returns 0 when criteria array is empty. (B-7) Home page renders exactly 4 track buttons and exactly 6 level buttons. (B-8) Each track button has `aria-pressed` set to the string `"true"` when it matches `currentTrack`, `"false"` otherwise. Each level button has `aria-pressed` set to `"true"` when it matches `currentLevel`, `"false"` otherwise. (B-9) Clicking a track button writes the selected track to the store. Clicking a level button writes the selected level to the store. (B-10) A navigation element links to `/{currentTrack}` and reflects the currently stored track value. |
| Access | Any user visiting `/`. |
| Boundaries | None. |
| Tests | Unit (content utilities): `getTracks` count, `getTrack` hit and miss, `getDomain` hit and miss, `getCompetency` hit, `getNextLevel` at p2/p6/p7 (null check strict equality), `computeProgress` at 0/partial/full checked. Unit (home page component): 4 track buttons rendered, 6 level buttons rendered, clicking track button updates store, clicking level button updates store. |

---

## TSD S-0001.05 — Track Domain Overview with Progress Rings  (PRD §S-0001.05)

| Aspect | Spec |
|--------|------|
| Interfaces | **ProgressRing component**: accepts `percentage: number`, `size: number`, `strokeWidth?: number` (default 4); renders visible text displaying `"{percentage}%"`. **Track overview route**: `GET /{track}` — renders domain overview for the given track; returns 404 for an unrecognised track slug. |
| Data / State | Reads `currentLevel` and `assessments` from the assessment store (client-side). Track data resolved at request time from content utilities (server-side). |
| Behavior | (B-1) `ProgressRing` renders the exact string `"{n}%"` as visible text in the DOM for any integer `n`. (B-2) The SVG arc representing progress uses `strokeDashoffset` equal to the full circumference at `percentage=0` and equal to 0 at `percentage=100`. (B-3) `strokeWidth` defaults to 4; an explicit value overrides it. (B-4) For a valid track slug, the page renders one card per domain defined for that track. (B-5) Each non-coming-soon domain card is wrapped in a navigable link to `/{track}/{domain}` and contains a `ProgressRing`. (B-6) Each coming-soon domain card shows a "Coming soon" badge, is not wrapped in a link, and contains no `ProgressRing`. (B-7) Domain progress percentage = `(count of criteriaChecked IDs that match criteria in that domain at currentLevel) / (total criteria in that domain at currentLevel) * 100`, rounded to a whole number; returns 0 when total criteria count is zero. (B-8) An unrecognised track slug causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}`. |
| Boundaries | None. |
| Tests | Unit (ProgressRing): renders "75%" text at percentage=75, renders "0%" at percentage=0. Unit (track overview — dev): renders 5 domain cards; each non-coming-soon card contains a progress ring. Unit (track overview — qa): technical-skill card shows "Coming soon" badge. |

---

## TSD S-0001.06 — Domain Detail: Competency List  (PRD §S-0001.06)

| Aspect | Spec |
|--------|------|
| Interfaces | **ExploreButtonClient component**: accepts `label: string`, `onClick: () => void`; renders a button whose accessible text equals `label`. **Domain detail route**: `GET /{track}/{domain}` — renders competency list or coming-soon placeholder; returns 404 for unrecognised track or domain. |
| Data / State | Track and domain data resolved from content utilities. No store reads required. |
| Behavior | (B-1) `ExploreButtonClient` renders a button element with accessible text equal to `label`; invoking the button calls `onClick` exactly once. (B-2) For a live domain, the page renders a breadcrumb containing the track name and domain name in that order. (B-3) For a live domain, the page renders one card per competency in the domain; each card contains an anchor whose `href` matches `/{track}/{domain}/{competency-slug}`. (B-4) For a coming-soon domain, the page renders a placeholder containing the text "Coming soon"; no anchor pointing to any competency slug is present in the DOM under any code path — this is a hard safety constraint. (B-5) An unrecognised track or domain causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}/{domain}`. |
| Boundaries | None. |
| Tests | Unit (ExploreButtonClient): renders button with label, calls onClick on click. Unit (domain detail — live): competency names present, link href correct. Unit (domain detail — coming-soon): "Coming soon" text present, zero competency links in DOM. |

---

## TSD S-0001.07 — Competency Detail: Full Level Browse  (PRD §S-0001.07)

| Aspect | Spec |
|--------|------|
| Interfaces | **Competency detail route**: `GET /{track}/{domain}/{competency}` — renders all six level cards for the given competency; returns 404 for unrecognised track or competency. |
| Data / State | Reads `currentLevel` from the assessment store. Competency data resolved from content utilities. |
| Behavior | (B-1) Page renders exactly six level cards in ascending order (P2, P3, P4, P5, P6, P7). (B-2) Each card displays: the level badge (e.g., "P3"), the descriptor text for that level, and all criteria for that level as plain text items. No checkbox inputs or self-rating controls appear anywhere on the page in this view. (B-3) The card whose level matches `currentLevel` has a visually distinct blue border and blue background, and displays a "Your level" badge. The badge appears exactly once. No other card carries those styles. (B-4) When `currentLevel` is null or undefined, no card shows the "Your level" badge and no card carries the highlighted styles. (B-5) When `currentLevel` is `p7`, the P7 card is highlighted; the page renders without runtime errors and no call to a next-level accessor crashes. (B-6) A breadcrumb displaying `{track.name} / {domain} / {competency.name}` is visible at the top of the page; each segment links to its respective route. (B-7) An unrecognised track or competency causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}/{domain}/{competency}`. |
| Boundaries | None. |
| Tests | Unit: (1) all 6 level cards rendered, (2) "Your level" badge present exactly once (at p3 when currentLevel=p3), (3) P3 descriptor text present, (4) P3 criterion text present. |

---

## TSD S-0001.08 — Self-Assessment: Criteria Checks and Self-Rating  (PRD §S-0001.08)

| Aspect | Spec |
|--------|------|
| Interfaces | **CompetencyAssessmentView component**: accepts `competency: Competency`, `trackId: TrackId`, `domainId: string`; renders the interactive assessment UI. **TrackDomainList component**: accepts `track: Track`; renders domain cards with live progress rings. Assessment key: `{trackId}/{domainId}/{competency.id}`. Criterion ID: see TSD S-0001.02 Data/State. |
| Data / State | Reads and writes `assessments`, `currentLevel` from assessment store. All writes use `setRating(key, rating)` or `toggleCriterion(key, criterionId)` with the formatted key. |
| Behavior | (B-1) `CompetencyAssessmentView` renders one checkbox input paired with a label for each criterion across all levels. Checking a checkbox calls `toggleCriterion(assessmentKey, criterion.id)` on the store. (B-2) Renders three self-rating buttons (Developing, Meeting, Exceeding). Each button's `aria-pressed` attribute reflects whether `assessments[key].selfRating` equals that button's value. Clicking a button calls `setRating(assessmentKey, rating)`. (B-3) The card for `currentLevel` has blue border, blue background, and a "Your level" badge; no other level card carries those styles. (B-4) Assessment key is always `{trackId}/{domainId}/{competencyId}` — enforced at the type or utility level, not via ad-hoc string concatenation in components. (B-5) An operation on assessment key A has zero effect on the `criteriaChecked` or `selfRating` of any other key B. (B-6) `TrackDomainList` renders a clickable card with a `ProgressRing` for each non-coming-soon domain; progress percentage uses the same formula as TSD S-0001.05 B-7. Coming-soon domains render a badge only — no ring, no link. (B-7) All assessment writes persist to browser-local storage and are restored after page reload. |
| Access | Any user visiting a competency detail page or track overview. |
| Boundaries | Browser-local key-value storage (faked in unit tests). |
| Tests | Unit (TrackDomainList): domain cards for dev track include leadership and delivery; at least 4 progress ring percentage elements present. Unit (CompetencyAssessmentView — fixture: dev/leadership/decision-making, currentLevel=p3): (1) at least 2 checkboxes for P3 criteria, (2) checking first checkbox adds criterion ID to store `criteriaChecked`, (3) all 3 rating buttons present, (4) clicking Meeting sets `selfRating='meeting'` in store, (5) P3 card shows "Your level" badge. |

---

## TSD S-0001.09 — Focused View Toggle and SSR-Safe Hydration  (PRD §S-0001.09)

| Aspect | Spec |
|--------|------|
| Interfaces | **Store action**: `setFocusedView(value: boolean): void` — sets `focusedView` in the persisted store. **StoreHydration component**: accepts no props; renders nothing to the DOM; triggers store rehydration from browser-local storage exactly once on mount. **Focused view toggle**: a visible control in `CompetencyAssessmentView` that reads and writes `focusedView` from the store. |
| Data / State | `focusedView: boolean` field in the persisted store (default `false`). Persisted to browser-local storage alongside other store state. |
| Behavior | (B-1) When `focusedView` is false, `CompetencyAssessmentView` renders all six level cards (P2–P7). (B-2) When `focusedView` is true and `currentLevel` is not P7, exactly two cards are rendered: the card for `currentLevel` and the card for the level immediately above it. The remaining four cards are absent from the DOM (not merely hidden). (B-3) When `focusedView` is true and `currentLevel` is P7, exactly one card is rendered (P7). The P6 card is absent from the DOM. The string "You're at the highest level — P7 is the top of the Leapfrog career ladder." is visible in the rendered output. No runtime error occurs. (B-4) The focused view toggle is bound directly to the store — no local component state (useState/useReducer) manages it. (B-5) `StoreHydration` renders no DOM output. It calls the store's rehydration function exactly once inside a post-mount effect. It does not call rehydration synchronously during render or at module load. (B-6) No call to the store's rehydration function exists outside of the post-mount effect in `StoreHydration`. (B-7) `StoreHydration` is rendered in the root layout so it executes on every page load. (B-8) After enabling focused view and reloading the page, focused view remains enabled with no flash of the six-card layout before hydration completes. |
| Access | Any user on a competency detail page (focused view toggle). Root layout (StoreHydration). |
| Boundaries | Browser-local key-value storage (faked in unit tests for StoreHydration via a mock). |
| Tests | Unit (CompetencyAssessmentView focused view): (1) focusedView=false, currentLevel=p3 → 6 cards visible, (2) focusedView=true, currentLevel=p3 → only P3 and P4 cards visible, (3) focusedView=true, currentLevel=p7 → only P7 card visible and "You're at the highest level" message present. Unit (StoreHydration): rehydration function called exactly once after mount; not called during render. |

---

## TSD S-0001.10 — Production Readiness: Accessibility, Performance, Coming-Soon Polish  (PRD §S-0001.10)

| Aspect | Spec |
|--------|------|
| Interfaces | **Coming-soon guard**: domain pages for QA/Data/AI `technical-skill` render a placeholder; the behaviour is controlled by the `comingSoon` flag in domain data — no hard-coded per-track conditionals in components. **Metadata**: each route exports a unique title and description via the framework's document metadata API; the root layout declares the document language as `en` and includes a meta description. |
| Data / State | No new state. Reads `comingSoon` from domain data. |
| Behavior | (B-1) QA, Data, and AI `technical-skill` domain pages render a "Coming soon" placeholder and zero competency links. Dev `technical-skill` domain page renders competency links and no placeholder. Behaviour is data-driven by `comingSoon` flag. (B-2) Every interactive element (buttons, links, checkboxes) has an accessible name — either visible text content or an explicit accessible label attribute. (B-3) Every checkbox input has an associated label element via a programmatic association. (B-4) Track and level selection buttons carry `aria-pressed="true"` when selected and `aria-pressed="false"` otherwise. (B-5) The document language is declared as `en` at the root. Each page has a unique, descriptive title and meta description. (B-6) The primary brand colour on a white background meets a minimum contrast ratio of 4.5:1 at normal text sizes (WCAG AA). (B-7) All four automated audit categories (Performance, Accessibility, Best Practices, SEO) score ≥ 90 on a production build. (B-8) `npm run build` and `npx tsc --noEmit` both exit 0 with no `any` types in code introduced by this task. |
| Access | Any user; assistive technology users; automated audit tools. |
| Boundaries | External automated audit tool (run manually against production build — not in CI). |
| Tests | E2E (manual, excluded from CI — `e2e/coming-soon.spec.ts`): (1) QA technical-skill → "coming soon" visible, "Writing Code" link absent; (2) Data technical-skill → "coming soon" visible; (3) AI technical-skill → "coming soon" visible; (4) Dev technical-skill → "coming soon" absent, "Writing Code" link present. Smoke: `npm run build` exits 0 (run in CI). Non-functional: Lighthouse ≥ 90 all four categories — run manually against production build before release PR; scores captured in PR description. |
