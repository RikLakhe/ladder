---
approved_by: "unknown"
approved_at: "2026-08-07"
planned_behaviors: ""
approved_sha256: "13c67b055e87a77a02df1f5fa6378b01434d9b64a2f54bcf0e6aebed887fbea3"
---
## Exec Plan — Task T-frontend-shell-blcph7
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `POST /api/admin/login` route: checks credentials against hardcoded `system`/`TEST@123`, sets `admin_session` HttpOnly cookie on success, returns 401 on failure (AC-1)
- `POST /api/admin/logout` route: clears the `admin_session` cookie (AC-2)
- `src/app/admin/login/page.tsx`: client component; username/password form; calls login API; on success redirects to `/admin`; on failure shows "Invalid credentials." message (AC-1)
- `src/components/AdminBanner.tsx`: client component; reads presence of admin session via a prop from layout; shows "Signed in as system" + Logout button that calls logout API then reloads (AC-2)
- Updated `src/app/layout.tsx`: reads `admin_session` cookie via `cookies()` from `next/headers`; passes `isAdmin: boolean` to Shell; Shell renders `<AdminBanner>` in header when true (AC-2)
- Updated `src/components/Shell.tsx`: accepts optional `adminBanner` slot and renders it in header (AC-2)
- `src/lib/mock/cms.ts`: in-memory mock CRUD service; exports `listEntities`, `getEntity`, `addEntity`, `editEntity` parameterized by entity type; initial fixture data per entity type (AC-3, AC-5)
- `src/lib/admin-editor-config.ts`: field config definitions for all 6 entity types — competency (name), primary-function (name, competency_id), standard (body, level, pf_id), assessment (competency_id, summary), training-item (competency_id, summary), badge (name, level, pf_id) — each field has `key`, `label`, `type` (text | select), optional `options` (AC-3, AC-4)
- `src/components/GenericEntityEditor.tsx`: client component; accepts `fieldConfig[]`, `initialValues`, `onSave`; renders fields → mandatory change-note input (preview button disabled while empty) → diff preview (shows old vs new values) → confirm-save button (AC-3, AC-4)
- `src/app/admin/page.tsx`: admin dashboard — lists the 6 entity types as links to `/admin/[entityType]` (AC-3)
- `src/app/admin/[entityType]/page.tsx`: entity listing; shows all mock entities + "Add new" link to `/admin/[entityType]/new` + per-row "Edit" link to `/admin/[entityType]/[id]/edit` (AC-3)
- `src/app/admin/[entityType]/new/page.tsx`: add form — renders GenericEntityEditor with empty initialValues + entityType config; onSave calls `addEntity` (AC-3, AC-5)
- `src/app/admin/[entityType]/[id]/edit/page.tsx`: edit form — loads entity from mock, renders GenericEntityEditor with existing values + entityType config; onSave calls `editEntity` (AC-3, AC-5)

**Approach:**
- Session: HttpOnly cookie `admin_session=system` set by API route; layout reads it server-side via `cookies()` from `next/headers`; no real auth, no DB — session is entirely cookie + hardcoded check
- Mock CMS: module-level `Map<entityType, Map<id, entity>>` in `cms.ts` — persists across requests in the dev server process; seeded with 1–2 fixture records per entity type so editing is possible immediately
- GenericEntityEditor: pure client component; diff preview computes changed fields (old vs new) inline; change-note field blocks the "Preview" step via `disabled={changeNote.trim() === ''}`; confirm-save step calls `onSave(values, changeNote)` and shows a success state
- Admin pages: all client components (they read/write mock state); no SSR needed beyond login check
- Admin session guard: each `/admin/*` page (except login) checks the cookie; if absent, redirects to `/admin/login` via `redirect()` in a server component wrapper

**Boundaries & mocks:**
- All admin CRUD is against in-memory mock — no DB writes, no real auth
- Login API route is the only real HTTP call; tests can call it directly
- No external services

**Behaviors (TDD order):**
- **B-1** (tracer bullet): login API — wrong creds → 401, correct creds → 200 + cookie set
- **B-2**: admin banner visible on public page (`GET /`) when admin session cookie present
- **B-3**: GenericEntityEditor — correct fields rendered per config, empty change-note blocks preview, filled change-note enables it
- **B-4** (e2e): full flow — login → add competency → confirm-save → edit badge → confirm-save → logout → banner gone

**PR will contain:**
- `src/app/api/admin/login/route.ts` — login API
- `src/app/api/admin/logout/route.ts` — logout API
- `src/app/admin/login/page.tsx` — login form
- `src/app/admin/page.tsx` — admin dashboard
- `src/app/admin/[entityType]/page.tsx` — entity listing
- `src/app/admin/[entityType]/new/page.tsx` — add form
- `src/app/admin/[entityType]/[id]/edit/page.tsx` — edit form
- `src/components/AdminBanner.tsx` — banner
- `src/components/GenericEntityEditor.tsx` — generic editor
- `src/lib/mock/cms.ts` — mock CRUD service
- `src/lib/admin-editor-config.ts` — field configs per entity type
- `src/app/layout.tsx` — reads admin_session cookie, passes isAdmin to Shell
- `src/components/Shell.tsx` — renders AdminBanner when isAdmin
- `tests/T-frontend-shell-blcph7/login-api.test.ts` — B-1
- `tests/T-frontend-shell-blcph7/admin-banner.e2e.test.ts` — B-2
- `tests/T-frontend-shell-blcph7/generic-editor.test.tsx` — B-3
- `tests/T-frontend-shell-blcph7/admin-flow.e2e.test.ts` — B-4

**Open questions / ambiguities:** (resolved)
1. **Session persistence mechanism**: TSD says "client-side, session-scoped." Used HttpOnly cookie (set by API route, read by server layout) — allows banner to render server-side without extra client round-trip. Cookie name: `admin_session`, value: `system` (the username). Session-scoped = no `Max-Age` or `Expires`, so it clears on browser close.
2. **AC-4 invariant ("share one generic editor component")**: Structural — verified by B-3 using multiple entity-type configs against the same `<GenericEntityEditor>` component. Not a separate RED→GREEN cycle.
3. **Admin session guard on `/admin/*`**: Each admin page uses a server component wrapper that checks `cookies()` and redirects to `/admin/login` if absent — enforced server-side.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
