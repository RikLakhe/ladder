# Behavior Spec — T-admin-cms-j8dy4p: Admin navigation shell
> Source: task card ACs + docs/features/0006-master-admin-cms/tasks/T-admin-cms-j8dy4p/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior] — All `/admin/*` pages render a persistent top bar showing the authenticated admin's display name or email and a logout button. Public pages outside `/admin/*` never render this chrome.
- Given: a Next.js route group layout at `src/app/admin/(shell)/layout.tsx` reads the `admin_session` cookie and passes its value as `adminEmail` to AdminBanner; the login page lives outside the group at `src/app/admin/login/page.tsx`
- When: a page under the `(shell)` group (e.g. the admin dashboard) is rendered; and separately when the login page is rendered
- Then: the shell layout output includes AdminBanner showing the admin identity string and a "Logout" button; the login page output contains no "Logout" button

## B-2: AC-2 [behavior] — The admin area surfaces a listing page for each entity type (Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis). Each listing shows the entity's primary identifier and a link to its edit form.
- Given:
- When:
- Then:

## B-3: AC-3 [behavior] — Clicking logout ends the admin session and redirects to `/admin/login`. The top bar is not rendered on the destination page.
- Given:
- When:
- Then:

## B-4: AC-4 [e2e] — An authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency, and reaches the edit form without error.
- Given:
- When:
- Then:

