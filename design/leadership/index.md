# Leadership
**Updated:** 2026-07-07
**Status:** active — full pipeline complete (Phases 0–E); received a V2 independent review pass

> [Competency index](../index.md)

Core competency, P2–P7. Maps to Section 4 "Leadership" of `competencies/lft-engineering-competency-matrix.md` — five rows with no named subgroups in the source matrix (unlike Delivery, Strategic Impact, and Feedback/Communication/Collaboration): Decision Making, Driving Alignment, Process Thinking, Facilitation, Mentoring.

## Pipeline artifacts

- Evidence brief (Phase 0): `../industry-evidence/leadership.md` — all 6 levels grounded as separate passes
- Functional analysis (Phase A): `./functional-analysis.md` — 3 Primary Functions, 40 sub-functions across P2–P7. With no matrix-given subgroup to start from, PF boundaries were set from the assessability test alone, grouped by assessment mechanism rather than topic: conversation+artifact (PF 1), live observation (PF 2), portfolio/outcome evidence (PF 3).
- Standard (Phase B): `./standard/`:
  - `1-judgment-organizational-improvement.md`
  - `2-facilitation.md`
  - `3-mentoring.md`
- Assessment (Phase D): `./assessment/` — one subfolder per PF, each with a work-product review rubric, a live-demo or structured-conversation checklist, and portfolio requirements:
  - `pf1-judgment-organizational-improvement/`, `pf2-facilitation/`, `pf3-mentoring/`
  - PF 2's live-demo checklist is the primary assessment instrument (not a supplement) at every level it applies to, since facilitation is best watched happening rather than discussed retrospectively — its work-product rubric is explicitly secondary. See each standard's Evidence Guide for the full method-to-level mapping.
- Training (Phase E): `./training/`:
  - `00-learning-path.md` — prerequisites, ordered exercise sequence, level gates, skip guide
  - `01-concept-notes.md` — 14 sections covering the Required Knowledge items across all 3 standards (one shared section — culture-building mechanics — covers the item common to PF 1 and PF 3)
  - `02-guided-exercises.md` — 8 exercises (4 PF 1, 2 PF 2, 2 PF 3)
  - `03-autonomous-projects.md` — 3 open-ended projects, one per PF, including two P6-stretch projects
  - `04-onboarding-track.md` — Day 1 / Week 1 / Month 1 plan + buddy-check questions

## Phase C — Three-Pass Critique (2026-07-06)

**Pass 1 (Compliance):** zero HIGH findings, zero fixes required — the third competency in a row (after Delivery and Feedback/Communication/Collaboration) to clear Phase C without a compliance fix, and the first to require none at all. The proactive compound-behavior discipline established in Strategic Impact's Phase C and carried into FCC's Phase A held again here: every matrix cell bundling multiple behaviors (e.g., Decision Making's bias and accountability threads, Mentoring's personal-practice and redundancy-purpose threads) was split into separate sub-functions during decomposition, verified clean during this audit. Two intentional bundling decisions reviewed and kept: Facilitation's P4 PC bundles three facilitation facets (ensuring everyone's heard, tying outcomes to goals, preventing domination) as one action in one meeting, matching the matrix's own single-sentence framing; several "fosters a culture of X, Y, and Z" PCs keep compound objects, since fostering a combined culture is one leadership action, not several.

