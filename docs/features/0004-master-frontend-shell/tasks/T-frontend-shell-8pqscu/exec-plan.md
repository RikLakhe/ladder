---
approved_by: "unknown"
approved_at: "2026-08-07"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "f063a0148140be5c1f089f563b40889c22ccd75b7ab66286b8987e1d447f05f8"
---
## Exec Plan — Task T-frontend-shell-8pqscu
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: extend existing `Shell` (`src/components/Shell.tsx`) header with a level selector control and a current-level indicator; extend left nav with Home, Level View, Transition Guide, Badges, Version History links above the existing competency list.
- AC-2: a `Breadcrumb` component, rendered by `Shell` above `children`, derived from the current pathname; suppressed on `/`.
- AC-3: a `LevelSetModal`, session-scoped (sessionStorage-backed) client state living in `Shell`; shows on first render this session when no level is set, sets the current-level indicator on completion/dismissal, does not reopen that session.
- AC-4: routes for Level View, Transition Guide, Badges, Version History must exist and render (stub pages where the later stories haven't landed yet, so no dead links now) — later stories (S-0004.04/06/08) replace the stub content.

**Approach:** high-level only — NOT implementation prescription
- `Shell` becomes the composition root: header (logo/home link, search, `LevelSelector` + indicator), nav (static links + competency list), `Breadcrumb`, `LevelSetModal`, then `children`.
- Session-only state (selected role/level, modal-dismissed) lives in a small client component wrapping `Shell`'s interactive parts — no server persistence, matches TSD Data/State.
- Breadcrumb derives labels from `usePathname()` segments plus a small static route→label map (competency/PF names resolved from already-fetched data where the segment is an id).
- Stub pages for Level View / Transition Guide / Badges / Version History are minimal placeholders (heading only) so AC-4 has real routes to hit; later stories fill them in — no functionality is faked, just not-yet-built.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- none — Boundaries: none per TSD. All state is client-side session state (no external service). AC-4 is the e2e smoke, hitting real rendered routes.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: AC-1 — shell renders header (home link, search, level selector, current-level indicator) + full left nav (Home, Level View, Transition Guide, Badges, Version History, competency list) around given children.
- B-2: AC-2 — breadcrumb renders above content on non-home routes, reflecting the route; absent on home.
- B-3: AC-3 — level-set modal shows on first render this session (no stored level), setting a level closes it and updates the indicator; on a subsequent render (level already stored) it does not show.
- B-4 (e2e): AC-4 — every nav-sidebar link and the header logo link resolve to a real page that renders without throwing.

**PR will contain:**
- `src/components/Shell.tsx` (header/nav extensions), new `src/components/Breadcrumb.tsx`, `src/components/LevelSetModal.tsx`, `src/components/LevelSelector.tsx` (or folded into Shell if small)
- stub route pages: `src/app/level-view/page.tsx`, `src/app/transition-guide/page.tsx`, `src/app/badges/page.tsx`, `src/app/version-history/page.tsx`
- tests under `tests/T-frontend-shell-8pqscu/`

**Open questions / ambiguities:** (MUST be resolved before execution)
- none — TSD/card fully specify session-only state and no external boundaries; stub pages are a reasonable, low-risk way to satisfy AC-4 without pulling forward later stories' scope.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 (0) · blast-radius≥3 (touches shared layout, but scoped) · security (no) · amendments≥2 (no) · prior-fail (no) · self-flag (no)
**If overriding R→L:** n/a — Path L, no escalation signals hit.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
