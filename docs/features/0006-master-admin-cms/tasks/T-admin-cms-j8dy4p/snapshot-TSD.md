## TSD S-0006.01 — Admin navigation shell  (PRD §S-0006.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `/admin` — root admin landing page listing all entity types. `/admin/*` route group — all pages within share a persistent top bar layout. Logout action — terminates the current admin session and redirects to `/admin/login`. |
| Data / State | Reads the authenticated admin session (display_name or email) from the session provided by the auth feature. Reads entity listings (primary identifier per row) from each content table: `competencies`, `primary_functions`, `standards`, `badges`, `instruments`, `training_units`, `functional_analyses`. Read-only for listing purposes. |
| Behavior | 1. Every page whose route matches `/admin/*` renders a persistent top bar showing the admin's display_name or email and a logout button. No page outside `/admin/*` renders this chrome. 2. The `/admin` landing page shows a listing for each of the 7 entity types; each row in a listing shows the entity's primary identifier and a navigable link to its edit form. 3. The logout action terminates the admin session and redirects to `/admin/login`; the top bar is not rendered on the destination page. |
| Access | Authenticated admin session required. Behavior of unauthenticated requests on `/admin/*` routes is enforced by the auth feature's middleware — outside this story's scope. |
| Boundaries | Supabase Auth (session read + termination on logout). Supabase Postgres (entity listing reads). |
| Tests | **Unit:** top bar renders when route is `/admin/*`; top bar absent when route is outside `/admin/*`. **Integration:** listing page for each entity type returns the correct row count and primary identifiers from seeded data. **Smoke:** authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency edit form, and reaches it without error; logout redirects to `/admin/login`. |

---
