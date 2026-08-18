## TSD S-0007.02 — Competency Page Completeness  (PRD §S-0007.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /competencies/[id]` — server-rendered page. New lib functions: `getFunctionalAnalysisForCompetency(connectionString, competencyId): Promise<{ content: string } \| null>` (queries `functional_analyses` table by competency_id); `getPrimaryFunctionsWithBadgeCount(connectionString, competencyId): Promise<Array<{ id, pf_number, name, domain_classification, badgeCount }>>`. `getCompetencyById` extended to return `description: string`. |
| Data / State | No `CompetencyTabs` component. PF list replaced with cards showing pf_number, name, domain_classification, badge count. FA summary section added. History link added. No writes. |
| Behavior | Page header shows competency name + description. FA summary section renders collapsed by default; clicking expands to show full `functional_analyses.content` text (client component toggle). PF cards show: pf_number (e.g. "PF-1"), name, domain_classification, badge count badge. History link at top of page navigates to `/competencies/[id]/history`. `CompetencyTabs` removed from this page. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getPrimaryFunctionsWithBadgeCount` returns correct badge count per PF (including zero). unit: `getFunctionalAnalysisForCompetency` returns null when no row exists. integration: competency page renders FA toggle, PF cards with badge counts, history link from seeded data. |

---
