---
approved_by: "unknown"
approved_at: "2026-08-04"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "3a470e2e4a8eb7836c616fb448dc771e41fffc61dd37023732c8f944f1349f94"
---
## Exec Plan — Task T-competency-browser-3zo10s
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /api/competencies` route handler queries `competencies` LEFT JOIN count of `primary_functions`, returns JSON array `{id, name, primaryFunctionCount}`.
- AC-2: route has no auth gate — reachable unauthenticated.

**Approach:** high-level only — NOT implementation prescription
Next.js route handler (`src/app/api/competencies/route.ts`) reusing/adapting the existing `getCompetenciesWithPfCount` data-access function from `src/lib/competencies.ts` (built for T-competency-browser-18gycw), serialized as JSON. No new auth middleware.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None — TSD S-0002.01 Boundaries: none. Real Postgres throughout (same DB used by T-001/T-competency-browser-18gycw).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1]: `GET /api/competencies` returns JSON array of `{id, name, primaryFunctionCount}`, seeded via fixture rows, count matching `primary_functions` rows.
- B-2 [AC-2, e2e]: unauthenticated request to `/api/competencies` returns 200 with JSON array, no auth required.

**PR will contain:**
- Route handler `src/app/api/competencies/route.ts`.
- Tests under `tests/T-competency-browser-3zo10s/` covering B-1, B-2.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None — scope fully specified by card AC-1/AC-2 and TSD S-0002.01.
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
