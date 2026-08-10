## Verification — Task T-assessment-badge-viewer-6892jz — 2026-08-10
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- `getEvidenceForBadge(connectionString, badgeCode)` returns `EvidenceResult[]` — one entry per `evidence_required` element, preserving order and count.
- Bad `instrument_id` (no matching row in instruments) → `{resolved: false}`, no `rowText`.
- Bad `row_key` (instrument exists but key absent in rows JSONB) → `{resolved: false}`, no `rowText`.
- Resolvable entry → `{resolved: true, rowText: <row.text>}`.
- Array length equals `evidence_required` length (no entries omitted).
- `badge_code TEXT` column added via idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` in migration.
- `EvidenceResult` type exported from `src/lib/badges.ts` matching TSD shape `{instrumentId, rowKey, resolved, rowText?}`.
- B-1 unit tests cover all individual resolution cases (resolvable, bad instrument_id, bad row_key, nonexistent badge).
- B-2 integration tests cover mixed-entry badge (1 resolvable + 2 broken) — array length, resolved flags, broken flags, no omissions.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- **SHALLOW**: TSD specifies `GET /api/badges/:badgeCode/evidence` as the interface, but no API route (`src/app/api/badges/[badgeCode]/evidence/route.ts`) was implemented in this PR. The exec-plan acknowledged this ("New GET /api/badges/[badgeCode]/evidence") but the diff contains only the lib function, not the route. The lib function is the agreed-upon unit for TDD, and the route is a thin wrapper — but the TSD interface contract is unmet.
- **SHALLOW**: TSD specifies rendering: "expandable chip for resolvable entry, visible 'evidence link broken' state for broken entry, never omitted." No UI changes to `src/app/badges/[badgeCode]/page.tsx` appear in the diff. The exec-plan listed this as scope for this task.
- **SHALLOW**: B-3 "e2e" tests (`evidence-e2e.test.ts`) test `getEvidenceForBadge` at the lib layer, not an actual HTTP endpoint or browser render. The TSD implies a reachable-through-system test. The `backfill` ledger marker honestly records that implementation preceded tests here — but the test does not verify the HTTP or UI surface.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None identified.

❌ **Missing:** acceptance criteria not addressed
- AC-1 ("expandable reference chip; expanding it shows the resolved text inline") — not yet implemented in UI.
- AC-3 ("badge detail page with ≥1 resolvable and ≥1 unresolvable shows both resolved row text and broken-link warning in the same render") — no page-level render logic shipped.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: getEvidenceForBadge unit (resolution logic) | ✅ lane red | ✅ lane green | ✅ | ✅ lib interface | ✅ real DB in test |
| B-2: integration — mixed evidence entries | ✅ lane red --regression | n/a (regression) | ✅ | ✅ | ✅ real DB |
| B-3: e2e — page renders chips and broken warnings | ✅ lane red --backfill | n/a (backfill) | — honest gap | lib layer only | ✅ real DB |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts (real DB in all tests, no mocks)
- [ ] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness) — AC-1 (expandable chip UI) and AC-3 (page render) not verified at their specified level; lib function is verified
- [x] Boundary contract asserted richly (args/content), not bare "was called" (evidence entries asserted by instrumentId, rowKey, resolved, rowText)
- [ ] ≥1 `e2e` AC present and GREEN (reachable through the running system) — B-3 tests the lib function, not the HTTP endpoint or UI render; no route implemented
- [x] Boundaries non-empty ⇒ a smoke AC exists — TSD says boundaries: none, so this item is vacuous/pass

**Human verdict:** Flags above are SHALLOW divergences. The core lib logic (getEvidenceForBadge) is complete and all its tests pass. The API route and UI rendering are deferred — owner must confirm/dismiss whether these ship in this task or a follow-on. — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
