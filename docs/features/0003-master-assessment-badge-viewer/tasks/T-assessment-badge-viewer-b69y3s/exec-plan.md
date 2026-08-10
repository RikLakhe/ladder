---
approved_by: "unknown"
approved_at: "2026-08-10"
approved_sha256: "97a8128fd1a1bf28f97cc1e693821c1ddafd87777595e7683999184b702e72e2"
---
## Exec Plan — Task T-assessment-badge-viewer-b69y3s
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- **Migration:** ALTER TABLE badges ADD COLUMN IF NOT EXISTS badge_code TEXT, tier TEXT, certifies TEXT, completion_bar TEXT, verifier_role TEXT, cosigner_required BOOLEAN DEFAULT false (AC-1, AC-2)
- **New library function:** `getBadgeByCode(connectionString, badgeCode)` in src/lib/badges.ts returning {badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired} | null (AC-1, AC-2)
- **New API route:** GET /api/badges/:badgeCode at src/app/api/badges/[badgeCode]/route.ts returning JSON response with badge details (AC-1, AC-2)
- **Updated detail page:** src/app/badges/[badgeCode]/page.tsx replaces mock data with real DB call, renders:
  - Header with badge_code, name, TierChip component, level
  - Full certifies sentence
  - completion_bar rendered verbatim as pass criterion text
  - Verifier section showing verifier_role text
  - Co-signer indicator + tooltip (only when cosigner_required=true; absent when false)
  - Not-found state for unknown badgeCode (AC-1, AC-2)
- **Unit test:** Verify co-signer indicator presence/absence toggles exactly on cosigner_required (AC-2)
- **Integration test:** Seeded badges with cosigner_required=true and false; verify indicator presence/absence; verify unknown code returns not-found page without crash (AC-1, AC-2)
- **E2E test:** Start Next.js dev server, navigate from PF page badge card to detail page, verify badge_code/name/tier match (AC-3)

**Approach:** high-level only — NOT implementation prescription
- Plain SQL ALTER TABLE migration to add new columns to badges table (idempotent using IF NOT EXISTS per existing pattern).
- New library function calls real Postgres database via connectionString; returns typed Badge object or null.
- API route uses library function and returns JSON with snake_case → camelCase mapping.
- Detail page component calls API route in getServerSideProps or similar server-side fetch; hydrates component with badge data.
- Tests connect directly to real Postgres database (Docker Compose); integration tests seed data and assert behavior; E2E tests spawn Next.js dev server on unique port (34321) and interact via HTTP.
- TierChip component: if src/components/TierChip.tsx exists (being created by T-94pi25), import and use; otherwise inline a simple <span> with tier text (noted for reviewer).

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- Database service: REAL — a Postgres instance provisioned via Docker Compose, not mocked. Integration tests (B-2) and E2E test (B-3) exercise real database directly with seeded data.
- No external services (no auth, no external APIs).
- No clock/randomness/filesystem dependency in this story beyond normal file I/O.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: AC-2 [unit] — Co-signer indicator renders when cosigner_required=true, absent when cosigner_required=false (isolated component test, no DB).
- B-2: AC-1, AC-2 [integration] — Seed badges table with two records: one with cosigner_required=true, one with false; call getBadgeByCode for each; verify returned objects have correct fields; render detail page and assert indicator presence/absence matches; call getBadgeByCode with unknown code; verify returns null; verify detail page returns not-found state.
- B-3: AC-3 [e2e] — Start Next.js dev server on port 34321; navigate to a seeded PF page (e.g., /competencies/[competency-id]/pf/[pf-id]); locate badge card for a seeded badge; click to navigate to /badges/[badgeCode]; verify detail page renders with matching badge_code, name, tier.

**PR will contain:**
- Migration file: migrations/0001_init.sql (adds badge_code, tier, certifies, completion_bar, verifier_role, cosigner_required to badges table)
- Library function: src/lib/badges.ts (new getBadgeByCode function)
- API route: src/app/api/badges/[badgeCode]/route.ts (new GET endpoint)
- Detail page: src/app/badges/[badgeCode]/page.tsx (updated to use real DB)
- Test files:
  - tests/T-assessment-badge-viewer-b69y3s/unit.test.ts (B-1 co-signer indicator toggle)
  - tests/T-assessment-badge-viewer-b69y3s/integration.test.ts (B-2 getBadgeByCode, detail page rendering, not-found)
  - tests/T-assessment-badge-viewer-b69y3s/e2e.test.ts (B-3 badge card navigation)

**Open questions / ambiguities:** (MUST be resolved before execution)
- **TierChip component location:** Task T-94pi25 is adding TierChip to src/components/TierChip.tsx. This task will import it if available; if not (different branch), will inline a simple <span> with tier text. Reviewer will note this dependency.
- **Detail page route:** AC uses `/[competency]/[pf]/badges/[badgeCode]` as canonical path; existing route is `/badges/[badgeCode]`. This task works with existing route; full nested routing out of scope (other task or future work).
- **Navigation from PF page:** AC-3 e2e assumes badge card on PF page links to `/badges/[badgeCode]`. If PF page card doesn't exist yet, e2e test will seed it or use mock; reviewer will clarify actual link target.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- **Ambiguities:** 2 (TierChip location, route nesting) — at threshold; no other escalation signals.
- **Staying Lean:** Ambiguities are documented and non-blocking (TierChip can be inlined; nested route is out of scope). No security, blast-radius, amendments, or prior-fail signals.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
