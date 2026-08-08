---
approved_by: "unknown"
approved_at: "2026-08-08"
planned_behaviors: 4
approved_sha256: "f87c3ae57de6703ce28a4d362be4a81b8e78be865694be8cca1a97305ebe0f0e"
---
## Exec Plan — Task T-admin-cms-j8dy4p
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:**
- AC-1: Persistent AdminBanner top bar on all `/admin/*` pages. Absent on public pages AND on `/admin/login`.
- AC-2: `/admin` landing lists all 7 entity types (Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis) each with display label + link to edit-form listing.
- AC-3: Logout ends session (clears cookie) + redirects to `/admin/login`. Top bar not rendered on login page.
- AC-4: E2E smoke — authenticated admin navigates `/admin`, sees all 7 listings, clicks Competency, reaches edit form.

**Approach:**
Introduce a Next.js App Router route group `src/app/admin/(shell)/` that holds all admin pages requiring the top bar. Move `page.tsx` and `[entityType]/` into `(shell)/`. A `(shell)/layout.tsx` (server component) reads the `admin_session` cookie, passes display identity as prop to AdminBanner. Login page stays at `src/app/admin/login/` outside the group — never gets the banner. Fix AdminBanner logout to call `/api/admin/logout` then `router.push('/admin/login')`. Update entity type list to the 7 TSD-specified types with human-readable labels. Extend mock store to include the 3 missing entity types (instrument, training-unit, functional-analysis) so listing pages don't throw. Tests use vitest + @testing-library/react (jsdom) for unit/integration; smoke test uses fetch against the running Next.js dev server or mocked Next.js handler approach.

**Boundaries & mocks:**
- `admin_session` cookie: REAL (set by `/api/admin/login`, read by layout server component).
- Entity listing data: FAKED via `src/lib/mock/cms.ts` in-memory store. No Supabase connection in this task (data layer is a separate story). Smoke AC-4 verifies the full navigation path against the mock store.
- Supabase Auth/Postgres: out of scope for this shell task — no network calls made.

**Behaviors (TDD order):**
- B-1: Admin route group layout renders AdminBanner for all `(shell)` routes; login page (outside group) renders no banner.
  - Test (unit): render `(shell)/layout.tsx` with a child, assert `AdminBanner` is present. Render the login page directly, assert no AdminBanner.
- B-2: AdminBanner shows session identity from cookie prop and logout redirects to `/admin/login`.
  - Test (unit): render AdminBanner with `adminEmail="test@example.com"`, assert text visible. Simulate logout button click, assert `/api/admin/logout` called and redirect to `/admin/login` triggered.
- B-3: `/admin` landing lists all 7 entity types with correct labels and links to `/admin/<slug>`.
  - Test (unit/integration): render admin dashboard component with mock cookie present, assert 7 entity type rows each with correct label and correct `href`.
- B-4: Smoke — authenticated request to `/admin` returns 200 with all 7 entity type links; subsequent request to `/admin/competency` returns 200 with listing rows; logout POST clears cookie and returns redirect.
  - Test (smoke/integration): use vitest + Next.js route handler imports directly (no running server), assert HTTP handler behavior end-to-end.

**PR will contain:**
- `src/app/admin/(shell)/layout.tsx` — new; reads cookie, passes identity to AdminBanner
- `src/app/admin/(shell)/page.tsx` — moved from `src/app/admin/page.tsx`, updated entity list
- `src/app/admin/(shell)/[entityType]/` — moved from `src/app/admin/[entityType]/`
- `src/app/admin/(shell)/[entityType]/[id]/edit/` — moved subtree
- `src/components/AdminBanner.tsx` — updated: accept `adminEmail` prop, fix logout redirect
- `src/lib/mock/cms.ts` — extend EntityType union + seed data for instrument, training-unit, functional-analysis
- `tests/T-admin-cms-j8dy4p/admin-layout.test.tsx` — B-1 unit tests
- `tests/T-admin-cms-j8dy4p/admin-banner.test.tsx` — B-2 unit tests
- `tests/T-admin-cms-j8dy4p/admin-dashboard.test.tsx` — B-3 integration tests
- `tests/T-admin-cms-j8dy4p/admin-smoke.test.ts` — B-4 smoke tests

**Open questions / ambiguities:**
- None. Entity type slugs and display labels derived from TSD table names (snake_case → kebab-case slug, Title Case label). Session identity is the cookie value (string); if the cookie value is an email, it is displayed as-is.

**Path:** L (lean, default)
**Escalation signals hit:** 0 — no ambiguities, blast-radius is admin-only UI, no security changes, no amendments.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
