---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "f6aaa77f08882b424bb73ffa28ca38e5389bb7b804698ad52f5e963516bd08f5"
---
# PRD 0004 — Frontend Shell (full app build against HTML mock)
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0004-master-frontend-shell/.

**Source:** Briefing 0004 — running app's flow/feel doesn't match `design/Competency Review App.dc (1).html`; stakeholder needs a full click-through before more backend-shaped feature work continues.
**Parent:** —  (this IS the umbrella; master iteration)

---

## Story S-0004.01 — Global shell: header, nav, breadcrumb, level-set modal
As any visitor I want a consistent header/nav/breadcrumb around every page so that I always know where I am and can get anywhere else in one click.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Every page renders inside a shared shell: 56px header (logo/home link, search input, level selector, "your level" chip) + 248px left nav (Home, Level View, Transition Guide, Badges, Version History, expandable competency list).
- [ ] AC-2 [behavior] — A breadcrumb reflecting the current page's position renders above page content on every non-home page.
- [ ] AC-3 [behavior] — First-visit shows the level-set modal (role + level picker); dismissing or completing it sets the "your level" chip and does not reappear on subsequent navigation within the session.
- [ ] AC-4 [e2e] — From any page, every nav-sidebar link and the header logo link navigates to a real, rendering page (no dead links, no 404).

**Success metric:** every route reachable from the nav/header renders content, verified by walking all sidebar links in one session.

## Story S-0004.02 — Home page
As an engineer I want a home page that orients me and surfaces what's next so that I know where to start.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Home lists every competency as a card (name, domain, PF count), sourced from the real competencies API.
- [ ] AC-2 [behavior] — An optional "focus" panel and "what's next" panel render when backing data is present, and render nothing (not a broken/empty box) when absent.
- [ ] AC-3 [e2e] — Clicking a competency card navigates to that competency's page.

**Success metric:** every seeded competency renders exactly once; no console error when focus/next-level data is absent.

## Story S-0004.03 — Competency page with document tabs
As an engineer I want a competency page with Standard/Assessment/Training/Evidence tabs so that I can see the full assessment picture for a primary function in one place.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Competency page shows name, domain, PF pills, and a tab strip (Standard, Assessment, Training, Evidence); switching tabs swaps the content panel without a full page reload.
- [ ] AC-2 [behavior] — Standard tab renders from the real `standards` API (existing); Assessment/Training/Evidence tabs render from a mock data service shaped per `design/02-assessment-badge-viewer.md` / `03-training-viewer.md` when no real API exists yet.
- [ ] AC-3 [invariant] — A tab with no backing content (mock or real) shows `<EmptyState>`, never a blank panel or crash.
- [ ] AC-4 [e2e] — Clicking a PF pill navigates to that PF's page with the level tab strip.

**Success metric:** all 4 tabs render on every seeded competency without console error.

## Story S-0004.04 — Level View and Transition Guide
As an engineer I want cross-competency views by level so that I can compare expectations across PFs.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Level View page shows a level tab strip (P2–P7); selecting a level lists every PF's performance-criteria snippet at that level, grouped by competency.
- [ ] AC-2 [behavior] — Transition Guide shows a grid of level-transition columns (P2→P3 … P6→P7) per competency; each row is expandable to show full before/after text and how it's assessed.
- [ ] AC-3 [e2e] — Clicking a PF row in either view navigates to that PF's page at the matching level.

**Success metric:** both pages render for every competency with seeded standards, with no dead PF-row links.

## Story S-0004.05 — Search
As any visitor I want to search by badge code, PF name, or keyword so that I can jump straight to relevant content.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Submitting the header search shows a results page/panel listing matches (competency, PF, doc type, title, matched snippet).
- [ ] AC-2 [behavior] — An exact badge-code match and a partial PF-name match both return results.
- [ ] AC-3 [e2e] — Clicking a search result navigates to the corresponding PF page with the correct level tab selected.

**Success metric:** searching a known seeded badge code and a partial seeded PF name each return ≥1 correct result.

## Story S-0004.06 — Badges list and detail (mock-backed)
As an engineer I want to browse and open badges so that I understand what's certified and how, ahead of the real badge-viewer backend.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Badges page lists badge cards (scope tabs, competency/level filter) with badge code, name, tier, certifies snippet — from a mock data service shaped per `design/02-assessment-badge-viewer.md`.
- [ ] AC-2 [behavior] — Opening a badge card shows its detail (full certifies text, completion bar, verifier/co-signer, evidence references with resolved-or-broken-link state, status legend).
- [ ] AC-3 [e2e] — Clicking a badge card on the Badges page or on a competency's Assessment tab navigates to that badge's detail page.

**Success metric:** every mock badge fixture is reachable from at least one nav path (list page and competency tab) and renders without error; this mock layer is replaced, not duplicated, when feature 0003 lands real badge APIs.

## Story S-0004.07 — Training viewer (mock-backed)
As an engineer I want to see training content (learning path, concept notes, exercises, projects, onboarding) so that I know how to develop toward a level.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — A competency's Training tab / training detail page renders the correct subtype view (Learning Path / Concept Notes / Guided Exercises / Autonomous Projects / Onboarding Track) from a mock data service shaped per `design/03-training-viewer.md`.
- [ ] AC-2 [behavior] — Learning Path shows prerequisites and an ordered sequence with level gates; other subtypes show their respective structured content (goal/setup/steps for exercises, brief/AC for projects, day/week/month for onboarding).
- [ ] AC-3 [e2e] — Navigating from a competency's Training tab to a specific training item renders that item's detail page.

**Success metric:** all 5 training subtypes render at least one populated mock example without error.

## Story S-0004.08 — Version history (mock-backed)
As a reviewer I want a version history view so that I can trust I'm reading the current content and see what changed.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — A version history page lists changes (date, entity, change note, version) newest-first, from a mock data service shaped per `design/04-version-history.md`.
- [ ] AC-2 [behavior] — Expanding an entry shows a field-by-field diff (old vs new); an entity with no history shows an explicit empty state, not a blank list.
- [ ] AC-3 [e2e] — Opening version history from a competency page or the global nav renders the list and an expandable diff works for at least one entry.

**Success metric:** history list renders for both an entity with history and one without, with correct empty-state handling.

## Story S-0004.09 — Admin login and edit shell (mock-backed)
As an admin I want a login and edit flow so that the content-management path is walkable end-to-end ahead of real auth/CRUD.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — `/admin/login` shows a username/password form; hardcoded credentials `system` / `TEST@123` sign in as admin, any other combination shows an invalid-credentials error.
- [ ] AC-2 [behavior] — While signed in as admin, an admin-mode banner (email + logout) persists across public pages; logout returns to the public app.
- [ ] AC-3 [behavior] — An admin editor screen for at least one entity type shows form → required change-note → diff preview → confirm-save, against a mock data service shaped per `design/05-admin-cms.md`.
- [ ] AC-4 [e2e] — Login with `system`/`TEST@123` → banner appears → open editor → preview → confirm-save → logout, all without a dead link or console error.

**Success metric:** the full login-to-logout admin loop completes in one session without hitting a missing route.

---
**Out of scope (per Briefing):** replacing already-working real-data pages/routes with mock data; real backend/migration work for badges/training/history/admin (0003 and future features); real auth email delivery; pixel-perfect mobile polish.
