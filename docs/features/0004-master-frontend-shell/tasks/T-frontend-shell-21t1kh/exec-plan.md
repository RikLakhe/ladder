---
approved_by: "unknown"
approved_at: "2026-08-06"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "ee8c6235881558b059d184763bac731288830bca428cd7d7b683105b9c6d09f9"
---
## Exec Plan — Task T-frontend-shell-21t1kh
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: tab strip component (Standard/Assessment/Training/Evidence) added to `src/app/competencies/[id]/page.tsx`; client-side tab switch, no route change.
- AC-2: Standard tab keeps using real `getStandardsForCompetency`-style data (or existing standards lib) via `src/lib/standards.ts`; Assessment/Training/Evidence tabs read `src/lib/mock/assessments.ts`, `src/lib/mock/training.ts`, `src/lib/mock/evidence.ts` (new), each exporting `getXForCompetency(competencyId)` returning fixture data.
- AC-3: any tab whose data source returns empty/undefined renders existing `<EmptyState>` (src/components/EmptyState.tsx), never blank/throw.
- AC-4: PF pill links reuse existing `Link href={/primary-functions/${pf.id}}` pattern already on the page, extended to route to the level tab strip (existing `LevelTabStrip`).

**Approach:** high-level only — NOT implementation prescription
Add a small client component `<CompetencyTabs>` (in `src/components/`) taking pre-fetched panel content as props (Standard/Assessment/Training/Evidence), rendering a tab strip + active panel; the server page (`page.tsx`) does all data fetching (real + mock) and passes results down — keeps the mock/real split at the data layer, not inside the component. New mock modules live under `src/lib/mock/` per the feature's established mock-service pattern.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- FAKED: Assessment/Training/Evidence data (`src/lib/mock/{assessments,training,evidence}.ts` — static fixtures, no network/DB).
- REAL: Standard tab data (existing DB-backed `src/lib/standards.ts`), competency + PF data (existing).
- Smoke: AC-2 exercises the real Standard-tab path against the real data layer; no other real boundary touched.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (AC-1): tab strip renders on competency page, switching tabs swaps panel client-side without reload.
- B-2 (AC-2, plus AC-3 empty-state coverage folded in): Standard tab shows real data; Assessment/Training/Evidence show mock data when present, `<EmptyState>` when a mock source returns nothing.
- B-3 (AC-4, e2e): clicking a PF pill navigates to that PF's page with its level tab strip visible.

**PR will contain:**
- `src/components/CompetencyTabs.tsx` (new)
- `src/lib/mock/assessments.ts`, `src/lib/mock/training.ts`, `src/lib/mock/evidence.ts` (new, fixtures + accessor fns)
- `src/app/competencies/[id]/page.tsx` (updated: fetch all 4 tabs' data, render `<CompetencyTabs>`)
- `tests/T-frontend-shell-21t1kh/*.test.ts(x)` (new)

**Open questions / ambiguities:** (MUST be resolved before execution)
- none — TSD/PRD fully specify tab set, mock boundary, and PF-pill nav target.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
None hit — Path: L.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
