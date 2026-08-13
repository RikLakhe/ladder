---
approved_by: "Rikesh"
approved_at: "2026-08-13"
planned_behaviors: "3"
approved_sha256: "f8f28a76c1ba6476085316f243ec7c85cf999548c9a5b9416b84982dd29907a4"
---
## Exec Plan — Task T-frontend-design-alignment-avoe6n
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code.

**Will build:**
- AC-1: Training section shows `<EmptyState variant="no-simulated-training">` with exact fixed copy when no guided_exercise or autonomous_project rows exist for the level
- AC-2: Training unit row shows "⚠ sequencing issue" indicator when `hasSequencingIssue=true`
- AC-3 [e2e]: P6/P7 training tab with no exercises shows exact copy

**Approach:** `computeHasSequencingIssue` already exists in `src/lib/training-units.ts` and `TrainingUnitRow` already has `hasSequencingIssue: boolean`. The `EmptyState variant="no-simulated-training"` already has exact copy. Work is wiring these into the training section display component (`src/components/TrainingSection.tsx` or `TrainingListView.tsx`): add conditional empty state when no exercise-type units, add sequencing warning badge on unit rows.

**Boundaries & mocks:** Postgres (read-only). Unit tests use fake unit arrays. Integration hits seeded DB.

**Behaviors (TDD order):**
- B-1 (tracer bullet): training section with zero guided_exercise/autonomous_project units renders `EmptyState variant="no-simulated-training"` with exact copy "Growth at this level is demonstrated through real project scope, not simulated exercises."
- B-2: training unit row with `hasSequencingIssue=true` renders a visible "⚠ sequencing issue" indicator
- B-3 [e2e]: P6 or P7 level tab with no exercise units shows exact fixed copy, not blank

**PR will contain:**
- `src/components/TrainingSection.tsx` or `TrainingListView.tsx` — conditional empty state + sequencing indicator
- `tests/T-frontend-design-alignment-avoe6n/`

**Open questions / ambiguities:** Confirm which component renders the training list in the PF page tab — check `src/components/TrainingSection.tsx` vs `TrainingListView.tsx`.

**Path:** L

**Escalation signals hit (≥2 → R):** 0
- [ ] Refactor pass done (on green; tests unchanged) — before PR
