---
approved_by: "Rikesh"
approved_at: "2026-08-13"
planned_behaviors: "5"
approved_sha256: "96087fbe7536904de80a10fe6603beebadaa5d98756d69204cc77da3dfc10da3"
---
## Exec Plan — Task T-frontend-design-alignment-41h895
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code.

**Will build:**
- AC-1: `getCompetencyById` returns `description` field
- AC-2: `getFunctionalAnalysisForCompetency` — new lib fn querying `functional_analyses` by competency_id
- AC-3: `getPrimaryFunctionsWithBadgeCount` — new lib fn returning pf_number, name, domain_classification, badgeCount
- AC-4: History link pointing to `/competencies/[id]/history` on the competency page
- AC-5: `CompetencyTabs` removed from competency page
- AC-6 [e2e]: competency page renders description, FA toggle, PF cards with badge counts, history link

**Approach:** Extend `getCompetencyById` query. Add `getPrimaryFunctionsWithBadgeCount` to `src/lib/primary-functions.ts` (COUNT subquery on badges). Add `getFunctionalAnalysisForCompetency` to `src/lib/functional-analyses.ts`. New `src/components/FACollapsible.tsx` client component (toggle open/closed state). Rewrite `src/app/competencies/[id]/page.tsx` — remove CompetencyTabs, wire new data + components.

**Boundaries & mocks:** Postgres (read-only). Unit tests pass fake data directly. Integration hits seeded DB.

**Behaviors (TDD order):**
- B-1 (tracer bullet): `getCompetencyById` returns `description` field from DB
- B-2: `getPrimaryFunctionsWithBadgeCount` returns correct `badgeCount` per PF (including zero)
- B-3: `getFunctionalAnalysisForCompetency` returns `{ content }` when row exists; null when none
- B-4: `<FACollapsible>` renders collapsed by default; click expands to show content text
- B-5: competency page shows description in header, PF cards with pf_number/domain_classification/badgeCount, history link, no CompetencyTabs
- B-6 [e2e]: full competency page renders from seeded data

**PR will contain:**
- `src/lib/competencies.ts` — description field added
- `src/lib/primary-functions.ts` — getPrimaryFunctionsWithBadgeCount added
- `src/lib/functional-analyses.ts` — getFunctionalAnalysisForCompetency added
- `src/components/FACollapsible.tsx` — new
- `src/app/competencies/[id]/page.tsx` — rewritten
- `tests/T-frontend-design-alignment-41h895/`

**Open questions / ambiguities:** None.

**Path:** L

**Escalation signals hit (≥2 → R):** 0
- [ ] Refactor pass done (on green; tests unchanged) — before PR