**Pass 2 (Load):** progression logic checked coherent across all three PFs — Decision Making and Driving Alignment's parallel threads each show clear scope-widening deltas (contribute → initiate → have-with-purpose → foster-team-culture → foster-cross-team → foster-org-wide); Facilitation's P4=P5 "See P4" pattern and Mentoring's P4=P5 redundancy-purpose restatement were both preserved rather than forced into artificial new tiers. No overlap found between PF 1's Process Thinking and PF 2's Facilitation despite both touching team discussions — the assessability check's distinction (discussing/implementing *what* to change, versus running *how* a discussion happens) holds up under scrutiny. Practice load: PF 1 at 26 sub-functions is the second-largest single PF in the pipeline (after FCC's Collaboration at 28), continuing the pattern flagged in Strategic Impact that the original "≈4–10 per PF" guideline is being exceeded by nearly every competency built so far — flagged again for the pipeline owner, not re-litigated here.

**Pass 3 (Market):** cross-checked against `../industry-evidence/leadership.md` — every standard PC traces to a cited evidence-brief bullet. No new findings; the brief's own open items carry forward unresolved (no job-posting evidence sourced this session; Kickstarter's Engineering Director corroboration for P6 comes from a different, people-management ladder track, used directionally only; Etsy's Leading Expert tier corroboration for P7 is directional, not level-exact).

**Outcome:** clean pass, no fixes required.

## V2 Independent Review (2026-07-07)

Leadership was built entirely under V1 and was the only competency to clear its original Phase C with zero findings. Run via `/review-competency "Leadership" all phase`. RED findings were fixed inline below; YELLOW findings and judgment calls are surfaced here for theme-lead (Rikesh) decision, not auto-fixed.

**Phase C (standard-reviewer, quality pass):** all three standards held up well — no unassessable PCs, no missing level-pair transitions, no soft critical aspects. PF1 and PF3 each flagged 🟡 for the same recurring pipeline-wide pattern seen in Delivery and FCC: a promotion-criteria delta worded as pure frequency escalation inherited verbatim from the LFT matrix ("sometimes" → "regularly" in PF1's Process Thinking; "sometimes" → "reliably" in PF3's Mentoring row), in both cases mitigated by a second, genuinely qualitative addition bundled into the same delta (Process Thinking also gains team-alignment/goal-tracking scope; Mentoring also gains the redundancy/backfill purpose). PF2 (Facilitation) was clean — its "P5: See P4" non-delta is an intentional, already-reviewed design choice matching the source matrix's own verbatim language, not a defect. This "frequency-adverb inherited from the matrix" pattern has now appeared in four of five competencies reviewed (Technical Skill, Delivery, FCC, Leadership) — worth flagging at the methodology level as a systemic sourcing artifact rather than re-diagnosing per competency.

**Phase D (assessment-reviewer, all 3 PFs, 9 files):** PF2 and PF3 passed Pass 1 cleanly — full PC coverage (4/4 and 10/10). PF1 failed with four genuine Rule 1/2 gaps, all fixed: PC 1.4 (explaining accountability, P2) and PC 1.20 (explaining team practices, P2) were credited by the rubric but never actually tested by the structured-conversation checklist — added P2-baseline checklist items/prompts for both. PC 1.21 (a single process-improvement discussion, P3) had no checklist tier distinct from P4's "regularly" bullet — added one. PC 1.17 (continuous goal-tracking, P4) was tested by the checklist (added in an earlier review pass) but had no matching rubric row to record a score — added one. Also fixed in PF3: a Rule 3 assessability gap where the P3→P4 mentoring-frequency delta ("occasionally" → "reliably") had no checklist probe actually distinguishing the two — added an explicit frequency/consistency prompt. YELLOW items not fixed (surfaced below): PF1's strategy-conversation checklist item doesn't distinguish "contributing" (P2) from "initiating" (P3) with different prompts; none of the 9 files across all 3 PFs state an aggregate pass-bar rule (only per-item scoring); Rule 4 candidate-facing sections are present only in the P5+ portfolio files, not in the P2–P6 conversation/live-demo instruments that most candidates actually go through; a question for the theme lead on whether artifact corroboration should be mandatory rather than "where available."

**Phase E (training-reviewer, 5 files):** Overall verdict NEEDS WORK on first read, now fixed on the RED items. Fixed a sequencing break (Exercise 6 required succession/redundancy theory taught one step later) and a self-contradiction in the learning path (Level gates claimed "no further content" at P6+ while the same file's sequence lists P6-stretch exercises and projects). The main finding: PF1 (26 of Leadership's 40 sub-functions, 65% of the competency) received the identical "2 exercises + 1 project" allocation as PF2 (4 subs) and PF3 (10 subs) — and 16 of PF1's 26 sub-functions (the entire accountability/ownership thread and strategy-conversation/goal-work threads) had zero guided or autonomous practice, only passive concept-note theory, despite the Phase D rubric requiring documented evidence of exactly these behaviors. Added two new exercises (a decision post-mortem for accountability, a strategy-alignment conversation practice) and threaded them into the learning path; exercise count updated 6→8. YELLOW items and judgment calls not fixed (surfaced below):
- The guided-exercises file claims ordering "simplest to most complex" but its own numbering is grouped by PF, not level — only the learning path's resequencing achieves true level order.
- Several exercise time estimates (45–60 min) read as pure session/effort time, not elapsed calendar time, given they depend on a real scheduled team/cross-team meeting occurring.
- Autonomous Project 1's "P5 target, within your own team" framing doesn't clearly trace to a PF1 PC — the standard's Process Thinking thread jumps from P4 "discuss...regularly" to P6 "drive implementation," with P5 (1.23) being "collaborate...sometimes," making the P5 project framing appear interpolated.
- The onboarding track never states its assumed entry level or cross-references the learning path's skip guide — run verbatim on a senior/lead external hire, it would misfire.
- Onboarding's Month-1 ask (identify and discuss a real process-improvement opportunity) may be premature for a hire one month in, before they can reliably distinguish real friction from unfamiliarity with existing norms.
- A leaked internal "session note" about tool availability in the concept notes' header should be stripped.
- A judgment call on whether `my-role.md` (Rikesh's own personal role doc) should remain the canonical "organizational strategy" reference for every learner at every level, given it's a personal rather than general artifact — this same reference also appears in the Phase B standard, so it's a pre-existing pattern, not new to training.

**Not yet actioned (open, for Rikesh's judgment):** all YELLOW items and judgment calls above, plus the Phase C frequency-wording flags in PF1/PF3. None block use of the competency as-is.

## Primary Functions

1. Judgment & Organizational Improvement (Decision Making, Driving Alignment, Process Thinking)
2. Facilitation
3. Mentoring

See `functional-analysis.md` for the full sub-function breakdown, level tags, and the assessability reasoning behind these PF boundaries — the first competency in this pipeline where the matrix provided no subgroup structure to start from.
