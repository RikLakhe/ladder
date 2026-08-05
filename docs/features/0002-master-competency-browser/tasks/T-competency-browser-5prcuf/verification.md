---
approved_by: "unknown"
approved_at: "2026-08-05"
approved_sha256: "70bc5588d85bcff959830f8b1fb0fd5f337164c99e050b05338ad4137aa1d3ef"
---
## Verification — Task T-competency-browser-5prcuf — 2026-08-05
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- AC-1: `GET /competencies/:id` filters `primary_functions` by `competency_id = :id` — `src/lib/primary-functions.ts` (`WHERE competency_id = $1`), rendered in `src/app/competencies/[id]/page.tsx`. Real-DB test: `tests/T-competency-browser-5prcuf/primary-functions.data.test.ts`.
- AC-2 [invariant]: no cross-competency leakage — same data test asserts competency B's PF ("Mentoring") is absent from competency A's results.
- AC-3 [e2e]: home page card links to `/competencies/:id`; that page renders competency name + PF names, verified through a running `next dev` server — `tests/T-competency-browser-5prcuf/competency-page.e2e.test.ts`.
- AC-4: `GET /api/competencies/:id/primary-functions` returns JSON array of `{id, name}` scoped by `competency_id` — `src/app/api/competencies/[id]/primary-functions/route.ts`, tested in `tests/T-competency-browser-5prcuf/primary-functions-api.test.ts`.
- AC-5: unknown competency id returns 404 for both the API (`not-found.test.ts`, unit on the route handler) and the page, now also covered end-to-end through the running server (`competency-page.e2e.test.ts`, added after Critic review flagged the gap).

⚠️ **Divergent:** deviation + severity (shallow/deep)
- none

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- none — Critic's original concern (e2e only exercised one competency, not two, and had no page-level 404 case) was addressed: added an e2e 404 case for the page route. Cross-competency isolation itself is proven at the data layer (real Postgres query, two competencies seeded, one asserted absent from the other's result) — sufficient proof for AC-2 without needing a second e2e page render of the same query path already covered by AC-3's e2e.

❌ **Missing:** acceptance criteria not addressed
- none

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1 (tracer): AC-1/AC-2 — data query scoped by competency_id | ✅ | ✅ | ✅ (asserts returned PF set) | ✅ (`getPrimaryFunctionsForCompetency`) | ✅ (real Postgres, no mocks) |
| B-2: AC-3 — e2e card-click nav | ✅ | ✅ | ✅ (asserts rendered HTML via real HTTP) | ✅ (fetch against running server) | ✅ (real server + real DB) |
| B-3: AC-4 — JSON API route | ✅ | ✅ | ✅ (asserts response shape) | ✅ (route `GET` handler) | ✅ (real Postgres, no mocks) |
| B-4: AC-5 — 404 for unknown id | regression guard (non-ledger; 404 logic already existed from B-2/B-3 GREENs) | — | n/a | n/a | n/a — proven via `not-found.test.ts` (API, real DB) + added e2e case in `competency-page.e2e.test.ts` (page, real server) |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — AC-3, plus the added AC-5 page e2e case
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — n/a, no external boundaries (real Postgres only)

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
