# T6 — Domain Detail Page

**Epic:** Browse — Competency List View
**Milestone:** M3 (v0.3.0)
**Branch:** feature/T6-domain-detail

---

## Epic

Enable engineers to navigate from a track domain overview into a domain detail view that lists competencies as navigable cards, or surfaces a clear coming-soon placeholder for domains not yet published.

---

## User Stories

1. **As an engineer**, I want to click into a domain (e.g., Dev / Leadership) and see all competencies listed as cards with names and descriptions, so I can choose which competency to explore next.

2. **As an engineer**, I want each competency card to link directly to its detail page, so I can navigate the matrix without dead ends or manual URL typing.

3. **As an engineer arriving at a coming-soon domain**, I want to see a clear placeholder message explaining what's coming, so I know the domain exists but isn't yet published — and I'm not misled into thinking competency links are missing.

4. **As a product owner**, I want coming-soon domains to never render competency links, so partially built content never leaks to users regardless of data state.

---

## Tasks

1. **Create `ExploreButtonClient` component** at `src/components/ExploreButtonClient.tsx`
   - Mark as `'use client'`
   - Accept props: `label: string`, `onClick: () => void`
   - Render a styled button that calls `onClick` on click
   - Ensure visible text label for accessibility (no icon-only rendering)

2. **Create domain detail page** at `src/app/[track]/[domain]/page.tsx`
   - Mark as a server component (no `'use client'` directive)
   - Read `params.track` and `params.domain` from route params
   - Call `getTrack(params.track)` — return `notFound()` if track not found
   - Call `getDomain(params.domain)` — return `notFound()` if domain not found
   - Branch on `domain.comingSoon` flag:
     - **Coming-soon path:** render placeholder heading and description of upcoming content; do not render any competency list or links
     - **Live path:** render breadcrumb (`{track.name} / {domain.name}`), domain name, domain description, and a list of competency cards
   - Each competency card links to `/{track}/{domain}/{competency}` and displays competency name and description

3. **Write tests** in the appropriate `__tests__` or co-located spec file using Vitest + RTL:
   - `ExploreButtonClient`: renders button with given label; calls `onClick` when clicked
   - `DomainPage (dev/leadership)`: renders competency names (Decision Making, Mentoring, Facilitation, and others present in data); each competency card links to the correct URL (e.g., `/dev/leadership/decision-making`)
   - `DomainPage (qa/technical-skill — coming soon)`: renders "Coming soon" text; does NOT render a link for "Writing Code" or any other competency

4. **TypeScript hygiene:** ensure no `any` types are introduced; all props and return types are explicitly typed

5. **Verify routing wiring:** confirm that the track domain overview page (T5) links resolve correctly to `/{track}/{domain}` and that the new detail page handles those routes

---

## Acceptance Criteria

1. **[ExploreButtonClient — render]** Given `label="Explore"`, the component renders a `<button>` element whose accessible text content is "Explore".

2. **[ExploreButtonClient — interaction]** When the rendered button is clicked, the `onClick` callback is invoked exactly once.

3. **[DomainPage — live domain breadcrumb]** Navigating to `/dev/leadership` renders a breadcrumb containing both the track name (e.g., "Dev") and the domain name (e.g., "Leadership") in that order.

4. **[DomainPage — live domain competency list]** Navigating to `/dev/leadership` renders competency names including "Decision Making", "Mentoring", and "Facilitation" (and all others present in the leadership domain data).

5. **[DomainPage — live domain link correctness]** Each competency card on `/dev/leadership` contains an anchor (`<a>`) whose `href` matches `/{track}/{domain}/{competency-slug}` — e.g., `/dev/leadership/decision-making`.

6. **[DomainPage — coming-soon render]** Navigating to `/qa/technical-skill` (coming-soon domain) renders text containing "Coming soon" (case-insensitive match acceptable) and a description of what's coming.

7. **[DomainPage — coming-soon guard — hard safety constraint]** Navigating to `/qa/technical-skill` renders zero anchor elements pointing to competency paths; specifically, no link for "Writing Code" or any other competency slug is present in the DOM.

8. **[DomainPage — unknown track 404]** Requesting `/{invalid-track}/{domain}` triggers a `notFound()` response (no page renders with a competency list).

9. **[DomainPage — unknown domain 404]** Requesting `/{track}/{invalid-domain}` triggers a `notFound()` response (no page renders with a competency list).

10. **[TypeScript]** `npx tsc --noEmit` passes with no errors introduced by T6 files.

11. **[Tests pass]** All Vitest + RTL tests for `ExploreButtonClient` and `DomainPage` pass with zero failures and zero skipped assertions.

12. **[No `any` types]** ESLint (or tsc strict) reports no `any` usage in files introduced or modified by this task.

---

## Definition of Done

- [ ] `ExploreButtonClient` component created at `src/components/ExploreButtonClient.tsx` with `'use client'`, correct props, accessible button, and no `any` types
- [ ] Domain detail page created at `src/app/[track]/[domain]/page.tsx` as a server component handling both live and coming-soon paths
- [ ] Coming-soon domains never render competency links in any code path (hard safety constraint satisfied)
- [ ] All specified Vitest + RTL tests written and passing: ExploreButtonClient (2 cases), DomainPage live (competency names + link URLs), DomainPage coming-soon (placeholder text + absence of links)
- [ ] `npx tsc --noEmit` exits clean — no new TypeScript errors
- [ ] Routes from T5 domain overview correctly resolve to the new detail page (manual smoke-test or integration test)
- [ ] PR opened against `main` from `feature/T6-domain-detail`, linked to M3 milestone, with review requested
