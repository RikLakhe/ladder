---
approved_by: "Rikesh"
approved_at: "2026-08-13"
planned_behaviors: "5"
approved_sha256: "f95793103ab8fcc3ec0c16c02004ce044b2681ede64cbfa23208517f8a701a7a"
---
## Exec Plan — Task T-frontend-design-alignment-4ry6ei
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code.

**Will build:**
- AC-1: `getPrimaryFunctionById` returns `pf_number` and `domain_classification` fields
- AC-2: PF page header shows pf_number, name, domain_classification
- AC-3: `LevelTabStrip` wired with `inapplicableLevels` computed from which levels lack a standards row
- AC-4: N/A tab body shows `<EmptyState variant="not-applicable">` — not blank, not crash
- AC-5: Standard, Badge, Training sections render inside active tab body only

**Approach:** Extend `getPrimaryFunctionById` query. Add `getApplicableLevels` helper (or inline in page) that returns which of P2–P7 have a standards row for this PF. Rewrite `src/app/primary-functions/[pfId]/page.tsx` — use `LevelTabStrip` (already exists at `src/components/LevelTabStrip.tsx`), conditional tab body with Standard/Badge/Training sections. `LevelTabStrip` already accepts `inapplicableLevels` prop. Tab navigation via `?level=X` searchParam (already present).

**Boundaries & mocks:** Postgres (read-only). Unit tests pass fake data. Integration hits seeded DB.

**Behaviors (TDD order):**
- B-1 (tracer bullet): `getPrimaryFunctionById` returns `pf_number` and `domain_classification`
- B-2: PF page at a valid level renders Standard, Badge, Training sections inside tab body
- B-3: PF page at an N/A level (no standards row) renders `<EmptyState variant="not-applicable">` as tab body content
- B-4: PF page header shows pf_number, name, domain_classification
- B-5 [e2e]: full PF page navigation — valid level shows content, N/A tab shows empty state

**PR will contain:**
- `src/lib/primary-functions.ts` — pf_number + domain_classification added to getPrimaryFunctionById
- `src/app/primary-functions/[pfId]/page.tsx` — restructured with LevelTabStrip
- `tests/T-frontend-design-alignment-4ry6ei/`

**Open questions / ambiguities:** None.

**Path:** L

**Escalation signals hit (≥2 → R):** 0
- [ ] Refactor pass done (on green; tests unchanged) — before PR
