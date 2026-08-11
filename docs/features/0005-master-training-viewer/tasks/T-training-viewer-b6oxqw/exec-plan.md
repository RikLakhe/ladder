---
approved_by: "Rikesh"
approved_at: "2026-08-11"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: 2
approved_sha256: "4a84cb264bbdbe37af1859132d23634da9951eea4e944865ce80dc85549d60fb"
---
## Exec Plan — Task T-training-viewer-b6oxqw
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- AC-1: `GET /competencies/[id]/training?level=X` page at `src/app/competencies/[id]/training/page.tsx`. Fetches via `getTrainingUnitsForCompetencyAndLevel` (already in `src/lib/training-units.ts`). Renders all units in fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then sequence_order.
- AC-2: guided_exercise and autonomous_project rows each render `<PrereqStepper>` with their direct prereq units. `TrainingUnitRow` gains `prereqIds: string[]` so the page can look up prereq units.
- AC-3 [invariant]: `<PrereqStepper>` is defined in `src/components/PrereqStepper.tsx` — verified by the existing file. No new definitions added. Invariant test asserts only one source file exports `PrereqStepper`.
- AC-4: A `TrainingUnitRow` with `hasSequencingIssue: true` renders a visible "⚠ sequencing issue" warning alongside or near the stepper — not a crash.
- AC-5: When `level` is P6 or P7 and no guided_exercise or autonomous_project rows exist, renders `<EmptyState variant="no-simulated-training">`. When rows exist → EmptyState absent.
- AC-6 [e2e]: User navigates to `/competencies/:id/training?level=P4` for a seeded competency — page loads, units visible, PrereqStepper present on a guided exercise row, no crash.

**Approach:**
- Extend `TrainingUnitRow` with `prereqIds: string[]`, populated by extracting `training_unit_id` from each element of the `prereqs` JSONB array. No DB schema change — already stored.
- Training page is a Next.js Server Component — fetches lib function directly, no client fetch. No RSC payload concern (no pagination limit needed for this page).
- `<PrereqStepper>` already exists at `src/components/PrereqStepper.tsx` — reuse as-is.
- `<EmptyState variant="no-simulated-training">` already defined and correct copy already set.
- P6/P7 empty-state logic: check if any row in the full list has type `guided_exercise` or `autonomous_project`. If none and level is P6/P7, show EmptyState.
- AC-3 invariant: no RED→GREEN cycle needed — static file check. Included in B-1 or as a standalone assertion.

**Boundaries & mocks:**
- TSD: "Boundaries: none" — all DB reads, no external services.
- B-1–B-4: unit/component tests with no DB (plain props).
- B-5: integration test with real seeded PostgreSQL.
- B-6 [e2e]: spawns `next dev`, seeds DB, fetches page HTML.

**Behaviors (TDD order):**
- B-1 [component, tracer bullet]: Training page renders units in fixed type order. Given a `TrainingUnitRow[]` with mixed types, renders them in concept_notes → guided_exercise → autonomous_project → onboarding → reference_card order, with sequenceOrder labels.
- B-2 [unit]: `<PrereqStepper>` renders step position — given N prereqUnits + currentUnit, shows N+1 steps; current is at position N+1 (last).
- B-3 [component]: P6/P7 empty-state logic — no guided_exercise or autonomous_project rows at P6/P7 → `<EmptyState variant="no-simulated-training">` visible; rows present → EmptyState absent.
- B-4 [component]: Forward-prereq sequencing-issue warning — `TrainingUnitRow` with `hasSequencingIssue:true` renders "⚠ sequencing issue" warning; `hasSequencingIssue:false` → no warning.
- B-5 [integration + e2e]: Full page GET for seeded competency at P4 via spawned dev server → units ordered, `<PrereqStepper>` present in HTML for a guided exercise unit, sequencing-issue warning present for a forward-prereq unit, no crash.

**PR will contain:**
- `src/lib/training-units.ts` — add `prereqIds: string[]` to `TrainingUnitRow`; update `getTrainingUnitsForCompetencyAndLevel` to populate it.
- `src/app/competencies/[id]/training/page.tsx` — new training list page.
- `tests/T-training-viewer-b6oxqw/prereq-stepper.test.tsx` — B-2.
- `tests/T-training-viewer-b6oxqw/training-page.test.tsx` — B-1, B-3, B-4.
- `tests/T-training-viewer-b6oxqw/training-page.e2e.test.ts` — B-5.

**Open questions / ambiguities:**
- TSD says page "Reuses `GET /api/competencies/:competencyId/training?level=X`" — interpreted as: the page uses the same data function, not that it fetches via HTTP. Server Component calling the lib directly is equivalent and correct. ✅ Resolved.
- `<PrereqStepper>` props expect `prereqUnits: StepperUnit[]` where `StepperUnit = {id, name, sequenceOrder}`. `TrainingUnitRow` maps cleanly to this with `name` and `sequenceOrder`. ✅ No change to PrereqStepper needed.
- AC-3 invariant ("defined exactly once") — `PrereqStepper` already exists. Invariant test is a simple file-count grep in the component test. Not a RED→GREEN behavior. ✅ Folded into B-1 test as an assertion.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** 0 — one page + one type extension, no security, no amendments.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
