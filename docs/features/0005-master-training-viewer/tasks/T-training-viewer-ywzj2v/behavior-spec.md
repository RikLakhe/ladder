# Behavior Spec — T-training-viewer-ywzj2v: Reference card
> Source: task card ACs + docs/features/0005-master-training-viewer/tasks/T-training-viewer-ywzj2v/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet) [unit]: Pagination pure function
- Given: an array of rows and a page number and page size
- When: `paginate(rows, page, pageSize)` is called
- Then: page 1 returns rows 0..pageSize-1; page 2 returns rows pageSize..2*pageSize-1; last page returns remainder; out-of-bounds returns empty; empty input returns empty

## B-2 [integration]: `getReferenceCardRows(db, competencyId, level)` returns joined badge/training_unit/instrument rows from real DB
- Given: a seeded DB with >40 joined rows for competency+level
- When: `getReferenceCardRows` is called for that competency+level
- Then: all >40 rows returned; no rows from other competency_ids or levels appear; empty competency returns empty array

## B-3 [e2e]: Reference card page renders paginated table for seeded competency+level
- Given: a dev server running with seeded competency+level having >40 joined rows
- When: user navigates to `/competencies/[id]/reference-card?level=P3`
- Then: paginated table visible with first page ≤20 rows; total count shown; next-page button works; all rows reachable; no crash

