## TSD S-0004.08 — Version history (mock-backed)  (PRD §S-0004.08)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning a version-history list (date, entity, change note, version, diff fields) per entity, shaped per `design/04-version-history.md`. |
| Data / State | Mock fixtures only. |
| Behavior | History page lists entries newest-first; expanding one shows a field-by-field old-vs-new diff. An entity with no history entries shows an explicit empty state, not a blank list. Reachable from a competency page and the global nav. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (empty-state renders when fixture has zero entries) / integration (entity with ≥2 entries renders reverse-chronological list; diff expand renders old/new values) |
