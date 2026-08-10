# Behavior Spec — T-frontend-shell-779z2k: Version history (mock-backed)
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-779z2k/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: An entity's Version History view lists prior revisions (date, editor, change-note) from a mock data service, newest first.
- Given: a mock service fixture with ≥2 version entries for an entity (e.g. competency-1), entries seeded with distinct dates
- When: `VersionHistoryList` renders with those entries, and separately renders with an empty entries array
- Then: entries appear in newest-first order (first row's date ≥ second row's date); with empty array, the `EmptyState` `no-history-yet` variant renders instead of a list

## B-2: AC-2 [behavior]: Selecting two revisions shows a diff view highlighting changed fields.
- Given: a `VersionHistoryList` rendered with an entry that has both `oldSnapshot` and `newSnapshot` (at least one field differs)
- When: the user clicks the expand control on that entry
- Then: the diff view appears, showing the changed field(s) with old and new values; unchanged fields are not highlighted; a field present only in one snapshot is also surfaced

## B-3: AC-3 [e2e]: Navigating from an entity's detail page to Version History and back preserves the entity's state (no dead link, no lost scroll/tab context).
- Given: the competency detail page (`/competencies/[id]`) is rendered with a "View History" link
- When: the link is present in the rendered output
- Then: the link's `href` resolves to `/version-history?entityType=competency&entityId=[id]` (non-empty, no 404 at that URL); a back-navigation link or the shell nav allows return without dead routes
