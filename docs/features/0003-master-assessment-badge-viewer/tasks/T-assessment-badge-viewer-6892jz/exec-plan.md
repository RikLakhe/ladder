---
approved_by: "unknown"
approved_at: "2026-08-10"
approved_sha256: "fb9cb9119be43e0cab7373717385fe9d388b611493a16edf0730a98079e8ea2b"
planned_behaviors: ""
---
## Exec Plan — Task T-assessment-badge-viewer-6892jz
> Authored during planning, before any code. GATE: approve via `lane approve` BEFORE any code.

**Will build:** (mapped to each AC)
- New `getEvidenceForBadge(connectionString: string, badgeCode: string)` in src/lib/badges.ts
  Returns: Promise<Array<{instrumentId: string, rowKey: string, resolved: boolean, rowText?: string}>>
  Logic: SELECT evidence_required FROM badges WHERE badge_code=$1; for each entry JOIN instruments, find row_key in rows JSONB; resolved=true if found with rowText, resolved=false if instrument_id or row_key not found
- New GET /api/badges/[badgeCode]/evidence at src/app/api/badges/[badgeCode]/evidence/route.ts
  Returns JSON array of resolution results
- Updated src/app/badges/[badgeCode]/page.tsx: render evidence_required entries as expandable chips
  - Each resolvable entry: expandable <details>/<summary> chip showing instrument reference; expanded shows rowText
  - Each broken entry: visible "evidence link broken" warning (e.g. data-testid="evidence-broken")
  - Zero entries silently omitted (never — array length preserved)

**Approach:**
- getEvidenceForBadge: query badges.evidence_required JSONB, iterate entries, for each do:
  SELECT rows FROM instruments WHERE id = $instrument_id; if no row → resolved:false
  Then search rows JSON array for row_key match; if no match → resolved:false
  Returns one result object per input entry, preserving order and count
- API route: call getEvidenceForBadge, return NextResponse.json(results)
- Page update: fetch from /api/badges/[badgeCode]/evidence or call lib directly (server component — call lib directly)

**Boundaries & mocks:**
- Reads local Postgres only
- Tests use real seeded DB (TRUNCATE + seed in beforeAll)
- No mocks needed

**Behaviors (TDD order):**
- B-1: Unit — getEvidenceForBadge: resolvable entry returns {resolved:true, rowText}; bad instrument_id → {resolved:false}; bad row_key → {resolved:false}; array length equals evidence_required length
- B-2: Integration — badge with mixed evidence entries: response array length == input length, resolved/broken correctly flagged, broken entries have resolved:false (not omitted)
- B-3: E2e (PORT 34322) — badge detail page renders expandable chip for resolvable entry and "evidence link broken" element for broken entry, both visible in same page render

**PR will contain:**
- src/lib/badges.ts — new getEvidenceForBadge function
- src/app/api/badges/[badgeCode]/evidence/route.ts — new route
- src/app/badges/[badgeCode]/page.tsx — updated to show evidence chips and broken-link warnings
- tests/T-assessment-badge-viewer-6892jz/evidence-resolution.test.ts — B-1 + B-2 unit/integration
- tests/T-assessment-badge-viewer-6892jz/evidence-e2e.test.ts — B-3 e2e

**Open questions / ambiguities:**
- badge_code column: T-94pi25 task adds it to migration. This task's branch may not have it yet. Resolution: this task also adds the migration column (idempotent ADD COLUMN IF NOT EXISTS) — safe to include.
- Expandable chip: AC-1 says "expandable reference chip". Use HTML <details>/<summary> — no library required. Summary shows instrument_id + row_key reference; expanded body shows rowText.

**Path:** L
- [ ] Refactor pass done (on green; tests unchanged) — before PR
