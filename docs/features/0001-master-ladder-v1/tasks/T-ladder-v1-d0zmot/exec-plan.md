---
approved_by: ""
approved_at: ""
planned_behaviors: "1"
---
## Exec Plan — Task T-ladder-v1-d0zmot

> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/content/tracks.ts` — exports `tracks: Track[]` with 4 elements; universal domain constants (delivery, leadership, fcc, strategic-impact) defined once as shared constants; dev track has 5 domains with full content; QA/Data/AI have 4 universal domains + `technical-skill` stub (`comingSoon: true, competencies: []`) (AC-1, AC-2, AC-5)
- Every non-coming-soon competency with level entries P2–P7, non-empty descriptor, ≥1 criterion per level (AC-3)
- All criterion IDs matching the `{shared|dev/technical-skill}/{domain}/{competency}/{level}/{index}` format (AC-4)
- No dynamic I/O — pure static TypeScript (AC-6)
- `src/content/__tests__/tracks.test.ts` — 9 schema tests (B-1 through B-9 from TSD) (AC-7)

**Approach:**
Single RED (test file imports `tracks` — module doesn't exist → fail). Single GREEN (write full content + types match). Content is real ladder data per the design spec. Universal domain constants defined once, referenced by all 4 tracks. No placeholder/lorem content — real descriptors and criteria.

**Boundaries & mocks:**
- No boundaries — static TypeScript, no I/O, no network. Nothing to mock.
- Smoke AC: AC-8 — `npm run build` exits 0 (all track data present, TypeScript valid).

**Behaviors (TDD order):**

B-1 (tracer bullet + all schema): All 9 schema assertions
- RED: write test file importing `tracks` from `../tracks` — fails (module doesn't exist)
- GREEN: write `src/content/tracks.ts` with complete content satisfying all 9 assertions

Tests cover:
1. `tracks.length === 4` and IDs match `['dev','qa','data','ai']`
2. Every track has required fields (id, name, description, domains)
3. Every domain has required fields including `comingSoon` boolean
4. Every non-coming-soon competency has entries for all 6 LevelId values
5. Every level has non-empty descriptor
6. Every level in non-coming-soon domain has non-empty criteria array
7. All criterion IDs match format regex
8. Competency IDs unique within a domain
9. Every domain with `comingSoon: true` has `competencies: []`

**PR will contain:**
- `src/content/tracks.ts`
- `src/content/__tests__/tracks.test.ts`

**Open questions / ambiguities:**
- How much real content to write? The design doc (`docs/context/2026-09-26-ladder-design.md`) and implementation plan (`docs/context/2026-09-26-ladder-v1-plan.md`) have the full competency list. Will use those as the source of truth for content.
- Dev technical-skill has 9 competencies per TSD — all must have full P2-P7 content. This is significant content volume; will write complete, real content (not placeholders).

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None — pure data authoring, no logic, no security surface.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
