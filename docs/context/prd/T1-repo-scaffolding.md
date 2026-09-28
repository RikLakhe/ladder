# T1 — Repo Scaffolding
**Epic:** Foundation & Environment Setup
**Milestone:** M1 (v0.1.0)
**Branch:** feature/T1-repo-scaffold

## Epic

Establish a production-ready repository baseline — correctly configured toolchain, enforced type safety, testing infrastructure, and automated CI — so that all subsequent feature work begins from a verified, consistent foundation.

## User Stories

1. As a developer, I want a Next.js 15 App Router project with strict TypeScript configured so that type errors are caught at compile time and the `any` type is prohibited across the codebase.
2. As a developer, I want Tailwind CSS, shadcn/ui, Zustand, Vitest, React Testing Library, and Playwright installed and configured so that I can build, style, state-manage, and test features without additional setup.
3. As a developer, I want a branching model with `main` (protected), `develop` (integration), and `feature/T{n}-{slug}` feature branches so that changes flow through a controlled, reviewable process before reaching production.
4. As the CI system, I want a GitHub Actions workflow that runs `npm test` and `npm run build` on every PR targeting `main` or `develop` so that broken builds and failing tests are blocked from merging automatically.

## Tasks

1. Initialise a new Next.js 15 project using `npx create-next-app@latest` with the App Router, TypeScript, and Tailwind CSS options selected.
2. Set `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true` in `tsconfig.json`.
3. Install and initialise shadcn/ui via `npx shadcn@latest init`, selecting the default style and confirming Tailwind integration.
4. Install Zustand: `npm install zustand`.
5. Install Vitest and React Testing Library: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom`.
6. Create `vitest.config.ts` at the project root configuring the jsdom environment and the `@testing-library/jest-dom` setup file.
7. Add a `vitest.setup.ts` file importing `@testing-library/jest-dom`.
8. Add `"test": "vitest run"` (and `"test:watch": "vitest"`) to `package.json` scripts.
9. Write a sanity test at `src/__tests__/sanity.test.ts` that asserts `true === true` and verify `npm test` exits green.
10. Install Playwright: `npm init playwright@latest` — accept defaults, target `e2e/` directory, do not add a GitHub Actions workflow at this step.
11. Create `.github/workflows/ci.yml` with a workflow triggered on `pull_request` to `main` and `develop`, running `npm ci`, `npm test`, and `npm run build` on `ubuntu-latest` / Node 20.
12. Create the `develop` branch from `main` and push both to the remote; configure branch protection on `main` (require PR + passing CI status check).
13. Commit all scaffold files on `feature/T1-repo-scaffold` and open a PR to `develop`.

## Acceptance Criteria

1. `npx tsc --noEmit` exits with code 0 and produces no errors on the clean scaffold.
2. `tsconfig.json` contains `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true` — verified by file inspection.
3. `npm test` exits with code 0 and reports the sanity test as passed; no Jest references appear in any config or lock file.
4. A file named `vitest.config.ts` exists at the project root and specifies `environment: 'jsdom'` and a `setupFiles` entry pointing to `vitest.setup.ts`.
5. `npm run build` exits with code 0 and produces a valid Next.js build artefact in `.next/`.
6. The GitHub Actions workflow file exists at `.github/workflows/ci.yml`, declares triggers for PRs to both `main` and `develop`, and includes steps for `npm ci`, `npm test`, and `npm run build`.
7. A CI run is observable on the feature PR and shows all steps green (no red checks).
8. The `main` branch rejects a direct push without a PR (branch protection active).
9. `shadcn/ui` is initialised: `components.json` is present at the project root and `src/components/ui/` exists.
10. Zustand is listed under `dependencies` in `package.json`.
11. Playwright configuration (`playwright.config.ts`) exists with the `e2e/` directory as the test directory; no Playwright step is present in `ci.yml`.
12. No file in `src/` contains a bare `any` type annotation (verified by `grep -r ': any' src/` returning no matches).

## Definition of Done

- All 12 Acceptance Criteria above are met and verified by a reviewer.
- `npm test`, `npm run build`, and `npx tsc --noEmit` all pass locally on a clean `npm ci`.
- CI workflow runs green on the feature PR (both `npm test` and `npm run build` steps).
- Branch protection is configured on `main`; `develop` branch exists and is pushed to the remote.
- No `any` types are present anywhere in the codebase.
- All testing tooling uses Vitest + RTL exclusively — no Jest dependency exists in `package.json` or any config file.
- The PR for `feature/T1-repo-scaffold` is reviewed and approved before merge to `develop`.
- The milestone tag `v0.1.0` is applied after the PR merges to `main`.
