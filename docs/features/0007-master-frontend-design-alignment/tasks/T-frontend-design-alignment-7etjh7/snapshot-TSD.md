## TSD S-0007.01 — Home Page Completeness  (PRD §S-0007.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /` — server-rendered page. `getCompetenciesWithPfCount` extended to return `description: string` and `lastUpdated: string \| null` per competency. Level quick-jump: client component accepting P2–P7 as options, navigates to `/competencies/[firstCompetency]/[firstPF]?level=X` on selection; code comment marks full cross-competency view as v2 TODO. |
| Data / State | Query extends to join `document_versions` for latest `created_at` per competency (via entity_table matching competency-owned entities) and reads `competencies.description`. No writes. |
| Behavior | Each competency card renders: name, description, PF count, last-updated date (formatted as readable date string; null → omit date element). Level quick-jump control renders P2–P7 options; selecting one navigates to first competency's first PF at that level. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getCompetenciesWithPfCount` returns `description` and `lastUpdated` fields when DB rows contain them; returns `null` for `lastUpdated` when no `document_versions` rows exist for a competency. integration: home page renders all competency cards with description and last-updated date from seeded data. |

---
