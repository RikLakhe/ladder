---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "053e291566b274ba222f291d94f29e8175972a9787d9b5f536d26e71dbfcc035"
---
# Briefing 0003 — Assessment / Badge Viewer
> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
Badges are the concrete evidence a competency claim is real — a badge without a traceable link to the exact instrument row/rubric text that earned it is just an unverifiable label. Reviewers, SAs, and engineers need to see *why* a badge was earned (or why it's blocked), not just that it exists. PRD 01 (competency browser, feature 0002) already renders a Badge sub-slot on the PF page's level tab, but only as a bare name — no detail page, no evidence traceability, no status legend.

## Hypothesis
Add a badge detail page reachable from the existing PF-page badge list, showing the badge's certifies statement, its resolved evidence (each `evidence_required` reference resolved to real instrument row text, or a visible broken-link warning if it doesn't resolve), completion-bar criterion, verifier/co-signer info, and a static 3-state status legend (Earned-eligible / Blocked-assignment-limited / Not-attempted). No per-engineer award tracking in v1 — every badge card always shows the Not-attempted state.

## Mocks / references
- `design/02-assessment-badge-viewer.md` — full PRD text (goal, data model, pages/components, acceptance criteria).
- `design/Competency Review App.dc (1).html` — static prototype; Badges screen has scope tabs (all/mine), competency filter, level toggle, badge cards with id/tier/certifies, expandable badge detail with evidence refs and history.
- Reuses `<TierChip>` from PRD 01/feature 0002 — must not redefine it.

## Scope hints
**Probably in:**
- Badge card (in-tab summary) refinement inside the existing PF-page Badge sub-slot (built in feature 0002).
- Badge detail page `/[competency]/[pf]/badges/[badgeCode]`.
- Evidence-reference resolution against `instruments.rows` + broken-link warning state.
- 3-state status legend component (static, not tied to real tracking data).
- Co-signer indicator + tooltip.

**Probably out:**
- Per-engineer badge award/progress tracking (explicitly deferred in PRD 02 — no schema for it yet).
- Badge search ranking/relevance (owned by PRD 01).
- Admin editing of badges/instruments (PRD 05).
- Training content (PRD 03).

## Open questions
(none — PRD 02 is already fully specified; proceeding straight to PRD/TSD drafting from it)

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
