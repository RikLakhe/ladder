## TSD S-0007.03 — PF Page Structure Correction  (PRD §S-0007.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /primary-functions/[pfId]?level=X` — server-rendered page (level defaults to "P2" if absent). `getPrimaryFunctionById` extended to return `pf_number: string` and `domain_classification: string`. Level applicability determined by whether a `standards` row exists for that PF+level combination. |
| Data / State | Page layout restructured: `LevelTabStrip` at top, single active tab body containing Standard section + Badge section + Training section in sequence. `CompetencyTabs` not used on this page. Inapplicable levels (no standards row) passed as `inapplicableLevels` to `LevelTabStrip`, rendering disabled with `<EmptyState variant="not-applicable">` as tab body. |
| Behavior | PF page header shows pf_number, name, domain_classification. `LevelTabStrip` renders P2–P7; disabled tabs are visually distinct and unclickable; selecting an applicable tab navigates to `?level=X` and renders Standard/Badge/Training content inside the tab body. Clicking a disabled tab shows `<EmptyState variant="not-applicable">` as the content body (not a crash or blank). Standard, Badge, and Training sections render inside the active tab body — NOT at competency scope. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getPrimaryFunctionById` returns pf_number and domain_classification. unit: inapplicable level detection returns correct set given standards rows for a PF. integration: PF page at an N/A level renders `EmptyState variant="not-applicable"` in the tab body; at a valid level renders Standard/Badge/Training content. |

---
