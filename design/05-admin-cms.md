# PRD: Admin CMS

## Goal
Structured-form editors for every content entity, enforcing fixed field shapes (no freeform markdown), writing a `document_versions` snapshot on every save. This is the write-path counterpart to PRDs 01-04's read-only views.

## Scope
In: Editor forms for Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis. Change-note-required save flow. Diff preview before commit. Version-row write on commit.
Out: Auth/login itself (PRD 06 — this PRD assumes an authenticated admin session already exists and route protection is handled there), public read views (PRDs 01-04), rollback/restore UI (could be added here later but not in this PRD's acceptance criteria).

## Data model (this PRD is the primary writer for)
All tables from plan.md's schema: `competencies`, `primary_functions`, `standards`, `badges`, `instruments`, `training_units`, `functional_analyses`, plus writes to `document_versions` on every commit.

## Editors to build
- **Competency editor** — name, description. Simple form.
- **PF editor** — pf_number, slug, name, domain_classification, parent competency (select).
- **Standard editor** — sectioned form matching the 6 fields (scope, performance_criteria as repeatable list items not one textarea, required_knowledge, evidence_guide, hiring_signals as repeatable list, promotion_criteria). Level selector (P2-P7) + parent PF (select).
- **Badge editor** — the 7 fixed fields: badge_code (validate uniqueness + format `<CODE>-<PF#>-<Level>`), name, certifies (single-sentence field, soft-validate it reads as verb+object), evidence_required — NOT a free-text field: an "add evidence item" control that picks an instrument (select) then a row within it (select, populated from that instrument's `rows`), producing the `{instrument_id, row_key, note}` jsonb entries PRD 02 expects. completion_bar (text, with inline hint "Format: Meets [row] at [level] with no HIGH/RED gaps"), verifier_role (text/select), cosigner_required (checkbox), tier (1-6 select).
- **Instrument editor** — row-based table editor: add/remove/reorder rows, each row has level tag + content fields matching the instrument type (rubric row / checklist item / portfolio requirement — same underlying jsonb array, presented with type-appropriate labels).
- **Training unit editor** — type select, level, sequence_order (numeric, or auto-suggest next available), content (rich-enough text field for exercise/project instructions), prereqs — picker constrained to only show other training_units in the same competency with a strictly lower sequence_order (this is the structural fix for the forward-dependency bug class found during content-build; enforce at data-entry time, not just display time).
- **Functional Analysis editor** — content + coverage_check fields, per competency.

## Save flow (shared across all editors)
1. Edit form.
2. On "Save" click: mandatory `change_note` text field (cannot submit empty).
3. Diff preview screen: show old vs new values for changed fields only (reuse PRD 04's field-diff logic if it's built as a shared util rather than page-specific — coordinate: extract PRD 04's diff-render function into a shared module both PRDs import).
4. Confirm → transaction: update entity row, insert `document_versions` row with the new snapshot, change_note, changed_by (current admin user id), incremented version_number.

## Acceptance criteria
- Every editor enforces its fixed field shape — no editor has a raw freeform textarea standing in for a structured field (badge evidence_required, standard performance_criteria/hiring_signals, training prereqs must all use the picker/list-item UI described above).
- Badge editor's evidence-item picker only allows selecting rows that actually exist in the chosen instrument — cannot produce a broken reference (directly prevents PRD 02's "broken evidence link" state from ever being created via the CMS).
- Training unit prereq picker cannot select a unit with equal/later sequence_order — directly prevents PRD 03's "sequencing issue" warning from ever being created via the CMS.
- Save without a change_note is blocked with a clear inline validation message.
- Successful save produces exactly one new `document_versions` row with correct version_number increment.

## Explicitly deferred
Bulk import/export UI (migration script handles bulk import separately, PRD not in scope here), rollback-to-version action, multi-admin concurrent-edit conflict handling (last-write-wins acceptable for v1, flag as known limitation).
