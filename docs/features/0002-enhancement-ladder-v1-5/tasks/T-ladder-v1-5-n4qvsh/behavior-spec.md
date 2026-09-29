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

## B-2: AC-2 [behavior]: Criteria sequenced for `currentLevel`: universal domains first (Delivery → Leadership → FCC → Strategic Impact), then Technical Skills; coming-soon domains skipped
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: "Next →" advances criterion; "← Back" decrements (no-op at 0); "Skip" advances without toggling checkbox
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: Checkbox and rating writes persist to `assessments` store via existing `toggleCriterion` / `setRating` actions
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: `workshopPosition` (`{ track, level, scope, criterionIndex, totalCriteria, startedAt }`) persists to localStorage on every advance; on return visit a "Continue?" banner shows with Continue / Restart actions
- Given:
- When:
- Then:

## B-6: AC-6 [behavior]: Completing all criteria shows completion screen with "Workshop complete" heading, summary counts, and CTAs "See my results" → `/dev/results` and "Review by domain" → `/dev`; sets `workshopPosition = null`
- Given:
- When:
- Then:

## B-7: AC-7 [behavior]: Swipe left (pointer delta > 60px) = Next; swipe right = Back
- Given:
- When:
- Then:

## B-8: AC-9 [e2e]: A user navigating to `/dev/workshop` can step through criteria, check/rate each, and reach the completion screen
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-8 [invariant]: `workshopPosition` is additive to localStorage — existing keys (`assessments`, `currentTrack`, `currentLevel`, `focusedView`) unchanged — coverage:

