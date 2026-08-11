---
approved_by: "unknown"
approved_at: "2026-08-11"
approved_sha256: "a790a486d4aeccde0edce3f39ccf7c26c646aea6c2a798184ca1c48d16d856ed"
---
## Verification — Task T-assessment-badge-viewer-2eetyh — 2026-08-11
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- AC-1: `GET /api/badges/:badgeCode` returns `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}` JSON — exact shape per TSD. Unknown → 404 `{error:"not found"}`.
- AC-2: `GET /api/badges/:badgeCode/evidence` returns `EvidenceResult[]` via `getEvidenceForBadge`; unknown badge → 404. Guards with a badge-existence check before fetching evidence.
- AC-3: Page reads live DB only via `getBadgeByCode`; mock fallback removed. `cosignerRequired=true` renders `data-testid="cosigner-indicator"`, absent when false.
- AC-4: Evidence chips — resolved entry renders `data-testid="evidence-resolved"` + `rowText` inside `<details>`; unresolved renders `data-testid="evidence-broken"`. Maps full `evidenceRequired` array with no filtering (AC-5 invariant covered structurally).
- TSD `cosigner_required` toggle: B-3 e2e verifies indicator present for `2E-TEST` (cosigner=true) and absent for `2E-NO-COSIGN` (cosigner=false) via running Next.js dev server.
- TSD unknown badgeCode → not-found: `BadgeDetailPage` returns `<p>Badge not found.</p>` when `getBadgeByCode` returns null.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- TSD interface lists HTML page as `GET /[competency]/[pf]/badges/[badgeCode]` but implementation serves at `/badges/[badgeCode]`. This divergence was inherited from task T-assessment-badge-viewer-b69y3s and acknowledged in that task's verification. Severity: shallow (URL shape deferred; function is correct).
- TSD specifies "Verifier section shows verifier_role; co-signer indicator + explanatory tooltip renders only when cosigner_required is true". Implementation renders the indicator but no tooltip was added. Severity: shallow (tooltip language absent from exec-plan ACs; cosmetic omission).

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None detected.

❌ **Missing:** acceptance criteria not addressed
- None missing from exec-plan ACs.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: GET /api/badges/:badgeCode JSON | ✅ | ✅ | ✅ route handler tested directly | ✅ | ✅ real DB seeded |
| B-2: GET /api/badges/:badgeCode/evidence | ✅ | ✅ | ✅ route handler tested directly | ✅ | ✅ real DB seeded |
| B-3+B-4: page e2e + evidence chips | ✅ | ✅ | ✅ fetch from running dev server | ✅ | ✅ real DB seeded |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts (badge-detail.test.tsx uses vi.mock for DB boundary; api tests use real DB)
- [x] Each AC verified per its tag — AC-1 JSON endpoint: B-1 unit; AC-2 evidence route: B-2 integration; AC-3 page live data: B-3 e2e; AC-4 evidence chips: B-4 e2e (in same file as B-3); AC-5 invariant: covered structurally in B-4
- [x] Boundary contract asserted richly (args/content), not bare "was called" — tests assert full JSON shape, field values, status codes, and HTML content
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — B-3/B-4 fetch from live `next dev` server
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — TSD says boundaries: none; N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
