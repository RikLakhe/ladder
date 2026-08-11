---
approved_by: ""
approved_at: ""
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
---
## Exec Plan — Task T-assessment-badge-viewer-2eetyh
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `src/app/api/badges/[badgeCode]/route.ts` — GET handler returns JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}` from DB; unknown → 404 `{error:"not found"}`
- AC-2: `src/app/api/badges/[badgeCode]/evidence/route.ts` — GET handler returns `EvidenceResult[]` via `getEvidenceForBadge`; unknown badge → 404
- AC-3: Update `src/app/badges/[badgeCode]/page.tsx` — remove mock fallback, read live data from `getBadgeByCode` only; ensure cosigner indicator rendered only when `cosignerRequired=true`
- AC-4: Add evidence chips to page — resolved entry renders expandable chip (details/summary) with `rowText`; unresolved entry renders element with `data-testid="evidence-broken"`
- AC-5 (invariant): Covered structurally — map over full `evidenceRequired` array with no filtering

**Approach:** thin API routes wrapping existing lib functions (`getBadgeByCode`, `getEvidenceForBadge` already in `src/lib/badges.ts`); page update removes mock fallback and adds evidence chip rendering matching design "Assessed via" section (expandable chips for resolved, broken state for unresolved)

**Boundaries & mocks:** TSD says boundaries: none. All tests use real DB (postgres on port 55432 via docker compose). No mocks.

**Behaviors (TDD order):**
- B-1 [tracer bullet, unit]: `GET /api/badges/:badgeCode` returns correct JSON shape for a known badge; unknown → 404 — hit the route handler with a seeded badge in real DB
- B-2 [behavior]: `GET /api/badges/:badgeCode/evidence` returns ordered `EvidenceResult[]`; unknown badge → 404
- B-3 [e2e]: Badge detail page renders live DB certifies/completionBar/verifierRole (not mock values), co-signer indicator toggles correctly — fetch from running Next.js server
- B-4 [e2e]: Badge detail page renders resolved evidence chips and `data-testid="evidence-broken"` for unresolved entries; count equals `evidence_required` length

**PR will contain:**
- `src/app/api/badges/[badgeCode]/route.ts` (new)
- `src/app/api/badges/[badgeCode]/evidence/route.ts` (new)
- `src/app/badges/[badgeCode]/page.tsx` (updated — remove mock fallback, add evidence chips)
- `tests/T-assessment-badge-viewer-2eetyh/api-badge.test.ts` (B-1)
- `tests/T-assessment-badge-viewer-2eetyh/api-evidence.test.ts` (B-2)
- `tests/T-assessment-badge-viewer-2eetyh/page-e2e.test.ts` (B-3 + B-4)

**Open questions / ambiguities:**
- None. `getBadgeByCode` and `getEvidenceForBadge` are already shipped and tested. Page at `/badges/[badgeCode]` exists. Routes are thin wrappers.

**Path:** R (rich — e2e behaviors against real DB + running server, full vertical slice)
**Escalation signals hit (≥2 → R):** prior-fail (mock fallback divergence flagged in b69y3s verification) · e2e tests against running server
- [ ] Refactor pass done (on green; tests unchanged) — before PR
