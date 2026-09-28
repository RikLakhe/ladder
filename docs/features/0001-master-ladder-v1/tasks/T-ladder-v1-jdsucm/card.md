## Task T-ladder-v1-jdsucm — Domain Detail: Competency List
**Story:** S-0001.06 · feature 0001-master-ladder-v1
**Milestone:** M3 (v0.3.0)
**Depends on:** T-ladder-v1-idorsz
**Slice:** Full vertical — domain detail route + coming-soon guard; competency list browseable
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `ExploreButtonClient` renders a button with accessible text equal to `label`; calls `onClick` exactly once on click
- [ ] AC-2 [behavior]: `/dev/leadership` renders all leadership competency names; each card is a link with `href` matching `/{track}/{domain}/{competency-slug}`
- [ ] AC-3 [behavior]: `/qa/technical-skill` renders "Coming soon" text; zero competency links in DOM under any code path
- [ ] AC-4 [invariant]: When `domain.comingSoon === true` no anchor pointing to a competency slug is rendered — hard safety constraint, no exceptions
- [ ] AC-5 [behavior]: Invalid track or domain returns 404
- [ ] AC-6 [e2e]: Engineer navigates Home → Track overview → Domain detail → sees competency list with no dead ends
**End-to-end AC:** AC-6 [e2e] — full navigation path works in browser
**Tests:** AC-1 through AC-5 — ordered; tracer bullet = AC-1 (ExploreButtonClient renders with label)
**Test scope:** src/components/__tests__/ExploreButtonClient.test.tsx, src/app/[track]/[domain]/__tests__/page.test.tsx
**Done =** reviewable PR, all ExploreButtonClient + DomainPage Vitest tests green, coming-soon guard verified by test, `tsc --noEmit` clean.
