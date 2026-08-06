---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "49dc7ce7fa00847dba5647e5cdbbc954ea9186a83ab5dccd86365c01772bdb06"
---
# PRD 0003 — Assessment / Badge Viewer
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0003-master-assessment-badge-viewer/.

**Source:** Briefing 0003 — badges exist in the schema and render as bare names on the PF page (feature 0002) but carry no traceable evidence, no detail page, no status legend.
**Parent:** —  (this IS the umbrella; master iteration)

---

## Story S-0003.01 — See a badge summary in context
As an engineer I want to see a badge's key facts (code, name, tier, certifies) wherever it's listed so that I can decide whether to look closer.
**Acceptance criteria:**
- [ ] AC-1 [behavior] — A badge card shows `badge_code` (monospace), `name`, `<TierChip>` (reused from feature 0002, not redefined), and a truncated `certifies` sentence.
- [ ] AC-2 [invariant] — Badge card always shows the Not-attempted status (⚪) — v1 has no per-engineer tracking, so no other state is ever rendered.
- [ ] AC-3 [e2e] — The PF page's Badge sub-slot (feature 0002) renders one card per badge tied to that `pf_id`/level, each linking to its detail page.

**Success metric:** every badge row for a given `pf_id`+level appears exactly once as a card, with tier chip color matching PRD 01's scale.

## Story S-0003.02 — Read a badge's full detail
As an engineer or reviewer I want to open a badge and see its full certifies statement, completion bar, and verifier info so that I understand exactly what it takes to earn it.
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Visiting `/[competency]/[pf]/badges/[badgeCode]` renders header (badge_code, name, TierChip, level), the full certifies sentence, and the `completion_bar` field rendered verbatim as pass criterion text.
- [ ] AC-2 [behavior] — Verifier section shows `verifier_role` text, and a co-signer indicator + tooltip only when `cosigner_required` is true.
- [ ] AC-3 [e2e] — Clicking a badge card on the PF page navigates to that badge's detail page with matching badge_code/name/tier.

**Success metric:** every seeded badge renders a detail page with no crash; co-signer indicator presence matches `cosigner_required` exactly for every badge.

## Story S-0003.03 — Trace a badge's evidence to real instrument rows
As a reviewer I want every evidence reference on a badge to resolve to real, visible instrument content so that I can verify the claim, not just trust the label.
**Acceptance criteria:**
- [ ] AC-1 [behavior] — Each `evidence_required` entry renders as an expandable reference chip; expanding it fetches the referenced `instruments` row by `instrument_id` and shows the resolved `row_key` text inline.
- [ ] AC-2 [invariant] — An `evidence_required` entry whose `row_key` does not resolve in the referenced instrument's `rows` shows a visible "⚠ evidence link broken" state — it is never silently dropped or left blank.
- [ ] AC-3 [e2e] — Loading a badge detail page with ≥1 resolvable and ≥1 unresolvable evidence entry shows both the resolved row text and the broken-link warning in the same render.

**Success metric:** for every badge in seeded data, the count of rendered evidence chips equals the count of `evidence_required` array entries (resolved + broken, none missing).

## Story S-0003.04 — Understand the status legend
As a first-time viewer I want a plain explanation of the 3 possible badge states so that I don't mistake "not attempted" for "failed" or "blocked."
**Acceptance criteria:**
- [ ] AC-1 [behavior] — The badge detail page shows a fixed legend listing 🟢 Earned-eligible, 🟡 Blocked-assignment-limited, ⚪ Not-attempted, each with a one-line explanation.
- [ ] AC-2 [e2e] — The legend renders identically (same three states, same order) on every badge detail page, regardless of that badge's own data.

**Success metric:** legend is present and unchanged across every badge detail page visited.

---
**Out of scope (per Briefing):** per-engineer badge award/progress tracking, badge search ranking (PRD 01 owns search), admin editing of badges/instruments (PRD 05), training content (PRD 03), §1.5/§1.7 content-driven notes if their backing fields don't exist yet (render nothing rather than guessing — per PRD 02 source doc).
