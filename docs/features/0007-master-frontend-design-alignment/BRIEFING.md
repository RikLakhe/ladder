---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "e43d4dd09caf3514a4a0fd22cbce47ea4774dec29946f3b3123fe7f397bf236a"
---
# Briefing 0007 — Frontend Design Alignment

## Why
The current UI was built iteratively and has drifted from the 5 PRD docs in `design/`. Pages are structurally misplaced (Standard/Badge/Training tabs sit at competency level instead of PF+level-tab level), data is missing (description, FA summary, badge counts, instrument row resolution), and several components defined in the PRDs were never wired up. Users see an incomplete and structurally incorrect product.

## Hypothesis
Align every page and component to the 5 PRDs (`design/01–05`). The spine is PRD 01 (route structure, PF level-tab layout, EmptyState variants, TierChip). PRD 02–04 slot into that spine. This is a read-only frontend pass — no schema changes, no auth changes.

## Mocks / references
- `design/01-competency-browser.md`
- `design/02-assessment-badge-viewer.md`
- `design/03-training-viewer.md`
- `design/04-version-history.md`

## Scope hints
**Probably in:**
- Home page: add competency description, last-updated date from document_versions, level quick-jump
- Competency page: remove CompetencyTabs; add FA summary (collapsible); PF cards show pf_number + domain_classification + badge count; link to /history
- PF page: disabled tabs for N/A levels with EmptyState variant="not-applicable"; PF domain/description in header
- Badge detail: resolve instrument row text from evidence_required; co-signer indicator; BadgeStatusLegend wired in; broken-link warning state
- Training page: P6/P7 EmptyState with exact fixed copy; sequencing-issue warning for forward prereq refs
- Version history: add /[competency]/history route (competency-scoped); entity-scoped route /[entity_type]/[entity_id]/history

**Probably out:**
- Schema changes
- Auth / admin editing
- Per-engineer badge award tracking
- Mobile pixel-perfect polish
- i18n

## Open questions
-

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
