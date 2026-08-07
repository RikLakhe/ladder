# Behavior Spec — T-frontend-shell-8pqscu: Global shell: header, nav, breadcrumb, level-set modal
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-8pqscu/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Every page renders inside a shared shell: header (home link, search input, level selector, current-level indicator) + left nav (Home, Level View, Transition Guide, Badges, Version History, expandable competency list).
- Given: a Shell rendered with a competency list and page content as children
- When: it renders
- Then: header shows a "Ladder" home link, a search input, a level selector, and a current-level indicator; left nav shows Home, Level View, Transition Guide, Badges, Version History links, plus each competency as a link; the given children render inside main content

## B-2: AC-2 [behavior]: A breadcrumb reflecting current route position renders above content on every non-home page.
- Given: the current route is a non-home path, e.g. `/competencies/c1`
- When: Breadcrumb renders for that path
- Then: it shows a breadcrumb trail with a "Home" crumb followed by a crumb per path segment; on the home path (`/`) it renders nothing

## B-3: AC-3 [behavior]: First-visit-this-session shows the level-set modal (role + level picker); dismissing/completing it sets the level indicator and the modal doesn't reappear that session.
- Given: no level is stored for this session
- When: LevelBar mounts, and the user picks a level in the modal
- Then: the modal is shown on mount; after picking a level the modal closes, the current-level indicator shows that level, and it is persisted to sessionStorage so a subsequent mount (level already stored) does not show the modal

## B-4: AC-4 [e2e]: From any page, every nav-sidebar link and header logo link navigates to a real, rendering page — no dead links.
- Given:
- When:
- Then:

