# PRD: Competency Browser

## Goal
Public, read-only navigation: Home → Competency → Primary Function → Level (P2-P7) tabs. This is the app's spine — Badge Viewer and Training Viewer render inside the level-tab layout this PRD builds.

## Scope
In: Home page, Competency page, PF page shell with level-tab navigation, Functional Analysis view, global search (badge code / PF name / keyword), Standard section content (rendered inside PF page level tab).
Out: Badge cards/detail (PRD 02), Training content (PRD 03), version history UI (PRD 04), any admin/auth (PRD 05/06).

## Data model (reference — owned by migration, not this PRD)
```
competencies (id, slug, name, description)
primary_functions (id, competency_id, pf_number, slug, name, domain_classification)
standards (id, pf_id, level, scope, performance_criteria jsonb[], required_knowledge, evidence_guide, hiring_signals jsonb[], promotion_criteria)
functional_analyses (id, competency_id, content, coverage_check)
```
Assume these tables exist and are seeded (migration is separate work). Read-only queries only.

## Pages & routes
- `/` — Home. 5 competency cards (name, description, PF count, last-updated date pulled from latest `document_versions` row for that competency). Level quick-jump control: pick P2-P7 → link to a cross-competency view is OUT of scope for v1; the control itself can exist but just deep-links to `/[competency]/[pf]?level=X` for the first competency/PF as placeholder — full cross-competency snapshot is a v2 item (flag as TODO in code comment).
- `/[competency]` — Competency page. Header (name, description), functional analysis summary (collapsible, from `functional_analyses.content`), link to full FA doc, PF list (cards: pf_number, name, domain_classification, badge count — badge count comes from PRD 02's table but this PRD can query `badges` count read-only), link to `/[competency]/history`.
- `/[competency]/[pf]` — PF page. Level tab strip P2-P7. Tabs with no `standards` row for that level render disabled/greyed with "N/A at this level" (do not hide — visibility of gaps matters, see plan.md design direction). Within active tab: Standard section (scope, performance criteria as list, required knowledge, evidence guide, hiring signals list, promotion criteria) rendered directly; leave empty slot/placeholder sections for Badge and Training (PRD 02/03 will fill these in the same tab body — coordinate on a shared `<LevelTabContent>` layout component so those PRDs slot in without restructuring this page).
- `/[competency]/functional-analysis` — full FA doc view.
- Search: header-level search input, client-side fuzzy match against a small denormalized index (badge_code, pf name, competency name) fetched once; results link to the relevant PF page + level tab via query param.

## Components to build (reusable — name these consistently, other PRDs depend on them)
- `<TierChip level="P4" />` — consistent color-coded level/tier chip. Define the 6-step color scale here; PRD 02/03 reuse this exact component.
- `<LevelTabs currentLevel pf />` — the P2-P7 tab strip with disabled-state support.
- `<LevelTabContent>` — layout shell with Standard/Badge/Training sub-slots (children).
- `<EmptyState variant="not-applicable" />` — reusable for PF-not-applicable-at-level and other empty states other PRDs need (blocked-assignment-limited, no-history-yet, etc. — this PRD defines the base component with a `variant` prop; PRD 02/03/04 add their own variant strings).

## Acceptance criteria
- All 5 competencies, all PFs, all applicable levels render without error from seeded data.
- PF-not-applicable-at-level (e.g. facilitation at P2-P3) shows disabled tab + `<EmptyState variant="not-applicable">`, not a blank crash or hidden tab.
- Search finds a badge by exact code and a PF by partial name match, navigates correctly.
- Page is desktop-primary responsive (mobile: tabs collapse to a dropdown, acceptable, not pixel-perfect).
- No auth required to view any route in this PRD.

## Explicitly deferred (do not build)
Cross-competency "find my level" full view, mobile pixel-perfect polish, i18n.
