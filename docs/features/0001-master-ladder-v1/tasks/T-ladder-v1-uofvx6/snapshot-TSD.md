## TSD S-0001.01 — Repository and Toolchain Foundation  (PRD §S-0001.01)

| Aspect | Spec |
|--------|------|
| Interfaces | `npm test` — runs unit/component test suite, exits 0 on pass, non-zero on any failure. `npm run build` — produces a static build artefact from source. `npx tsc --noEmit` — type-checks entire project, exits 0 with no errors. |
| Data / State | None. |
| Behavior | (B-1) `npm test` exits 0 and reports at least one passing test; no Jest dependency exists anywhere in the project. (B-2) `npm run build` exits 0 and produces a valid build artefact. (B-3) `npx tsc --noEmit` exits 0 with strict mode, `noImplicitAny`, and `strictNullChecks` all active. (B-4) A CI workflow runs `npm ci`, `npm test`, and `npm run build` on every pull request targeting the main and integration branches; the workflow runs on Node 20 and a Linux runner. (B-5) An end-to-end test runner is configured with its test directory set to `e2e/`; it is not invoked by the CI workflow. (B-6) A UI component library is initialised; its configuration file exists at the project root and its generated component directory exists under `src/`. (B-7) No file under `src/` contains a bare `any` type annotation. |
| Access | Developers and CI system. |
| Boundaries | External: GitHub Actions CI environment, Node.js package registry (install-time only). |
| Tests | Unit: sanity test asserting a trivially true expression (proves runner works). Smoke: `npm run build` exits 0 on a clean install — run in CI on every PR. |

---
