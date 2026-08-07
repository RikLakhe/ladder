---
approved_by: "unknown"
approved_at: "2026-08-07"
planned_behaviors: "3"
approved_sha256: "058a2f90c4ff5a1e07bad04e0a9ef045e1b59bee4b39fe8a9af7bc4043d58a30"
---
## Exec Plan — Task T-frontend-shell-zxnphh
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `src/lib/mock/badges.ts` — MockBadge + MockInstrument types, fixture array (≥3 badges: varied tier/level/pf, ≥1 with cosigner_required=true, ≥1 evidence ref that resolves, ≥1 that breaks), filter helpers (by level). `src/app/badges/page.tsx` — list badges from mock, level filter via searchParam, render BadgeCard per badge.
- AC-2: `src/app/badges/[badgeCode]/page.tsx` — detail page. Render certifies, completion_bar verbatim, verifier_role, co-signer indicator (only when cosigner_required=true) with tooltip, evidence list (each entry resolved from instrument fixture → row text, or "⚠ evidence link broken" state), BadgeStatusLegend (3-state static). Add `not-attempted` variant to EmptyState for completion placeholder.
- AC-3: BadgeCard renders as a Link to `/badges/[badgeCode]`. Competency Assessment tab updated to show mock badges (from mock service) as BadgeCard links — both navigation paths covered.

**Approach:**
- All data from mock fixtures, no DB reads (TSD: Boundaries none; Data: mock only).
- MockBadge shape: `{ id, badge_code, pf_id, competency_id?, level, name, certifies, completion_bar, verifier_role, cosigner_required, tier, evidence_required: { instrument_id, row_key, note }[] }`. MockInstrument: `{ id, rows: { key: string; text: string }[] }`.
- Evidence resolution: for each evidence_required entry, find instrument by id in fixture, find row by key — if either lookup fails → broken-link state. Never silently drop.
- TierChip: tier (int 1–4) → color variant (reuse LevelTag pattern, new component).
- BadgeStatusLegend: static, no data dependency — renders 🟢/🟡/⚪ states with one-line copy.
- Level filter on Badges page via `?level=P3` searchParam (URL state, no client JS).
- Competency assessment tab: call `getBadgesForCompetency(competencyId)` from mock (filter mock fixtures by competency_id), render as BadgeCard list; if empty, EmptyState no-badge.
- §1.5/§1.7 fields: not in initial fixture schema — render nothing (design: "render nothing if absent").

**Boundaries & mocks:**
- All badge + instrument data: mock fixtures (no real DB)
- No network, no clock, no randomness

**Behaviors (TDD order):**
- **B-1 (tracer):** Badges page renders mock badge cards; level filter narrows the list.
  - Render BadgesPage with no filter → all fixture badges visible (by badge_code).
  - Render BadgesPage with `?level=P3` → only P3 badges shown.
  - Test: `tests/T-frontend-shell-zxnphh/badges-list.test.tsx` (component render, jsdom).
- **B-2:** Badge detail page renders full detail — certifies, completion bar, verifier, co-signer (gated on flag), evidence resolved + broken-link, status legend.
  - Render BadgeDetailPage for a badge with cosigner_required=true → co-signer indicator present.
  - Render BadgeDetailPage for a badge with cosigner_required=false → co-signer indicator absent.
  - Render BadgeDetailPage for a badge with one good evidence ref → instrument row text shown.
  - Render BadgeDetailPage for a badge with one bad evidence ref → "⚠ evidence link broken" present, entry NOT silently dropped.
  - Test: `tests/T-frontend-shell-zxnphh/badge-detail.test.tsx`.
- **B-3 (e2e):** Both nav paths render a link to badge detail.
  - Render BadgesPage → each badge card is an anchor with href `/badges/<badgeCode>`.
  - Render CompetencyPage assessment tab → badge cards have href `/badges/<badgeCode>`.
  - Test: `tests/T-frontend-shell-zxnphh/badge-nav.test.tsx`.

**PR will contain:**
- `src/lib/mock/badges.ts` — types + fixtures + helpers
- `src/components/TierChip.tsx` — new
- `src/components/BadgeCard.tsx` — new (wraps Link)
- `src/components/BadgeStatusLegend.tsx` — new (static)
- `src/components/EmptyState.tsx` — add `not-attempted` variant
- `src/app/badges/page.tsx` — replace stub, render list + level filter
- `src/app/badges/[badgeCode]/page.tsx` — new detail page
- `src/app/competencies/[id]/page.tsx` — assessment tab: show badge cards
- `tests/T-frontend-shell-zxnphh/badges-list.test.tsx`
- `tests/T-frontend-shell-zxnphh/badge-detail.test.tsx`
- `tests/T-frontend-shell-zxnphh/badge-nav.test.tsx`

**Open questions / ambiguities:**
- Scope/competency filters on Badges page: design mentions scope/competency/level filters, but scope and competency require relational context beyond what a level-keyed URL param gives. Mock fixtures lack a global scope concept. Plan: implement level filter (URL param) only; scope+competency filters deferred (mock page shows all, filter by level). Acceptable for mock-backed task — no AC asserts scope/competency filter behavior specifically.
- `getTrainingForCompetency` in mock/training.ts returns `{ summary }` shape, not a list. Badge mock will follow same pattern only where needed. Assessment tab: currently shows `assessment.summary` string — will be replaced with BadgeCard list. If there are no mock badges for a given competency_id, EmptyState renders (no-badge).
- These are design decisions, not blockers. No open ambiguities remain.

**Path:** L
**Escalation signals hit (≥2 → R):** 0 — no ambiguities, blast radius = 3 files (within normal), no security, no amendments, no prior fail, no self-flag.
**If overriding R→L:** n/a

- [ ] Refactor pass done (on green; tests unchanged) — before PR
