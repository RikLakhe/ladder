## TSD S-0005.02 — View full training / learning path page  (PRD §S-0005.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /[competency]/training?level=X` — HTML page. Reuses `GET /api/competencies/:competencyId/training?level=X` from S-0005.01 for data. `<PrereqStepper>` is a shared UI primitive (defined once by this feature, imported by any sibling feature — same boundary rule as `<TierChip>` and `<EmptyState>` per BLUEPRINT §Boundary Rules). |
| Data / State | Reads `training_units` (read-only) for requested competency+level. |
| Behavior | Page renders all units ordered by fixed type order then `sequence_order`. Guided exercises and autonomous projects each render a `<PrereqStepper>` showing this unit's position relative to its direct prereqs. A forward-prereq unit renders the sequencing-issue warning (not a crash, not silent). When `level` is P6 or P7 and no `guided_exercise` or `autonomous_project` rows exist for that competency, renders `<EmptyState variant="no-simulated-training">` with exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." — no blank section. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (`<PrereqStepper>` renders correct step position given a prereq list; forward-prereq → sequencing-issue rendered; P6/P7 with no guided/autonomous rows → EmptyState with exact copy; P6/P7 with rows present → EmptyState absent) / integration (full page for seeded competency+level → ordered output, stepper present on correct unit types, warning present on forward-prereq unit, no crash) |
