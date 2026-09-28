---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: "2"
approved_sha256: "dd7179cc2c0e3ace4a35ff653a534b7fe3dff3c2071406a9f3342aac2bc01303"
---
## Exec Plan — Task T-ladder-v1-5ln8k3

> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/lib/content.ts` — 6 pure utility functions: `getTracks`, `getTrack`, `getDomain`, `getCompetency`, `getNextLevel`, `computeProgress` (AC-1, AC-2, AC-3)
- `src/app/page.tsx` — client home page: 4 track buttons + 6 level buttons with `aria-pressed`; `setTrack`/`setLevel` on click; nav link to `/{currentTrack}` (AC-4, AC-5, AC-6, AC-7)
- `src/app/__tests__/page.test.tsx` — component tests for home page (AC-4, AC-5, AC-6)
- `src/lib/__tests__/content.test.ts` — utility tests (AC-1, AC-2, AC-3)

**Approach:**
Two RED/GREEN cycles. B-1: content utilities (pure functions, easy to test). B-2: home page component (React Testing Library). Home page is a client component reading from store.

**Boundaries & mocks:**
- Zustand store: mock via `vi.mock` or direct `setState` in component tests — no real localStorage.
- No network/external boundaries.
- Smoke AC: AC-7 — manual browser check (nav link goes to correct track URL).

**Behaviors (TDD order):**

B-1 (tracer bullet): content utilities
- RED: write `src/lib/__tests__/content.test.ts` importing from `../content` — fails (module missing)
- GREEN: write `src/lib/content.ts` with all 6 functions
- Tests: `getTracks` returns 4; `getTrack('dev')` returns dev track; `getTrack('unknown')` returns null; `getDomain` hit/miss; `getCompetency` hit; `getNextLevel('p2')` returns 'p3'; `getNextLevel('p6')` returns 'p7'; `getNextLevel('p7')` returns null (strict); `computeProgress` at 0/partial/full

B-2: home page component
- RED: write `src/app/__tests__/page.test.tsx` importing home page — fails (component doesn't have the behavior yet or imports broken)
- GREEN: rewrite `src/app/page.tsx` as client component with track/level buttons
- Tests: 4 track buttons rendered; 6 level buttons rendered; clicking track calls `setTrack`; clicking level calls `setLevel`; `aria-pressed` correct

**PR will contain:**
- `src/lib/content.ts`
- `src/lib/__tests__/content.test.ts`
- `src/app/page.tsx` (rewritten as client component)
- `src/app/__tests__/page.test.tsx`

**Open questions / ambiguities:**
- Home page needs store access → must be `'use client'`. Server components can't use Zustand directly. Home page will be a client component that reads store state.
- `StoreHydration` not yet built (T9). For now, the home page reads store state directly; hydration flash is expected and accepted until T9 adds `StoreHydration`.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
