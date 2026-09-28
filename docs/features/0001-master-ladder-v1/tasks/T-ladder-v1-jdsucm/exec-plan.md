---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "2"
approved_sha256: "0a2caf88d274168f1d7f775f7d3245de136e47706eaccb26dcdd04a313c50ed7"
---
## Exec Plan — Task T-ladder-v1-jdsucm
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/components/ExploreButtonClient.tsx` — `'use client'` button; `label: string`, `onClick: () => void`; accessible text = label; calls `onClick` on click (AC-1)
- `src/app/[track]/[domain]/page.tsx` — server component; resolves track + domain via `getTrack`/`getDomain`; calls `notFound()` for unknown; renders breadcrumb + `DomainDetail` (AC-2, AC-3, AC-4, AC-5)
- `src/app/[track]/[domain]/DomainDetail.tsx` — client component; renders competency cards with links or "Coming soon" placeholder (AC-2, AC-3, AC-4)
- `src/components/__tests__/ExploreButtonClient.test.tsx` — unit tests for ExploreButtonClient (AC-1)
- `src/app/[track]/[domain]/__tests__/page.test.tsx` — unit tests for domain detail (AC-2, AC-3, AC-4)

**Approach:**
Two RED/GREEN cycles. B-1: `ExploreButtonClient` tracer bullet. B-2: domain detail — server page resolves data, client `DomainDetail` renders list or placeholder. Coming-soon invariant enforced by branching: only one code path executes per domain type.

**Boundaries & mocks:**
- No external boundaries. No store reads (TSD explicit).
- `notFound()` is framework convention; not unit-testable.

**Behaviors (TDD order):**

B-1 (tracer bullet): ExploreButtonClient
- RED: test imports `ExploreButtonClient` — fails (module missing)
- GREEN: create component
- Tests: renders button with label as accessible text; onClick called exactly once on click

B-2: Domain detail (live + coming-soon + breadcrumb)
- RED: test imports `DomainDetail` — fails (module missing)
- GREEN: create server page + client DomainDetail
- Tests: dev/leadership → competency names in DOM + links href `/{track}/{domain}/{slug}`; qa/technical-skill → "Coming soon" text + zero competency links; breadcrumb contains track name + domain name

**PR will contain:**
- `src/components/ExploreButtonClient.tsx`
- `src/components/__tests__/ExploreButtonClient.test.tsx`
- `src/app/[track]/[domain]/page.tsx`
- `src/app/[track]/[domain]/DomainDetail.tsx`
- `src/app/[track]/[domain]/__tests__/page.test.tsx`

**Open questions / ambiguities:**
- `ExploreButtonClient` is `'use client'` — wraps a button for use in server-component trees that need click handlers.
- Coming-soon invariant (AC-4): enforced by branching on `domain.comingSoon` — only placeholder renders in that branch, no competency iteration.
- B-4 (404): `notFound()` in server component; not RTL unit-testable; shallow missing — noted in verification.
- B-5 (e2e): manual browser walk Home → Track → Domain → competency list.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
