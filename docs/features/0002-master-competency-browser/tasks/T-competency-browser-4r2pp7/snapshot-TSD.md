## TSD S-0002.04 — View functional analysis and badges for a primary function  (PRD §S-0002.04)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/primary-functions/:pfId/functional-analysis` — JSON array of `{level, body}`. `GET /api/primary-functions/:pfId/badges` — JSON array of `{id, name, level}`. |
| Data / State | Reads `functional_analyses` and `badges` (read-only), filtered by `pf_id`. |
| Behavior | Returns/renders only rows whose `pf_id` matches the requested primary function. A primary function with no rows in either table renders an explicit empty state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (filter by pf_id excludes other PFs' rows) / integration (PF with rows in both tables → both render; PF with neither → empty states, no error) |
