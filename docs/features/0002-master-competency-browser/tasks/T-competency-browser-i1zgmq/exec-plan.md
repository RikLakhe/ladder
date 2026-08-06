---
approved_by: "unknown"
approved_at: "2026-08-06"
planned_behaviors: 4
approved_sha256: "f77b6ea6a94b6ed10de317ca84a2b5477ab36a7d87f51cc8edf57c0c9331f91a"
---
## Exec Plan — Task T-competency-browser-i1zgmq
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `<Shell>` component (header with app name + search input [inert in this task, no search wiring], left sidebar nav) applied via `src/app/layout.tsx` root layout so every page gets it automatically. (AC-1, AC-2, AC-3, AC-4)
- `<LevelTabs currentLevel levels />` component — renders a P2–P7 tab strip, highlights the active level. (AC-3, AC-4)
- Rewire `src/app/page.tsx` (Home) to render competency cards under the shell (styling only — data path unchanged). (AC-1)
- Rewire `src/app/competencies/[id]/page.tsx` to render primary functions as clickable pills under the shell. (AC-2)
- Rewire `src/app/primary-functions/[pfId]/page.tsx` to add `<LevelTabs>` + `?level=` query param, filtering Standard (reusing existing `getStandardsForPrimaryFunction`)/Functional Analysis/Badges to the selected level. **Existing route `src/app/primary-functions/[pfId]/standard/page.tsx` (T-...w1b7xx, frozen) is left completely untouched** — this task does not remove or alter it, it only adds level-filtered standard rendering to the main PF page.
**Approach:** high-level only — NOT implementation prescription
**Boundaries & mocks:** none — pure DB reads via existing lib functions, same boundary posture as prior tasks in this feature (Boundaries: none per TSD).
**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer, unit): `<LevelTabs>` — given `levels=["P2","P4"]` and `currentLevel="P4"`, renders all of P2–P7 as tabs and marks P4 as the active one (distinct rendered attribute/class from the rest).
- B-2 (e2e): `GET /` on a running server — response HTML contains the shell's header marker (app name) and sidebar nav marker, plus one card per seeded competency. (AC-1)
- B-3 (e2e): `GET /competencies/:id` on a running server — response HTML contains the shell markers plus a pill per that competency's primary functions, each an `<a>` linking to `/primary-functions/:pfId`. (AC-2)
- B-4 (e2e, required e2e AC): `GET /primary-functions/:pfId?level=X` on a running server — response HTML contains the shell markers, the level-tab strip with X marked active, and only level-X's standard/functional-analysis/badge content (a seeded PF with data at two different levels is used to prove the non-selected level's content is absent). (AC-3, AC-4)
**PR will contain:**
- `src/components/Shell.tsx`, `src/components/LevelTabs.tsx` (new)
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/competencies/[id]/page.tsx`, `src/app/primary-functions/[pfId]/page.tsx` (edited)
- `tests/T-competency-browser-i1zgmq/*` (new)
- `docs/features/0002-master-competency-browser/tasks/T-competency-browser-i1zgmq/behavior-spec.md` filled progressively
**Open questions / ambiguities:** (MUST be resolved before execution)
- Default `level` when the PF page is opened with no query param: default to `"P2"` (lowest level) rather than an "all levels" view, since AC-3 specifies tab-gated single-level content, matching the existing `/standard` route's already-established `?level=` convention.
**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
