# Behavior Spec — T-assessment-badge-viewer-6892jz: Evidence resolution + broken-link warning
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-6892jz/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Each `evidence_required` entry renders as an expandable reference chip; expanding it shows the resolved `instruments.rows[row_key]` text inline.
- Given: a badge with evidence_required entries pointing to instrument rows (some resolvable, some broken)
- When: getEvidenceForBadge(connectionString, badgeCode) is called
- Then: returns an array of EvidenceResult objects, one per entry, with resolved=true+rowText for found rows and resolved=false for missing instruments or row_keys

## B-2: AC-3 [e2e]: A badge detail page with ≥1 resolvable and ≥1 unresolvable evidence entry shows both the resolved row text and the broken-link warning in the same render.
- Given: a badge with mixed evidence_required (one resolvable, two broken: bad instrument_id and bad row_key)
- When: getEvidenceForBadge is called with the badge_code
- Then: returns exactly N results matching evidence_required length; resolved entries have rowText; broken entries have resolved=false with no rowText and are not omitted

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: An `evidence_required` entry whose `row_key`/`instrument_id` doesn't resolve shows a visible "evidence link broken" state — never silently dropped or blank. — coverage:

