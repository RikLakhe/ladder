# Behavior Spec — T-assessment-badge-viewer-2eetyh: Badge detail API routes + UI consuming live data
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-2eetyh/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `GET /api/badges/:badgeCode` returns JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}` for a known badge_code; unknown badge_code → 404 JSON `{error:"not found"}`
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: `GET /api/badges/:badgeCode/evidence` returns JSON array of `{instrumentId, rowKey, resolved: boolean, rowText?: string}`, one entry per element of that badge's `evidence_required`, preserving order; unknown badge_code → 404
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Badge detail page at `/badges/:badgeCode` renders certifies, completionBar, verifierRole sourced from the database (not mock); renders co-signer indicator when cosignerRequired=true, absent when false
- Given:
- When:
- Then:

## B-4: AC-4 [e2e]: Badge detail page renders each resolved evidence entry as an expandable chip showing rowText when expanded, and each unresolvable entry as a visible "evidence link broken" element (data-testid="evidence-broken") — matching the "Assessed via" card section in the design reference; no evidence entry omitted
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-5 [invariant]: Evidence entries are never silently omitted — page renders exactly as many evidence elements as the badge's evidence_required array length, including broken entries — coverage:

