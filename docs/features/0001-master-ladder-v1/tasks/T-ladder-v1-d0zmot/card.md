## Task T-ladder-v1-d0zmot — Career Ladder Content Data
**Story:** S-0001.03 · feature 0001-master-ladder-v1
**Milestone:** M1 (v0.1.0) — closes M1
**Depends on:** T-ladder-v1-lqeif5
**Slice:** Full vertical — all competency content required for every subsequent UI task
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `src/content/tracks.ts` exports `tracks: Track[]` with exactly 4 elements (ids: `dev`, `qa`, `data`, `ai`)
- [ ] AC-2 [invariant]: Universal domain constants defined once and referenced by all tracks — no structural duplication in source
- [ ] AC-3 [behavior]: Every non-coming-soon competency has level entries for all 6 levels (P2–P7); each level has non-empty descriptor and at least 1 criterion
- [ ] AC-4 [invariant]: All criterion IDs match `/^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/`; universal criteria use `shared/` prefix; dev technical-skill uses `dev/technical-skill/` prefix
- [ ] AC-5 [behavior]: Dev track has 5 domains including `technical-skill` with 9 competencies (`comingSoon: false`); QA/Data/AI have 4 universal + `technical-skill` stub (`comingSoon: true`, `competencies: []`)
- [ ] AC-6 [invariant]: No `JSON.parse`, `fs.readFile`, or dynamic import in content file; all data statically declared
- [ ] AC-7 [behavior]: All 9 schema tests pass; `tsc --noEmit` exits 0; no `any` types
- [ ] AC-8 [e2e]: App builds and serves competency content for all 4 tracks without runtime errors
**End-to-end AC:** AC-8 [e2e] — `npm run build` exits 0 with all track data present
**Tests:** AC-1 through AC-7 — ordered; tracer bullet = AC-1 (tracks export exists and has 4 elements)
**Test scope:** src/content/__tests__/tracks.test.ts
**Done =** reviewable PR, all 9 schema tests green, `tsc --noEmit` clean, no `any` types.
