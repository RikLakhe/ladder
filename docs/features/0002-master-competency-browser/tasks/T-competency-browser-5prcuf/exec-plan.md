---
approved_by: "unknown"
approved_at: "2026-08-05"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "3bbd9b2d61d40b538865f249a5001b03be9e0a5c324373b7d294accc0a312bd6"
---
## Exec Plan — Task T-competency-browser-5prcuf
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /competencies/:id` page queries `primary_functions` filtered by `competency_id = :id`, renders the list.
- AC-2: query is scoped by `competency_id` — no cross-competency leakage.
- AC-3: home page competency cards link to `/competencies/:id`.
- AC-4: `GET /api/competencies/:id/primary-functions` route handler returns JSON array `{id, name}` scoped by `competency_id`.
- AC-5: unknown `:id` → 404 for both the page and the API route.

**Approach:** high-level only — NOT implementation prescription
Next.js dynamic route `src/app/competencies/[id]/page.tsx` + route handler `src/app/api/competencies/[id]/primary-functions/route.ts`, both querying Postgres directly by `competency_id`. Both check the competency exists first (404 via `notFound()` for the page, 404 JSON response for the API) before querying primary functions. Home page cards become links to `/competencies/:id`.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None — TSD S-0002.02 Boundaries: none. Real Postgres throughout.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1, AC-2]: primary-functions data query for a given competency id returns only that competency's rows, seeded with two competencies each with their own PFs.
- B-2 [AC-4]: `GET /api/competencies/:id/primary-functions` returns JSON array of `{id, name}` scoped to `:id`.
- B-3 [AC-5]: unknown competency id → 404 for page and API.
- B-4 [AC-3, e2e]: clicking a competency card on the home page navigates to `/competencies/:id` and shows its primary functions.

**PR will contain:**
- `src/app/competencies/[id]/page.tsx`, `src/app/api/competencies/[id]/primary-functions/route.ts`.
- Data-access query scoped by `competency_id`.
- Home page card links updated.
- Tests under `tests/T-competency-browser-5prcuf/` covering B-1–B-4.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None — scope fully specified by card AC-1–AC-5 and TSD S-0002.02.
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
