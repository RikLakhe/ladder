# Behavior Spec — T-ladder-v1-lqeif5: Data Model and Assessment Store
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-lqeif5/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-3 — store initialises with default state
- Given: no persisted data in storage
- When: store module is imported and `getState()` called
- Then: `currentTrack` is null, `currentLevel` is 'p3', `focusedView` is false, `assessments` is `{}`

## B-2: AC-3 — setTrack updates currentTrack
- Given: store at default state
- When: `setTrack('dev')` called
- Then: `currentTrack` is 'dev'

## B-3: AC-3 — setLevel updates currentLevel
- Given: store at default state
- When: `setLevel('p5')` called
- Then: `currentLevel` is 'p5'

## B-4: AC-3 — toggleFocusedView inverts focusedView
- Given: store at default state (`focusedView: false`)
- When: `toggleFocusedView()` called twice
- Then: after first call `focusedView` is true; after second call `focusedView` is false

## B-5: AC-5 — setRating creates new assessment entry
- Given: no assessment for key 'dev/leadership/decision-making'
- When: `setRating('dev/leadership/decision-making', 'meeting')` called
- Then: `assessments[key].selfRating` is 'meeting', `criteriaChecked` is `[]`, `updatedAt` is set

## B-6: AC-5 — setRating preserves existing criteriaChecked
- Given: assessment exists with a checked criterion
- When: `setRating` called again with new rating
- Then: `selfRating` updated; existing `criteriaChecked` array preserved

## B-7: AC-6 — toggleCriterion adds criterion on first call
- Given: assessment exists for key
- When: `toggleCriterion(key, criterionId)` called once
- Then: `criterionId` is in `criteriaChecked`

## B-8: AC-6 — toggleCriterion removes criterion on second call, preserves selfRating
- Given: criterion already in `criteriaChecked`
- When: `toggleCriterion(key, criterionId)` called again
- Then: `criterionId` removed from `criteriaChecked`; `selfRating` unchanged

## B-9: AC-9 [e2e] — localStorage round-trip
- Given: user sets a rating in the browser
- When: page is reloaded
- Then: assessment state is restored from localStorage (manual verification in browser)

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-1 [behavior]: types.ts exports 11 symbols — coverage: enforced by TypeScript at compile time; tsc --noEmit gate
- AC-2 [invariant]: `LEVELS` is readonly tuple; `Domain.comingSoon` required boolean — coverage: TypeScript type system; tsc --noEmit gate
- AC-4 [invariant]: key format, 2-arg signatures — coverage: enforced by type signatures in types.ts + store.ts; used in B-5 through B-8 tests
- AC-7 [invariant]: operation on key A has zero effect on key B — coverage: isolation is a property of B-5/B-6/B-7/B-8 (each operates on a single key; separate key reads return `{}`)
- AC-8 [behavior]: all 8 unit tests pass; tsc clean; no any — coverage: full GREEN run + tsc --noEmit
