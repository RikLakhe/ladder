---
approved_by: ""
approved_at: ""
planned_behaviors: ""
---
## Exec Plan — Task T-ladder-v1-uofvx6

> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Next.js 15 App Router project via `create-next-app` with TypeScript, Tailwind CSS (AC-2, AC-3)
- Vitest + jsdom + React Testing Library setup with `vitest.config.ts` and `setupFiles` (AC-1, AC-4)
- Sanity test at `src/__tests__/sanity.test.ts` — one passing assertion to prove runner works (AC-1)
- Playwright config at `playwright.config.ts` with `testDir: './e2e'` and empty `e2e/` dir (AC-5)
- GitHub Actions CI at `.github/workflows/ci.yml` — triggers on PRs to `main`; runs `npm ci`, `npm test`, `npm run build` on Node 20 Linux (AC-6)
- Strict TypeScript config (`strict`, `noImplicitAny`, `strictNullChecks`) (AC-2)

**Approach:**
Scaffold via `create-next-app --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"`. Then layer on: remove Jest/Jest-adjacent if scaffolded, add Vitest + RTL, add Playwright, write CI workflow, write sanity test. Verify all three commands pass before committing.

**Boundaries & mocks:**
- No network calls, no external services — pure local toolchain.
- No fakes needed; everything is filesystem + process exit codes.
- Smoke AC: AC-7 — CI run on the feature PR (real GitHub Actions environment).

**Behaviors (TDD order):**
N/A — Tests: N/A card. Implementation order instead:

1. Scaffold Next.js 15 project (confirms `npm run build` baseline — AC-3)
2. Replace/remove any Jest deps; install Vitest, jsdom, @testing-library/react, @testing-library/jest-dom (AC-1, AC-4)
3. Write `vitest.config.ts` with `environment: 'jsdom'` and `setupFiles: ['./src/test-setup.ts']` (AC-4)
4. Write `src/test-setup.ts` importing `@testing-library/jest-dom` (AC-4)
5. Write `src/__tests__/sanity.test.ts` — one passing `expect(true).toBe(true)` (AC-1)
6. Verify `npm test` exits 0 with ≥1 passing test, no Jest dep in package.json or lock (AC-1)
7. Confirm `tsconfig.json` has `strict`, `noImplicitAny`, `strictNullChecks`; run `npx tsc --noEmit` (AC-2)
8. Confirm `npm run build` exits 0 (AC-3)
9. Install Playwright; write `playwright.config.ts` with `testDir: './e2e'`; create `e2e/.gitkeep` (AC-5)
10. Write `.github/workflows/ci.yml` — trigger on `pull_request` to `main`; steps: checkout, Node 20, npm ci, npm test, npm run build (AC-6)
   - Note: AC-6 card text says "main and develop" — branching model is main-only (see CONTRIBUTING.md). CI targets `main` only. Deviation from card text, consistent with approved CONTRIBUTING.md.
11. Confirm no `any` types in any file under `src/` (AC-4)
12. Push branch, open PR, verify CI green (AC-7)

**PR will contain:**
- `package.json` + `package-lock.json` — Next.js 15, Tailwind, Vitest, RTL, Playwright
- `vitest.config.ts`, `src/test-setup.ts`
- `src/__tests__/sanity.test.ts`
- `playwright.config.ts`, `e2e/` dir
- `.github/workflows/ci.yml`
- `tsconfig.json` with strict settings
- Standard Next.js 15 App Router scaffold (`src/app/`, `src/components/`, etc.)
- `.gitignore` updated to exclude `node_modules/`, `.next/`, `playwright-report/`, `test-results/`

**Open questions / ambiguities:**
- AC-6 card says CI triggers on `main` and `develop`. Our branching model (CONTRIBUTING.md, lane.config) is main-only. Resolved: CI targets `main` only — consistent with settled branching model. No re-approval needed; the card text is a stale artifact.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None — pure scaffolding, no logic, no security surface, no ambiguities requiring SA.

- [ ] Refactor pass done (on green; tests unchanged) — before PR
