---
approved_by: "unknown"
approved_at: "2026-08-07"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "79f7f0bd56fc8aea43e3a07c4b9f4304206de121b5199f9537bf9f81baa03bab"
---
## Exec Plan — Task T-frontend-shell-wbb2sr
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: replace the `src/app/level-view/page.tsx` stub with a real Level View: P2–P7 tab strip (query-param driven, same pattern as `src/app/primary-functions/[pfId]/page.tsx`); for the selected level, reads real `standards` across all competencies/PFs, grouped by competency; PFs with no standard at that level are omitted (never a broken row).
- AC-2: new `src/app/transition-guide/page.tsx`: grid of level-transition columns (P2→P3, P3→P4, …) per competency; each row (one per PF) expands to show full before/after standard text for that transition. "Assessed via" note not in schema yet — will flag as mock-sourced text if TSD requires it; omit the field entirely if not testable without fabricating a source (simpler, matches "Boundaries: none").
- AC-3: PF rows in both views link to `/primary-functions/:pfId?level=:level` (existing route), reusing the `<Link>` pattern already proven for PF navigation elsewhere in the app.

**Approach:** Both are new server-component pages (real DB reads only, no client state needed — level selection is a query param, matching the PF page's existing convention). Add a `getStandardsByLevel` (or similar) query to `src/lib/standards.ts` for "all PFs at a given level, grouped by competency" since the existing `getStandardsForPrimaryFunction` is scoped to one PF. Reuse `LevelTag`'s `Level` type and level ordering.

**Boundaries & mocks:** none per TSD (`Boundaries: none`) — both views read real `competencies`/`primary_functions`/`standards`. No smoke AC needed.

**Behaviors (TDD order):**
- B-1 (tracer bullet) AC-1 [behavior]: Level View shows a P2–P7 tab strip; selecting a level lists every applicable PF's criteria snippet at that level, grouped by competency; PFs without a standard at that level are omitted.
- B-2 AC-2 [behavior]: Transition Guide shows a grid of level-transition columns per competency; each row expands to show full before/after standard text.
- B-3 AC-3 [e2e]: Clicking a PF row in either view navigates to that PF's page at the matching level (route already exists — verify reachability through the running app).

**PR will contain:** src/app/level-view/page.tsx, src/app/transition-guide/page.tsx, src/lib/standards.ts (new query fn), tests under tests/T-frontend-shell-wbb2sr/.

**Open questions / ambiguities:** none — "assessed via" note deferred (no backing field, TSD marks it optional/mock-flaggable; omitting rather than fabricating a mock source keeps Boundaries at "none").

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
