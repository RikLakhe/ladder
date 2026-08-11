---
approved_by: "Rikesh"
approved_at: "2026-08-11"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: 3
approved_sha256: "605cd0a62eda034d85560474b0a537b6ec7eafb653c18d8c49ddccebd3a285c3"
---
## Exec Plan — Task T-training-viewer-ywzj2v
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: New route `src/app/api/competencies/[competencyId]/reference-card/route.ts` — GET handler. New lib `src/lib/reference-card.ts` with `getReferenceCardRows(db, competencyId, level): Promise<RefCardRow[]>`. Joins badges → training_units → instruments filtered by competency_id + level. Returns `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}[]`.
- AC-2: New page `src/app/competencies/[id]/reference-card/page.tsx` — server component. Calls `getReferenceCardRows` directly. Renders `<ReferenceCardTable rows={rows} />` client component (imported from `src/components/ReferenceCardTable.tsx`, built by design agent). Pagination handled client-side with page size 20.
- AC-3 [e2e]: Seed >40 joined rows for a test competency+level, spawn dev server, navigate to `/competencies/[id]/reference-card?level=P4`, assert table visible with pagination, no crash.

**Approach:**
- Reference card data is read-only (SELECT only, no writes). No auth required; public route.
- Pagination: client-side state (page number) → slice array in component. Server returns all rows, client pages.
- Join path: badges (pf_id, level) ← primary_functions → competency (competency_id); training_units (competency_id, level); instruments (pf_id). See open questions below.
- Route uses competency UUID, not slug (matches existing `/competencies/[id]` pattern).

**Boundaries & mocks:**
- TSD Boundaries: none — all reads from real DB, no external services or mocks.
- Integration test: real seeded PostgreSQL (same as T-training-viewer-749xok pattern).
- E2e test: spawn dev server on port 34204, seed >40 rows, make real HTTP GET.

**Behaviors (TDD order):**
- B-1 [unit]: Pagination function/component test — given N rows, page size P, page parameter: page 1 returns rows 0–P-1, page 2 returns P–2P-1, last page returns remainder. Pure logic test (no DB, no network). Test file: `tests/T-training-viewer-ywzj2v/pagination.unit.test.ts`
- B-2 [integration]: `getReferenceCardRows(db, competencyId, level)` with seeded real DB — >40 rows for one comp+level returns all rows; empty comp+level returns empty array; no rows from other comp/level leak in. Test file: `tests/T-training-viewer-ywzj2v/reference-card-api.integration.test.ts`
- B-3 [e2e]: Full page navigation to `/competencies/[id]/reference-card?level=P4` — page renders, table visible with first page ≤20 rows, "Showing X of Y" counter visible, prev/next paging works, no crash. Test file: `tests/T-training-viewer-ywzj2v/reference-card.e2e.test.ts`

**PR will contain:**
- `src/lib/reference-card.ts` — `getReferenceCardRows` function
- `src/app/api/competencies/[competencyId]/reference-card/route.ts` — GET handler
- `src/app/competencies/[id]/reference-card/page.tsx` — page component
- `tests/T-training-viewer-ywzj2v/pagination.unit.test.ts` — B-1
- `tests/T-training-viewer-ywzj2v/reference-card-api.integration.test.ts` — B-2
- `tests/T-training-viewer-ywzj2v/reference-card.e2e.test.ts` — B-3

**Open questions / ambiguities:** (MUST be resolved before execution)
1. **Join path badges ↔ training_units**: TSD says "join badges → training_units → instruments" but the schema has no explicit FK between badges and training_units. Badges have `pf_id`, training_units have `competency_id`. Current assumption: join via primary_functions (badges.pf_id → primary_functions.id → primary_functions.competency_id = training_units.competency_id). Alternative: badges table should gain a `training_unit_id` FK. **Action**: Assume the PF-mediated join path (above) for now; if seeded test data shows a different relationship, adjust in B-2.
2. **Instruments assignment**: TSD/PRD don't specify which instruments belong to which badges or training_units. Instruments table has `pf_id`. Current assumption: each instrument belongs to the PF, and the reference card shows all instruments for all PFs that own training_units in the competency+level. Seeded test data should clarify if instruments are more tightly scoped. **Action**: Verify seeded data in B-2 before finalizing query.
3. **Pagination approach**: Client-side (component state + array slicing) vs. server-side (SQL LIMIT/OFFSET query param). Going with client-side because ReferenceCardTable is a pre-built client component. If performance issues arise (unlikely for ≤200 rows), convert to server-side. **Action**: B-2 test confirms <5 queries per page load.

**Path:** L (lean)
**Escalation signals hit:** 2 ambiguities (join path, instruments scope) → watch for scope creep
**Risk mitigation:** Seeded test data (B-2) is the ground truth. If join doesn't match test data, iterate quickly in B-2 before B-3.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
