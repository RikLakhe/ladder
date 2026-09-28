# Behavior Spec — T-ladder-v1-5ln8k3: Home Page Track and Level Selection
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — content utilities
- Given: `src/lib/content.ts` is imported
- When: utility functions called with valid/invalid inputs
- Then: `getTracks()` returns 4 tracks; `getTrack('dev')` returns dev track; `getTrack` with unknown id returns null; `getDomain` hit/miss; `getCompetency` returns competency; `getNextLevel('p2')` returns 'p3'; `getNextLevel('p6')` returns 'p7'; `getNextLevel('p7')` returns null (strict); `computeProgress` returns 0 for empty checkedIds, 0–100 integer for partial/full

## B-2: AC-4/AC-5/AC-6 — home page component
- Given: home page rendered with store at defaults (currentTrack: null, currentLevel: 'p3')
- When: component renders; buttons clicked
- Then: 4 track buttons and 6 level buttons in DOM; `aria-pressed` reflects store state; clicking track button calls store `setTrack`; clicking level button calls store `setLevel`

## Invariants
- AC-2 [invariant]: `getNextLevel('p7')` returns null — coverage: B-1 explicit null equality check
- AC-7 [e2e]: nav link href `/{currentTrack}` — manual browser verification
