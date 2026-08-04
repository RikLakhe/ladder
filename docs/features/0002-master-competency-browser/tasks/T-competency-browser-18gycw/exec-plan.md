---
approved_by: "unknown"
approved_at: "2026-08-04"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "cd59bba024ab272a8ac807ba2c1d7e8ee6f7e1648008bf5b19ce3875637dcc60"
---
## Exec Plan — Task T-competency-browser-18gycw
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /` (home page) queries `competencies` and, per row, a count of `primary_functions` where `competency_id` matches; renders one card per competency with name + count.
- AC-2: home page requires no auth — no login gate/redirect on `/`.

**Approach:** high-level only — NOT implementation prescription
Server-rendered Next.js page reading directly from Postgres (existing `pg`/migration setup from T-001). No new auth middleware introduced on this route.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None — TSD S-0002.01 Boundaries: none. Real Postgres throughout (same DB used by T-001 migration test).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1]: `GET /` renders a card per competency with correct name and `primary_functions` count, seeded via fixture rows.
- B-2 [AC-2, e2e]: unauthenticated request to `/` returns 200 with the competency list, no login prompt rendered.

**PR will contain:**
- Home page route/component rendering competency cards with PF counts.
- Data-access query joining `competencies` → count of `primary_functions`.
- Tests under `tests/T-competency-browser-18gycw/` covering B-1, B-2.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None — scope fully specified by card AC-1/AC-2 and TSD S-0002.01.
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
