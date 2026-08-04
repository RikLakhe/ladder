# PRD: Training Viewer

## Goal
Render per-competency, per-level training content: concept notes, guided exercises (with prerequisite chain), autonomous projects, onboarding track, badge-reference card. Slots into PRD 01's `<LevelTabContent>` Training sub-slot.

## Scope
In: Training sequence list (in-tab), full Training page, guided-exercise prerequisite stepper, badge-reference card view, labeled P6/P7 no-simulated-training state.
Out: Progress tracking (no per-engineer state in v1), Competency/PF shell (PRD 01), Badge content (PRD 02, though reference-card links to badges read-only), admin editing (PRD 05).

## Data model (reference, read-only)
```
training_units (id, competency_id, type[learning_path|concept_notes|guided_exercise|autonomous_project|onboarding|reference_card], level, sequence_order, content, prereqs jsonb)
```
`prereqs` jsonb: array of `training_unit_id` referring to earlier units (by `sequence_order`) this unit depends on. Prereqs must only ever point backward in sequence — if seeded data has a forward reference, render a visible "⚠ sequencing issue" badge on that unit rather than silently rendering broken order (this is the exact defect class found during content-build; the UI should make it obvious if it recurs).

## Pages & components
- **Training summary** (inside PF page level tab): compact list of training_units for that competency+level, grouped by type, each as a row with sequence number + name; click expands inline or links to full page.
- **Training / Learning Path page** `/[competency]/training?level=X`:
  - Ordered list: concept notes → guided exercises → autonomous projects → onboarding track → reference card, per the fixed type order above.
  - `<PrereqStepper>` component: for guided exercises and autonomous projects, render a small horizontal stepper showing this unit's position relative to its prereqs (reuse the same stepper visual for badge tier ladder in PRD 02 if practical — check before building a second one from scratch).
  - Reference card view: dense single-screen table (badge_code → training_unit → instrument), pulling badge_code from `badges` table read-only (join, no write). Design as a compact table, avoid scroll if reasonably possible.
  - P6/P7 state: when no guided_exercise/autonomous_project rows exist for level P6 or P7 in a competency, render `<EmptyState variant="no-simulated-training">` (extend PRD 01's EmptyState variants) with fixed copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." Do not render a blank section.

## Acceptance criteria
- All training_units for seeded competencies render without crash, grouped and ordered by type then sequence_order.
- A prereq referencing a later sequence_order renders the sequencing-issue warning instead of silently working or crashing.
- P6/P7 empty state renders the exact fixed copy above, not a generic "no data" message.
- Reference card table renders all badge/training/instrument links for a competency+level on one page without pagination for realistic seeded volumes (≤40 rows).

## Explicitly deferred
Per-engineer exercise completion checkboxes/state, interactive exercise submission, any LMS-style progress bar.
