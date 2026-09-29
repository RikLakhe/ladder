# Behavior Spec — T-ladder-v1-5-n4qvsh: Guided Workshop Wizard (S-0002.03)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-n4qvsh/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: WorkshopWizard renders track name header + "1 of N" counter + `<progress>` element
- Given: `<WorkshopWizard track={devTrack} scope={null} />` with store at default state (currentLevel='p3', no assessments)
- When: component mounts
- Then: the track name ("Engineering") appears in the DOM; text matching "1 of {N}" is visible; a `<progress>` element is present

## B-2: AC-2 [behavior]: Criterion card shows checkbox and 3 rating radio inputs
- Given: `<WorkshopWizard track={devTrack} scope={null} />` at default state
- When: component mounts
- Then: one checkbox ("I do this regularly") + 3 radio inputs (Developing / Meeting / Exceeding) visible

## B-3: AC-3 [behavior]: Next/Back/Skip navigation
- Given: `<WorkshopWizard track={devTrack} scope={null} />` at index 0
- When: Next → clicked
- Then: counter shows "2 of N"
- And: Back at index 0 is no-op (counter stays "1 of N")
- And: Skip advances without toggling checkbox or adding to criteriaChecked

## B-4: AC-4 [behavior]: Checkbox writes to store via toggleCriterion
- Given: `<WorkshopWizard track={devTrack} scope={null} />` at default state
- When: checkbox clicked
- Then: criterion ID appears in store `criteriaChecked`

## B-5: AC-5 [behavior]: Resume banner when workshopPosition matches
- Given: store has `workshopPosition` with track='dev', level='p3', criterionIndex=3
- When: `<WorkshopWizard track={devTrack} scope={null} />` mounts
- Then: "You left off at criterion" banner is visible

## B-6: AC-6 [behavior]: Completion screen after last criterion
- Given: `<WorkshopWizard track={devTrack} scope={competencyId} />` scoped to a single competency
- When: Next clicked past last criterion
- Then: "Workshop complete" heading visible; "See my results" and "Review by domain" CTA links present

## B-7: AC-7 [behavior]: Swipe gesture
- Given: `<WorkshopWizard track={devTrack} scope={null} />` at index 0
- When: pointerDown at x=200, pointerUp at x=80 (left swipe, delta -120)
- Then: counter shows "2 of N"
- And: right swipe from index 1 returns to index 0

## B-8: AC-access [behavior]: `/[track]/workshop` route renders WorkshopWizard for valid track
- Given: WorkshopPage server component called with params `{ track: 'dev' }` and empty searchParams
- When: rendered
- Then: `<progress>` element and "1 of N" counter appear

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-8 [invariant]: `workshopPosition` is additive to localStorage — existing keys (`assessments`, `currentTrack`, `currentLevel`, `focusedView`) unchanged — coverage:

