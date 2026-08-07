---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "f4206f9b1c79270247ffa977643182cd400694444ddc87171bdf5fe950543ef5"
---
# Briefing 0005 — Training Viewer

> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
Engineers and managers need per-competency, per-level training content (concept notes, guided exercises, autonomous projects, onboarding track, badge-reference card) in a structured, browsable form — not scattered across documents. This viewer slots into the existing competency browser (`<LevelTabContent>` Training sub-slot) and completes the read-only public surface of the Ladder app.

## Hypothesis
We can render training_units from the database grouped by type and ordered by sequence, surface prerequisite chains visually via a `<PrereqStepper>`, and display a reference card joining badges → training units → instruments — all read-only and public, with no per-engineer state in v1.

## Mocks / references
- `design/03-training-viewer.md` — full page/component spec, data model, acceptance criteria, and deferred items.

## Scope hints
**Probably in:**
- Training summary inside PF page level tab (compact grouped list)
- Full Training / Learning Path page (`/[competency]/training?level=X`)
- `<PrereqStepper>` for guided exercises and autonomous projects
- Reference card table (badge_code → training_unit → instrument)
- P6/P7 no-simulated-training `<EmptyState>` variant
- Sequencing-issue warning for forward-referencing prereqs
- DB migration adding any missing `training_units` columns (nullable/defaulted, backward-compatible)

**Probably out:**
- Per-engineer progress tracking / exercise completion state
- Interactive exercise submission
- LMS-style progress bars
- Admin editing of training content (PRD 05)
- Badge content itself (PRD 02/03, though reference card links to badges read-only)

## Open questions
<!-- resolved -->

## Decisions
- `<PrereqStepper>` is a shared primitive — defined once by this feature, imported by any sibling feature that needs it (same pattern as `<TierChip>`, `<EmptyState>`). Do not build a second stepper elsewhere.
- Reference card table is paginated (client-side or server-side TBD at TSD). The ≤40-row no-pagination assumption from design/03 is dropped — pagination is in scope for v1.

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
