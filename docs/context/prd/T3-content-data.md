# T3 — Content Data
**Epic:** Career Ladder Content Foundation
**Milestone:** M1 (v0.1.0) — closes M1
**Branch:** feature/T3-content-data

---

## Epic

Populate the Ladder platform with static, type-safe career matrix content so that engineers across all four tracks (Dev, QA, Data, AI) can browse competency domains and levels at build time without any runtime data fetching.

---

## User Stories

1. **As a Leapfrog engineer**, I want to browse competency domains for my track (Dev, QA, Data, or AI) so that I can understand what capabilities are expected at my current and target levels.

2. **As a Dev-track engineer**, I want to see technical-skill competencies (writing code, testing, debugging, etc.) broken down by level (P2–P7) so that I can self-assess against concrete, level-specific descriptors.

3. **As a QA, Data, or AI-track engineer**, I want to see that technical-skill content is coming soon so that I understand the platform is actively growing and I am not missing data that exists.

4. **As a frontend developer consuming the content**, I want universal domains (delivery, leadership, fcc, strategic-impact) defined once and referenced by all tracks so that updates to shared content propagate consistently without copy-paste drift.

---

## Tasks

1. **Read and validate the `Track`, `Domain`, `Competency`, `Level`, and `Criterion` types** from `@/lib/types` before authoring any content, ensuring the data file conforms exactly to the exported interfaces.

2. **Write schema tests first (TDD).** Create `src/content/__tests__/tracks.test.ts` with the 9 schema assertions listed in the Acceptance Criteria. All tests must fail (red) before content is authored.

3. **Define universal domain constants.** In `src/content/tracks.ts`, define `DELIVERY_DOMAIN`, `LEADERSHIP_DOMAIN`, `FCC_DOMAIN`, and `STRATEGIC_IMPACT_DOMAIN` as typed constants. Each must include competencies for all six levels (P2–P7) with non-empty descriptors and at least one criterion per level. Use the `shared/` prefix for all criterion IDs in these domains.

4. **Define the dev-only technical-skill domain.** Create `DEV_TECHNICAL_SKILL_DOMAIN` with `comingSoon: false` and the nine specified competencies: `writing-code`, `testing`, `debugging`, `observability`, `understanding-code`, `software-architecture`, `security`, `ai-assisted-engineering`, `ai-judgment-feature-delivery`. All P2–P7 levels must be populated. Use the `dev/technical-skill/` prefix for criterion IDs.

5. **Define the coming-soon technical-skill stub** for QA, Data, and AI tracks as a shared constant `COMING_SOON_TECHNICAL_SKILL_DOMAIN` with `comingSoon: true` and `competencies: []`.

6. **Assemble and export the `tracks` array.** Compose the four `Track` objects (`dev`, `qa`, `data`, `ai`) using the domain constants defined above. `dev` receives all five domains; `qa`, `data`, and `ai` receive the four universal domains plus the coming-soon technical-skill stub. Export the array as `export const tracks: Track[]`.

7. **Run the schema tests (green).** Confirm all 9 assertions pass with `npx vitest run src/content/__tests__/tracks.test.ts`.

8. **TypeScript strict check.** Run `npx tsc --noEmit` and resolve any type errors. No `any` types permitted anywhere in the content file.

9. **Update exports/barrel if required.** If `src/content/index.ts` or equivalent barrel exists, re-export `tracks` from it.

10. **Open a PR from `feature/T3-content-data` to `develop`**, link the T3 ticket, and request review.

---

## Acceptance Criteria

*QA sign-off requires all of the following to be demonstrably true:*

1. **Four tracks exist.** The exported `tracks` array contains exactly four elements with IDs `dev`, `qa`, `data`, and `ai`. *(schema test 1)*

2. **Every track has required fields.** Each track object exposes `id`, `label`, and `domains` fields with correct types; no field is `undefined` or `null`. *(schema test 2)*

3. **Every domain has required fields.** Each domain object in every track exposes `id`, `label`, `comingSoon`, and `competencies` fields. *(schema test 3)*

4. **Non-coming-soon competencies have all six levels.** For every competency in a domain where `comingSoon: false`, the `levels` array contains entries for P2, P3, P4, P5, P6, and P7 — no level is missing. *(schema test 4)*

5. **Each level has a non-empty descriptor.** For every level across all non-coming-soon competencies, the `descriptor` field is a non-empty string (not `""`, not whitespace-only). *(schema test 5)*

6. **No empty criteria arrays in non-coming-soon domains.** Every level in every non-coming-soon competency has a `criteria` array containing at least one criterion object. *(schema test 6)*

7. **Criterion IDs match the required format.** Every criterion's `id` field matches the regex `/^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/`. *(schema test 7)*

8. **Competency IDs are unique within a domain.** Within any given domain, no two competencies share the same `id`. *(schema test 8)*

9. **Coming-soon domains have an empty competencies array.** Every domain with `comingSoon: true` has `competencies` equal to `[]`. *(schema test 9)*

10. **Universal domains are defined once.** The source file uses named constants for shared domains; the domains array for `qa`, `data`, and `ai` reference the same constant objects (or structural equals) rather than inline duplicates.

11. **No TypeScript errors.** `npx tsc --noEmit` exits with code 0 on the branch. No `any` type is present in `src/content/tracks.ts` or the accompanying test file.

12. **No runtime parsing.** `src/content/tracks.ts` contains no `JSON.parse`, `fs.readFile`, or dynamic import calls. All data is statically declared TypeScript.

13. **Dev track has five domains; QA/Data/AI tracks have four universal + one coming-soon.** Verified by inspecting `domains` array length and the `comingSoon` flag on the technical-skill domain per track.

14. **Dev technical-skill domain contains exactly nine competencies.** `writing-code`, `testing`, `debugging`, `observability`, `understanding-code`, `software-architecture`, `security`, `ai-assisted-engineering`, `ai-judgment-feature-delivery` — no more, no fewer.

---

## Definition of Done

- [ ] All 9 schema tests pass (`vitest run`) with zero failures and zero skips.
- [ ] `npx tsc --noEmit` exits clean; no `any` types introduced anywhere in the content layer.
- [ ] Universal domain constants are defined exactly once and reused by reference across all four tracks — no structural duplication in the source file.
- [ ] PR from `feature/T3-content-data` → `develop` is approved and merged; CI passes.
- [ ] **M1 release procedure complete:**
  - [ ] Cut `release/v0.1.0` branch from `develop`.
  - [ ] Bump `version` in `package.json` to `0.1.0`.
  - [ ] Open and merge PR from `release/v0.1.0` → `main`.
  - [ ] Tag `main` HEAD as `v0.1.0`.
  - [ ] Publish a GitHub Release named `v0.1.0` with a changelog summarising T1–T3 deliverables.
