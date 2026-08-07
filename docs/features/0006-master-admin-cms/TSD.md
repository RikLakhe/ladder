---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "2698d44587cf5e232d5b7e37f2392b118c90a009d7cc3d6cf1e70bc9ee4fdd20"
---
# TSD 0006 — Admin CMS
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

**Source:** design/05-admin-cms.md | design/06-auth.md | PRD 0006
**Grounded in:** PRODUCT.md (write-path for content entities; single `editor` role; no per-engineer state), BLUEPRINT.md (every entity write = `document_versions` row in same transaction; RLS at DB layer; shared primitives imported not redefined), CONSTITUTION.md (structured field shapes — never freeform textarea for structured data; shared UI primitives defined once).

**Dependency:** Auth feature (design/06) must be landed first. This TSD assumes an authenticated admin session exists, `/admin/*` routes are protected by middleware, and RLS policies are in place.

---

## TSD S-0006.01 — Admin navigation shell  (PRD §S-0006.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `/admin` — root admin landing page listing all entity types. `/admin/*` route group — all pages within share a persistent top bar layout. Logout action — terminates the current admin session and redirects to `/admin/login`. |
| Data / State | Reads the authenticated admin session (display_name or email) from the session provided by the auth feature. Reads entity listings (primary identifier per row) from each content table: `competencies`, `primary_functions`, `standards`, `badges`, `instruments`, `training_units`, `functional_analyses`. Read-only for listing purposes. |
| Behavior | 1. Every page whose route matches `/admin/*` renders a persistent top bar showing the admin's display_name or email and a logout button. No page outside `/admin/*` renders this chrome. 2. The `/admin` landing page shows a listing for each of the 7 entity types; each row in a listing shows the entity's primary identifier and a navigable link to its edit form. 3. The logout action terminates the admin session and redirects to `/admin/login`; the top bar is not rendered on the destination page. |
| Access | Authenticated admin session required. Behavior of unauthenticated requests on `/admin/*` routes is enforced by the auth feature's middleware — outside this story's scope. |
| Boundaries | Supabase Auth (session read + termination on logout). Supabase Postgres (entity listing reads). |
| Tests | **Unit:** top bar renders when route is `/admin/*`; top bar absent when route is outside `/admin/*`. **Integration:** listing page for each entity type returns the correct row count and primary identifiers from seeded data. **Smoke:** authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency edit form, and reaches it without error; logout redirects to `/admin/login`. |

---

## TSD S-0006.02 — Shared save flow  (PRD §S-0006.02)
| Aspect | Spec |
|--------|------|
| Interfaces | A reusable save flow consumed by all 7 entity editors. Inputs: entity type identifier, entity id (null for create), current persisted snapshot (for diff), proposed new field values, authenticated admin user id. Output: committed entity row + committed `document_versions` row, or a validation/transaction error with no DB write. The field-diff function (old snapshot → new values → changed-fields list) is extracted as a shared utility importable by the version history feature (PRD 04). |
| Data / State | Reads the current persisted entity row to compute the diff. Writes in a single atomic transaction: (1) entity INSERT or UPDATE to the content table, (2) `document_versions` INSERT with `entity_type`, `entity_id`, `version_number`, `snapshot` (full jsonb of new entity state), `changed_by` (admin user id), `change_note`, `created_at`. `version_number` = `MAX(version_number) + 1` for that `(entity_type, entity_id)` pair; first save produces version 1. |
| Behavior | 1. If `change_note` is empty or whitespace-only: save is blocked, a visible inline validation message is shown, no DB write occurs. 2. With a valid `change_note`: a diff preview renders showing only fields whose values differ between the current snapshot and the proposed values; unchanged fields are not shown. 3. On Confirm: the atomic transaction executes. If either the entity write or the `document_versions` insert fails, both roll back — the database is left unchanged. 4. A successful transaction completes with both rows committed; the editor returns to the listing or shows a success state. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres (transactional read + write). |
| Tests | **Unit:** diff function — only changed fields appear in output; no-change input produces empty diff; `version_number` = 1 for entity with zero prior versions, N+1 for entity with N. Empty/whitespace `change_note` triggers validation error and no write. **Integration:** full save — entity row updated, `document_versions` row inserted with correct `version_number`, `snapshot`, `changed_by`, `change_note`; simulated transaction failure leaves no partial writes. **Smoke:** admin edits a Competency, provides a change note, confirms the diff preview; entity listing shows updated value; `document_versions` for that entity has exactly one new row with correct fields. |

---

