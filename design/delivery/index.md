# Delivery
**Updated:** 2026-07-07
**Status:** active — full pipeline complete (Phases 0–E); received a V2 independent review pass

> [Competency index](../index.md)

Core competency, P2–P7. Maps to Section 2 "Delivery" of `competencies/lft-engineering-competency-matrix.md` — Incremental Value Delivery and Self-Organization.

## Pipeline artifacts

- Evidence brief (Phase 0): `../industry-evidence/delivery.md` — all 6 levels grounded as separate passes
- Functional analysis (Phase A): `./functional-analysis.md` — 2 Primary Functions, 31 sub-functions across P2–P7 (both PFs run above the "≈4–10" granularity guideline — accepted exceptions, reasoning documented in the file)
- Standard (Phase B): `./standard/`:
  - `1-incremental-value-delivery.md`
  - `2-self-organization.md`
- Assessment (Phase D): `./assessment/` — one subfolder per PF, each with a work-product review rubric, live demo/retrospective checklist, and portfolio requirements doc:
  - `pf1-incremental-value-delivery/`, `pf2-self-organization/`
  - Filenames are adapted from the pipeline's default "code review rubric" naming since Delivery's work products are tickets/plans/decision records, not code — same slot, same pass-bar logic. Which instrument covers which level varies by PF; see each standard's Evidence Guide for the full method-to-level mapping.
- Training (Phase E): `./training/`:
  - `00-learning-path.md` — prerequisites, ordered exercise sequence, level gates, skip guide
  - `01-concept-notes.md` — 12 sections, one per Required Knowledge item across both standards (external links not verified this session — WebSearch/Chrome unavailable, flagged in the file)
  - `02-guided-exercises.md` — 5 exercises spanning both PFs
  - `03-autonomous-projects.md` — 3 open-ended projects, including one P5-stretch project spanning both PFs
  - `04-onboarding-track.md` — Day 1 / Week 1 / Month 1 plan + buddy-check questions

## Phase C — Three-Pass Critique (2026-07-01)

**Pass 1 (Compliance):** zero HIGH findings. Both standards check clean against G1–G4: no banned verbs, PC counts match functional-analysis.md exactly (17 + 14 = 31), P2 correctly has no Dealing with Ambiguity entry, level tags trace to the evidence brief. LOW notes accepted without changes: (1) a handful of P5+ PCs use "foster a culture of..." language that isn't directly observable on its own — accepted because each standard's Evidence Guide already grounds these in a concrete portfolio artifact (a stakeholder conversation, a cross-team roadmap) rather than leaving them as a mindset claim; (2) a few PCs bundle a compound object (e.g. "priority and dependency notes," "a blocker, delay, or cost overrun") — accepted because these mirror the LFT matrix's own row naming rather than hiding two distinct behaviors.

**Pass 2 (Load):** progression logic checked coherent for both PFs — PF 1 scales scope task → epic → cross-team → org; PF 2 scales scope individual → team → cross-team → org, with the P3→P4 delta in both PFs consistently marked by a shift from "with input"/"escalate after" to "unaided"/"anticipate before." No overlap found between PF 1 and PF 2 sub-functions. Total practice load (31 PCs across 2 PFs) is proportionally higher per PF than Technical Skill's (50 across 6), consistent with the accepted granularity exception already documented in functional-analysis.md.

**Pass 3 (Market):** cross-checked against `../industry-evidence/delivery.md` — every standard bullet traces to a cited evidence-brief bullet. No new findings; the brief's own open items (job-posting evidence gap, staffeng.com "Architect" vs. "Right Hand" naming collision for P6/P7) carry forward unresolved, same as Technical Skill — Phase C can't fix a Phase 0 sourcing gap without working browser/search tools.

**Outcome:** no fixes required before Phase D — the first competency in this pipeline to clear Phase C without a HIGH finding, likely a result of grounding all 6 levels as separate passes from the start rather than in one combined pass.

## V2 Independent Review (2026-07-07)

Delivery was built entirely under V1 (self-checked only, no independent reviewer). Run via `/review-competency "Delivery" all phase`. RED findings were fixed inline below; YELLOW findings and judgment calls are surfaced here for theme-lead (Rikesh) decision, not auto-fixed.

**Phase C (standard-reviewer, quality pass):** both standards mostly clean — PC assessability, hiring-signal specificity, and level-delta progressions all held up. PF2 flagged 🟡 on two points: PC 2.2 ("deliver on a committed task with visible urgency") is vaguer than its neighbors — "visible urgency" has no concrete behavioral anchor, risking assessor disagreement; and the Promotion Criteria narrative for P2→P3 ("from reporting progress when prompted...") contradicts PC 2.1, which already states P2 does daily proactive reporting, not reporting-on-request — an internal wording inconsistency worth a copy fix. 🔵 noted: PF2's P2 hiring signal doesn't touch the cost/value-help-seeking PC (2.8), unlike PF1's P2 signal which covers both its PCs. Not fixed in this pass (Phase C findings are theme-lead judgment calls under V2, not auto-applied) — flagged for a future edit.

**Phase D (assessment-reviewer, both PFs, 6 files):** both PFs failed Pass 1 on first read, on the same systemic Rule 4 gap already seen in Technical Skill: none of the 4 rubric/live-demo-checklist files had a candidate-facing section, only reviewer instructions — fixed by adding "For the candidate" sections to all 4 (the two portfolio-requirements files already had this via their "Submission format" sections, so were untouched). One real Rule 2 coverage gap: PF1's standard bundles PC 1.9 as a compound behavior ("correct a task's priority *and* dependency notes... unaided") — already flagged and accepted as a LOW compliance note back in the original Phase C pass (2026-07-01) as mirroring the LFT matrix's own row naming. The live-demo checklist had only operationalized the dependency half, leaving priority-correction with zero coverage at P4 (no portfolio backstop exists at that level for this PF) — fixed by adding an explicit priority-correction checklist bullet, with an inline editorial note flagging the compound PC as the root cause (standard itself untouched, per scope). PF2 had full 14/14 PC coverage with no gaps — its only issue was the shared Rule 4 gap. YELLOW items not fixed (surfaced below): neither live-demo checklist states how per-item pass/follow-up/fail scores combine into an overall recommendation; neither portfolio-requirements file states which quality-bar tier ("sufficient" vs. "good") is the actual pass threshold; PF1's P5/P6 checklist bullets don't cite PC IDs as consistently as elsewhere in the file, weakening traceability at a glance (coverage itself is confirmed correct by cross-reference).

**Phase E (training-reviewer, 5 files):** Overall verdict NEEDS WORK on first read, now fixed on the RED items. Fixed: a learning-arc sequencing break where Exercise 2 (requires "decision-making under uncertainty" theory) was sequenced one step *before* the concept notes covering that theory — reordered. Autonomous Project 1 was scoped and worded almost verbatim to the standard's P5 epic-breakdown bar (PC 1.4) while being labeled and gated as a P3/P4 project, contradicting the actual P4 bar (single/multi-ticket resizing and dependency/priority correction, PC 1.3/1.9) — rescoped Project 1's acceptance criteria to the P4-appropriate bar and updated its title in the learning path. The learning path's P3→P4 level gate also contained a factual error, requiring "Meets P4" on both PF rubrics when PF1's rubric explicitly caps at P3 (P4 is live-scenario-only for that PF) — corrected to state the right ceiling per PF plus the live-scenario requirement. YELLOW items and judgment calls not fixed (surfaced below):
- Exercise 2's self-check relies on a teammate/manager's guess about a counterfactual ("would this have surfaced later otherwise") — weaker self-assessability than the other exercises.
- Exercise 3's stated PC coverage (2.1, 2.2, 2.3) overclaims — its steps/expected output don't actually evidence 2.2 ("visible urgency").
- The onboarding track starts a brand-new hire (zero real tasks) on Day 1 of a learning path whose own prerequisite is "has taken on at least one real assigned task" — undocumented, not fully blocking since Exercise 1 uses generic tickets.
- PF2's P5 sub-function 2.12 ("foster team economic-thinking culture") has no autonomous-project hook, only portfolio coverage.
- The concept-notes' Shape Up reference links remain unverified since 2026-07-01 (browsing tools were unavailable then and at last check).

**Not yet actioned (open, for Rikesh's judgment):** all YELLOW items and judgment calls above, plus the Phase C wording inconsistencies (PC 2.2 vagueness, P2→P3 promotion-narrative contradiction, PF2 P2 hiring-signal gap). None block use of the competency as-is.

## Primary Functions

1. Incremental Value Delivery (Work Breakdown, Prioritisation & Dependencies, Dealing with Ambiguity)
2. Self-Organization (Reliability & Delivery Accountability, Economic Thinking)

See `functional-analysis.md` for the full sub-function breakdown, level tags, and the assessability reasoning behind keeping these as 2 PFs rather than splitting further.
