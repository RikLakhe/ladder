## Task T-admin-cms-j8dy4p — Admin navigation shell
**Parent:** story S-0006.01 · feature 0006-master-admin-cms (docs/features/0006-master-admin-cms/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:**
- [ ] AC-1 [behavior] — All `/admin/*` pages render a persistent top bar showing the authenticated admin's display name or email and a logout button. Public pages outside `/admin/*` never render this chrome.
- [ ] AC-2 [behavior] — The admin area surfaces a listing page for each entity type (Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis). Each listing shows the entity's primary identifier and a link to its edit form.
- [ ] AC-3 [behavior] — Clicking logout ends the admin session and redirects to `/admin/login`. The top bar is not rendered on the destination page.
- [ ] AC-4 [e2e] — An authenticated admin navigates to `/admin`, sees all 7 entity type listings, clicks into a Competency, and reaches the edit form without error.

**Tests:** AC-1, AC-2, AC-3, AC-4
**Test scope:** tests/T-admin-cms-j8dy4p/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
