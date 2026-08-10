---
approved_by: "unknown"
approved_at: "2026-08-07"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "96f0f278f11bd7dbf90d10ab3adea502ffe979b03a8efa64869ebe69aea45377"
---
## Exec Plan — Task T-assessment-badge-viewer-94pi25
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Migration: `ALTER TABLE badges ADD COLUMN IF NOT EXISTS badge_code TEXT`, `tier TEXT`, `certifies TEXT` (nullable, backward compatible — TSD schema note explicitly calls this out as in-scope for S-0003.01)
- Updated `src/lib/badges.ts`: `getBadgesForPrimaryFunction` returns `{id, badgeCode, name, tier, certifies, level}` and accepts optional `level: string` filter
- Updated `GET /api/primary-functions/:pfId/badges` route: passes `level` query param to lib
- New `src/components/TierChip.tsx`: renders `tier` as a text chip — this is the canonical first definition; BLUEPRINT §Boundary Rules and CONSTITUTION §Convention 2 say it is defined once (competency-browser) and reused by siblings. The competency-browser feature has not yet defined it, so this task creates it. Future tasks import this file, never redefine it.
- New `src/components/BadgeCard.tsx`: renders `badge_code` (monospace element), `name`, `<TierChip tier={...} />`, truncated `certifies` (first sentence — see Open questions), and a fixed ⚪ Not-attempted status marker; links to the badge's future detail page
- Updated PF page `src/app/primary-functions/[pfId]/page.tsx`: Badges section renders `<BadgeCard>` per `levelBadges`, each wrapped in a `<Link>` to the badge detail route

**Approach:** high-level only
- Migration goes in `migrations/0001_init.sql` as additional `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` lines (idempotent, existing `migrate()` re-runs it)
- `getBadgesForPrimaryFunction` SELECTs the new columns; optional `level` param adds a SQL `AND level = $2` clause
- `TierChip` receives `tier: string | null | undefined` and renders a `<span>` with the tier value or nothing
- `BadgeCard` is a pure client component receiving typed props; truncation is pure function (split on `.`, take first segment + `.`)
- AC-2 invariant (⚪ always shown): hardcoded in `BadgeCard` — no input drives the status in v1
- Link target: `href={/primary-functions/${pfId}/badges/${badge.badgeCode}}` — this is an interim path; the exact route will align with S-0003.02's detail page. Test asserts the link element exists and its href contains `badgeCode`.

**Boundaries & mocks:**
- No external network or filesystem boundaries — all reads from local Postgres
- Tests hit a real seeded DB (same integration pattern as existing tests in this repo)
- No mocks needed

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2; AC-2 invariant covered as property of B-1
- **B-1**: `BadgeCard` unit — renders badge_code monospace, name, TierChip, truncated certifies, ⚪ Not-attempted
- **B-2**: PF page e2e — Badge sub-slot renders one card per pf_id+level badge, zero from other pf_id/level, each card links via badge_code

**PR will contain:**
- `migrations/0001_init.sql` — new ALTER TABLE lines for badge_code, tier, certifies
- `src/lib/badges.ts` — new columns + optional level filter
- `src/app/api/primary-functions/[pfId]/badges/route.ts` — level query param passthrough
- `src/components/TierChip.tsx` — new
- `src/components/BadgeCard.tsx` — new
- `src/app/primary-functions/[pfId]/page.tsx` — use BadgeCard + Link in Badges section
- `tests/T-assessment-badge-viewer-94pi25/badge-card.test.tsx` — B-1 unit
- `tests/T-assessment-badge-viewer-94pi25/badges-sub-slot.e2e.test.ts` — B-2 e2e

**Open questions / ambiguities:** (resolved here, no blockers)
1. **TierChip ownership**: BLUEPRINT says owned by competency-browser, but that feature hasn't built it. Resolution: create here as canonical definition; future tasks import it.
2. **Certifies truncation rule**: TSD says "truncated certifies sentence" without defining the boundary. Resolution: first sentence only — split on first `.`, append `.`. Null/empty → render nothing.
3. **Detail route link target**: TSD S-0003.02 defines `/[competency]/[pf]/badges/[badgeCode]` but PF page only has `pfId` (not competency slug). The detail page doesn't exist yet. Resolution: use `href={/primary-functions/${pfId}/badges/${badge.badgeCode}}` as interim path. B-2 test asserts link existence + href contains badgeCode, not exact path.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
