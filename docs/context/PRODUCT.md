# Product — Ladder

> Absolute truth of the current product. Update when the product meaningfully changes.
> Human-maintained — `lane fold` does not write to this file.

> Greenfield note: no application code exists yet (repo has specs/design docs only). Everything
> below is drafted from `docs/features/0001-master-initialization/{BRIEFING,PRD}.md` and
> `design/01–06-*.md`, not from running code — treat as a proposed baseline for human review,
> not a confirmed fact set. Update this note once real code exists to ground against.

## What it is
Ladder is a browsable source-of-truth app for a P2–P7 engineering career ladder: competency
standards, assessment rubrics/badges, and training content, centralized so engineers and
managers stop relying on scattered documents.

## Who uses it
- **Engineers** — browse standards for their level and the next one up, view badges/assessment
  criteria, follow training paths. Read-only, no login (per design/01, design/02, design/03).
- **Managers/hiring** — same read-only views, used for promotion and hiring-signal consistency.
- **Admins/content editors** — maintain the ladder content itself via a CMS (design/05), gated
  behind magic-link auth (design/06). v1 has exactly one admin role (`editor`).

## What it does
- Competency → Primary Function → Level (P2–P7) browsing, with global search (design/01).
- Badge/assessment viewing with evidence traceable to instrument rows (design/02).
- Training content per competency/level: concept notes, guided exercises with prerequisite
  chains, autonomous projects, onboarding track, badge-reference card (design/03).
- Public version history / changelog over every content edit (design/04).
- Admin structured-form editing of every content entity, enforcing fixed field shapes and
  writing a version snapshot on every save (design/05).
- Admin-only auth (magic-link) gating all write paths and `/admin/*` routes (design/06).

## What it doesn't do
- No per-engineer progress/badge-award tracking in v1 (badges show a fixed "not attempted"
  state only — design/02, design/03).
- No admin bulk import/export UI, no rollback/restore-to-version action, no multi-admin
  conflict resolution beyond last-write-wins (design/05).
- No SSO/company-directory login, no per-role permission matrix — one `editor` role (design/06).
- No personalized/adaptive learning-path recommendations, no external LMS integration
  (design/03, BRIEFING open questions).
- No cross-competency "find my level" view in v1 (deferred in design/01).
