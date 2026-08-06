## TSD S-0002.05 — Version history on a document  (PRD §S-0002.05)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/documents/:entityTable/:entityId/versions` — JSON array of `{changeNote, changedBy, createdAt}` ordered most-recent-first. |
| Data / State | Reads `document_versions` (read-only), filtered by `entity_table` + `entity_id`. |
| Behavior | A document view surfaces the most recent version's timestamp as "last updated." A history control lists all versions for that entity in reverse-chronological order. Entity with zero versions renders "no history" rather than erroring. |
| Access | Public — no auth required (viewing history is read-only, distinct from authoring). |
| Boundaries | none |
| Tests | unit (reverse-chronological sort) / integration (entity with N `document_versions` rows → history list length N, order verified; entity with 0 rows → no-history state) |
