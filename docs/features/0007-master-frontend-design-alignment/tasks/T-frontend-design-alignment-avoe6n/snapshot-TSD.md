## TSD S-0007.05 — Training Viewer Corrections  (PRD §S-0007.05)
| Aspect | Spec |
|--------|------|
| Interfaces | Training content renders inside the Training section of the PF page level tab (S-0007.03). `getTrainingUnitsForCompetencyAndLevel` returns `TrainingUnitRow[]` with `hasSequencingIssue: boolean` per unit (already computed by `computeHasSequencingIssue` in `src/lib/training-units.ts`). |
| Data / State | No DB changes. P6/P7 empty state triggered when no `guided_exercise` or `autonomous_project` rows exist for the competency+level combination. |
| Behavior | For P6/P7 (or any level) where guided_exercise and autonomous_project type rows are absent: `<EmptyState variant="no-simulated-training">` renders with exact copy "Growth at this level is demonstrated through real project scope, not simulated exercises." (already in `EmptyState` CONFIG). Any unit where `hasSequencingIssue` is true renders a visible "⚠ sequencing issue" indicator alongside the unit row. Neither condition crashes or renders a generic blank. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: training section with zero guided_exercise/autonomous_project rows renders `EmptyState variant="no-simulated-training"`. unit: unit with `hasSequencingIssue=true` renders sequencing warning element. integration: P6 or P7 level tab (where seeded data has no exercises) shows exact fixed copy. |

---
