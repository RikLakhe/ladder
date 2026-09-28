---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "1"
approved_sha256: "e330728af0a3da419aaca3bcff3a92caf6fe385621373cca29b0fae70d488844"
---
## Exec Plan — Task T-ladder-v1-lul11w
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/app/[track]/[domain]/[competency]/CompetencyDetail.tsx` — client component; reads `currentLevel` from store; renders 6 level cards (P2–P7) in order; highlighted card for `currentLevel` with blue border + "Your level" badge; no checkboxes or rating controls; breadcrumb (AC-1, AC-2, AC-3, AC-4, AC-5)
- `src/app/[track]/[domain]/[competency]/page.tsx` — server component; resolves track + domain + competency via content utilities; `notFound()` for unknown (AC-7)
- `src/app/[track]/[domain]/[competency]/__tests__/page.test.tsx` — unit tests (AC-1, AC-2, AC-3, AC-4, AC-5)

**Approach:**
Single RED/GREEN cycle. All behaviors (6 cards, highlight, breadcrumb, p7 edge case, null currentLevel) are proven in one test file against one client component. Server page is trivial data-fetch + notFound().

**Boundaries & mocks:**
- Store read via `useLadderStore` in client component — reset via `setState` in tests.
- No external boundaries.

**Behaviors (TDD order):**

B-1 (tracer + all): All competency detail behaviors
- RED: test imports `CompetencyDetail` — fails (module missing)
- GREEN: create `CompetencyDetail.tsx` + server `page.tsx`
- Tests:
  - 6 level cards rendered (P2–P7 badges present)
  - "Your level" badge present exactly once at currentLevel=p3
  - P3 descriptor text present
  - P3 criterion text present
  - No checkboxes or rating controls anywhere
  - Highlighted card at currentLevel (blue border / "Your level")
  - No "Your level" badge when currentLevel=p7 at wrong card
  - p7 renders without crash
  - No "Your level" badge when store reset to null-equivalent

**PR will contain:**
- `src/app/[track]/[domain]/[competency]/CompetencyDetail.tsx`
- `src/app/[track]/[domain]/[competency]/page.tsx`
- `src/app/[track]/[domain]/[competency]/__tests__/page.test.tsx`

**Open questions / ambiguities:**
- `currentLevel` is always a `LevelId` in the store (defaults to 'p3', never null per store types). TSD B-4 says "When currentLevel is null or undefined" — the store type doesn't allow null. Test covers this by forcing store to a non-matching level rather than null. The "no badge" case is covered by rendering with currentLevel='p2' and asserting the p7 card has no badge.
- TSD B-3 says breadcrumb links each segment — domain name in breadcrumb links to `/{track}/{domain}`. Competency name is current page (no link). Track name links to `/{track}`.
- No checkbox or rating controls: this is a browse-only view. Self-assessment is T8.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
