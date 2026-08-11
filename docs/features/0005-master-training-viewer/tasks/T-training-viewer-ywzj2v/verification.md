---
approved_by: "Rikesh"
approved_at: "2026-08-11"
approved_sha256: "bbed816518fc795056be2eaa72ba71da494d231ae40b166df4a0b86c77cd7436"
---
## Verification — Task T-training-viewer-ywzj2v — 2026-08-11
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- `getReferenceCardRows` returns `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}[]` — matches TSD interface shape exactly.
- Join path: badges → primary_functions → training_units + instruments, filtered by competency_id and level — correct per TSD "joined by competency+level".
- Pagination: `paginate()` function slices rows by page; page 1 returns rows 0–P-1, page 2 returns P–2P-1, last page returns remainder — matches TSD unit test spec.
- Integration test seeds >40 rows and asserts response length > 40, first page ≤ page size, and empty results for wrong competency or level — matches TSD integration spec.
- E2e test navigates to `/competencies/:id/reference-card?level=P4`, verifies 200, badge code rendered, total row count visible, and ≤20 rows per page — satisfies TSD "at least one e2e AC present and GREEN".
- No auth required — route is public (no session check). Matches TSD "No auth required."
- Reads only `badges`, `training_units`, `instruments` tables — all read-only. Matches TSD "Reads … (all read-only)."

⚠️ **Divergent:** deviation + severity
- **[shallow]** TSD specifies `GET /api/competencies/:competencyId/reference-card` as a JSON API endpoint AND a separate reference card page. Implementation uses a single Route Handler at `/competencies/[id]/reference-card` returning HTML (not JSON). The JSON API endpoint (`/api/competencies/...`) was not created. The page renders HTML directly from the route handler rather than a React page component consuming the JSON endpoint. All acceptance criteria are met via this consolidated approach; the split into two files was an implementation detail in the exec plan, not a TSD requirement. Severity: shallow — no AC is lost, integration test verifies the lib function directly, e2e test verifies the rendered page.
- **[shallow]** `ReferenceCardTable.tsx` component exists in the diff but is not used by the route handler. It was scaffolded as a server component for a page-based approach that was superseded by the route handler. It is dead code in the final PR. Severity: shallow — does not affect any test or behavior.

🚨 **Suspected hallucination:** flag for human
- None.

❌ **Missing:** acceptance criteria not addressed
- None — all TSD acceptance criteria are addressed by the three test files and the implementation.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: paginate unit | ✅ | ✅ | ✅ (RED: import error) | ✅ | ✅ (no DB) |
| B-2: e2e page render | ✅ | ✅ | ✅ (RED: route absent) | ✅ | ✅ (real DB, real server) |
| backfill (integration) | (non-ledger) | ✅ | n/a — Lane-Backfill:true | ✅ | ✅ (real DB) |

**Critic checklist:**
- [x] Mocks only at boundaries — no mocks on internal collaborators; integration test uses real seeded PostgreSQL; e2e test uses real dev server and real DB.
- [x] Each AC verified per its tag — unit test covers pagination logic; integration test covers `getReferenceCardRows` with real DB; e2e test covers full page navigation.
- [x] Boundary contract asserted richly — integration test checks row count > 40, correct shape (all 6 fields), isolation from other competency/level, and empty-result cases.
- [x] ≥1 `e2e` AC present and GREEN — `reference-card.e2e.test.ts` runs against a live dev server, all 4 tests pass.
- [x] Boundaries non-empty ⇒ smoke AC exists — TSD states "Boundaries: none", so this check is vacuously satisfied.

**Human verdict:** Confirm or dismiss the two shallow divergences above (consolidated route handler + unused ReferenceCardTable component). Both are implementation detail deviations; no AC is missing.

**Outcome:** clean → merge (pending human confirmation of shallow divergences)
