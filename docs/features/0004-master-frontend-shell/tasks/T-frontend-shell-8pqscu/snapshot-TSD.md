## TSD S-0004.01 — Global shell: header, nav, breadcrumb, level-set modal  (PRD §S-0004.01)
| Aspect | Spec |
|--------|------|
| Interfaces | Shared layout wrapping every page: header (home link, search input, level selector, current-level indicator), left nav (Home, Level View, Transition Guide, Badges, Version History, expandable competency list sourced from the real competencies API), breadcrumb region, level-set modal. |
| Data / State | Client-side session state: selected role/level (from level-set modal), modal-dismissed flag — persisted for the browser session only, not server-side. |
| Behavior | Shell renders around all page content. Level-set modal shows on first visit of a session; selecting/dismissing it stores the choice and the modal does not reappear on subsequent navigation that session. Breadcrumb reflects current route on every non-home page. Every nav-sidebar link and header logo link resolves to a rendering route. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (modal shows once per session then suppressed; breadcrumb derives correct labels per route) / integration (every nav-sidebar link resolves to a 200 render, no route throws) |
