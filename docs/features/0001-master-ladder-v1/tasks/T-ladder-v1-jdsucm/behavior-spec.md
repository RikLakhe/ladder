# Behavior Spec — T-ladder-v1-jdsucm: Domain Detail: Competency List
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-jdsucm/snapshot-TSD.md

## B-1 (tracer bullet): AC-1 [behavior]: `ExploreButtonClient` renders a button with accessible text equal to `label`; calls `onClick` exactly once on click
- Given: `ExploreButtonClient` rendered with a `label` string and `onClick` spy
- When: component renders; button is clicked
- Then: button element with accessible name = label is in DOM; onClick spy called exactly once

## B-2: AC-2/AC-3/AC-4 [behavior]: Domain detail renders competency list with links (live) or "Coming soon" (coming-soon); breadcrumb contains track + domain name
- Given: `DomainDetail` rendered with a live domain (dev/leadership) or coming-soon domain (qa/technical-skill)
- When: component renders
- Then: live → competency names in DOM + each card links to `/{track}/{domain}/{slug}`; breadcrumb has track + domain name; coming-soon → "Coming soon" text present + zero competency anchor links in DOM

## B-3: AC-5 [behavior]: Invalid track or domain returns 404
- Given: server page receives unknown track or domain slug
- When: route resolves
- Then: `notFound()` called — framework signals 404

## B-4: AC-6 [e2e]: Home → Track overview → Domain detail → competency list, no dead ends
- Given: app running in browser
- When: user navigates the full path
- Then: competency list visible — manual browser verification

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
- AC-4 [invariant]: when `domain.comingSoon === true` no anchor to a competency slug is rendered — hard safety constraint — coverage: B-2 test explicitly counts zero links in coming-soon render
