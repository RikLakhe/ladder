---
approved_by: "unknown"
approved_at: "2026-08-05"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "b6c7ee0f1c0dd618f9734a1cda6457e5ffd6df60b4907d561d18e3b06f8425d5"
---
## Exec Plan — Task T-competency-browser-c1iutj
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /primary-functions/:pfId/standard` page queries `standards` filtered by `pf_id`, renders all levels in level order (P2–P7) when no `?level=` given.
- AC-2: `?level=<level>` narrows the page query to that single level; a level with no row renders an explicit empty state.
- AC-3: primary-function pill on the competency page links to `/primary-functions/:pfId/standard`; navigating there renders that PF's standard content.
- AC-4: `GET /api/primary-functions/:pfId/standard` returns JSON array of `{level, body}` ordered by level; `?level=<level>` narrows the JSON response to that level's row.
**Approach:** high-level only — NOT implementation prescription
- Shared query function `getStandardsForPrimaryFunction(connectionString, pfId, level?)` used by both the page and the API route, same pattern as `getPrimaryFunctionsForCompetency` from the prior task.
- Level ordering (P2–P7) done in SQL via an explicit `ORDER BY` on a level-rank expression (or `ORDER BY level` if lexical order already matches P2 < P3 < ... < P7 — confirm during B-1).
- Page and API both real-Postgres, no mocks.
**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- none — TSD Boundaries: none. Real Postgres throughout.
**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1]: data query returns all levels for a `pf_id` in level order.
- B-2 [AC-2]: data query narrowed by `?level=` returns exactly that level's row; empty state when no row for that level.
- B-3 [AC-4]: JSON API route returns the same shapes (all-levels / single-level) as `{level, body}`.
- B-4 [AC-3, e2e]: competency page's PF pill links to `/primary-functions/:pfId/standard`; that page renders through a running server.
**PR will contain:**
- `src/lib/standards.ts` (query function), `src/app/primary-functions/[pfId]/standard/page.tsx`, `src/app/api/primary-functions/[pfId]/standard/route.ts`, PF pill link update on the competency page, tests for all four behaviors.
**Open questions / ambiguities:** (MUST be resolved before execution)
- none
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
