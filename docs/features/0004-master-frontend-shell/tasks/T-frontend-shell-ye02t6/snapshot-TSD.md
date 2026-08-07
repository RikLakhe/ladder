## TSD S-0004.02 — Home page  (PRD §S-0004.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies` (existing) — reused for the card grid. Optional focus/what's-next panels driven by a mock data service (no real backing table). |
| Data / State | Reads `competencies` (read-only, real). Focus/next-level panel data from mock service, keyed by current session level/role. |
| Behavior | Renders one card per competency (name, domain, PF count). Focus panel and what's-next panel render only when their mock data service returns content for the current session level/role; otherwise the panel is omitted entirely (no empty box). |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (panel omitted when mock service returns empty) / integration (seeded competencies → one card each, clicking navigates to that competency's page) |
