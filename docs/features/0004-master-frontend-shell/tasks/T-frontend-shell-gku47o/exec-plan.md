---
approved_by: "unknown"
approved_at: "2026-08-07"
planned_behaviors: ""
approved_sha256: "0c58c9538ec57da4e709d6adb54c19b353bf86a4433812e55d0f3b8cd493e611"
---
## Exec Plan — Task T-frontend-shell-gku47o
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/lib/mock/training.ts` — expand: `MockTrainingUnit` type (`id, competencyId, type, level, sequenceOrder, content, prereqs: string[]`); typed fixtures covering all 5 subtypes (concept_notes, guided_exercise, autonomous_project, onboarding, learning_path) incl. one guided_exercise with a valid backward prereq and one with a forward prereq (to exercise sequencing-issue path); `getTrainingUnitsForCompetency(competencyId, level?)` (AC-1)
- `src/components/PrereqStepper.tsx` — accepts `allUnits: {id, sequenceOrder}[]` and `prereqIds: string[]`; renders a horizontal list of prereq positions; marks any prereq whose `sequenceOrder >= current unit's sequenceOrder` with "⚠ sequencing issue" text (AC-2)
- `src/components/TrainingUnitView.tsx` — accepts `unit: MockTrainingUnit` and `allUnits: MockTrainingUnit[]`; renders subtype-specific layout: concept_notes/onboarding → content only; guided_exercise/autonomous_project → content + `<PrereqStepper>`; learning_path → ordered sequence list with level label + `<PrereqStepper>` per item (AC-1, AC-2)
- `src/components/EmptyState.tsx` — add `no-simulated-training` variant with fixed copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." (AC-2)
- Update `src/app/competencies/[id]/page.tsx` training tab slot — use `getTrainingUnitsForCompetency`; render items as a list grouped by type with links to detail; for level P6/P7 with no guided_exercise or autonomous_project items, render `<EmptyState variant="no-simulated-training">` instead of the list (AC-1, AC-2)
- `src/app/competencies/[id]/training/[unitId]/page.tsx` — detail page; loads unit from mock by competencyId + unitId; renders `<TrainingUnitView>` (AC-3)

**Approach:**
- All data from mock service — no DB calls for this task; `getTrainingUnitsForCompetency` is a pure function over module-level fixtures
- `TrainingUnitView` is a pure client component (no async); receives the unit + full competency unit list (needed by PrereqStepper to resolve prereq positions)
- PrereqStepper marks forward prereqs as "⚠ sequencing issue" without crashing — matches design/03 requirement

**Boundaries & mocks:**
- No real boundaries — all mock. No smoke AC needed.

**Behaviors (TDD order):**
- **B-1** (tracer bullet): `<TrainingUnitView>` with a concept_notes fixture renders the unit's content field and does NOT render a PrereqStepper
- **B-2**: `<TrainingUnitView>` with guided_exercise fixture (valid backward prereq) renders a PrereqStepper; with a forward prereq renders "⚠ sequencing issue"; learning_path renders an ordered item list with level labels; P6/P7 competency page training slot renders "no-simulated-training" EmptyState when no guided_exercise/autonomous_project units exist
- **B-3** (e2e): competency page training tab lists training items with links; clicking a link navigates to the detail page which renders the correct subtype view

**PR will contain:**
- `src/lib/mock/training.ts` — expanded with typed units + fixtures
- `src/components/TrainingUnitView.tsx`
- `src/components/PrereqStepper.tsx`
- `src/components/EmptyState.tsx` — no-simulated-training variant added
- `src/app/competencies/[id]/page.tsx` — training tab updated
- `src/app/competencies/[id]/training/[unitId]/page.tsx` — new detail route
- `tests/T-frontend-shell-gku47o/training-unit-view.test.tsx` — B-1
- `tests/T-frontend-shell-gku47o/training-subtypes.test.tsx` — B-2
- `tests/T-frontend-shell-gku47o/training-nav.e2e.test.ts` — B-3

**Open questions / ambiguities:** (resolved)
1. **Route for training detail**: design/03 uses `/[competency]/training?level=X` (slug-based). Existing app uses `/competencies/[id]` (UUID). Using `/competencies/[id]/training/[unitId]` — consistent with current routing; detail link carries `unitId` from mock fixture. Detail route is new, no conflict.
2. **learning_path subtype vs others**: design/03 lists 6 types; TSD/card say 5. `reference_card` is distinct but card AC-2 only names 5. Building all 6 fixture types in mock but the structured-field requirement in B-2 covers only the 5 AC-named ones; reference_card renders as content-only (same as concept_notes) — no separate layout needed.
3. **P6/P7 EmptyState trigger**: "when no guided_exercise or autonomous_project rows exist for level P6 or P7" per design/03. Applied per: if `level` in `["P6","P7"]` AND `units.filter(u => u.type === "guided_exercise" || u.type === "autonomous_project").length === 0` → EmptyState. If mixed (some guided at P6, some not), render the list normally — the empty state is the zero case only.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
