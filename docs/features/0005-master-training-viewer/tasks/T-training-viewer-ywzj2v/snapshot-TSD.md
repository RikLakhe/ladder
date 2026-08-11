## TSD S-0005.03 — View reference card  (PRD §S-0005.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:competencyId/reference-card?level=X` — JSON array of `{badgeCode, badgeName, trainingUnitId, trainingUnitName, instrumentId, instrumentName}`, one entry per join of `badges` → `training_units` → `instruments` for the requested competency+level. Reference card page consumes this endpoint and renders a paginated table. |
| Data / State | Reads `badges`, `training_units`, `instruments` (all read-only), joined by competency+level. |
| Behavior | Table rows display badge_code, training unit name, instrument name. Table is paginated — each page renders a bounded subset of rows; total row count is shown. Rows exceeding page size do not render outside the viewport. No auth required. |
| Access | Public — no session required. |
| Boundaries | none |
| Tests | unit (pagination: given N rows and page size P, page 1 returns rows 1–P, page 2 returns P+1–2P, last page returns remainder) / integration (seeded competency+level with >40 joined rows → paginated response, first page row count ≤ page size, all rows reachable across pages; empty competency+level → empty array, no crash) |