## TSD S-0006.03 — Simple entity editors: Competency, Primary Function, Functional Analysis  (PRD §S-0006.03)
| Aspect | Spec |
|--------|------|
| Interfaces | **Competency:** create at `/admin/competencies/new`; edit at `/admin/competencies/:id/edit`. **Primary Function:** `/admin/primary-functions/new` and `/admin/primary-functions/:id/edit`. **Functional Analysis:** `/admin/functional-analyses/new` and `/admin/functional-analyses/:id/edit`. |
| Data / State | **Competency** reads/writes `competencies (id, name text NOT NULL, description text NOT NULL)`. **Primary Function** reads/writes `primary_functions (id, pf_number text NOT NULL, slug text NOT NULL, name text NOT NULL, domain_classification text NOT NULL, competency_id uuid NOT NULL)`; reads `competencies` for the competency select. **Functional Analysis** reads/writes `functional_analyses (id, content text NOT NULL, coverage_check text NOT NULL, competency_id uuid NOT NULL)`; reads `competencies` for the competency select. |
| Behavior | 1. All fields in each editor are required; submitting with any blank required field shows an inline validation error per field and does not invoke the save flow. 2. Competency select (PF and FA editors) shows all existing competencies by name. 3. Each editor invokes the shared save flow (S-0006.02) on confirmed submit: change note required, diff preview, atomic transaction producing a `document_versions` row. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres (reads + writes). |
| Tests | **Unit:** required-field validation fires per field on each editor; blank submission does not reach the save flow. **Integration:** create and update for each of the 3 entity types succeeds; each produces a `document_versions` row with correct snapshot. **Smoke:** admin creates a new Competency, edits a PF name, updates a FA content field; all 3 saves succeed; updated values appear on listing pages. |

---

## TSD S-0006.04 — Standard editor  (PRD §S-0006.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Create at `/admin/standards/new`; edit at `/admin/standards/:id/edit`. |
| Data / State | Reads/writes `standards (id, level text NOT NULL, pf_id uuid NOT NULL, scope text NOT NULL, required_knowledge text NOT NULL, evidence_guide text NOT NULL, performance_criteria jsonb NOT NULL, hiring_signals jsonb NOT NULL)`. Reads `primary_functions` for the PF select. `performance_criteria` and `hiring_signals` stored as jsonb arrays of text strings. |
| Behavior | 1. `level` selector: values P2–P7. `pf_id`: select from existing Primary Functions by name. `scope`, `required_knowledge`, `evidence_guide`: text inputs. All required. 2. `performance_criteria`: a repeatable-list control — add appends a new text item, remove deletes by index. Minimum one item required. Stored and submitted as a jsonb array. No single freeform textarea exists for this field. 3. `hiring_signals`: same repeatable-list control as `performance_criteria`. Minimum one item required. No single freeform textarea. 4. Editor invokes shared save flow (S-0006.02) on confirmed submit. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres. |
| Tests | **Unit:** adding N items to `performance_criteria` list produces array of length N; removing item at index I removes exactly that item; empty list (0 items) triggers validation error. Same for `hiring_signals`. **Integration:** Standard saved with 2 `performance_criteria` items and 1 `hiring_signals` item; querying the row returns jsonb arrays with correct lengths and values; `document_versions` row present. **Smoke:** admin fills all Standard fields including repeatable lists and saves; no freeform textarea rendered for list fields. |

---

