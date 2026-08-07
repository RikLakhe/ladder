## TSD S-0003.01 — See a badge summary in context  (PRD §S-0003.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/primary-functions/:pfId/badges` — JSON array of `{id, badgeCode, name, tier, certifies, level}` filtered by `pf_id` (+ optional `level`). Badge card renders wherever this list is consumed (PF page Badge sub-slot). |
| Data / State | Reads `badges` (read-only), filtered by `pf_id` and level. |
| Behavior | Every badge row for the requested `pf_id`/level renders exactly one card showing badge code, name, tier, a truncated certifies sentence, and a fixed Not-attempted status marker. Card links to that badge's detail route. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (truncation of certifies text; Not-attempted status always shown regardless of input) / integration (seeded badges for a pf_id/level → one card per row, none from other pf_ids/levels) |
