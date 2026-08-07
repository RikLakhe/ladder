---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "c88d95e4fd1bf5f395d1aa06a0949ed94e594bdf5f9dd862fb0babac6fc4534a"
---
# PRD 0006 — Admin CMS
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0006-master-admin-cms/.

**Source:** design/05-admin-cms.md | design/06-auth.md | Briefing 0006
**Parent:** (master iteration — this is the umbrella)

**Dependency:** Auth feature (design/06) must be landed before any task in this feature starts. This PRD assumes an authenticated admin session exists and `/admin/*` route protection is in place.

---

## Story S-0006.01 — Admin navigation shell
As an admin I want a persistent top bar and entity listing pages so that I can orient myself and navigate to any content entity I need to edit.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — All `/admin/*` pages render a persistent top bar showing the authenticated admin's display name or email and a logout button. Public pages (outside `/admin/*`) never render this chrome.
- [ ] AC-2 [behavior] — The admin area surfaces a listing page for each entity type (Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis). Each listing shows the entity's primary identifier (name, badge_code, etc.) and a link to its edit form.
- [ ] AC-3 [behavior] — Clicking logout ends the admin session and redirects to `/admin/login`. The top bar is no longer rendered after logout.
- [ ] AC-4 [e2e] — An authenticated admin navigates to `/admin`, sees the entity listings, clicks into a Competency, and reaches the edit form without error.

**Success metric:** Admin shell renders correctly for all entity listing pages with no session or chrome leaking onto public routes.

---

## Story S-0006.02 — Shared save flow
As an admin I want every entity edit to require a change note, show a diff of my changes, and atomically write a version snapshot so that every content change is audited and traceable.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Submitting an edit form without a non-empty `change_note` is blocked with a visible inline validation message. The transaction does not proceed.
- [ ] AC-2 [behavior] — After entering a change note and clicking Save, a diff preview screen renders showing only the fields whose values changed (old value vs. new value). Unchanged fields are not shown.
- [ ] AC-3 [invariant] — On Confirm, exactly one `document_versions` row is inserted in the same database transaction as the entity UPDATE. The `version_number` is `MAX(version_number) + 1` for that `(entity_type, entity_id)` pair (first save produces version 1). If either operation fails, both roll back — no partial writes.
- [ ] AC-4 [invariant] — The `document_versions` row contains: `entity_type`, `entity_id`, `version_number`, a full `snapshot` jsonb of the entity's new state, `changed_by` (current admin user id), `change_note`, and `created_at`.
- [ ] AC-5 [e2e] — An admin edits a Competency, provides a change note, confirms the diff, and sees the updated value reflected on the listing page. Querying `document_versions` for that entity returns exactly one new row with the correct change note and version number.

**Success metric:** Every successful save produces exactly one `document_versions` row; no save completes without a `change_note`; failed transactions leave no partial state.

---

## Story S-0006.03 — Simple entity editors: Competency, Primary Function, Functional Analysis
As an admin I want to create and update Competency, Primary Function, and Functional Analysis records via structured forms so that I can maintain the foundational content the browser and analysis views depend on.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — **Competency editor** presents fields: `name` (text), `description` (text). Both fields required.
- [ ] AC-2 [behavior] — **Primary Function editor** presents fields: `pf_number` (text), `slug` (text), `name` (text), `domain_classification` (text), `competency_id` (select from existing competencies). All fields required.
- [ ] AC-3 [behavior] — **Functional Analysis editor** presents fields: `content` (text), `coverage_check` (text), scoped to a competency (`competency_id` select). All fields required.
- [ ] AC-4 [behavior] — Each editor form participates in the shared save flow (S-0006.02): change note required, diff preview, atomic transaction.
- [ ] AC-5 [e2e] — An admin creates a new Competency, edits a Primary Function's name, and updates a Functional Analysis's content. Each save produces a `document_versions` row and the updated values are visible on the listing page.

**Success metric:** All three editors create and update records correctly; each save is audited in `document_versions`.

---

## Story S-0006.04 — Standard editor
As an admin I want to edit Standard records with properly structured fields so that performance criteria and hiring signals are stored as queryable lists, not freeform text.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Standard editor presents: `level` selector (P2–P7), `pf_id` (select from existing Primary Functions), `scope` (text), `required_knowledge` (text), `evidence_guide` (text). All required.
- [ ] AC-2 [behavior] — `performance_criteria` is a repeatable-list control: add/remove individual text items; stored as a jsonb array. Never a single textarea.
- [ ] AC-3 [behavior] — `hiring_signals` is a repeatable-list control: add/remove individual text items; stored as a jsonb array. Never a single textarea.
- [ ] AC-4 [behavior] — The editor participates in the shared save flow (S-0006.02).
- [ ] AC-5 [e2e] — An admin adds two performance criteria items and one hiring signal item to a Standard. The save produces a `document_versions` row. Querying that Standard's row returns `performance_criteria` and `hiring_signals` as jsonb arrays with the correct item counts.

