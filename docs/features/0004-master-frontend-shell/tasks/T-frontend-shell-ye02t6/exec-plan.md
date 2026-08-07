---
approved_by: "unknown"
approved_at: "2026-08-07"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "d5cfb656c42584ce1a835fbaaf832ef02e8929dfcd33406a89a662494d4f0d02"
---
## Exec Plan — Task T-frontend-shell-ye02t6
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: already largely satisfied by existing `src/app/page.tsx` (card grid from `getCompetenciesWithPfCount`, real API) — confirm/lock with a regression test.
- AC-2: new `FocusPanel`/`WhatsNextPanel` client components, driven by a new mock data service `src/lib/homePanels.ts` keyed by session level (read from the same `ladder-level` sessionStorage key `LevelBar` already writes). Each panel renders nothing when the mock service returns no content for the current level.
- AC-3: already satisfied — each card is a `<Link href="/competencies/:id">`. Confirm with an e2e-style render+navigate test.
**Approach:** high-level only — NOT implementation prescription
- Keep `src/app/page.tsx` a server component for the card grid (real API, no client state needed).
- Panels need session-scoped client state (sessionStorage read), so they're separate `"use client"` components composed into the page, same pattern as `LevelBar`/`ShellBreadcrumb`.
**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- Boundaries: none per TSD. Focus/what's-next panels use a mock data service (no real backing table) — this is spec-mandated fakery, not a test boundary needing a smoke AC.
**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 [behavior] AC-1: Home renders one card per competency (name, domain, PF count) from the real API.
- B-2 [behavior] AC-2: Focus panel and what's-next panel render only when the mock service has content for the current session level; omitted (no empty box) otherwise.
- B-3 [e2e] AC-3: Clicking a competency card navigates to that competency's page.
**PR will contain:**
- `src/lib/homePanels.ts` (mock data service), `src/components/FocusPanel.tsx`, `src/components/WhatsNextPanel.tsx`, updates to `src/app/page.tsx`, tests under `tests/T-frontend-shell-ye02t6/`.
**Open questions / ambiguities:** (MUST be resolved before execution)
- none
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
