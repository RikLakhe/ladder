---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "97f77415bb316dfb5b31c92847e4347a29dd5e390db0a21570a357f28ef0440c"
---
# Briefing 0001 — Ladder: Career Competency Reference App
> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
Engineers don't have clear, consistent answers to "what does the next level look like" and
"what do I need to demonstrate to get there." Managers lack a shared standard for promotion
and hiring decisions, so bars vary by team and reviewer. Career ladder content today (competency
definitions, assessment rubrics, training paths) is scattered across ~117+ documents with no
single source of truth or way to browse/search it. Ladder centralizes this so engineers can
self-direct growth and managers can apply consistent criteria.

## Hypothesis
Ladder is a browsable source-of-truth app for the P2–P7 engineering career ladder: 5 competencies
(Technical Skill, Delivery, Strategic Impact, Feedback & Collaboration, Leadership) each broken
into primary functions, each function backed by a Standard (scope, performance criteria per level,
evidence guide, hiring/promotion signals), an Assessment (rubric, demo checklist, portfolio
requirements, pass bars), and a Training path (prerequisites, concepts, exercises, level gates).
Users get a personalized home view, a level matrix, a transition guide (delta to next level), and
a document viewer with version history.

## Mocks / references
- `design/Competency Review App.dc (1).html` — interactive HTML/React prototype: home dashboard,
  Level View (matrix across levels), Transition Guide, competency browser, document viewer w/
  version history, badges system (50+ badges), admin content editor with magic-link login.

## Scope hints
**Probably in:**
- Core information architecture: competencies, standards, assessments — visible and searchable
- Level View / Transition Guide navigation
- Basic training/evidence sections per function
- Badge portfolio viewing
- Simple version history / "last synced" display

**Probably out (for first milestone):**
- Complex admin bulk-editing workflows
- Real-time multi-user collaboration
- External system integrations
- Personalized learning-path recommendations (adaptive/AI-driven)

## Open questions
- Auth strategy: prototype shows admin magic-link login — how do engineers/managers authenticate
  and get personalized views?
- Badge earning workflow: badges are shown, but the assessment → portfolio submission → badge
  award flow isn't defined yet.
- Training interactivity: are training paths self-contained content, or links out to an external
  learning platform?
- Source of truth / sync: where does ladder content actually live (CMS, markdown repo, spreadsheet)
  and what's the update/approval workflow feeding "last synced"?

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
