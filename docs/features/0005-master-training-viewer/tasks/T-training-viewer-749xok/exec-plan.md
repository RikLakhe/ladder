---
approved_by: "unknown"
approved_at: "2026-08-10"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: ""
approved_sha256: "aad46f7777b4d516b437484a5e612787c671884135c7f108c6169f8b90293491"
---
## Exec Plan — Task T-training-viewer-749xok
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /api/competencies/[competencyId]/training?level=X` — new route at `src/app/api/competencies/[competencyId]/training/route.ts`. Adds `getTrainingUnitsForCompetencyAndLevel(db, competencyId, level)` to `src/lib/training-units.ts`. Returns `{id, type, level, sequenceOrder, name, hasSequencingIssue}[]` ordered by fixed type order then sequence_order.
- AC-2: Training sub-slot in PF page (`src/app/primary-functions/[pfId]/page.tsx`) — fetches competency_id via new `getPrimaryFunctionById(db, pfId)` in `src/lib/primary-functions.ts`, then calls the training lib directly, renders a `<section>` with rows grouped by type.
- AC-3: `hasSequencingIssue` computed server-side: a unit where any prereq's `sequence_order` is strictly higher than the unit's own `sequence_order`. Row renders a visible warning when true.
- AC-4 [e2e]: User navigates to a seeded PF page with training units — list renders without error.

**Approach:**
- Server-side computation: `getTrainingUnitsForCompetencyAndLevel` fetches all units for `competency_id + level`, then for each unit looks up its prereq ids (from `prereqs` jsonb) against the full result set to compute `hasSequencingIssue`.
- Type sort order (fixed): `concept_notes=0, guided_exercise=1, autonomous_project=2, onboarding=3, reference_card=4`, unknown types sort last.
- PF page adds a new `<section><h2>Training</h2>…</section>` after the Badges section. Fetches via lib (server component — no client fetch needed).
- TSD interface says `name` but DB column is `content` — expose DB `content` as `name` in the API response and `TrainingUnitRow` type.

**Boundaries & mocks:**
- TSD: "Boundaries: none" — all DB reads, no external services.
- Integration tests and e2e use a real seeded PostgreSQL (same pattern as existing tests).
- B-1 unit test uses plain objects (no DB) — pure function `computeHasSequencingIssue`.

**Behaviors (TDD order):**
- B-1 [unit]: `computeHasSequencingIssue(unit, allUnitsById)` pure function — prereq with `sequence_order > unit.sequence_order` → `true`; prereq with lower `sequence_order` → `false`; no prereqs → `false`.
- B-2 [integration]: `GET /api/competencies/:id/training?level=P3` with seeded DB — returns rows for that competency+level only, ordered by type then sequence_order; unit with forward prereq → `hasSequencingIssue: true` in response; rows from other competency_ids or levels absent.
- B-3 [unit/component]: PF page training section renders one row per unit showing `sequenceOrder` and `name`; rows grouped by type in fixed order; row with `hasSequencingIssue` shows warning text; empty list renders gracefully.
- B-4 [e2e]: Full navigation to seeded PF page — `<section>` with training rows visible, no runtime error, `hasSequencingIssue` warning visible for the seeded forward-prereq unit.

**PR will contain:**
- `src/lib/training-units.ts` — add `TrainingUnitRow` type + `getTrainingUnitsForCompetencyAndLevel` + `computeHasSequencingIssue` (exported for unit test).
- `src/lib/primary-functions.ts` — add `getPrimaryFunctionById(db, pfId): Promise<{id, competency_id, name} | null>`.
- `src/app/api/competencies/[competencyId]/training/route.ts` — new GET handler.
- `src/app/primary-functions/[pfId]/page.tsx` — add training sub-slot (calls lib directly as server component).
- `tests/T-training-viewer-749xok/sequencing.unit.test.ts` — B-1.
- `tests/T-training-viewer-749xok/training-api.integration.test.ts` — B-2.
- `tests/T-training-viewer-749xok/pf-training-section.test.tsx` — B-3.
- `tests/T-training-viewer-749xok/training-list.e2e.test.ts` — B-4.

**Open questions / ambiguities:**
- TSD lists response shape as `{id, type, level, sequenceOrder, name}` but the sequencing-issue warning (AC-3) requires either the full prereqs data client-side or `hasSequencingIssue` server-side. Adding `hasSequencingIssue: boolean` to the response — required for AC-3 to be implementable without sending raw `prereqs` to the client. ✅ Resolved: add `hasSequencingIssue` to response.
- TSD says `name` but DB column is `content`. ✅ Resolved: map `content` → `name` in `TrainingUnitRow`.
- `learning_path` type exists in the DB enum but is not in the TSD fixed type order. ✅ Resolved: sort `learning_path` last (index 99) — it is neither shown nor filtered per TSD.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** 0 — single API route + one page section, no security, no amendments, clear spec.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
