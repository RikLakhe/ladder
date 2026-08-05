## TSD S-0002.03 — View a standard document by level  (PRD §S-0002.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /primary-functions/:pfId/standard` — HTML page. `GET /api/primary-functions/:pfId/standard` — JSON array of `{level, body}` ordered by level. Optional `?level=<level>` query narrows to one level. |
| Data / State | Reads `standards` (read-only), filtered by `pf_id`. |
| Behavior | Without `level`, all levels for that primary function are returned/rendered in level order. With `level`, only the matching row is returned/rendered; a level with no `standards` row renders an explicit empty state, not an error. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (level-order sort; empty-state for missing level) / integration (seeded `standards` rows for a PF across P2–P7 → all-levels view returns them in order; single-level query returns exactly one) |
