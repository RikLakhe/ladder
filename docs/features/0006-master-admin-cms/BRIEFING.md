---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "ca260dc6cf1d2cd0a0515261b54797741b0f5a9a08163fc5a17eb5ed3a931490"
---
# Briefing 0006 — Admin CMS
> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
Engineers and managers use Ladder as a source-of-truth for the career ladder, but the content (competencies, standards, badges, instruments, training units) must be maintainable without a developer touching the database directly. Currently there is no write path — all content is seeded by migration scripts. Admins need structured-form editors that enforce the fixed field shapes PRDs 01–04 depend on, with every save audited via `document_versions`. Without this, keeping ladder content accurate and up-to-date requires developer intervention on every edit.

## Hypothesis
We will build a `/admin/*` CMS behind magic-link auth that lets provisioned editors create and update every content entity (competency, primary function, standard, badge, instrument, training unit, functional analysis) via structured forms — no freeform textareas for fields the app queries structurally. Every save requires a change note, shows a diff preview, and writes a `document_versions` snapshot in the same transaction. This eliminates the manual migration workflow for content updates and closes the loop between the read-only viewer features (PRDs 01–04) and their data.

## Mocks / references
- design/05-admin-cms.md — full editor specs, save flow, per-entity field shapes
- design/06-auth.md — magic-link auth, RLS policies, admin_users table, route protection
- design/04-version-history.md — diff-render util shared with this feature's diff preview step

## Scope hints
**Probably in:**
- Persistent admin chrome (top bar: identity + logout) on all `/admin/*` pages; never on public pages (consumes session provided by auth feature)
- Editors for all 7 entity types: Competency, Primary Function, Standard, Badge, Instrument, Training Unit, Functional Analysis
- Structured field controls: repeatable-list items for `performance_criteria` + `hiring_signals` on Standard; instrument→row picker for Badge `evidence_required`; backward-only prereq picker for Training Unit `prereqs`
- Badge `badge_code` format validation (`<CODE>-<PF#>-<Level>`) + uniqueness check
- Shared save flow: mandatory change-note → diff preview (shared util with PRD 04 version history) → confirm → atomic transaction (entity UPDATE + `document_versions` INSERT)
- DB migrations for any missing columns (e.g. `badge_code`, `certifies`, `completion_bar`, `verifier_role`, `cosigner_required`, `tier` on badges; `type`/`level` on instruments) — backward-compatible, nullable/defaulted

**Probably out:**
- Public read views (PRDs 01–04 own those)
- Rollback/restore-to-version action (read-only history in PRD 04; restore deferred post-v1)
- Bulk import/export UI (migration scripts handle bulk import separately)
- Multi-admin concurrent-edit conflict resolution (last-write-wins acceptable v1)
- Self-serve admin signup or fine-grained per-role permissions (single `editor` role, provisioning is manual via Supabase console)
- SSO / company-directory login (magic-link only in v1)

## Decisions
- **Auth ownership:** Auth (design/06) is a separate LANE feature that provides the login/session infrastructure admin uses to access the CMS. This feature depends on auth being landed first; it does not build auth itself.
- **Diff-render util:** This feature defines the field-diff utility (used in the save flow's diff preview step). PRD 04 (version history) imports it from here — the util is owned and first-defined by this feature.
- **version_number increment:** `MAX(version_number) + 1` scoped per `(entity_type, entity_id)` within the same save transaction. Simple and consistent with the v1 last-write-wins concurrency model — no separate Postgres sequence needed.
- **Training unit content field:** Plain text (`text` column). No structured jsonb needed for exercise/project instruction content in v1.

## Open questions
- (none — all pre-PRD questions resolved in Decisions above)

## Approval
Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
