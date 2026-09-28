## TSD S-0001.05 — Track Domain Overview with Progress Rings  (PRD §S-0001.05)

| Aspect | Spec |
|--------|------|
| Interfaces | **ProgressRing component**: accepts `percentage: number`, `size: number`, `strokeWidth?: number` (default 4); renders visible text displaying `"{percentage}%"`. **Track overview route**: `GET /{track}` — renders domain overview for the given track; returns 404 for an unrecognised track slug. |
| Data / State | Reads `currentLevel` and `assessments` from the assessment store (client-side). Track data resolved at request time from content utilities (server-side). |
| Behavior | (B-1) `ProgressRing` renders the exact string `"{n}%"` as visible text in the DOM for any integer `n`. (B-2) The SVG arc representing progress uses `strokeDashoffset` equal to the full circumference at `percentage=0` and equal to 0 at `percentage=100`. (B-3) `strokeWidth` defaults to 4; an explicit value overrides it. (B-4) For a valid track slug, the page renders one card per domain defined for that track. (B-5) Each non-coming-soon domain card is wrapped in a navigable link to `/{track}/{domain}` and contains a `ProgressRing`. (B-6) Each coming-soon domain card shows a "Coming soon" badge, is not wrapped in a link, and contains no `ProgressRing`. (B-7) Domain progress percentage = `(count of criteriaChecked IDs that match criteria in that domain at currentLevel) / (total criteria in that domain at currentLevel) * 100`, rounded to a whole number; returns 0 when total criteria count is zero. (B-8) An unrecognised track slug causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}`. |
| Boundaries | None. |
| Tests | Unit (ProgressRing): renders "75%" text at percentage=75, renders "0%" at percentage=0. Unit (track overview — dev): renders 5 domain cards; each non-coming-soon card contains a progress ring. Unit (track overview — qa): technical-skill card shows "Coming soon" badge. |

---
