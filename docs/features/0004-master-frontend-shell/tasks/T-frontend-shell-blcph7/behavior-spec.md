# Behavior Spec — T-frontend-shell-blcph7: Admin login and generic entity editor (mock-backed)
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-blcph7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.

## B-1 (tracer bullet): AC-1 [behavior]: Wrong credentials rejected; correct credentials accepted.
- Given: `POST /api/admin/login` route is running
- When: request body is `{ username: "wrong", password: "wrong" }`
- Then: response status is 401 and no `Set-Cookie` header is present
- When: request body is `{ username: "system", password: "TEST@123" }`
- Then: response status is 200 and response sets `admin_session` cookie

## B-2: AC-2 [behavior]: Admin-mode banner persists across public pages while signed in; logout clears it.
- Given: a running dev server, and a request that carries the `admin_session` cookie
- When: `GET /` is requested with `Cookie: admin_session=system`
- Then: the response HTML contains the admin banner (text "Signed in as system" or equivalent) and a Logout link/button
- And: `GET /` without the cookie does NOT contain the banner text

## B-3: AC-3 [behavior]: Generic editor renders correct fields per entity-type config; empty change-note blocks preview.
- Given: `<GenericEntityEditor>` rendered with the `competency` field config (fields: `name`)
- When: rendered with no change-note filled
- Then: a "Preview" button (or equivalent control) is disabled/absent
- When: change-note is filled with non-empty text
- Then: the Preview button becomes enabled
- And: Given `<GenericEntityEditor>` rendered with the `badge` config (fields: `name`, `level`, `pf_id`), it renders inputs for all three fields (not the `name`-only competency set)

## B-4 (e2e): AC-5 [e2e]: Full admin flow — login → add entity → confirm-save → edit entity → confirm-save → logout → banner gone.
- Given: a running dev server with mock CRUD service seeded with at least one badge fixture
- When: `POST /api/admin/login` with correct credentials, then navigate to `/admin/competency/new`, fill name field, fill change-note, proceed through preview, confirm-save, then navigate to `/admin/badge/${existingId}/edit`, change a field, fill change-note, confirm-save, then `POST /api/admin/logout`
- Then: every navigation step returns a 200 (no dead routes); after logout `GET /` contains no admin banner

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
- AC-4 [invariant]: Add and edit forms for every entity type share one generic editor component — coverage: property of B-3 (same `<GenericEntityEditor>` component accepts both competency and badge configs, proving it is parameterized not duplicated)
