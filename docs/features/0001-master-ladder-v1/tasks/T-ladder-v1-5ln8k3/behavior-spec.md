# Behavior Spec — T-ladder-v1-5ln8k3: Home Page: Track and Level Selection
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-5ln8k3/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `src/lib/content.ts` exports 6 pure utility functions: `getTracks`, `getTrack`, `getDomain`, `getCompetency`, `getNextLevel`, `computeProgress`; all utility tests pass
- Given:
- When:
- Then:

## B-2: AC-3 [behavior]: `computeProgress` returns a 0–100 integer (rounded); returns 0 when criteria array is empty
- Given:
- When:
- Then:

## B-3: AC-4 [behavior]: Home page renders exactly 4 track buttons and exactly 6 level buttons
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: Each track button has `aria-pressed="true"` when selected, `"false"` otherwise; same for level buttons
- Given:
- When:
- Then:

## B-5: AC-6 [behavior]: Clicking a track button writes selected track to the store; clicking a level button writes selected level to the store
- Given:
- When:
- Then:

## B-6: AC-7 [e2e]: Navigation element links to `/{currentTrack}` reflecting the active store selection; clicking navigates to the track overview page
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: `getNextLevel('p7')` returns `null` under all code paths — never returns a value beyond P7 — coverage:

