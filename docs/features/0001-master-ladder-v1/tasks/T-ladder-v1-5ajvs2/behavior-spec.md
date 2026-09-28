# Behavior Spec — T-ladder-v1-5ajvs2: Self-Assessment: Criteria Checks and Self-Rating
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-5ajvs2/snapshot-TSD.md

## B-1 (tracer bullet): AC-1/AC-2/AC-3/AC-4/AC-5 — CompetencyAssessmentView
- Given: `CompetencyAssessmentView` rendered with dev/leadership/decision-making, store at currentLevel='p3'
- When: component renders; checkboxes and rating buttons are clicked
- Then: ≥2 checkboxes for P3 criteria; checking first adds criterion ID to store criteriaChecked; 3 rating buttons present; clicking Meeting sets selfRating='meeting'; aria-pressed reflects state; P3 card shows "Your level" badge once; operation on this key does not affect other keys

## B-2: AC-6 [behavior] — TrackDomainList renders domain cards with progress rings
- Given: `TrackDomainList` rendered with dev track, store at default state
- When: component renders
- Then: leadership and delivery domain names in DOM; ≥4 progress ring elements; coming-soon domain has no ring and no link

## B-3: AC-7 [e2e]: Checking criterion updates progress ring immediately; self-rating persists across reload
- Given: app running in browser
- When: user checks a criterion on competency page; reloads
- Then: criterion check reflected in progress ring; selfRating restored from localStorage — manual verification

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
- AC-4 [invariant]: assessment key always `{trackId}/{domainId}/{competencyId}` — coverage: B-1 (key verified via store after toggle; single const construction in component)
- AC-5 [invariant]: write to key A has zero effect on key B — coverage: B-1 explicit isolation test
