# Behavior Spec — T-frontend-design-alignment-41h895: Competency Page Completeness
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — getCompetencyById returns description
- Given: `competencies` table has a row with `description = "Tests critical thinking"`
- When: `getCompetencyById` is called with that competency's id
- Then: returned object includes `description: "Tests critical thinking"`

## B-2: AC-3 — getPrimaryFunctionsWithBadgeCount returns badge counts
- Given: a PF with 3 badges and a PF with 0 badges exist for the same competency
- When: `getPrimaryFunctionsWithBadgeCount` is called for that competency
- Then: returns objects with `badgeCount: 3` and `badgeCount: 0`; each includes `pf_number` and `domain_classification`

## B-3: AC-2 — getFunctionalAnalysisForCompetency returns content or null
- Given: one competency has a `functional_analyses` row with `content = "FA text"`, another has none
- When: `getFunctionalAnalysisForCompetency` is called for each
- Then: first returns `{ content: "FA text" }`; second returns `null`

## B-4: AC-2 — FACollapsible renders collapsed, expands on click
- Given: `<FACollapsible content="FA text" />` rendered
- When: component first renders
- Then: content text is not visible (collapsed state)
- When: user clicks the toggle
- Then: content text becomes visible

## B-5: AC-1,3,4,5 — competency page wires all data correctly
- Given: competency with description, FA content, PFs with badge counts in DB
- When: competency page renders
- Then: header includes description text; FA section present; PF cards show pf_number, domain_classification, badge count; history link href ends with `/history`; no CompetencyTabs element in output

## B-6 [e2e]: AC-6 — full competency page from seeded data
- Given: seeded DB running, user navigates to `/competencies/[id]`
- When: page loads
- Then: page shows description in header, collapsible FA section, PF cards with badge counts, history link — no crash
