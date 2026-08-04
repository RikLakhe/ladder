# PRD: Auth

## Goal
Admin-only login gate for `/admin/*` routes and all write operations. Public routes (PRDs 01-04) stay fully open, no login. This PRD is infrastructure other PRDs (05 especially) depend on but don't build themselves.

## Scope
In: Supabase Auth setup (email magic-link or password — pick magic-link, simplest, no password-reset flow to build), `admin_users` table + role field, session/middleware route protection for `/admin/*`, RLS policies on all content tables, logged-in-admin UI chrome (persistent top bar showing admin identity + logout).
Out: Public user accounts (none exist in v1), fine-grained per-entity permissions (single "editor" role is enough for v1 — don't build a permissions matrix), SSO/company-directory integration (flagged as a possible v2 item, not built now).

## Data model
```
admin_users (id uuid references auth.users, email, display_name, role text default 'editor', created_at)
```
Roles: `editor` (can create/update all content entities) — v1 has exactly one role; the `role` column exists for future extension (e.g. `verifier`) but no role-differentiated logic needs to be built now.

## RLS policies (per content table: competencies, primary_functions, standards, badges, instruments, training_units, functional_analyses, document_versions)
- `SELECT`: allowed for `anon` and `authenticated` — public read, no restriction.
- `INSERT`/`UPDATE`/`DELETE`: allowed only for `authenticated` users present in `admin_users`. Use a Postgres policy checking `auth.uid() IN (SELECT id FROM admin_users)`.
- `admin_users` table itself: `SELECT` restricted to authenticated admins (don't expose the admin roster publicly); no public INSERT/UPDATE (admin provisioning is a manual/Supabase-console step in v1, not a self-serve signup flow — do not build one).

## App-side auth
- Supabase Auth client, magic-link email sign-in flow at `/admin/login`.
- Next.js middleware (or route-group layout check) protecting all `/admin/*` routes — unauthenticated request redirects to `/admin/login`.
- Session check also verifies the authenticated user exists in `admin_users` (a valid Supabase Auth session alone is not sufficient — must be provisioned as admin); otherwise show "not authorized" rather than granting CMS access.
- Persistent admin chrome: top bar visible only within `/admin/*`, showing display_name/email + logout button. Public pages (PRDs 01-04) never render this chrome.

## Acceptance criteria
- Visiting any `/admin/*` route while logged out redirects to `/admin/login`.
- Magic-link sign-in for an email present in `admin_users` grants access to CMS routes.
- Magic-link sign-in for an email NOT present in `admin_users` (valid Supabase auth, no admin row) is shown "not authorized," cannot reach CMS.
- Attempting a write (INSERT/UPDATE) against any content table via direct API call without a valid authenticated admin session is rejected by RLS, independent of app-level route protection (defense in depth — test by calling Supabase REST directly, not just through the UI).
- All public routes from PRDs 01-04 remain fully accessible with zero session/cookie required.

## Explicitly deferred
Self-serve admin signup, per-role permission differentiation, SSO/company directory login, password-based login (magic-link only in v1).
