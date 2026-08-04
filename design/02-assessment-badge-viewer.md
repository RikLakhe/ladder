# PRD: Assessment / Badge Viewer

## Goal
Render badges and their evidence instruments, with visible traceability from badge claim → exact instrument row. Slots into PRD 01's `<LevelTabContent>` Badge sub-slot, plus its own badge detail page.

## Scope
In: Badge card (in-tab, summary), Badge detail page (full), Instrument row rendering + linking, 3-state status legend/example, co-signer indicator, §1.5 confidentiality note, §1.7 blocked-assignment-limited explanation.
Out: Per-engineer badge award tracking (not in v1 anywhere), Competency/PF page shell (PRD 01), Training content (PRD 03), admin editing (PRD 05).

## Data model (reference, read-only)
```
badges (id, badge_code unique, pf_id, level, name, certifies, evidence_required jsonb, completion_bar, verifier_role, cosigner_required bool, tier int)
instruments (id, pf_id, type[rubric|checklist|portfolio], level, rows jsonb)
```
`evidence_required` jsonb shape: array of `{ instrument_id, row_key, note }` — each entry must resolve to an actual row in `instruments.rows` for that instrument_id. Badge Viewer must render the *actual row text*, not just the reference — fetch instrument by id, look up `row_key` in its `rows` array, display inline (expandable).

## Pages & components
- **Badge card** (used inside PF page level tab, and possibly search results): badge_code (monospace), name, `<TierChip>` (reuse PRD 01), certifies sentence (truncated to ~1 line with "read more" → detail page), completion status placeholder using `<EmptyState variant="not-attempted">` (since no tracking exists, always show this state — see below).
- **Badge detail page** `/[competency]/[pf]/badges/[badgeCode]`:
  - Header: badge_code, name, `<TierChip>`, level.
  - Certifies — large quoted-style sentence.
  - Evidence required — list of linked-reference chips, each expandable to show the resolved instrument row text (instrument type + row content). If a reference fails to resolve (bad row_key), show a visible "⚠ evidence link broken" state — do not silently drop it; this is a data-integrity signal worth surfacing, not hiding.
  - Completion bar — render `completion_bar` field verbatim as the pass criterion text.
  - Verifier — verifier_role text + co-signer badge/icon if `cosigner_required` true, with tooltip explaining co-signer role (delivery/account manager confirms work context, technical verifier certifies competency).
  - §1.7 exception note — if this badge's PF/level context has a known blocked-assignment-limited exception path (this is content-driven, likely a flag or note field in `evidence_required` jsonb or a separate `exception_note` column — coordinate with migration; if the field doesn't exist yet, render nothing rather than guessing).
  - §1.5 confidentiality note — small info icon + expandable text if evidence_required entries are marked as confidentiality-eligible (again, content-driven flag; render nothing if absent rather than inventing).
- **3-state status legend** — a small static reference component (not tied to real data, since no tracking exists): 🟢 Earned-eligible / 🟡 Blocked-assignment-limited / ⚪ Not attempted, each with one-line explanation. Show this once per badge detail page as a fixed legend, and use ⚪ Not-attempted as the default/only real state shown on badge cards (v1 has no engineer-specific state).

## Acceptance criteria
- Every badge in seeded data renders a detail page with no crash.
- Every evidence_required entry either resolves to real instrument row text or shows the broken-link warning state — never silently blank.
- Co-signer indicator only appears when `cosigner_required` is true; tooltip text matches the explanation above.
- TierChip color matches PRD 01's scale exactly (import the component, do not redefine).
- Badge card inside PF page and badge detail page are visually consistent (same certifies text, same tier chip).

## Explicitly deferred
Per-engineer award state (green/yellow/grey reflecting a real person's progress), badge search ranking/relevance tuning beyond exact/substring match (PRD 01 owns search).
