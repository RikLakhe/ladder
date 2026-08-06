# Behavior Spec — T-competency-browser-w1b7xx: Version history on a document
> Source: task card ACs + docs/features/0002-master-competency-browser/tasks/T-competency-browser-w1b7xx/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: A document view shows "last updated" derived from the most recent `document_versions` row for that `entity_table`/`entity_id`.
- Given: an entity (`entity_table='standards'`, `entity_id=<uuid>`) has 2 `document_versions` rows with different `created_at` timestamps, and another entity has its own unrelated row.
- When: `getDocumentVersions(connectionString, 'standards', entityId)` is called for the first entity.
- Then: it returns both rows ordered most-recent-first (so `rows[0]` is the most recent), and does not include the other entity's row.

## B-2: AC-2 [behavior]: A history control lists all `document_versions` rows for that entity in reverse-chronological order; an entity with zero versions shows a "no history" state, not an error.
- Given: an entity (`entity_table='standards'`, `entity_id=<uuid>`) has zero `document_versions` rows.
- When: `getDocumentVersions(connectionString, 'standards', entityId)` is called for that entity.
- Then: it returns `[]` (empty array), not an error/throw.

## B-3: AC-4 [behavior]: `GET /api/documents/:entityTable/:entityId/versions` returns a JSON array of `{changeNote, changedBy, createdAt}` ordered most-recent-first for that entity (per TSD S-0002.05 Interfaces).
- Given: a `standards` row with 2 `document_versions` rows at different timestamps, and another entity with its own unrelated row, via a running Next.js route handler.
- When: `GET /api/documents/standards/:entityId/versions` is requested for the first entity.
- Then: the response is a JSON array of `{changeNote, changedBy, createdAt}` objects, most-recent-first, containing only that entity's 2 rows.

## B-4: AC-3 [e2e]: Opening the history control on a real doc with ≥2 versions lists them in reverse-chronological order.
- Given:
- When:
- Then:

