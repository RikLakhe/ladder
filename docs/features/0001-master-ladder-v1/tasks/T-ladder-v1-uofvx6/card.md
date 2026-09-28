---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "390b4df278ca111d7544a8a9a9186a757ecee978440938d71421f0147d74faa9"
---
## Task T-ladder-v1-uofvx6 — Repository and Toolchain Foundation
**Story:** S-0001.01 · feature 0001-master-ladder-v1
**Milestone:** M1 (v0.1.0)
**Slice:** Scaffolding — creates the toolchain all other tasks depend on
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `npm test` exits 0 reporting at least one passing test; no Jest dependency in any config or lock file
- [ ] AC-2 [behavior]: `npx tsc --noEmit` exits 0 with `strict: true`, `noImplicitAny: true`, `strictNullChecks: true` present in `tsconfig.json`
- [ ] AC-3 [behavior]: `npm run build` exits 0 and produces a valid build artefact
- [ ] AC-4 [behavior]: `vitest.config.ts` at project root specifies `environment: 'jsdom'` and a `setupFiles` entry; no `any` type in any file under `src/`
- [ ] AC-5 [behavior]: `playwright.config.ts` exists with `testDir: './e2e'`; no Playwright step in CI workflow
- [ ] AC-6 [behavior]: `.github/workflows/ci.yml` triggers on PRs to `main` and `develop`; runs `npm ci`, `npm test`, `npm run build` on Node 20 Linux
- [ ] AC-7 [e2e]: A CI run on a feature PR shows all steps green
**End-to-end AC:** AC-7 [e2e] — CI run observable and green on the feature PR
**Tests:** N/A — scaffolding: this task creates the test runner; no Vitest-assertable behaviors exist before the toolchain is in place
**Test scope:** src/__tests__/sanity.test.ts
**Done =** reviewable PR, `npm test` + `npm run build` + `tsc --noEmit` all pass, CI green, `develop` branch exists and pushed.
