---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "4af2c839fa117ed888b64a378767ecb509a48238b755f9a9c32f1fa216fa8ffb"
---
# PRD 0002 — Competency Browser
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0002-master-competency-browser/.

**Source:** Briefing 0002 — no UI exists yet for the competencies → primary_functions → standards/functional_analyses/badges schema already in the DB.
**Parent:** —  (this IS the umbrella; master iteration)

---

## Story S-0002.01 — Browse competencies
As an engineer I want to see the list of competencies so that I can find the one relevant to me.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Home page lists every competency as a card (name + primary-function count).
- [ ] AC-2 [e2e] — Visiting the app root as an unauthenticated user renders the competency list without requiring login.

**Success metric:** every seeded competency in the DB appears exactly once on the home page.

## Story S-0002.02 — Drill into a competency's primary functions
As an engineer I want to open a competency and see its primary functions so that I can navigate to the content I need.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Selecting a competency shows its primary functions as a list/pills.
- [ ] AC-2 [invariant] — Only primary_functions whose competency_id matches the selected competency are shown.
- [ ] AC-3 [e2e] — Clicking a competency card on the home page navigates to that competency's page.

**Success metric:** primary functions shown match `primary_functions.competency_id = competencies.id` for every competency, with no cross-competency leakage.

## Story S-0002.03 — View a standard document by level
As an engineer I want to read the standard for a primary function at a given level so that I know what's expected at that level.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Selecting a primary function's Standard doc shows performance criteria grouped by level (P2–P7).
- [ ] AC-2 [behavior] — A level filter lets the viewer focus on one level's criteria at a time, or view all levels.
- [ ] AC-3 [e2e] — Navigating from a primary function pill to its standard doc renders content sourced from the `standards` table for that `pf_id`.

**Success metric:** every level with a row in `standards` for the selected `pf_id` is reachable from the level filter.

## Story S-0002.04 — View functional analysis and badges for a primary function
As an engineer I want to see the functional analysis and available badges for a primary function so that I understand the fuller assessment picture, not just the standard.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — A primary function's page/tabs expose its functional_analyses content by level.
- [ ] AC-2 [behavior] — Badges tied to the primary function are listed (name, and which competency/level they map to).
- [ ] AC-3 [e2e] — Data shown is sourced from `functional_analyses` and `badges` filtered by the selected `pf_id`.

**Success metric:** for a primary function with rows in `functional_analyses` and `badges`, both render without a page reload/lookup failure.

## Story S-0002.05 — Version history on a document
As a reviewer I want to see when a doc last changed so that I can trust I'm reading the current version.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Each doc view shows "last updated" derived from its most recent `document_versions` row.
- [ ] AC-2 [behavior] — A history control lists prior versions (change note + date) for that doc.
- [ ] AC-3 [e2e] — Opening the history popover on a doc with ≥2 `document_versions` rows lists them in reverse-chronological order.

**Success metric:** history list count matches `document_versions` row count for that `entity_table`/`entity_id`.

---
**Out of scope (per Briefing):** admin authoring/CRUD of competency content, assessment/portfolio submission workflow, full-text search across docs (may follow in a later PRD).
