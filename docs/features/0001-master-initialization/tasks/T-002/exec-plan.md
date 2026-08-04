---
approved_by: "unknown"
approved_at: "2026-08-04"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "9e47751935b7443fed2fae4bb94b3b22b9139d034253eaf6ae976f906ecc8484"
---
## Exec Plan — Task T-002
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Next.js route handler for `/` returning a successful response with placeholder content (Interfaces/Behavior — smoke).
- `LevelTag` component: renders a single P2–P7 level value (Interfaces/Behavior — unit).
- `LevelTabStrip` component: renders tabs for a current level + inapplicable levels shown disabled, not hidden (Interfaces/Behavior — unit).
- `ContentLayout` component: layout container exposing named sub-slots for standard/badge/training content (Interfaces/Behavior — unit).
- `EmptyState` component: renders variant-appropriate copy for a declared variant, and a safe fallback (never throws) for an undeclared variant (Interfaces/Behavior — unit).

**Approach:** high-level only — NOT implementation prescription
- Plain Next.js App Router page/route for `/`, no data fetching.
- Four presentational React components, each pure/stateless — no state, no external calls, props-in/markup-out.
- Component tests via Testing Library + jsdom (already wired in `vitest.config.ts`); route smoke test via a real Next.js dev/build fetch (no mocked server).

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None — TSD states no external service/clock/randomness/filesystem dependency in this story's scope. The `/` smoke test hits the real running app (no server mock).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: `/` route [e2e/smoke] — request to `/` returns a successful response with placeholder content.
- B-2: `LevelTag` [unit] — renders each valid P2–P7 level without error.
- B-3: `LevelTabStrip` [unit] — renders current level + marks inapplicable levels disabled (not hidden).
- B-4: `ContentLayout` [unit] — renders named sub-slots (standard/badge/training) without error.
- B-5: `EmptyState` [unit] — renders each declared variant's copy, and a safe fallback for an undeclared variant (no crash).

**PR will contain:**
- `/` route/page (Next.js App Router).
- `LevelTag`, `LevelTabStrip`, `ContentLayout`, `EmptyState` components (shared UI contracts).
- Test suite under `tests/T-002/` covering B-1..B-5.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None outstanding — TSD fully specifies interfaces/behavior/tests for this story; no persisted state or auth involved.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- No signals hit — pure UI scaffolding, no security/state/external boundary. Staying Lean.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
