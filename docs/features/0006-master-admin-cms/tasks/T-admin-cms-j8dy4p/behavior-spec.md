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

## B-2: AC-2 [behavior] — The admin dashboard at `/admin` lists all 7 entity types (Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis) with human-readable labels and links to `/admin/<slug>`; an individual entity listing at `/admin/<slug>` shows each entity's name and a link to its edit form.
- Given: the admin dashboard page component has an ENTITY_TYPES array containing exactly the 7 TSD-specified slugs with human-readable labels; the mock CMS store contains seed data for all 7 types including instrument, training-unit, and functional-analysis
- When: the admin dashboard is rendered (with a valid admin_session cookie present)
- Then: the rendered output contains exactly 7 links whose hrefs are `/admin/competency`, `/admin/primary-function`, `/admin/standard`, `/admin/badge`, `/admin/instrument`, `/admin/training-unit`, `/admin/functional-analysis`; and the link text for each uses the human-readable label (e.g. "Competency", "Training Unit")

## B-3: AC-3 [behavior] — Clicking logout ends the admin session and redirects to `/admin/login`. The top bar is not rendered on the destination page.
- Given: AdminBanner is rendered with a valid `adminEmail` prop; `fetch` is mocked; `useRouter().push` is mocked; the login page lives outside the `(shell)` route group and renders no Logout button
- When: the user clicks the "Logout" button in AdminBanner
- Then: `fetch` is called once with path `/api/admin/logout` and method `POST`; after the fetch resolves, `router.push("/admin/login")` is called

## B-4: AC-4 [e2e] — An authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency, and reaches the edit form without error.
- Given: `editorConfigs` in `src/lib/admin-editor-config.ts` has field definitions for every entity type the dashboard links to; the CMS API routes at `/api/admin/cms/[entityType]` and `/api/admin/cms/[entityType]/[id]` accept all 7 slugs as valid types
- When: the editor config is read for a new entity type (instrument, training-unit, or functional-analysis); and when the API handler validates those same slugs
- Then: `editorConfigs["instrument"]`, `editorConfigs["training-unit"]`, and `editorConfigs["functional-analysis"]` each return a non-empty field array (not undefined); and the API route `isValidType` function returns true for all 7 slugs including the three new ones

