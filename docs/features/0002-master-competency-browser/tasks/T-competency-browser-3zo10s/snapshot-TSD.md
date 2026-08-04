## TSD S-0002.01 — Browse competencies  (PRD §S-0002.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /` — returns HTML listing all competencies. `GET /api/competencies` — returns JSON array of `{id, name, primaryFunctionCount}`. |
| Data / State | Reads `competencies`, `primary_functions` (read-only). |
| Behavior | Every row in `competencies` appears once as a card with its name and a count of rows in `primary_functions` where `competency_id` matches. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (count aggregation for a competency with 0/1/N primary functions) / integration (seeded DB → home route returns one card per competency, count matches DB) |
