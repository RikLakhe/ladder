---
approved_by: "Rikesh"
approved_at: "2026-08-13"
planned_behaviors: "4"
approved_sha256: "8a0fea49448b9f4c88cb3db9edfaee9d72ecdad50b72e2e5f9df46f3113bf026"
---
## Exec Plan — Task T-frontend-design-alignment-7etjh7
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:**
- AC-1: `getCompetenciesWithPfCount` returns `description` field from `competencies.description`
- AC-2: Same query joins `document_versions` for latest `created_at` per competency → `lastUpdated: string | null`
- AC-3: `LevelQuickJump` client component — P2–P7 selector, navigates to first competency's first PF at chosen level
- AC-4: Home page wires description + lastUpdated onto cards; renders `LevelQuickJump`

**Approach:** Extend lib query (no new file needed — add fields to existing `getCompetenciesWithPfCount`). Add `LevelQuickJump` as new `src/components/LevelQuickJump.tsx` client component. Wire into `src/app/page.tsx`. Tests: unit for lib function, unit for component render/navigation, integration for page render.

**Boundaries & mocks:** Postgres (read-only). Unit tests mock the DB query return value directly (pass fake row array to rendering logic). Integration tests hit real seeded DB. No smoke AC needed (no write boundary).

**Behaviors (TDD order):**
- B-1 (tracer bullet): `getCompetenciesWithPfCount` returns `description` field populated from DB row
- B-2: `getCompetenciesWithPfCount` returns `lastUpdated: string` when version rows exist; `null` when none
- B-3: `<LevelQuickJump>` renders P2–P7 options; onChange navigates to first competency's first PF at that level
- B-4 [e2e]: Home page at `/` shows description text and last-updated date on competency cards; level quick-jump renders

**PR will contain:**
- `src/lib/competencies.ts` — extended query
- `src/components/LevelQuickJump.tsx` — new client component
- `src/app/page.tsx` — wired description, lastUpdated, LevelQuickJump
- `tests/T-frontend-design-alignment-7etjh7/` — test files

**Open questions / ambiguities:** None.

**Path:** L

**Escalation signals hit (≥2 → R):** 0
- [ ] Refactor pass done (on green; tests unchanged) — before PR
