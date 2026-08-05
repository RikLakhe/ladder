---
approved_by: "unknown"
approved_at: "2026-08-05"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "95780e47e0b3d1ae2768c8358d350e69c6be9a67a52db977b29b6afcf689de93"
---
## Exec Plan — Task T-competency-browser-4r2pp7
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: PF page queries `functional_analyses` filtered by `pf_id`, renders content grouped by level.
- AC-2: PF page queries `badges` filtered by `pf_id`, renders name+level; explicit empty state when a PF has no rows in either table.
- AC-3: PF page is reachable end-to-end from a running server and renders real data from both tables for that `pf_id`.
- AC-4: `GET /api/primary-functions/:pfId/functional-analysis` returns JSON array of `{level, body}` for that `pf_id`.
- AC-5: `GET /api/primary-functions/:pfId/badges` returns JSON array of `{id, name, level}` for that `pf_id`.
**Approach:** high-level only — NOT implementation prescription
- Two shared query functions, `getFunctionalAnalysesForPrimaryFunction(connectionString, pfId)` and `getBadgesForPrimaryFunction(connectionString, pfId)`, each used by both the page and its API route — same pattern as `getStandardsForPrimaryFunction` from the prior task.
- Page and both API routes real-Postgres, no mocks.
**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- none — TSD Boundaries: none. Real Postgres throughout.
**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1]: functional-analysis data query returns rows for a `pf_id`, excludes other PFs' rows.
- B-2 [AC-2]: badges data query returns rows for a `pf_id`, excludes other PFs' rows; both queries return empty array (not error) for a PF with no rows in either table.
- B-3 [AC-4]: JSON API route for functional-analysis returns `{level, body}` array for that `pf_id`.
- B-4 [AC-5]: JSON API route for badges returns `{id, name, level}` array for that `pf_id`.
- B-5 [AC-3, e2e]: PF page renders through a running server, sourcing real data from both tables (including the empty-state case).
**PR will contain:**
- `src/lib/functional-analyses.ts`, `src/lib/badges.ts` (query functions), `src/app/primary-functions/[pfId]/page.tsx` (or extends existing PF page), `src/app/api/primary-functions/[pfId]/functional-analysis/route.ts`, `src/app/api/primary-functions/[pfId]/badges/route.ts`, tests for all five behaviors.
**Open questions / ambiguities:** (MUST be resolved before execution)
- none
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
