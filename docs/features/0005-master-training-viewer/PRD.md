---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "2c0bbc9be94efe23551f93ccbffdc833ca478217f73f2685fe198e3b933658e0"
---
# PRD 0005 — Training Viewer
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0005-master-training-viewer/.

**Source:** design/03-training-viewer.md | Briefing 0005
**Parent:** (master iteration — this is the umbrella)

---

## Story S-0005.01 — Browse training units in the PF level tab
As an engineer or manager I want to see a compact list of training units for a primary function and level inside the PF page level tab so that I can quickly scan what training is available before deciding to go deeper.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — All `training_units` rows for the requested `competency_id` and `level` render as a list, grouped by `type` in fixed order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card), each row showing sequence number and name.
- [ ] AC-2 [behavior] — No auth is required to view any training unit list; the route is fully public.
- [ ] AC-3 [behavior] — A unit with a prereq referencing a later `sequence_order` renders a visible sequencing-issue warning on that row instead of silently rendering or crashing.
- [ ] AC-4 [e2e] — A user navigating to a PF page and selecting a level tab sees the training unit list without error for all seeded competencies.

**Success metric:** Training sub-slot renders correct grouped list for every seeded competency/level combination without error.

---

## Story S-0005.02 — View full training / learning path page
As an engineer I want a dedicated training page for a competency and level so that I can follow the full ordered training sequence with prerequisite context visible.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Page at `/[competency]/training?level=X` renders all `training_units` for that competency+level ordered by type (fixed order above) then `sequence_order`.
- [ ] AC-2 [behavior] — Guided exercises and autonomous projects show a `<PrereqStepper>` indicating this unit's position relative to its prereqs.
- [ ] AC-3 [behavior] — `<PrereqStepper>` is the shared primitive defined by this feature — no duplicate stepper component exists elsewhere in the codebase.
- [ ] AC-4 [behavior] — A unit with a forward prereq reference renders the sequencing-issue warning instead of silently working or crashing.
- [ ] AC-5 [behavior] — When no `guided_exercise` or `autonomous_project` rows exist for P6 or P7 in a competency, an `<EmptyState variant="no-simulated-training">` renders with the exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises." No blank section is shown.
- [ ] AC-6 [e2e] — A user navigates to `/[competency]/training?level=P4` for a seeded competency and sees the ordered list with prereq steppers and no crash.

**Success metric:** Full training page renders correctly for all seeded competencies and levels, including P6/P7 empty state.

---

## Story S-0005.03 — View reference card
As an engineer I want a reference card showing the mapping of badges to training units to instrument rows for a competency and level so that I can see the full traceability chain in one view.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Reference card renders a table of `badge_code → training_unit → instrument` rows for the requested competency+level, populated by joining `badges`, `training_units`, and `instruments` read-only.
- [ ] AC-2 [behavior] — Table is paginated; volumes above 40 rows do not require horizontal scroll or render outside the viewport.
- [ ] AC-3 [behavior] — No auth is required; the route is fully public.
- [ ] AC-4 [e2e] — A user views the reference card for a seeded competency+level and sees all badge/training/instrument links in a paginated table without error.

**Success metric:** Reference card renders complete paginated data for all seeded competency/level combinations.

---

## Story S-0005.04 — DB migration for training_units
As a developer I need the `training_units` table to exist with all required columns so that the training viewer can read structured data.

**Acceptance criteria:**
- [ ] AC-1 [invariant] — Migration adds `training_units (id, competency_id, type, level, sequence_order, content, prereqs jsonb)` (or adds any missing columns) as a backward-compatible, nullable/defaulted change.
- [ ] AC-2 [invariant] — Migration runs without error on a clean database and is idempotent on a database that already has partial columns.
- [ ] AC-3 [e2e] — After migration, seeded training_units data is queryable via the public API with no auth.

**Success metric:** Migration applies cleanly; training viewer API returns seeded data.
