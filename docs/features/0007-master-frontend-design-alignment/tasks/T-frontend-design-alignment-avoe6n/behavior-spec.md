# Behavior Spec — T-frontend-design-alignment-avoe6n: Training Viewer Corrections
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — EmptyState no-simulated-training renders with exact copy
- Given: training section rendered with zero guided_exercise and zero autonomous_project units
- When: component renders
- Then: `<EmptyState variant="no-simulated-training">` renders, showing exactly "Growth at this level is demonstrated through real project scope, not simulated exercises." — not blank, not generic

## B-2: AC-2 — sequencing issue indicator on affected units
- Given: training list rendered with one unit where `hasSequencingIssue: true` and one where `hasSequencingIssue: false`
- When: list renders
- Then: the first unit row shows a visible "⚠ sequencing issue" indicator; the second does not

## B-3 [e2e]: AC-3 — P6/P7 level tab shows exact fixed copy
- Given: seeded DB where P6 has no guided_exercise or autonomous_project units for a competency
- When: user views the training section of the P6 tab for that competency's PF
- Then: exact text "Growth at this level is demonstrated through real project scope, not simulated exercises." is visible; no blank section, no generic "no data"
