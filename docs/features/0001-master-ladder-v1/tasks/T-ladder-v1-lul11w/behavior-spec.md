# Behavior Spec — T-ladder-v1-lul11w: Competency Detail: Full Level Browse
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-lul11w/snapshot-TSD.md

## B-1 (tracer bullet): AC-1–AC-5 — CompetencyDetail renders 6 level cards; highlights currentLevel; breadcrumb; no checkboxes
- Given: `CompetencyDetail` rendered with a track, domain, competency, and store at known currentLevel
- When: component renders; store has currentLevel='p3' or 'p7'
- Then: 6 level badges (P2–P7) present; P3 descriptor + criterion text visible; no checkbox/radio/select inputs; "Your level" badge exactly once at currentLevel; p7 renders without crash; breadcrumb shows track.name / domain.name / competency.name

## B-2: AC-7 [e2e]: Engineer browses all 6 level cards; current level immediately visible
- Given: app running in browser
- When: user navigates to competency detail page
- Then: 6 cards visible, currentLevel card highlighted — manual browser verification

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0 — coverage: B-1 (tsc verified at review)
