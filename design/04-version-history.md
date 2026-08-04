# PRD: Version History

## Goal
Public changelog view over `document_versions` — every save to any entity (competency, PF, standard, badge, instrument, training_unit, functional_analysis) produces one snapshot row; this PRD renders that as a readable changelog, filterable, with before/after view per change.

## Scope
In: Version History page (per-competency and per-entity), changelog list rendering, filter controls, expandable before/after diff view, empty state.
Out: Writing version rows (that happens on admin save — owned by PRD 05), auth (PRD 06), any content rendering beyond what's needed to show a diff (reuse PRD 01/02/03 display components where possible rather than re-implementing).

## Data model (reference, read-only for this PRD)
```
document_versions (id, entity_type, entity_id, version_number, snapshot jsonb, changed_by admin_user_id, change_note, created_at)
```
`entity_type` enum matches table names: competency, primary_function, standard, badge, instrument, training_unit, functional_analysis. `snapshot` jsonb is a full copy of that entity's row at save time. `changed_by` joins to `admin_users` for display name (read-only join, no admin_users writes here).

## Pages & components
- `/[competency]/history` — competency-scoped changelog: list of all `document_versions` rows where the entity belongs (directly or via FK chain) to this competency, newest first. Each row: date, editor name, entity_type + entity display name (e.g. "Badge TS-1-P4"), change_note (one line), expand control.
- `/[entity_type]/[entity_id]/history` — entity-scoped changelog (same row format, filtered to one entity's versions only). Link to this from badge detail (PRD 02) and training unit views (PRD 03) — coordinate: those PRDs should add a small "view history" link using this route, but building that link is optional for those PRDs and can be added here instead if simpler.
- **Expandable diff view**: on expand, show version N-1 snapshot vs version N snapshot, field-by-field, changed fields highlighted (simple key-by-key jsonb comparison — no need for a full diff library, a flat object key/value comparison covers these entity shapes since none are deeply nested beyond one level of arrays).
- **Filters**: entity_type dropdown, competency dropdown (on the global/all-competencies view if built — competency-scoped page doesn't need the competency filter).
- **Empty state**: entity/competency with zero version rows (e.g. right after migration, before any admin edit) → `<EmptyState variant="no-history-yet">` (reuse PRD 01's component, add this variant).

## Acceptance criteria
- Competency-scoped history page shows versions across all entity types belonging to that competency in one correctly-ordered (newest-first) list.
- Expand shows accurate field-level highlighting between two consecutive snapshots for at least: badges, standards, training_units (test with seeded + one synthetic edit).
- change_note is always shown, never blank (admin save flow in PRD 05 must enforce this — flag as a cross-PRD dependency, not something this PRD can enforce itself).
- No version rows exist yet post-migration is a valid, correctly-rendered empty state, not an error.

## Explicitly deferred
Rollback/restore-to-version action (read-only viewer only in this PRD; restore, if wanted later, is an admin-side write action for PRD 05 to own).
