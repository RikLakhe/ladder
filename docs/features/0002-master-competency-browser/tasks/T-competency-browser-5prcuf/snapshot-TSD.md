## TSD S-0002.02 — Drill into a competency's primary functions  (PRD §S-0002.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /competencies/:id` — HTML page. `GET /api/competencies/:id/primary-functions` — JSON array of `{id, name}`. |
| Data / State | Reads `competencies`, `primary_functions` (read-only). |
| Behavior | Given a competency id, returns/renders only primary functions whose `competency_id` equals that id. Unknown competency id → 404 / not-found state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (filter excludes primary functions of other competencies) / integration (two competencies each with their own PFs → each competency page shows only its own) |
