---
approved_by: "unknown"
approved_at: "2026-08-04"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "8be40695a0a62b289792c3c88c4bcdb32f40aee9390786a9b3acaa21abc0982c"
---
## Exec Plan — Task T-003
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `scripts/seed.ts`: a single `seed(connectionString)` function, no runtime args, run against an already-migrated database (AC-1, AC-2).
- Inserts one competency + its primary functions; standards per applicable level with one level deliberately left without a standard row (the inapplicable-at-level gap, AC-1); one badge whose `evidence_required` references a real row inserted into `instruments` (AC-1); one training-unit sequence whose `prereqs` arrays only reference earlier-inserted unit ids (AC-1); one competency/level with no guided-exercise/autonomous-project training units (the P6/P7 gap, AC-1).

**Approach:** high-level only — NOT implementation prescription
- Plain sequential `pg` inserts inside one script, mirroring `scripts/migrate.ts`'s existing `Client` usage — no ORM.
- Deterministic seed content (fixed names/levels), not randomized, so assertions can match on known values.
- Seeded competency is "Technical Skill" (real content from `design/technical-skill/`, not placeholder): one real Primary Function (e.g. Quality & Testing) with its real standard/level text; badge and training-unit shape follow that source's assessment/training docs.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None faked — the database is REAL for both tests (per TSD Boundaries: seeding requires a live connection to a migrated instance). AC-2's smoke test hits the real database via `migrate` + `seed` + a manual read, no mocks.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: seeding a freshly migrated, empty database populates the full vertical slice plus both intentional gap cases (row presence/shape assertions across tables).
- B-2 [e2e]: fresh database → migrate → seed → a manual read of the seeded competency returns matching rows across every table, end to end.

**PR will contain:**
- `scripts/seed.ts` (the seed operation).
- Test suite under `tests/T-003/` covering B-1..B-2.

**Open questions / ambiguities:** (MUST be resolved before execution)
- None outstanding — TSD fully specifies data shape, gap cases, and tests for this story.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- No signals hit — pure dev-tooling data insert, no security/state/external boundary beyond the already-established database. Staying Lean.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
