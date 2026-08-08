## TSD S-0004.09 — Admin login and generic entity editor (mock-backed)  (PRD §S-0004.09)
| Aspect | Spec |
|--------|------|
| Interfaces | `/admin/login` — username/password form checked against hardcoded credentials (`system` / `TEST@123`); on success sets an admin session flag. Generic editor component driven by a per-entity-type field config (competency, primary function, standard, assessment, training item, badge), backed by a mock CRUD service shaped per `design/05-admin-cms.md`. |
| Data / State | Admin session flag (client-side, session-scoped — no real auth/session table). Mock CRUD service holds in-memory/fixture state for add/edit per entity type; not persisted to the real DB. |
| Behavior | Correct credentials sign in and show the admin-mode banner (persists across public pages) with a working logout. Incorrect credentials show an explicit invalid-credentials error, no sign-in. Each of the 6 entity types has an add form and an edit form, both rendered by the same generic editor component parameterized by that entity's field config: form → required change-note (blocks preview until non-empty) → diff preview → confirm-save. |
| Access | Admin-session-only for the editor and banner; `/admin/login` itself is public. |
| Boundaries | none (mock — no real auth provider) |
| Tests | unit (wrong credentials rejected; empty change-note blocks preview; generic editor renders correct fields per entity-type config) / integration (login → add one entity type → confirm-save → edit a different entity type → confirm-save → logout, no dead route) |
