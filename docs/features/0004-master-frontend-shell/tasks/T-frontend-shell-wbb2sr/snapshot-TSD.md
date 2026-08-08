## TSD S-0004.04 — Level View and Transition Guide  (PRD §S-0004.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Level View: reads real `standards` across all competencies/PFs for a selected level. Transition Guide: reads real `standards` for adjacent level pairs per PF; expandable row detail includes an "assessed via" note (may come from mock service until a real field exists — flag as mock if so). |
| Data / State | Reads `competencies`, `primary_functions`, `standards` (real, read-only). |
| Behavior | Level View: selecting P2–P7 lists every applicable PF's criteria snippet at that level, grouped by competency; PFs without a standard at that level are omitted or shown disabled, never a broken row. Transition Guide: grid of level-transition columns per competency/PF; each row expands to show full before/after text. Clicking a PF row in either view navigates to that PF's page at the matching level. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (row omitted/disabled when no standard exists at that level) / integration (seeded standards render correct snippets per level; row click navigates to correct PF/level route) |
