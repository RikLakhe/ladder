# Behavior Spec — T-frontend-design-alignment-7etjh7: Home Page Completeness
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — description field returned by lib query
- Given: `competencies` table has a row with `description = "A test description"`
- When: `getCompetenciesWithPfCount` is called
- Then: the returned object includes `description: "A test description"`

## B-2: AC-2 — lastUpdated field returned (populated and null cases)
- Given: one competency has `document_versions` rows, another has none
- When: `getCompetenciesWithPfCount` is called
- Then: the competency with version rows has `lastUpdated` as an ISO string; the competency with no rows has `lastUpdated: null`

## B-3: AC-3 — LevelQuickJump renders and navigates
- Given: `<LevelQuickJump>` is rendered with first competency slug and first PF slug
- When: user selects "P5" from the control
- Then: the component navigates to `/competencies/[slug]/[pfSlug]?level=P5`; all P2–P7 options are present

## B-4: AC-4 [e2e] — home page shows description + date + quick-jump
- Given: seeded DB with competencies that have descriptions and at least one with version history
- When: user visits `/`
- Then: each competency card shows description text; at least one card shows a last-updated date; the level quick-jump control is visible on the page
