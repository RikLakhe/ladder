---
approved_by: "unknown"
approved_at: "2026-08-05"
approved_sha256: "f38006dc009dadf5acdf40932968882589cd587e9b29f555644514654a80fe85"
---
## Verification — Task T-competency-browser-c1iutj — 2026-08-05
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- AC-1: `src/app/primary-functions/[pfId]/standard/page.tsx` queries `standards` via `getStandardsForPrimaryFunction` (`src/lib/standards.ts`), ordered P2–P7 via SQL `CASE` rank. Proven by `tests/T-competency-browser-c1iutj/standards.data.test.ts` (B-1): seeds P2/P4/P7 out of order for two PFs, asserts exact ordered rows for one PF only.
- AC-2: `?level=` narrows via `AND level = $2` in `src/lib/standards.ts`; page renders "No standard defined for this level." when `standards.length === 0`. Proven by `tests/T-competency-browser-c1iutj/standards-level-filter.data.test.ts` (B-2, regression guard): `level="P2"` returns one row, `level="P4"` (absent) returns `[]` not an error.
- AC-3: PF pill on `src/app/competencies/[id]/page.tsx` now wraps PF name in `<Link href={/primary-functions/${pf.id}/standard}>`. Proven e2e by `tests/T-competency-browser-c1iutj/standard-page.e2e.test.ts` (B-3): running server, competency page HTML contains the link, standard page 200s with the seeded body text.
- AC-4: `src/app/api/primary-functions/[pfId]/standard/route.ts` GET returns JSON array of `{level, body}` via the same shared query function; `?level=` narrows. Proven by `tests/T-competency-browser-c1iutj/standards-api.test.ts` (B-4): no-query returns both of one PF's rows in order excluding the other PF's; `?level=P2` returns exactly the one matching row.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- none

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- Critic (isolated Agent subagent, given only snapshot-TSD.md + diff + card ACs) initially flagged: AC-4's API route had no test proving `?level=<nonexistent>` returns `200 []` rather than an error — only the underlying data-query function (B-2) and the page's empty-state rendering were covered, not the API route itself for that case. Resolved before this write-up: added `it("?level= for a level with no row returns an empty array, not an error", ...)` to `tests/T-competency-browser-c1iutj/standards-api.test.ts`, asserting `status===200` and `body===[]` for `?level=P4` against a PF with no P4 row. Full suite re-run green (18 files / 38 tests) after the addition. No other hallucination concerns raised.

❌ **Missing:** acceptance criteria not addressed
- none — all of AC-1 through AC-4 covered per above.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1 [AC-1] data query, level order (tracer) | ✅ | ✅ | ✅ asserts ordered rows returned, not SQL internals | ✅ calls `getStandardsForPrimaryFunction` only | ✅ real Postgres, no mocks |
| B-2 [AC-2] level filter + empty state (regression guard — passed at RED, level param already implemented in B-1) | n/a (regression) | ✅ | ✅ asserts row/empty-array outcomes | ✅ calls `getStandardsForPrimaryFunction` only | ✅ real Postgres, no mocks |
| B-3 [AC-3] e2e nav + page render | ✅ | ✅ | ✅ asserts HTML link + rendered body via real HTTP | ✅ hits running `next dev` server over HTTP only | ✅ real Postgres + real HTTP, no mocks |
| B-4 [AC-4] JSON API route, order + level filter + empty state | ✅ | ✅ | ✅ asserts JSON response shape/content, not implementation | ✅ calls exported route `GET` handler only | ✅ real Postgres, no mocks |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — AC-3, B-3
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — N/A, TSD Boundaries: none; real Postgres used throughout regardless

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
