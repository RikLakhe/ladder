# Behavior Spec — T-ladder-v1-d0zmot: Career Ladder Content Data
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-d0zmot/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `src/content/tracks.ts` exports `tracks: Track[]` with exactly 4 elements (ids: `dev`, `qa`, `data`, `ai`)
- Given:
- When:
- Then:

## B-2: AC-3 [behavior]: Every non-coming-soon competency has level entries for all 6 levels (P2–P7); each level has non-empty descriptor and at least 1 criterion
- Given:
- When:
- Then:

## B-3: AC-5 [behavior]: Dev track has 5 domains including `technical-skill` with 9 competencies (`comingSoon: false`); QA/Data/AI have 4 universal + `technical-skill` stub (`comingSoon: true`, `competencies: []`)
- Given:
- When:
- Then:

## B-4: AC-7 [behavior]: All 9 schema tests pass; `tsc --noEmit` exits 0; no `any` types
- Given:
- When:
- Then:

## B-5: AC-8 [e2e]: App builds and serves competency content for all 4 tracks without runtime errors
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: Universal domain constants defined once and referenced by all tracks — no structural duplication in source — coverage:
- AC-4 [invariant]: All criterion IDs match `/^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/`; universal criteria use `shared/` prefix; dev technical-skill uses `dev/technical-skill/` prefix — coverage:
- AC-6 [invariant]: No `JSON.parse`, `fs.readFile`, or dynamic import in content file; all data statically declared — coverage:

