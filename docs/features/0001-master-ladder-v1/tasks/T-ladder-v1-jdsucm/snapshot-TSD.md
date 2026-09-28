## TSD S-0001.06 — Domain Detail: Competency List  (PRD §S-0001.06)

| Aspect | Spec |
|--------|------|
| Interfaces | **ExploreButtonClient component**: accepts `label: string`, `onClick: () => void`; renders a button whose accessible text equals `label`. **Domain detail route**: `GET /{track}/{domain}` — renders competency list or coming-soon placeholder; returns 404 for unrecognised track or domain. |
| Data / State | Track and domain data resolved from content utilities. No store reads required. |
| Behavior | (B-1) `ExploreButtonClient` renders a button element with accessible text equal to `label`; invoking the button calls `onClick` exactly once. (B-2) For a live domain, the page renders a breadcrumb containing the track name and domain name in that order. (B-3) For a live domain, the page renders one card per competency in the domain; each card contains an anchor whose `href` matches `/{track}/{domain}/{competency-slug}`. (B-4) For a coming-soon domain, the page renders a placeholder containing the text "Coming soon"; no anchor pointing to any competency slug is present in the DOM under any code path — this is a hard safety constraint. (B-5) An unrecognised track or domain causes the route handler to signal a 404 response. |
| Access | Any user visiting `/{track}/{domain}`. |
| Boundaries | None. |
| Tests | Unit (ExploreButtonClient): renders button with label, calls onClick on click. Unit (domain detail — live): competency names present, link href correct. Unit (domain detail — coming-soon): "Coming soon" text present, zero competency links in DOM. |

---
