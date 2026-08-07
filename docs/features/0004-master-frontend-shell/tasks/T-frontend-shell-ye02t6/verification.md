---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "64a13bcb2714cfed6022c023fb58d43d812bf63a86f9f25b4ca5a016379ccb2b"
---
## Verification — Task T-frontend-shell-ye02t6 — 2026-08-07
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- AC-1: Home lists every competency as a card (name, domain, PF count) from the real competencies API. Proven pre-existing at task base by `tests/T-frontend-shell-ye02t6/home-cards.e2e.test.ts` (recorded as `--regression`, non-ledger).
- AC-2: Focus panel and What's Next panel render only when the mock data service has content for the current session level; omitted entirely otherwise. New behavior, proven by `tests/T-frontend-shell-ye02t6/home-panels.test.tsx` (`src/lib/homePanels.ts`, `src/components/HomePanels.tsx`).
- AC-3: Clicking a competency card navigates to that competency's page. Proven pre-existing at task base by `tests/T-frontend-shell-ye02t6/home-to-competency-nav.e2e.test.ts` (recorded as `--regression`, non-ledger) — asserts the home page's card link `href` and that the destination page returns 200 and renders the competency's data.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- none

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- none

❌ **Missing:** acceptance criteria not addressed
- none

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1 (AC-1, card grid) | non-ledger `--regression` (behavior existed at base) | n/a | ✅ | ✅ | ✅ (real DB, no mock) |
| B-2 (AC-2, panels) | ✅ | ✅ | ✅ | ✅ | ✅ (mock data service is the boundary, per exec-plan) |
| B-3 (AC-3, nav) | non-ledger `--regression` (behavior existed at base) | n/a | ✅ | ✅ | ✅ (real DB + real running app, no mock) |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — AC-1 and AC-3 are e2e/regression-guarded through the real running app
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — no external boundaries introduced (mock panel data service is spec-mandated, no smoke AC required per exec-plan)

Fresh-context Critic (independent subagent, spec+diff only) reviewed the full diff and reported one test-quality nit: `home-panels.test.tsx` used `getByRole(...).toBeDefined()` instead of `queryByRole(...).not.toBeNull()` for the positive-case assertions — fixed (non-behavioral test-clarity edit, tests re-run and still GREEN). No other findings; ACs fully covered, no dead code or regressions.

**Human verdict:** each item confirmed/dismissed — signed by __ (Path L)
**Outcome:** clean → merge
