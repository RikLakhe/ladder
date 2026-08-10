---
approved_by: "unknown"
approved_at: "2026-08-10"
planned_behaviors: "3"
approved_sha256: "4fdd1a1b8e145c176a24873c5e6a93fbc3eb92540f7dcfd5427edc9539af4cd0"
---
## Exec Plan — Task T-frontend-shell-779z2k
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: Mock document-versions service (`src/lib/mock/document-versions.ts`) with fixture data; `no-history-yet` EmptyState variant; `/version-history` page renders list newest-first using the mock service
- AC-2: VersionHistoryList component with expand-to-diff toggle; inline field-by-field diff (flat key/value comparison of `snapshot` objects, changed fields highlighted)
- AC-3: "View History" link on the competency detail page (`/competencies/[id]`) pointing to `/version-history`; verify no dead link and navigation preserves entity state

**Approach:**
- Add `src/lib/mock/document-versions.ts` — exports `getVersionHistory(entityType, entityId)` returning `MockDocumentVersion[]` sorted newest-first; includes fixture entries for at least one entity with ≥2 versions and one with zero (empty state).
- Add `no-history-yet` to `EmptyStateVariant` in `EmptyState.tsx` with appropriate copy.
- Build `src/components/VersionHistoryList.tsx` — renders list of entries; each row shows date, editor, change-note; expand toggle shows `VersionDiffView` inline (flat key compare of `oldSnapshot` vs `newSnapshot`).
- Update `src/app/version-history/page.tsx` to accept optional `entityType`/`entityId` search params, call mock service, render `VersionHistoryList` or `EmptyState`.
- Add "View History" link to `src/app/competencies/[id]/page.tsx` pointing to `/version-history?entityType=competency&entityId={id}`.

**Boundaries & mocks:** All data is mock (fixture in `src/lib/mock/document-versions.ts`). No network, no DB, no clock. Diff is computed client-side from snapshot fixtures. No real boundaries — no smoke AC needed.

**Behaviors (TDD order):**
- B-1 [tracer bullet / AC-1 + empty-state]: VersionHistoryList renders entries newest-first; entity with zero entries renders EmptyState `no-history-yet` variant.
- B-2 [AC-2]: Expanding a history entry shows a field-by-field diff view with old/new values for changed fields highlighted.
- B-3 [AC-3 / e2e]: Competency detail page has a "View History" link; navigating to it and back does not produce a dead link (Next.js routing resolves both directions).

**PR will contain:**
- `src/lib/mock/document-versions.ts` — new mock service + fixtures
- `src/components/EmptyState.tsx` — `no-history-yet` variant added
- `src/components/VersionHistoryList.tsx` — new component (list + diff)
- `src/app/version-history/page.tsx` — replaced stub with real implementation
- `src/app/competencies/[id]/page.tsx` — "View History" link added
- `tests/T-frontend-shell-779z2k/` — all task tests

**Open questions / ambiguities:**
- None: TSD and design doc are clear. Mock-only, no auth, no DB.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** none
- [ ] Refactor pass done (on green; tests unchanged) — before PR
