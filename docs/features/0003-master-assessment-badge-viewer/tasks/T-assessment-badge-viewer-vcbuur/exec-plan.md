---
approved_by: "unknown"
approved_at: "2026-08-10"
planned_behaviors: ""
approved_sha256: "419d8638cc7a0703ba1ded6ab427fb67c732b96eca2c1a574b0099a467ff0f46"
---
## Exec Plan — Task T-assessment-badge-viewer-vcbuur
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: New `src/components/BadgeStatusLegend.tsx` — pure static component, renders exactly 3 legend entries in fixed order:
  1. 🟢 Earned-eligible — "All criteria met, ready for assessment"
  2. 🟡 Blocked-assignment-limited — "Assignment quota reached, cannot be assessed this cycle"
  3. ⚪ Not-attempted — "No assessment attempt has been made"
  Container has `data-testid="badge-status-legend"`, each entry testable.
- AC-2: Updated `src/app/badges/[badgeCode]/page.tsx` — replace existing `<div data-testid="badge-status-legend">` with `<BadgeStatusLegend />`.

**Approach:** high-level only — NOT implementation prescription
- Component is zero-dependency, zero-state, zero-props — pure markup.
- Placement: refactor existing hardcoded legend div in badge detail page into dedicated reusable component.
- No state, no props, no API calls — legend content is fully static.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- No DB reads — legend is static only.
- Mock badge detail pages: `/badges/DEMO-P3` and `/badges/DEMO-P4` (existing mock data in `src/lib/mock/badges.ts`).
- Unit tests: component in isolation. E2E tests: mock badge pages to verify legend consistency across different badge views.
- No external services, no real database reads for legend content.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (unit): `tests/T-assessment-badge-viewer-vcbuur/legend.test.tsx` — BadgeStatusLegend renders all 3 entries in correct order with explanations.
- B-2 (e2e): `tests/T-assessment-badge-viewer-vcbuur/legend-e2e.test.ts` — badge detail pages at `/badges/DEMO-P3` and `/badges/DEMO-P4` render identical legend markup (same states, order, explanations).

**PR will contain:**
- `src/components/BadgeStatusLegend.tsx` — new component
- `src/app/badges/[badgeCode]/page.tsx` — integration: replace legend div with component
- `tests/T-assessment-badge-viewer-vcbuur/legend.test.tsx` — B-1 unit test
- `tests/T-assessment-badge-viewer-vcbuur/legend-e2e.test.ts` — B-2 e2e test

**Open questions / ambiguities:** (MUST be resolved before execution)
1. Legend explanation text: TSD specifies labels but not exact explanations. Resolution: use clear, concise single-line copy (as above). SA review during verification confirms alignment.
2. E2E mock data: B-2 uses existing mock badges (DEMO-P3, DEMO-P4). If real DB is wired by another branch, those URLs may 404. Resolution: this is a separate worktree; test is scoped to mock-backed legend consistency. Real DB updates are out of scope.
3. Server vs. client component: no special logic needed. Resolution: client component (default).

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
