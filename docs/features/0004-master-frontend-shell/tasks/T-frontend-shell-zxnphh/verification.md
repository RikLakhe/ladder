---
approved_by: "unknown"
approved_at: "2026-08-08"
approved_sha256: "e79571491dbf16b3dda6aea50495d55a93099a6a273c737fec9549ccbd463fdf"
---
## Verification — Task T-frontend-shell-zxnphh — 2026-08-08
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- AC-1 [behavior]: BadgesPage renders badge cards from mock service; level filter via `?level=` searchParam narrows list. `getBadges()` with optional `{ level }` filter implemented in `src/lib/mock/badges.ts`. Cards show badge_code, name, tier, certifies. Tests: `badges-list.test.tsx` covers unfiltered and `?level=P3` filtered render.
- AC-2 [behavior]: BadgeDetailPage renders certifies, completion_bar, verifier_role, cosigner indicator gated on `cosigner_required`, evidence entries resolved-or-broken-link, BadgeStatusLegend (3-state static). Broken-link evidence renders "⚠ evidence link broken" — never silently dropped (map preserves index). Tests: `badge-detail.test.tsx` covers cosigner present/absent and good/broken evidence.
- AC-3 [e2e]: BadgesPage wraps each badge in `<Link href="/badges/{badge_code}">`. CompetencyPage assessment tab renders `getBadgesForCompetency(id)` as `<Link href="/badges/{badge_code}">` items. Tests: `badge-nav.test.tsx` asserts link hrefs for both nav paths via `getByRole("link")`.
- TSD: Boundaries = none (no real DB reads). All data from mock fixtures only — conforms to spec.
- TSD: Access = public — no auth on any route.

⚠️ **Divergent:** deviation + severity (shallow/deep)
- [shallow] TSD mentions "scope/competency/level filterable" for the mock service; scope and competency filters are not implemented (level filter only). This is explicitly documented in the exec-plan open questions: scope/competency filters deferred — no AC asserts scope/competency filter behavior. Acceptable for mock-backed task.
- [shallow] TierChip component (planned in exec-plan) was not created as a standalone component — tier is rendered as plain text `<span>`. No AC asserts a TierChip component exists; badges render tier text correctly. No functional gap.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None identified.

❌ **Missing:** acceptance criteria not addressed
- None. All 3 ACs addressed and GREEN.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: Badges page lists + level filter | 168e77b | 598abca | ✅ (no Link in RED state) | ✅ (renders via page component) | ✅ (no DB; mock only) |
| B-2: Badge detail full render | f814883 | 5dd5c6d | ✅ (detail page absent at RED) | ✅ (renders via detail page) | ✅ (mock fixtures; resolveEvidence) |
| B-3: Both nav paths are links | 1960e97 | 4b12bae | ✅ (no Link wrapper at RED) | ✅ (role=link href assertions) | ✅ (vi.mock for DB calls in CompetencyPage) |

**Critic checklist:**
- [x] Mocks only at boundaries — CompetencyPage test mocks `lib/competencies`, `lib/primary-functions`, `lib/standards` (all DB-touching modules) at module boundary; no internal collaborator assertions
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness) — AC-1/AC-2 verified via rendered output; AC-3 [e2e] verified via link href assertions on rendered component tree
- [x] Boundary contract asserted richly (args/content), not bare "was called" — tests assert rendered text content, href values, presence/absence of testid elements
- [x] ≥1 `e2e` AC present and GREEN — AC-3 [e2e] is present and GREEN (badge-nav.test.tsx passes)
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — Boundaries: none (TSD); mock-only task; this check is N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
