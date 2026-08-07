## TSD S-0004.06 — Badges list and detail (mock-backed)  (PRD §S-0004.06)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning badge list (scope/competency/level filterable) and badge detail (certifies, completion bar, verifier, co-signer flag, evidence_required with resolved/broken-link state, status legend), shaped per `design/02-assessment-badge-viewer.md`. |
| Data / State | Mock fixtures only — no real `badges`/`instruments` read here (real badge data is feature 0003's scope). |
| Behavior | Badges page lists cards per current scope/competency/level filter. Opening a card shows full detail incl. evidence entries in resolved or broken-link state, and the fixed 3-state status legend. Reachable both from the Badges nav item and from a competency's Assessment tab. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (broken-link evidence entry never dropped/blank) / integration (mock badge fixture reachable from both nav paths; filter narrows the list correctly) |
