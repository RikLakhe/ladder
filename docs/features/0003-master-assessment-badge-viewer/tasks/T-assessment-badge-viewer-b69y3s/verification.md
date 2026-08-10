## Verification — Task T-assessment-badge-viewer-b69y3s — 2026-08-10
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- `BadgeDetail` component renders badge code, name, tier, level, certifies, completionBar, verifierRole.
- `data-testid="cosigner-indicator"` element present when `cosignerRequired=true`, absent when `false`.
- `getBadgeByCode(connectionString, badgeCode)` returns full `BadgeDetail` object with all mapped fields; returns `null` for unknown badge code.
- `migrations/0003_badges_columns.sql` adds all required columns (`badge_code`, `tier`, `certifies`, `completion_bar`, `verifier_role`, `cosigner_required`) via idempotent `ADD COLUMN IF NOT EXISTS`.
- B-1 unit test covers co-signer indicator toggle (no DB needed).
- B-2 integration test covers `getBadgeByCode` with `cosigner_required=true`, `false`, and unknown code → null.
- B-3 e2e test fetches `/badges/B69-TEST` from a running Next.js server and asserts 200 + correct content in HTML.
- Unknown `badgeCode` → page renders "Badge not found." not-found state (non-crashing).

⚠️ **Divergent:** deviation + severity (shallow/deep)
- **SHALLOW**: TSD interface specifies `GET /api/badges/:badgeCode` returning JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}`. No API route was implemented — only the lib function and page. The page calls the lib directly (server component), which is a valid implementation pattern, but the JSON endpoint contract is unmet.
- **SHALLOW**: TSD specifies the page route as `GET /[competency]/[pf]/badges/[badgeCode]` (nested under competency/PF path). The actual page is at `/badges/[badgeCode]` — a flatter route. The B-3 test confirms `/badges/B69-TEST` works, but the URL shape differs from the TSD.
- **SHALLOW**: `src/app/badges/[badgeCode]/page.tsx` imports from `src/lib/mock/badges` as a DB fallback. Mock data is a runtime fallback path (when DB query fails), not the primary path — but introducing mock fallback in production page code is a divergence from the "Reads badges (read-only)" clean-boundary spec. The primary (DB) path is correct; the fallback is extra.
- **SHALLOW**: `resolveEvidence` function added to `src/lib/badges.ts` (exported) — not in TSD scope for this task; this is T-6892jz territory. Low risk as it's additive.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None identified.

❌ **Missing:** acceptance criteria not addressed
- AC-1 (`GET /api/badges/:badgeCode` JSON endpoint) — not implemented.
- Exact URL shape `GET /[competency]/[pf]/badges/[badgeCode]` — page is at `/badges/[badgeCode]` instead.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: co-signer indicator toggles (unit) | ✅ lane red | ✅ lane green | ✅ | ✅ BadgeDetail props | ✅ no mocks needed |
| B-2: getBadgeByCode integration (regression) | ✅ (in B-1 RED commit, regression guard) | n/a | ✅ | ✅ lib interface | ✅ real DB |
| B-3: page e2e — HTTP 200 + correct content (regression) | ✅ (in B-1 RED commit, regression guard) | n/a | ✅ | ✅ HTTP surface | ✅ real DB + real server |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts (real DB in integration/e2e; component tests use props only)
- [ ] Each AC verified per its tag — AC-1 JSON endpoint not implemented; URL shape diverges from TSD
- [x] Boundary contract asserted richly (args/content) — integration test asserts all field values; e2e asserts badge_code, name, tier in HTML body
- [x] ≥1 `e2e` AC present and GREEN — B-3 e2e test fetches from a running Next.js server and is GREEN
- [x] Boundaries non-empty ⇒ a smoke AC exists — TSD says boundaries: none, vacuous/pass

**Human verdict:** Flags are SHALLOW. Core lib logic and component correct; page works at `/badges/[badgeCode]`. JSON API endpoint and exact URL shape are deferred — owner must confirm/dismiss. — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
