## Task T-ladder-v1-zo28dg — Production Readiness: Accessibility, Performance, Coming-Soon Polish
**Story:** S-0001.10 · feature 0001-master-ladder-v1
**Milestone:** M5 (v0.5.0) + M6 (v1.0.0)
**Depends on:** T-ladder-v1-uogik5
**Slice:** Audit and fix — no new features; makes existing behaviors accessible, performant, and release-ready
**Acceptance criteria:**
- [ ] AC-1 [behavior]: QA/Data/AI `technical-skill` domain pages render "Coming soon" placeholder; zero competency links; Dev `technical-skill` renders competency links; driven by `comingSoon` flag — no hard-coded per-track conditionals
- [ ] AC-2 [non-functional]: Every button has accessible name; every link has descriptive text; every checkbox has associated label; track/level buttons carry `aria-pressed`
- [ ] AC-3 [non-functional]: Primary brand colour on white background meets ≥ 4.5:1 contrast ratio at normal text (WCAG AA) — result documented in PR description
- [ ] AC-4 [non-functional]: Lighthouse Performance, Accessibility, Best Practices, SEO all ≥ 90 on production build
- [ ] AC-5 [behavior]: Root layout declares document language as `en`; includes meta description; each route exports unique descriptive title and description
- [ ] AC-6 [e2e]: 4 Playwright E2E tests in `e2e/coming-soon.spec.ts` pass manually against production build; excluded from CI
- [ ] AC-7 [invariant]: `npm run build` and `tsc --noEmit` both exit 0; no `any` types in code introduced by this task
- [ ] AC-8 [e2e]: v0.5.0 and v1.0.0 GitHub Releases exist on `main`, tagged and published; v1.0.0 marked as Latest; Vercel production deployment reflects v1.0.0
**End-to-end AC:** AC-8 [e2e] — v1.0.0 live on Vercel
**Tests:** N/A — e2e-only: all validation is manual Playwright E2E + Lighthouse audit against production build; no Vitest-assertable unit behaviors introduced
**Test scope:** e2e/coming-soon.spec.ts (manual only)
**Done =** reviewable PR, Lighthouse ≥ 90 all categories documented in PR description, 4 E2E tests green locally, `npm run build` clean, v1.0.0 tagged and deployed.
