# Engineering Constitution — Ladder

> Human-maintained. No frontmatter baseline — update when conventions change, review when onboarding.

> Greenfield note: no application code or manifest exists yet. Stack below is INFERRED from
> `design/01–06-*.md` references (Next.js middleware, Supabase Auth/RLS/REST) — not yet ratified
> by a human decision. Test runner and several conventions are genuinely undecided (no code to
> infer from) and are flagged as open questions rather than invented.

## Stack
- Runtime: Node.js (inferred — required by Next.js; version undecided)
- Language: TypeScript (inferred — design docs describe typed component props like
  `<TierChip level="P4" />`; not confirmed)
- Framework: Next.js, React (inferred from design/06 "Next.js middleware ... protecting all
  `/admin/*` routes")
- DB: Supabase Postgres, with Supabase Auth for admin login (design/06)
- Test runner: **open question — not decided.** `.lane/lane.config` has `test_cmd` empty, which
  blocks `lane start` on red/green tasks until set.

## Conventions
1. Content entities use structured field shapes, never freeform textareas for data the app
   needs to query/render (e.g. `evidence_required`, `performance_criteria`, `prereqs` are
   arrays/jsonb, not markdown blobs) — NOT: a single rich-text field standing in for a
   structured list (design/05 AC).
2. Shared UI primitives are defined once (by the competency-browser feature) and imported by
   sibling features — NOT: each feature redefining its own `<TierChip>`/`<EmptyState>` (design/01,
   design/02, design/03).

## Hard Rules
- Never allow a content write to bypass RLS via app-level checks alone — the database policy is
  the enforcement point, app-level route protection is defense-in-depth on top of it, not instead
  of it (design/06).
- Always write a `document_versions` snapshot in the same transaction as a content-entity write
  — never allow an edit to land without a corresponding version row (design/05).
- Always enforce prereq/evidence referential integrity at data-entry time in the CMS (backward-
  only prereqs, evidence must resolve to a real instrument row) — do not rely on the viewer's
  "broken reference" warning state as the only safeguard; that state exists to catch cases the
  CMS enforcement failed to prevent (design/02, design/03, design/05).

## File Organization
- `src/` → not yet created (greenfield) — open question until S-0001.02 (app scaffold) lands.
- `design/` → per-feature design docs (01–06), source material for each sibling feature's PRD/TSD.
- `docs/` → LANE artifacts (specs, tasks, context, ADRs).
