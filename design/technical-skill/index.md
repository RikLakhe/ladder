# Technical Skill
**Updated:** 2026-07-06
**Status:** active — full pipeline complete (Phases 0–E); first competency to receive a V2 independent review pass

> [Competency index](../index.md)

Core competency, P2–P7. Maps to Section 1 "Technical Skills" plus the AI Capability section of `competencies/lft-engineering-competency-matrix.md`.

## Pipeline artifacts

- Evidence brief (Phase 0): `../industry-evidence/technical-skill.md` (revised four times — see its revision note; the fourth revision re-grounded all six levels as separate, explicitly-scoped passes per the new Level Scoping policy, and added a new source — Will Larson's "Staff archetypes" — for P5–P7. Findings were corroboration and one naming-collision flag, not new requirements, so Phases A–E below were checked against it and did not need changes.)
- Functional analysis (Phase A): `./functional-analysis.md` — 6 Primary Functions, 50 sub-functions across P2–P7
- Standard (Phase B): `./standard/` — one document per Primary Function:
  - `1-quality-testing.md`
  - `2-debugging-observability.md`
  - `3-software-design-architecture.md`
  - `4-security.md`
  - `5-ai-assisted-engineering.md`
  - `6-ai-judgment-feature-delivery.md`
- Assessment (Phase D): `./assessment/` — one subfolder per PF, each with a code review rubric, live demo checklist, and portfolio requirements doc:
  - `pf1-quality-testing/`, `pf2-debugging-observability/`, `pf3-software-design-architecture/`, `pf4-security/`, `pf5-ai-assisted-engineering/`, `pf6-ai-judgment-feature-delivery/`
  - Which instrument covers which level varies by PF — each PF's `01-code-review-rubric.md` states which P-levels it covers; the rest are assessed via live demo or portfolio. See each standard's Evidence Guide for the full method-to-level mapping.
- Training (Phase E): `./training/`:
  - `00-learning-path.md` — prerequisites, ordered exercise sequence, level gates, skip guide
  - `01-concept-notes.md` — 35 sections, one per Required Knowledge item across all 6 standards (external links not verified this session — WebSearch/Chrome unavailable, flagged in the file)
  - `02-guided-exercises.md` — 6 exercises, one per PF
  - `03-autonomous-projects.md` — 3 open-ended projects spanning PF clusters
  - `04-onboarding-track.md` — Day 1 / Week 1 / Month 1 plan + buddy-check questions

## Phase C — Three-Pass Critique (2026-07-01)

**Pass 1 (Compliance):** found and fixed 2 HIGH findings — (1) PF 2 was missing Debugging-specific sub-functions at P5/P6 (only carried Observability content there); backfilled in the evidence brief from the internal LFT matrix and added as 2.11/2.12. (2) The original PF 5 "AI Capability" bundled two matrix rows that don't share an assessment mode; split into PF 5 (AI-Assisted Engineering) and PF 6 (AI Judgment & Feature Delivery), each with its own standard document. One LOW finding accepted without a fix: PF 3 consolidates the "Understanding Code" and "Software Architecture" matrix rows rather than keeping them fully distinct — judged an acceptable simplification given how much the two rows overlap.

**Pass 2 (Load):** PF 2 now runs to 12 sub-functions, above the methodology's "≈4–10" granularity guideline — kept combined (not split, unlike PF 5/6) because a live debugging exercise naturally exercises both debugging and observability at once, so they share an assessment mode. Flagged as an accepted exception, not a defect. Progression logic P2→P7 checked coherent across all 6 PFs after the PF 2/5/6 fixes.

**Pass 3 (Market):** cross-checked against `../industry-evidence/technical-skill.md` — no new findings beyond what the evidence brief itself already flags (P2–P4 well-grounded, P5–P7 reasonably triangulated but not job-posting-verified; that gap is a Phase 0 limitation, not something Phase C can fix without working browser/search tools).

## V2 Independent Review (2026-07-06)

Technical Skill was built entirely under V1 (no independent reviewer pass, self-checked only). This is the pipeline's first application of V2's `standard-reviewer` / `assessment-reviewer` / `training-reviewer` agents against a V1-built competency, run via `/review-competency "Technical Skill" all phase`. RED findings were fixed inline below; YELLOW findings and judgment calls are surfaced here for theme-lead (Rikesh) decision, not auto-fixed.

**Phase C (standard-reviewer, quality pass):** all 6 standards reviewed. PF1, PF2 clean. PF3 flagged 🟡 — the P4 hiring signal ("reveals whether they reach for abstraction appropriately") is vaguer than its siblings elsewhere in the pipeline; lacks concrete pass/fail markers. PF4 flagged 🟡 — PC 4.8 ("identify an obscure security threat that standard review or tooling misses") is an opportunistic/rare-event criterion; a highly competent P7 who simply hasn't hit that situation yet has no fallback path (e.g., a hypothetical-threat teaching-demo variant). PF4 also flagged 🔵 — the P2→P3 promotion delta (naming a concern → escalating an unclear one) is a defensible but non-obvious delta, worth a second read. PF5 flagged 🟡 — the Evidence Guide's stated P2–P4 assessment method ("code review rubric") doesn't obviously cover the P3 PC ("apply a consistent prompting pattern"), since prompting patterns aren't visible from PR history alone without candidate narration — confirmed as a real gap by the Phase D review below (see Fix set 1). PF6 flagged 🟡 — the P2→P3 promotion delta risked reading as "more of the same" rather than a qualitative shift; confirmed as a real Rule 3 violation in the rubric wording by the Phase D review (fixed, see below).

**Phase D (assessment-reviewer, all 6 PFs, 18 files):** 5 of 6 PFs failed Pass 1 on first read. Two systemic RED gaps ran across all 6 PFs and are now fixed: (1) every `01-code-review-rubric.md` lacked any candidate-facing section (Rule 4) — added "For the candidate" sections to all 6. (2) every `03-portfolio-requirements.md` was missing the teaching-demonstration instrument that each standard's Evidence Guide names as part of the P7 assessment mode (P6 *and* P7 for PF3) — added teaching-demo line items to all 6, matching the pattern already used correctly in Delivery's PF1 portfolio file. Three genuine PC-coverage holes (Rule 2) were found and fixed: PF2's 2.4 (added a P3 dashboard-reading demo scenario) and 2.10 (added a second P7 portfolio row for observability-culture, distinct from 2.9's incident-response row); PF3's 3.4 (added a P3 "explaining data flow" rubric row). One Rule 3 Level Delta violation was found and fixed: PF6's rubric had reframed the P3 row as pure frequency ("done consistently, not just once"); rewritten to the qualitative delta already present in the standard (general uncertainty-flagging at P2 vs. proactively naming a specific suspected error class at P3). PF4 was the cleanest PF (no coverage gaps, only the systemic Rule 4/teaching-demo gaps shared by all 6). YELLOW items not fixed (surfaced below): missing overall pass-bar aggregation rules in several live-demo checklists (PF1 P6, PF2 all 5 scenarios, PF3 both scenarios, PF5 all 3 scenarios) — each scores per-item but never states an "X of Y must pass" aggregation rule for the overall recommendation.

**Phase E (training-reviewer, 5 files):** Overall verdict NEEDS WORK on first read, now fixed on the RED items. Fixed: the P2→P3 learning-path gate cited a nonexistent PF5/PF6 P3 live-demo instrument (PF5 has no live-demo at any level; PF6's only live-demo is P4) — corrected to reference the actual code-review-rubric instruments. Exercise 4 (security checklist + redesign, maps to P4 PCs 4.3/4.4) was sequenced as a universal Month-1/step-8 exercise despite PF4's own rubric marking P2/P3 "N/A" for this content and no P3 scaffolding step existing beforehand — re-gated behind the P3→P4 transition in the learning path and removed from the Month-1 onboarding list. Added a Day-1 onboarding fallback for AI-tool access provisioning lag (defer Exercise 5, flag to buddy/manager, rather than assuming same-day access). YELLOW items and judgment calls not fixed (surfaced below):
- Exercise 1's 60–90 min estimate conflates drafting time with review-wait time (getting a senior engineer's calendar time routinely exceeds the window).
- Autonomous Project 1's acceptance criteria read as "do the normal job across 4 PFs" rather than a distinctly autonomous ask, unlike Projects 2 and 3 which each have a distinctive artifact.
- PF3 and PF4 never get dedicated autonomous-project or onboarding attention — both ride along only inside Project 1 and a passive "shadow a PR" onboarding mention, while PF1/PF2 get a dedicated Project 3 angle and PF5/PF6 get a dedicated Project 2. Worth a call on whether PF3/PF4 warrant their own project or stronger onboarding presence.
- PF6's guided Exercise 6 covers only 6.3 [P4] — PF6's P2/P3 PCs (6.1, 6.2) have no guided exercise, only concept notes and the rubric.
- The concept-notes external-link-verification disclaimer (WebSearch/Chrome unavailable) has been open since 2026-07-01 with no link-check pass yet run.

**Not yet actioned (open, for Rikesh's judgment):** all YELLOW items and judgment calls listed above. None block use of the competency as-is; all are quality/completeness refinements.

## Primary Functions

1. Quality & Testing
2. Debugging & Observability
3. Software Design & Architecture
4. Security
5. AI-Assisted Engineering
6. AI Judgment & Feature Delivery

See `functional-analysis.md` for the full sub-function breakdown and level tags.