## TSD S-0006.05 — Badge editor  (PRD §S-0006.05)
| Aspect | Spec |
|--------|------|
| Interfaces | Create at `/admin/badges/new`; edit at `/admin/badges/:id/edit`. `badge_code` uniqueness check is a pre-submit validation against the `badges` table (excluding the current badge's own id on edit). |
| Data / State | Reads/writes `badges (id, badge_code text NOT NULL, name text NOT NULL, certifies text NOT NULL, completion_bar text NOT NULL, verifier_role text NOT NULL, cosigner_required boolean NOT NULL DEFAULT false, tier integer NOT NULL, evidence_required jsonb NOT NULL DEFAULT '[]', pf_id uuid NOT NULL)`. Reads `instruments` (id, name) and instrument `rows` jsonb for the evidence picker. |
| Behavior | 1. All fields required except `cosigner_required` (defaults false). `tier`: integer in range 1–6 inclusive. 2. `badge_code` validated on submit: must match the pattern `<ALPHA_CODE>-<INTEGER>-P<LEVEL>` (e.g. `TS-1-P4` — uppercase alpha prefix, hyphen, integer, hyphen, P followed by 2–7); must be unique across all badges excluding the current badge on edit. Format violation or duplicate shows a visible inline error; save is blocked. 3. `evidence_required` picker: selecting an Instrument populates a row picker from that instrument's `rows` jsonb. Only rows that exist in the selected instrument appear in the row picker — no free-text entry. Each added item is stored as `{instrument_id, row_key, note}`. Items may be added or removed; zero items is valid. 4. Editor invokes shared save flow (S-0006.02) on confirmed submit. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres (`badge_code` uniqueness check; instrument + rows reads; badge write). |
| Tests | **Unit:** `badge_code` format validation — valid patterns pass, invalid formats fail with correct error; duplicate code blocked, editing own code allowed; evidence row picker options limited to the selected instrument's rows only. **Integration:** Badge created with 2 evidence items drawn from a seeded instrument; `evidence_required` jsonb has 2 entries each with valid `instrument_id` and `row_key` resolvable in `instruments.rows`; `document_versions` row present. **Smoke:** admin creates Badge with evidence items; badge detail viewer (PRD 03 S-0003.03) resolves all evidence entries as `resolved: true`. |

---

## TSD S-0006.06 — Instrument editor  (PRD §S-0006.06)
| Aspect | Spec |
|--------|------|
| Interfaces | Create at `/admin/instruments/new`; edit at `/admin/instruments/:id/edit`. |
| Data / State | Reads/writes `instruments (id, name text NOT NULL, pf_id uuid NOT NULL, type text NOT NULL, rows jsonb NOT NULL DEFAULT '[]')`. `type` constrained to values: `rubric`, `checklist`, `portfolio`. `rows` is an ordered jsonb array; each element: `{level: text, content: text}`. Reads `primary_functions` for PF select. |
| Behavior | 1. Fields: `name` (text), `pf_id` (select from existing PFs), `type` (rubric / checklist / portfolio select). All required. 2. `rows`: a table editor — add row (appends `{level: P2–P7 select, content: text}`), remove row (deletes by index), reorder (move row up / move row down shifts position in the array). Array order is the canonical display order. 3. Editor invokes shared save flow (S-0006.02) on confirmed submit. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres. |
| Tests | **Unit:** add row appends to array; remove row at index I removes exactly that element and shifts subsequent indices; move-up on index I swaps with I-1; move-down on index I swaps with I+1; move-up on index 0 is a no-op; move-down on last index is a no-op. **Integration:** Instrument saved with 3 rows in a specified order; `rows` jsonb reflects exact order; badge editor evidence picker shows updated rows for that instrument; `document_versions` row present. **Smoke:** admin adds 2 rows, reorders, saves; ordering persists on re-open of edit form. |

---

## TSD S-0006.07 — Training Unit editor  (PRD §S-0006.07)
| Aspect | Spec |
|--------|------|
| Interfaces | Create at `/admin/training-units/new`; edit at `/admin/training-units/:id/edit`. Prereq picker queries `training_units` filtered by `competency_id` and `sequence_order < current unit's sequence_order`. |
| Data / State | Reads/writes `training_units (id, competency_id uuid NOT NULL, type text NOT NULL, level text NOT NULL, sequence_order integer NOT NULL, content text NOT NULL, prereqs jsonb NOT NULL DEFAULT '[]')`. `type` values: `concept_notes`, `guided_exercise`, `autonomous_project`, `onboarding`, `reference_card`. `prereqs` stored as jsonb array of `training_unit` ids. Reads `competencies` for competency select. Reads `training_units` (same competency, lower sequence_order) for prereq picker. |
| Behavior | 1. Fields: `type` (select), `level` (P2–P7 select), `sequence_order` (integer input; auto-suggest value = `MAX(sequence_order) + 1` for the selected competency + level, shown as placeholder), `content` (plain text), `competency_id` (select). All required. 2. `prereqs` picker: multi-select of Training Units within the same `competency_id` whose `sequence_order` is strictly less than the current unit's `sequence_order`. Units with `sequence_order` equal to or greater than the current unit's value do not appear in the picker at any point. Stored as jsonb array of ids. 3. Editor invokes shared save flow (S-0006.02) on confirmed submit. |
| Access | Authenticated admin only. |
| Boundaries | Supabase Postgres (prereq candidate query + write). |
| Tests | **Unit:** prereq picker candidates filtered to `sequence_order < current`; a unit at equal or higher `sequence_order` never appears; auto-suggest = MAX+1 for competency+level (1 if no prior units). **Integration:** Training Unit saved with prereq pointing to a unit at a lower sequence_order; `prereqs` jsonb contains correct id; training viewer (PRD 03 S-0005.02) renders no sequencing-issue warning for this unit; `document_versions` row present. **Smoke:** admin creates Training Unit with prereq; attempting to select a forward-reference unit is not possible — it is absent from the picker. |

---

## TSD S-0006.08 — DB migrations for missing badge and instrument columns  (PRD §S-0006.08)
| Aspect | Spec |
|--------|------|
| Interfaces | Database migration script. No application-layer interface. |
| Data / State | **Adds to `badges`** (if not present): `badge_code text`, `certifies text`, `completion_bar text`, `verifier_role text`, `cosigner_required boolean DEFAULT false`, `tier integer`. All new columns nullable (backward-compatible with existing rows). **Adds to `instruments`** (if not present): `type text`, `level text`. Nullable, backward-compatible. No columns are dropped or altered in type. |
| Behavior | 1. On a clean database: all listed columns are added to their respective tables without error. 2. On a database where some or all listed columns already exist: migration completes without error; existing columns and their data are unchanged. 3. After migration: existing `badges` and `instruments` rows remain intact; new columns on existing rows are `NULL` (or the declared DEFAULT for `cosigner_required`). 4. Running the migration a second time produces no error (idempotent). |
| Access | Migration executes with service/admin credentials (bypasses RLS). Resulting columns are accessible to the `anon` role via the existing public SELECT policy (BLUEPRINT boundary rule: public SELECT on content tables). |
| Boundaries | Supabase Postgres (DDL ALTER TABLE). |
| Tests | **Integration:** run migration on clean DB — all new columns present on both tables, existing rows unaffected; run migration on partially-migrated DB — no error, no data loss; run migration twice — idempotent, no error. Verify `cosigner_required` defaults to `false` on existing rows after migration. |