**Success metric:** `performance_criteria` and `hiring_signals` are always stored as structured arrays; no freeform textarea exists for these fields in the editor.

---

## Story S-0006.05 — Badge editor
As an admin I want to edit Badge records with validated badge codes and a structured evidence picker so that badge data is always well-formed and evidence links are never broken at creation time.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Badge editor presents: `badge_code` (text, validated), `name` (text), `certifies` (single-sentence text field), `completion_bar` (text), `verifier_role` (text), `cosigner_required` (checkbox), `tier` (1–6 select). All required except `cosigner_required` (defaults false).
- [ ] AC-2 [behavior] — `badge_code` is validated on submit: format must match `<CODE>-<PF#>-<Level>` (e.g. `TS-1-P4`); value must be unique across all badges. An invalid format or duplicate code shows a visible inline error and blocks save.
- [ ] AC-3 [behavior] — `evidence_required` is an "add evidence item" control: first select an Instrument (from existing instruments), then select a row within that instrument (populated dynamically from that instrument's `rows` jsonb). Each item is stored as `{instrument_id, row_key, note}`. A row picker only shows rows that exist in the selected instrument — no broken references can be created.
- [ ] AC-4 [behavior] — The editor participates in the shared save flow (S-0006.02).
- [ ] AC-5 [e2e] — An admin creates a Badge with two evidence items drawn from a seeded instrument. The save produces a `document_versions` row. Querying the badge's `evidence_required` returns two items each with valid `instrument_id` and `row_key`. The badge detail page (PRD 03 S-0003.03) resolves both items as `resolved: true`.

**Success metric:** No badge saved via the CMS editor can have a malformed `badge_code` or an unresolvable `evidence_required` entry.

---

## Story S-0006.06 — Instrument editor
As an admin I want to edit Instrument records by adding, removing, and reordering rows so that rubric/checklist content is structured and maintainable.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Instrument editor presents: `name` (text), `pf_id` (select), `type` (select: rubric | checklist | portfolio). A row-based table editor allows adding new rows, removing existing rows, and reordering rows (up/down). Each row has: `level` tag (P2–P7) and `content` (text). Stored as a jsonb array in `rows`.
- [ ] AC-2 [behavior] — The editor participates in the shared save flow (S-0006.02).
- [ ] AC-3 [e2e] — An admin adds two rows to an Instrument, reorders them, and saves. The `document_versions` row is created. The `rows` jsonb reflects the new order. The Badge editor's row picker (S-0006.05) shows the updated rows for that instrument.

**Success metric:** Instrument rows are always stored as structured jsonb; reorder is reflected correctly after save.

---

## Story S-0006.07 — Training Unit editor
As an admin I want to edit Training Unit records with a prereq picker that only allows backward references so that sequencing issues can never be introduced via the CMS.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Training Unit editor presents: `type` (select: concept_notes | guided_exercise | autonomous_project | onboarding | reference_card), `level` (P2–P7 select), `sequence_order` (numeric input with an auto-suggest for next available value within the competency+level), `content` (plain text), `competency_id` (select).
- [ ] AC-2 [behavior] — `prereqs` is a multi-select picker constrained to only show Training Units within the same competency whose `sequence_order` is strictly less than the current unit's `sequence_order`. A unit with an equal or greater sequence_order cannot be selected.
- [ ] AC-3 [behavior] — The editor participates in the shared save flow (S-0006.02).
- [ ] AC-4 [e2e] — An admin creates a Training Unit at `sequence_order` 3 and sets a prereq to a unit at `sequence_order` 1. Save produces a `document_versions` row. The training viewer (PRD 03) renders no sequencing-issue warning for this unit. Attempting to set a prereq to a unit at `sequence_order` 4 (forward) is not possible — that unit does not appear in the picker.

**Success metric:** No Training Unit saved via the CMS editor can have a forward prereq reference; the sequencing-issue warning state (PRD 03) is unreachable via normal CMS use.

---

## Story S-0006.08 — DB migrations for missing badge and instrument columns
As a developer I need `badges` and `instruments` tables to have all required CMS columns so that the badge and instrument editors can read and write complete records.

**Acceptance criteria:**
- [ ] AC-1 [invariant] — Migration adds to `badges`: `badge_code text`, `certifies text`, `completion_bar text`, `verifier_role text`, `cosigner_required boolean DEFAULT false`, `tier integer` — all nullable/defaulted, backward-compatible with existing rows.
- [ ] AC-2 [invariant] — Migration adds to `instruments`: `type text` (rubric | checklist | portfolio), `level text` — nullable/defaulted, backward-compatible.
- [ ] AC-3 [invariant] — Migration runs without error on a clean database and is idempotent on a database that already has some or all columns.
- [ ] AC-4 [e2e] — After migration, the badge editor (S-0006.05) and instrument editor (S-0006.06) can create records with all fields populated; existing `badges` and `instruments` rows are unchanged.

**Success metric:** Migration applies cleanly; all CMS editors operate against fully-formed schemas with no missing column errors.
