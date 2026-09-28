# Behavior Spec — T-ladder-v1-d0zmot: Career Ladder Content Data
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-d0zmot/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.

## B-1 (tracer bullet): All 9 schema assertions (AC-1, AC-3, AC-5, AC-7)
- Given: `src/content/tracks.ts` is imported
- When: schema assertions run against the exported `tracks` array
- Then: (1) 4 tracks with correct IDs; (2) all required fields present; (3) all domain fields valid including comingSoon boolean; (4) non-coming-soon competencies have 6 level entries; (5) all level descriptors non-empty; (6) all levels in non-coming-soon domains have ≥1 criterion; (7) all criterion IDs match the format regex; (8) competency IDs unique per domain; (9) coming-soon domains have competencies: []

## B-2: AC-8 [e2e] — build exits 0
- Given: full tracks.ts content
- When: `npm run build` executed
- Then: exits 0 (smoke test; not a Vitest behavior)

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
- AC-2 [invariant]: universal domain constants defined once — coverage: structural review of tracks.ts source (no duplicated domain objects)
- AC-4 [invariant]: criterion ID format — coverage: B-1 test assertion 7 (regex check)
- AC-6 [invariant]: no dynamic I/O — coverage: TypeScript static analysis + no `JSON.parse`/`fs` imports
