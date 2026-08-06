---
approved_by: "unknown"
approved_at: "2026-08-06"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: 3
approved_sha256: "fce8bd3fbe0ae2ec86b6e47b58787b1b99378919134f988fbc5ea18c84d11be8"
---
## Exec Plan — Task T-competency-browser-w1b7xx
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: single-document view shows "last updated" derived from the most recent `document_versions` row for that entity.
- AC-2: history control lists all `document_versions` rows for that entity, reverse-chronological; "no history" state for zero rows.
- AC-3: history control reachable end-to-end on a real document view with ≥2 versions.
- AC-4: `GET /api/documents/:entityTable/:entityId/versions` returns JSON array of `{changeNote, changedBy, createdAt}`, most-recent-first, for that entity.
**Approach:** high-level only — NOT implementation prescription
- `document_versions` is generic (`entity_table`/`entity_id`); the only existing "document" content in this codebase is a `standards` row (one row per pf_id+level, with a `body`). The existing standard page (`/primary-functions/:pfId/standard?level=X`) already renders a single `standards` row when `level` is given — that single-row view is the "document view" this task extends with last-updated + history. Entity identity: `entity_table='standards'`, `entity_id=standards.id`.
- One shared query function `getDocumentVersions(connectionString, entityTable, entityId)` returning versions most-recent-first; "last updated" derives from `versions[0]?.createdAt` (no separate query). Used by both the page and the new API route — same shared-query pattern as prior tasks.
- Real Postgres throughout, no mocks.
**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- none — TSD Boundaries: none. Real Postgres throughout.
**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [AC-1]: `getDocumentVersions` returns rows most-recent-first for an entity; "last updated" = first row's `createdAt`; excludes other entities' rows.
- B-2 [AC-2]: `getDocumentVersions` returns `[]` (not an error) for an entity with zero rows.
- B-3 [AC-4]: JSON API route for `/api/documents/:entityTable/:entityId/versions` returns `{changeNote, changedBy, createdAt}` array, most-recent-first, scoped to that entity.
- B-4 [AC-3, e2e]: standard page (single `level`) renders "last updated" and the history list through a running server, sourcing real `document_versions` rows for that `standards` row's id; includes the zero-version "no history" case.
**PR will contain:**
- `src/lib/document-versions.ts` (query function), `src/app/api/documents/[entityTable]/[entityId]/versions/route.ts`, `src/app/primary-functions/[pfId]/standard/page.tsx` (extended, single-level case only), tests for all four behaviors.
**Open questions / ambiguities:** (MUST be resolved before execution)
- none — entity mapping (`standards` row = the document) is an unconstrained implementation choice; no PRD/TSD text names a specific entity type, and `standards` is the only existing single-row document-like content in the schema.
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
