---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "029445dec5a4d58535509e2b0c62c9b370ea05e0a19e4a3729a7388e58ba3400"
---
# TSD 0004 — Frontend Shell (full app build against HTML mock)
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

**Mock-layer note:** stories 06–09 have no real backend table yet. Each is backed by a mock data service (e.g. `src/lib/mock/<domain>.ts`) returning the same shape a future real API would — a pure function/module boundary, swappable for a real fetch later without changing the consuming page. Mock fixtures live alongside the mock service, not inline in components.

## TSD S-0004.01 — Global shell: header, nav, breadcrumb, level-set modal  (PRD §S-0004.01)
| Aspect | Spec |
|--------|------|
| Interfaces | Shared layout wrapping every page: header (home link, search input, level selector, current-level indicator), left nav (Home, Level View, Transition Guide, Badges, Version History, expandable competency list sourced from the real competencies API), breadcrumb region, level-set modal. |
| Data / State | Client-side session state: selected role/level (from level-set modal), modal-dismissed flag — persisted for the browser session only, not server-side. |
| Behavior | Shell renders around all page content. Level-set modal shows on first visit of a session; selecting/dismissing it stores the choice and the modal does not reappear on subsequent navigation that session. Breadcrumb reflects current route on every non-home page. Every nav-sidebar link and header logo link resolves to a rendering route. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (modal shows once per session then suppressed; breadcrumb derives correct labels per route) / integration (every nav-sidebar link resolves to a 200 render, no route throws) |

## TSD S-0004.02 — Home page  (PRD §S-0004.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies` (existing) — reused for the card grid. Optional focus/what's-next panels driven by a mock data service (no real backing table). |
| Data / State | Reads `competencies` (read-only, real). Focus/next-level panel data from mock service, keyed by current session level/role. |
| Behavior | Renders one card per competency (name, domain, PF count). Focus panel and what's-next panel render only when their mock data service returns content for the current session level/role; otherwise the panel is omitted entirely (no empty box). |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (panel omitted when mock service returns empty) / integration (seeded competencies → one card each, clicking navigates to that competency's page) |

## TSD S-0004.03 — Competency page with document tabs  (PRD §S-0004.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/competencies/:id` (existing, Standard tab). Assessment/Training/Evidence tabs read from mock services shaped per `design/02-assessment-badge-viewer.md` / `03-training-viewer.md`, keyed by competency id (+ PF/level where applicable). |
| Data / State | Reads `competencies`, `primary_functions`, `standards` (real, read-only) for Standard tab; mock fixtures for the other 3 tabs. |
| Behavior | Tab strip (Standard/Assessment/Training/Evidence) switches the visible panel client-side, no navigation/reload. A tab with no content for the current competency renders `<EmptyState>`. Selecting a PF pill navigates to that PF's page with its level tab strip. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (empty-state renders when a tab's data source returns nothing) / integration (all 4 tabs render for a seeded competency; PF pill navigation lands on the correct PF/level route) |

## TSD S-0004.04 — Level View and Transition Guide  (PRD §S-0004.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Level View: reads real `standards` across all competencies/PFs for a selected level. Transition Guide: reads real `standards` for adjacent level pairs per PF; expandable row detail includes an "assessed via" note (may come from mock service until a real field exists — flag as mock if so). |
| Data / State | Reads `competencies`, `primary_functions`, `standards` (real, read-only). |
| Behavior | Level View: selecting P2–P7 lists every applicable PF's criteria snippet at that level, grouped by competency; PFs without a standard at that level are omitted or shown disabled, never a broken row. Transition Guide: grid of level-transition columns per competency/PF; each row expands to show full before/after text. Clicking a PF row in either view navigates to that PF's page at the matching level. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (row omitted/disabled when no standard exists at that level) / integration (seeded standards render correct snippets per level; row click navigates to correct PF/level route) |

