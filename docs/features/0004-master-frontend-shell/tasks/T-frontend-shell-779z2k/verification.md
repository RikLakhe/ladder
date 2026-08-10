---
approved_by: "unknown"
approved_at: "2026-08-10"
approved_sha256: "a31fbe8b7a5e5b3555a771076d9300c8db1f887f2f96bdff092e4aa04e827707"
---
## Verification — T-frontend-shell-779z2k — 2026-08-10
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- Empty state (`<EmptyState variant="no-history-yet">`) rendered when entries.length === 0 — matches TSD explicit empty state requirement
- Newest-first sort: `sort((a,b) => b.createdAt.localeCompare(a.createdAt))` — per spec "lists entries newest-first"
- Expand/collapse toggle shows field-by-field old-vs-new diff (VersionDiffView) — per spec "expanding one shows a field-by-field old-vs-new diff"
- Mock service `getVersionHistory()` called only at page boundary — mock-backed only, no real DB writes
- Reachable from competency page via `<Link href="/version-history?entityType=competency&entityId={id}">View History</Link>`
- Reachable from global nav: Shell.tsx already has `{ href: "/version-history", label: "Version History" }` — satisfies "and the global nav" spec clause (pre-existing, not changed here)
- Public, no auth required — no auth middleware in route or component
- Unit test: empty-state renders when zero entries — version-history-list.test.tsx
- Integration test: entity with ≥2 entries renders reverse-chronological list (newest first, date + editor + change-note visible) — version-history-list.test.tsx
- Integration test: diff expand renders old/new values, changed/unchanged rows correctly labelled — version-history-diff.test.tsx
- e2e test: View History link present on competency page with correct params, version-history page returns 200 — view-history-link.e2e.test.ts

⚠️ **Divergent:** deviation + severity (shallow/deep)
- **oldSnapshot/newSnapshot vs. single snapshot**: Design doc (04-version-history.md) shows single `snapshot jsonb` column. Mock type has `oldSnapshot` + `newSnapshot` (precomputed for display). Deviation is in mock shape only — real DB schema is unchanged. (shallow — mock-tier only, consistent with TSD "Mock fixtures only"; no production schema change)
- **changedBy as email string**: Design shows `changed_by` as `admin_user_id` (UUID FK). Mock uses email string for display. (shallow — mock-tier only, display-friendly; no real FK lookup needed for mock)

🚨 **Suspected hallucination:** flag for human (false positives expected)
- Critic flagged "global nav link missing" — DISMISSED: Shell.tsx line 15 already has `{ href: "/version-history", label: "Version History" }`. No nav change needed.
- Critic flagged "cannot verify test richness" — DISMISSED: tests were reviewed directly. version-history-diff.test.tsx asserts changed vs. unchanged row aria-labels, expand/collapse, old/new values. version-history-page.test.tsx asserts newest-entry date and empty-state text. Assertions are substantive.

❌ **Missing:** acceptance criteria not addressed
- (none)

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: list + empty state | ✅ (commit 5b4fefd) | ✅ (commit 46bf9ac) | ✅ | ✅ | ✅ |
| B-2: expand diff | ✅ (backfill: commit f38594c; impl existed from B-1) | ✅ (B-1 GREEN covered) | ✅ | ✅ | ✅ |
| B-3: nav link | ✅ (commit 46f5460) | ✅ (commit 778eeef) | ✅ | ✅ | N/A |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — `getVersionHistory()` called only in version-history/page.tsx server component; VersionHistoryList receives plain data, no mock dependency
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness) — list order, empty state, expand/collapse, diff fields all tested via render assertions
- [x] Boundary contract asserted richly (args/content), not bare "was called" — tests assert date, editor, change-note text; diff table aria-label; changed/unchanged row labels
- [x] ≥1 `e2e` AC present and GREEN — view-history-link.e2e.test.ts: 2 tests, both GREEN (149/149 suite pass)
- [x] Boundaries non-empty ⇒ a smoke AC exists — spec declares "Boundaries: none"; N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path L)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
