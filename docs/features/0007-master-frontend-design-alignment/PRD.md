---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "f7b5dc67986947a39a017b2becd2c101552c09403054321b2d3d701378b9c84f"
---
# PRD 0007 — Frontend Design Alignment

**Source:** Briefing 0007 — pages have drifted from design/01–04 PRDs; structural misplacement, missing data, unwired components
**Parent:** —

---

## Story S-0007.01 — Home Page Completeness

As an engineer, I want the home page to show competency descriptions, last-updated dates, and a level quick-jump control so I can orient quickly without clicking into each competency.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Each competency card shows: name, description (from `competencies.description`), PF count, and last-updated date (latest `document_versions.created_at` for that competency's entities)
- [ ] AC-2 [behavior] — Level quick-jump control (P2–P7) exists on the home page; selecting a level deep-links to `/[firstCompetency]/[firstPF]?level=X` with a code comment marking the full cross-competency view as a v2 TODO
- [ ] AC-3 [e2e] — A user on `/` sees description text and a last-updated date for every competency without navigating away

**Success metric:** All 5 competency cards show description + date; quick-jump control renders and navigates on click

---

## Story S-0007.02 — Competency Page Completeness

As an engineer, I want the competency page to show the FA summary, PF cards with domain classification and badge count, and a link to version history.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — FA summary renders collapsed by default, expandable, pulling from `functional_analyses.content` for the competency
- [ ] AC-2 [behavior] — PF cards show: pf_number, name, domain_classification, badge count (COUNT of `badges` rows for that PF)
- [ ] AC-3 [behavior] — Page header includes competency description
- [ ] AC-4 [behavior] — A "View history" link navigates to `/[competency]/history`
- [ ] AC-5 [e2e] — A user clicking a competency from home lands on a page with FA summary toggle, PF cards with badge counts, and history link visible

**Success metric:** Competency page shows FA, correct badge counts per PF, history link

---

## Story S-0007.03 — PF Page Structure Correction

As an engineer, I want the PF page to use the correct P2–P7 level-tab structure with Standard/Badge/Training slots inside each tab (not at competency level), so the navigation hierarchy matches the data model.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — PF page renders `<LevelTabs>` P2–P7 strip; Standard, Badge, and Training content render inside `<LevelTabContent>` for the active tab
- [ ] AC-2 [behavior] — Levels with no `standards` row render a disabled tab with `<EmptyState variant="not-applicable">` (not hidden, not blank)
- [ ] AC-3 [behavior] — PF header shows pf_number, name, and domain_classification
- [ ] AC-4 [e2e] — A user navigating `/[competency]/[pf]` sees P2–P7 tabs; clicking an N/A tab shows the empty state; clicking a valid tab shows Standards content

**Success metric:** No content visible outside the level-tab structure; N/A tabs show correct empty state

---

## Story S-0007.04 — Badge Detail Correctness

As an engineer, I want badge detail pages to resolve instrument row text from `evidence_required`, show the co-signer indicator when required, display the status legend, and surface broken evidence links visibly.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Each `evidence_required` entry resolves to the actual `instruments.rows` row text (fetch instrument by id, look up row_key); resolved text renders inline, expandable
- [ ] AC-2 [behavior] — If a row_key fails to resolve, a visible "⚠ evidence link broken" warning renders in place of the row — never silently blank
- [ ] AC-3 [behavior] — Co-signer indicator (badge/icon + tooltip) renders only when `badges.cosigner_required` is true
- [ ] AC-4 [behavior] — `<BadgeStatusLegend>` (🟢 Earned-eligible / 🟡 Blocked-assignment-limited / ⚪ Not attempted, one-line each) renders once per badge detail page
- [ ] AC-5 [e2e] — A user on `/[competency]/[pf]/badges/[badgeCode]` sees resolved instrument row text, the status legend, and a co-signer indicator iff cosigner_required is true

**Success metric:** Zero silently-blank evidence rows; legend present on every badge detail page

---

## Story S-0007.05 — Training Viewer Corrections

As an engineer, I want the training viewer to show the correct P6/P7 empty state with exact copy, and to surface sequencing issues visibly rather than silently rendering broken order.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — When no guided_exercise or autonomous_project rows exist for P6 or P7, `<EmptyState variant="no-simulated-training">` renders with exact copy: "Growth at this level is demonstrated through real project scope, not simulated exercises."
- [ ] AC-2 [behavior] — A `training_unit` whose `prereqs` entry points to a later `sequence_order` renders a visible "⚠ sequencing issue" badge on that unit
- [ ] AC-3 [e2e] — A user on the training tab for a P6/P7 level (where no exercises exist) sees the exact fixed copy, not a blank section or generic "no data"

**Success metric:** Exact copy renders for P6/P7; sequencing-issue badge appears on any forward-reference prereq

---

## Story S-0007.06 — Version History Route

As an engineer, I want a `/[competency]/history` route that shows a competency-scoped changelog and an entity-scoped `/[entity_type]/[entity_id]/history` route for drilling into a single entity's edits.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `/[competency]/history` lists all `document_versions` rows for entities belonging to that competency, newest-first; each row shows date, editor name, entity_type + entity display name, change_note
- [ ] AC-2 [behavior] — Expanding a row shows field-level before/after comparison between version N-1 and N snapshots, changed fields highlighted (flat key/value diff, no deep-nested library required)
- [ ] AC-3 [behavior] — `/[entity_type]/[entity_id]/history` shows the same row format filtered to one entity
- [ ] AC-4 [behavior] — Zero version rows renders `<EmptyState variant="no-history-yet">`, not an error
- [ ] AC-5 [e2e] — A user navigates to `/[competency]/history`, sees a changelog list, expands a row, and sees changed fields highlighted

**Success metric:** Both route variants render correctly; expand shows accurate diff for badges, standards, training_units
