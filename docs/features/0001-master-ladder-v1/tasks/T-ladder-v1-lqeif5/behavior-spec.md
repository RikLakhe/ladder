# Behavior Spec — T-ladder-v1-lqeif5: Data Model and Assessment Store
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-lqeif5/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `src/lib/types.ts` exports all 11 named symbols: `LevelId`, `TrackId`, `SelfRating`, `Criterion`, `LevelDescriptor`, `Competency`, `Domain`, `Track`, `CompetencyAssessment`, `AssessmentStore`, `LEVELS`
- Given:
- When:
- Then:

## B-2: AC-3 [behavior]: `src/lib/store.ts` uses persisted store with `{ name: 'ladder-store', skipHydration: true }`; default state: `currentTrack: null`, `currentLevel: 'p3'`, `focusedView: false`, `assessments: {}`
- Given:
- When:
- Then:

## B-3: AC-5 [behavior]: `setRating` merges `selfRating`, preserves `criteriaChecked`, initialises `criteriaChecked: []` if absent, sets `updatedAt` ISO timestamp
- Given:
- When:
- Then:

## B-4: AC-6 [behavior]: `toggleCriterion` adds criterion ID if absent; removes if present; preserves `selfRating`; sets `updatedAt`
- Given:
- When:
- Then:

## B-5: AC-8 [behavior]: All 8 store unit tests pass; `tsc --noEmit` exits 0; no `any` types
- Given:
- When:
- Then:

## B-6: AC-9 [e2e]: Assessment state written to browser-local storage survives a page reload and is restored on next visit
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: `LEVELS` is `readonly ['p2','p3','p4','p5','p6','p7']` (as-const tuple); `Domain.comingSoon` is a required boolean — coverage:
- AC-4 [invariant]: Assessment key = `{trackId}/{domainId}/{competencyId}` (forward slashes); `setRating(key, rating)` 2-arg; `toggleCriterion(key, criterionId)` 2-arg — coverage:
- AC-7 [invariant]: Operation on key A has zero effect on any other key B — coverage:

