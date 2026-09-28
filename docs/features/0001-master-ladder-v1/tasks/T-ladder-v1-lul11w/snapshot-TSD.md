## TSD S-0001.07 — Competency Detail: Full Level Browse  (PRD §S-0001.07)

| Aspect | Spec |
|--------|------|
| Interfaces | **Competency detail route**: `GET /{track}/{domain}/{competency}` — renders all six level cards for the given competency; returns 404 for unrecognised track or competency. |
| Data / State | Reads `currentLevel` from the assessment store. Competency data resolved from content utilities. |
| Behavior | (B-1) Page renders exactly six level cards in ascending order (P2, P3, P4, P5, P6, P7). (B-2) Each card displays: the level badge (e.g., "P3"), the descriptor text for that level, and all criteria for that level as plain text items. No checkbox inputs or self-rating controls appear anywhere on the page in this view. (B-3) The card whose level matches `currentLevel` has a visually distinct blue border and blue background, and displays a "Your level" badge. The badge appears exactly once. No other card carries those styles. (B-4) When `currentLevel` is null or undefined, no card shows the "Your level" badge and no card carries the highlighted styles. (B-5) When `currentLevel` is `p7`, the P7 card is highlighted; the page renders without runtime errors and no call to a next-level accessor crashes. (B-6) A breadcrumb displaying `{track.name} / {domain} / {competency.name}` is visible at the top of the page; each segment links to its respective route. (B-7) An unrecognised track or competency causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}/{domain}/{competency}`. |
| Boundaries | None. |
| Tests | Unit: (1) all 6 level cards rendered, (2) "Your level" badge present exactly once (at p3 when currentLevel=p3), (3) P3 descriptor text present, (4) P3 criterion text present. |

---