## TSD S-0004.05 — Search  (PRD §S-0004.05)
| Aspect | Spec |
|--------|------|
| Interfaces | Client-side search over a denormalized index (badge_code, PF name, competency name, doc titles) built from real data (competencies/PFs) plus mock fixtures (badges/training) already loaded for the shell. No new persisted index. |
| Data / State | In-memory index built from already-fetched real + mock data; not persisted. |
| Behavior | Submitting a query returns matches with competency/PF/doc-type/title/snippet. An exact badge-code match and a partial PF-name match each return the relevant result. Selecting a result navigates to the corresponding PF page with the correct level tab. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (exact-code match ranks/returns correctly; partial-name match returns correctly; no-match returns empty, not an error) / integration (selecting a result navigates to the right PF/level) |

## TSD S-0004.06 — Badges list and detail (mock-backed)  (PRD §S-0004.06)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning badge list (scope/competency/level filterable) and badge detail (certifies, completion bar, verifier, co-signer flag, evidence_required with resolved/broken-link state, status legend), shaped per `design/02-assessment-badge-viewer.md`. |
| Data / State | Mock fixtures only — no real `badges`/`instruments` read here (real badge data is feature 0003's scope). |
| Behavior | Badges page lists cards per current scope/competency/level filter. Opening a card shows full detail incl. evidence entries in resolved or broken-link state, and the fixed 3-state status legend. Reachable both from the Badges nav item and from a competency's Assessment tab. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (broken-link evidence entry never dropped/blank) / integration (mock badge fixture reachable from both nav paths; filter narrows the list correctly) |

## TSD S-0004.07 — Training viewer (mock-backed)  (PRD §S-0004.07)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning training items by subtype (Learning Path, Concept Notes, Guided Exercises, Autonomous Projects, Onboarding Track), shaped per `design/03-training-viewer.md`. |
| Data / State | Mock fixtures only. |
| Behavior | A competency's Training tab / detail page renders the correct subtype layout for each item's type; Learning Path shows prerequisites + ordered sequence with level gates, other subtypes show their own structured fields. Navigating from the tab to a specific item renders its detail page. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (each of the 5 subtypes renders its required fields from a populated fixture) / integration (Training tab → item detail navigation renders the matching subtype view) |

## TSD S-0004.08 — Version history (mock-backed)  (PRD §S-0004.08)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning a version-history list (date, entity, change note, version, diff fields) per entity, shaped per `design/04-version-history.md`. |
| Data / State | Mock fixtures only. |
| Behavior | History page lists entries newest-first; expanding one shows a field-by-field old-vs-new diff. An entity with no history entries shows an explicit empty state, not a blank list. Reachable from a competency page and the global nav. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (empty-state renders when fixture has zero entries) / integration (entity with ≥2 entries renders reverse-chronological list; diff expand renders old/new values) |

## TSD S-0004.09 — Admin login and generic entity editor (mock-backed)  (PRD §S-0004.09)
| Aspect | Spec |
|--------|------|
| Interfaces | `/admin/login` — username/password form checked against hardcoded credentials (`system` / `TEST@123`); on success sets an admin session flag. Generic editor component driven by a per-entity-type field config (competency, primary function, standard, assessment, training item, badge), backed by a mock CRUD service shaped per `design/05-admin-cms.md`. |
| Data / State | Admin session flag (client-side, session-scoped — no real auth/session table). Mock CRUD service holds in-memory/fixture state for add/edit per entity type; not persisted to the real DB. |
| Behavior | Correct credentials sign in and show the admin-mode banner (persists across public pages) with a working logout. Incorrect credentials show an explicit invalid-credentials error, no sign-in. Each of the 6 entity types has an add form and an edit form, both rendered by the same generic editor component parameterized by that entity's field config: form → required change-note (blocks preview until non-empty) → diff preview → confirm-save. |
| Access | Admin-session-only for the editor and banner; `/admin/login` itself is public. |
| Boundaries | none (mock — no real auth provider) |
| Tests | unit (wrong credentials rejected; empty change-note blocks preview; generic editor renders correct fields per entity-type config) / integration (login → add one entity type → confirm-save → edit a different entity type → confirm-save → logout, no dead route) |
