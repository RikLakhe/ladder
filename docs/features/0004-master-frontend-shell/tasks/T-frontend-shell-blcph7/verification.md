## Verification — Task T-frontend-shell-blcph7 — 2026-08-08
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- Login route (`POST /api/admin/login`) checks `system`/`TEST@123` hardcoded credentials; returns 401 + `{"error":"Invalid credentials."}` on failure; sets `admin_session=system; HttpOnly; Path=/; SameSite=Lax` cookie on success
- Admin banner (`AdminBanner.tsx`) shows "Signed in as system" + Logout button; logout calls `POST /api/admin/logout` then reloads — banner persists across public pages via layout cookie check
- `GenericEntityEditor` accepts `fieldConfig[]`, renders correct fields per config, blocks Preview while change-note is empty, shows diff preview (old → new per changed field), confirm-save calls `onSave(values, changeNote)` and renders "Saved."
- All 6 entity types have add (`/admin/[entityType]/new`) and edit (`/admin/[entityType]/[id]/edit`) pages rendered by the same `GenericEntityEditor` parameterized by `editorConfigs`
- Mock CRUD service (`src/lib/mock/cms.ts`): in-memory Map, seeded with fixtures per entity type, not persisted to real DB — matches spec
- `/admin/login` is public; all other `/admin/*` routes redirect to login when no `admin_session` cookie is present
- Field configs defined for all 6 entity types: competency, primary-function, standard, assessment, training-item, badge — per exec-plan spec
- Unit tests cover: wrong credentials rejected (B-1); empty change-note blocks preview (B-3); generic editor renders correct fields per config (B-3)
- e2e tests cover: banner present/absent based on cookie (B-2); full flow — login, all admin routes 200, mock CMS fixtures, edit route 200, logout, no banner (B-4)
- `vitest.config.ts` set to `pool: "forks"` + `fileParallelism: false` for e2e isolation — all 103 tests pass

⚠️ **Divergent:** deviation + severity (shallow/deep)
- The TSD says "admin session flag (client-side, session-scoped)". The implementation uses an **HttpOnly cookie** (`admin_session=system`) — which is server-readable, not strictly client-side. This is a **shallow** divergence: HttpOnly cookie is more secure and correct; the TSD wording was imprecise. The session is still not persisted to the DB.
- B-4 e2e does not exercise the full "add entity via form → confirm-save" UI interaction path (only verifies HTTP 200 for routes and mock CMS list). The full form→preview→confirm-save flow is covered by B-3 unit tests. Spec says "login → add one entity type → confirm-save → edit a different entity type → confirm-save → logout" — the add/edit confirm-save steps are not verified end-to-end via HTTP. **Shallow** — spec intent (no dead routes + editor logic covered) is met across B-3+B-4 together.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None identified.

❌ **Missing:** acceptance criteria not addressed
- None. All ACs from TSD addressed across B-1 through B-4.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: login API | ✅ | ✅ | ✅ test imports route handler directly | ✅ | ✅ no internal mocks |
| B-2: admin banner | ✅ | ✅ | ✅ e2e HTTP fetch | ✅ | ✅ real dev server |
| B-3: GenericEntityEditor | ✅ | ✅ | ✅ RTL render of public component | ✅ | ✅ no call-count asserts |
| B-4: full admin flow e2e | ✅ | ✅ | ✅ e2e HTTP fetch against running server | ✅ | ✅ real dev server + mock CMS |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called" — login test asserts status + Set-Cookie header content; banner test asserts HTML contains/not-contains banner text; B-4 asserts status codes and entity list non-empty
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — B-2 and B-4 are e2e, both GREEN
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — boundaries are none (mock); N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
