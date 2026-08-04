---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "aaf7c005203e049036e146355896ae0532ab71db6d8c5757eaf6328099e968ae"
---
# PRD 0001 — Ladder: Project Initialization & Shared Foundation
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/<FEAT>-<slug>/.

**Source:** Briefing 0001
**Parent:** — (this is the master/umbrella iteration; the 6 sibling features —
competency-browser, assessment-badge-viewer, training-viewer, version-history, admin-cms, auth —
roll up to it and each assume the schema, stack, and seed data this PRD delivers.)

---

## Story S-0001.01 — Shared data model migration
As any of the 6 feature builds, I want the full content schema migrated and available, so that
I can build read/write views against real tables instead of guessing shapes.

**Acceptance criteria:**
- [ ] AC-1 [invariant] — All tables exist with the fields referenced across design/01–06:
  `competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`,
  `training_units`, `document_versions`, `admin_users`.
- [ ] AC-2 [invariant] — Foreign keys enforced: `primary_functions.competency_id`,
  `standards.pf_id`, `badges.pf_id`, `instruments.pf_id`, `training_units.competency_id`,
  `document_versions.changed_by → admin_users.id`.
- [ ] AC-3 [behavior] — RLS policies default to public `SELECT` on all content tables and
  restrict `INSERT`/`UPDATE`/`DELETE` to authenticated `admin_users` rows (per design/06-auth.md),
  even though the auth UI itself ships in the `auth` feature.
- [ ] AC-4 [e2e] — A read-only query against every table above, run from a fresh clone after
  running the migration, returns without error (empty result is fine; schema-missing is not).

**Success metric:** the 6 sibling features can start their own PRD/TSD work without a single
schema-shape open question.

## Story S-0001.02 — App scaffold & routing shell
As a developer starting any of the 6 features, I want a working app skeleton with the shared
components the design docs assume, so that I'm not re-deciding stack or rebuilding primitives
per feature.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — App boots locally and serves `/` with no route implemented yet beyond a
  placeholder, proving the framework/build/dev-server chain works end to end.
- [ ] AC-2 [invariant] — Shared components referenced by multiple sibling PRDs exist as empty/
  minimal implementations ready to extend: `<TierChip>`, `<LevelTabs>`, `<LevelTabContent>`,
  `<EmptyState variant>` (design/01-competency-browser.md defines these; design/02 and design/03
  extend `<EmptyState>` with their own variants and reuse `<TierChip>`).
- [ ] AC-3 [e2e] — A developer can clone the repo, install, run the dev server, and see the
  placeholder home page in a browser.

**Success metric:** zero cross-PRD merge conflicts caused by two features independently defining
the same shared component from scratch.

## Story S-0001.03 — Seed data for local development
As anyone building or testing one of the 6 features, I want realistic seed data loaded locally,
so that acceptance criteria referencing "seeded data" (all 6 design docs do) are actually
verifiable.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — A seed script populates at least one full vertical slice: one competency,
  its primary functions, one standard per level where applicable, at least one badge with a
  resolvable `evidence_required` reference into a real instrument row, and at least one
  training_unit sequence with valid (backward-only) prereqs.
- [ ] AC-2 [invariant] — Seed data includes at least one intentionally-edge-case row per known
  gap class called out in the sibling PRDs: a PF-not-applicable-at-level gap (design/01), and a
  P6/P7 competency+level with no guided_exercise/autonomous_project rows (design/03) — so those
  empty-state ACs are testable against real seed data, not just theoretically.
- [ ] AC-3 [e2e] — Running the seed script against a fresh migrated database leaves the database
  in a state where a manual query for the seeded competency returns full data across every table
  in S-0001.01.

**Success metric:** every sibling PRD's "renders from seeded data without error" acceptance
criterion has real data to run against on day one of that feature's implementation.
