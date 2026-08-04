---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "f7418e4e606d9bedf4882e5565a5f7c7dab095d1ba2570ac6bfdda80f13437d3"
---
# Briefing 0002 — Competency Browser
> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
Ladder's data model (competencies → primary functions → standards / functional analyses / badges) already exists in the DB (migrations/0001_init.sql) and as authored design docs (design/technical-skill/). There is no UI yet to browse this hierarchy. Engineers, managers, and reviewers need a way to explore competencies, drill into primary functions, and view the associated standards, functional analyses, and badges per level — without reading raw markdown or querying the DB directly.

## Hypothesis
A read-only browser UI: list competencies, select one to see its primary functions, select a primary function to see its standards/functional-analyses/badges by level. Backed by the existing schema; no new tables expected.

## Mocks / references
- design/Competency Review App.dc (1).html — full interactive mock (public browse + admin mode)
- design/technical-skill/index.md
- design/technical-skill/standard/*.md
- design/technical-skill/assessment/badges.md
- migrations/0001_init.sql (competencies, primary_functions, standards, functional_analyses, badges, document_versions tables)

## Scope hints
**Probably in:**
- Home: competency cards, search, "your level" focus panel, next-level preview
- Sidebar nav: competencies tree (PFs, Training, Evidence per competency), Level View, Transition Guide, Badges, Version History
- Competency page: tabs (PF selector, Evidence, Training)
- Doc viewer: standard docs (scope, PC by level, knowledge/skills, evidence guide, hiring signals, promotion criteria), assessment docs (rubric, live demo checklist, portfolio requirements), training docs (learning path, concept notes, guided exercises)
- Level filter (all-levels vs. single-level focus view), version history popover
- Admin mode: magic-link login, gated edit access (edit flows themselves may be a separate task/feature)
**Probably out:**
- Actual admin CRUD/authoring of content (this task is the browser/viewer; admin login shown in mock may just gate a future editing feature)
- Assessment/portfolio submission workflow (candidate submits work) — browser only displays the rubric/requirements

## Open questions
- Admin mode (magic-link login) in the mock — build the login shell now (even if editing itself is out of scope), or defer entirely to a later task?

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
