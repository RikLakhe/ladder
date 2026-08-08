## Verification — Task T-admin-cms-j8dy4p — 2026-08-09
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- B-1: Shell layout `AdminShellLayout` renders `AdminBanner` with `adminEmail` from cookie for `/admin/*` routes; login page (`/admin/login`) does not (no logout button outside shell).
- B-2: `/admin` dashboard page renders all 7 entity types (`competency`, `primary-function`, `standard`, `badge`, `instrument`, `training-unit`, `functional-analysis`) as navigable links with correct slugs and labels.
- B-2 (integration): `/admin/<entityType>/page.tsx` renders entity listings (via `listEntities()`) showing entity names/ids with "Edit" links to `/admin/<entityType>/<id>/edit`; mock CMS seed data present for all 7 types.
- B-3: `AdminBanner.handleLogout()` POSTs to `/api/admin/logout` then navigates via `router.push("/admin/login")`; does not navigate before fetch completes.
- B-4: All 7 entity types present in `editorConfigs` with non-empty field arrays; CMS API GET routes (`/api/admin/cms/[entityType]`) accept all 7 slugs and return 200.
- Logout destination (`/admin/login`) does not render top bar (test B-1 confirms).
- Authenticated admin session enforced: both dashboard page and entity listing pages redirect to `/admin/login` if `admin_session` cookie absent.
⚠️ **Divergent:** deviation + severity (shallow/deep)
- **Shallow:** TSD specifies "Reads the authenticated admin session (display_name or email)" suggesting a display_name → email fallback logic. Implementation reads raw cookie value (`adminEmail` param passed from layout) with no display_name support or conditional logic. Code displays email as-is; no attempt to show display_name. **Shallow** because spec intent (show admin identity) is met; the choice between display_name/email is not validated.
🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- TSD boundary states "Supabase Auth (session read + termination on logout)" but implementation reads `admin_session` cookie directly and clears it via API endpoint `/api/admin/logout`. No observable call to Supabase Auth client in provided diff. **Possible:** cookie is set by auth feature elsewhere; this task only consumes it. **Verify:** does `/api/admin/logout` route actually call Supabase Auth termination, or just clear the cookie?
❌ **Missing:** acceptance criteria not addressed
- **Smoke test gap:** TSD requires smoke AC: "authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency edit form, and reaches it without error; logout redirects to `/admin/login`." Tests cover: navigate to `/admin` ✓, see all 7 links ✓, logout redirect ✓. **Missing:** explicit end-to-end test that clicks a link from dashboard → entity listing page → edit form. (The routes exist; the test does not.)

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: `/admin/*` renders shell layout with AdminBanner (email + logout); `/admin/login` does not | ✅ admin-layout.test.tsx | ✅ layout.tsx + AdminBanner.tsx | ✅ No | ✅ Yes (async layout, cookie mock) | ✅ Cookies mocked |
| B-2: `/admin` dashboard lists 7 entity types as navigable links | ✅ admin-dashboard.test.tsx | ✅ page.tsx + mock/cms.ts | ✅ No | ✅ Yes (render + href) | ✅ Seed data mocked |
| B-2 (integration): `/admin/<type>/page.tsx` renders entity listing (name/id + edit links) | ✅ admin-dashboard.test.tsx (seed data existence) | ✅ [entityType]/page.tsx | ⚠️ Partial (link structure tested; entity rendering implicit) | ✅ Yes | ✅ Mock cms.listEntities |
| B-3: Logout action POSTs to `/api/admin/logout` then navigates to `/admin/login` | ✅ admin-banner-logout.test.tsx | ✅ AdminBanner.tsx handleLogout | ✅ No | ✅ Yes | ✅ Fetch + router mocked |
| B-4: 7 entity types in editorConfigs + API routes accept all slugs | ✅ admin-editor-config.test.ts | ✅ admin-editor-config.ts + route.ts | ✅ No | ✅ Yes | ✅ No external deps |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [ ] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [ ] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [ ] Boundary contract asserted richly (args/content), not bare "was called"
- [ ] ≥1 `e2e` AC present and GREEN (reachable through the running system)
- [ ] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging)

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
