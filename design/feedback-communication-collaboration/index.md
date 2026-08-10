# Feedback, Communication & Collaboration
**Updated:** 2026-07-07
**Status:** active — full pipeline complete (Phases 0–E); received a V2 independent review pass

> [Competency index](../index.md)

Core competency, P2–P7. Maps to Section 3 "Feedback, Communication & Collaboration" of `competencies/lft-engineering-competency-matrix.md` — three groups: Feedback, Communication, Collaboration.

## Pipeline artifacts

- Evidence brief (Phase 0): `../industry-evidence/feedback-communication-collaboration.md` — all 6 levels grounded as separate passes
- Functional analysis (Phase A): `./functional-analysis.md` — 3 Primary Functions, 53 sub-functions across P2–P7 (PF 1 lands within the "≈4–10" granularity guideline; PF 2 and PF 3 are accepted exceptions, reasoning documented in the file)
- Standard (Phase B): `./standard/`:
  - `1-feedback.md`
  - `2-communication.md`
  - `3-collaboration.md`
- Assessment (Phase D): `./assessment/` — one subfolder per PF, each with a work-product review rubric, a live-demo or structured-conversation checklist, and portfolio requirements:
  - `pf1-feedback/`, `pf2-communication/`, `pf3-collaboration/`
  - PF 2's live-demo checklist is a genuine live demonstration (explaining a concept to a mixed audience); PF 1 and PF 3 use a structured-conversation format instead, since their P2–P4 assessment mode per the Evidence Guide is retrospective conversation, not a hands-on scenario. See each standard's Evidence Guide for the full method-to-level mapping.
- Training (Phase E): `./training/`:
  - `00-learning-path.md` — prerequisites, ordered exercise sequence, level gates, skip guide
  - `01-concept-notes.md` — 13 sections covering the Required Knowledge items across all 3 standards (one shared section — culture-building mechanics — covers the item common to all three rather than repeating it)
  - `02-guided-exercises.md` — 7 exercises — two per PF, plus a third for PF 3 covering Relationship Building
  - `03-autonomous-projects.md` — 3 open-ended projects, one per PF, including a P5-stretch project
  - `04-onboarding-track.md` — Day 1 / Week 1 / Month 1 plan + buddy-check questions

## Phase C — Three-Pass Critique (2026-07-06)

**Pass 1 (Compliance):** zero HIGH findings. This competency's Phase A was written with the Strategic Impact compound-behavior finding already in mind — every matrix cell bundling genuinely distinct behaviors (different actions, artifacts, or moments) was split proactively during decomposition rather than caught after the fact (see functional-analysis.md's "Phase A grammar calibration note" for the specific rule applied: split when clauses describe different actions/artifacts/moments, keep bundled when they describe facets of the same act in the same moment). One judgment call flagged for transparency rather than treated as a finding: PF 1's "seek out feedback... and apply it as a tool for growth" and several "build and improve relationships" PCs keep two verbs joined, on the basis that the two halves are inseparable in practice (seeking feedback that's never used doesn't satisfy the intent) or that the source matrix uses the joined phrase idiomatically as one continuous practice. One MED finding fixed: PF 3's "remain open to changing perspective" (P2) risked being an unobservable mindset claim; added an explicit line to the Evidence Guide tying it to a concrete before/after instance rather than a stated disposition.

**Pass 2 (Load):** progression logic checked coherent across all three PFs — scope widens teammate → team → cross-team → organization consistently, and PF 1/PF 2's "personal execution" vs. "fosters a culture" split at P4/P5 mirrors the same delta pattern used in Strategic Impact and Delivery. One inherited-from-source ambiguity flagged, not fixed: the LFT matrix's own Teamwork row reads P3 "helps... when requested" then P4 "sometimes helps," which could be read as a *decrease* in helping frequency rather than an increase — this is a source-matrix wording quirk, not something introduced during decomposition, and isn't something Phase C can resolve without changing the underlying matrix. Flagged for the pipeline owner. Total practice load (53 sub-functions across 3 PFs) is the largest in the pipeline so far, driven mainly by PF 3's 28 — consistent with the pattern noted in Strategic Impact that the original "≈4–10 per PF" guideline is being exceeded by every competency built to date.

**Pass 3 (Market):** cross-checked against `../industry-evidence/feedback-communication-collaboration.md` — every standard PC traces to a cited evidence-brief bullet. No new findings; the brief's own open items carry forward unresolved (no job-posting evidence sourced this session; Etsy's Leading Expert tier corroboration for P6/P7 is directional, not level-exact).

**Outcome:** one real fix applied (the P2 Handling Disagreement evidence-guide clarification); otherwise clean — the second competency in a row (after Delivery) to clear Phase C without a HIGH finding, likely reflecting the proactive compound-behavior discipline carried forward from Strategic Impact's Phase C lesson.

## V2 Independent Review (2026-07-07)

FCC was built entirely under V1 (self-checked only). Run via `/review-competency "Feedback, Communication, Collaboration" all phase`. RED findings were fixed inline below; YELLOW findings and judgment calls are surfaced here for theme-lead (Rikesh) decision, not auto-fixed.

**Phase C (standard-reviewer, quality pass):** PF1 clean. PF2 flagged 🟡 — the P3→P4 Effective Communication PC ("usually" → "consistently") is a pure frequency escalation inherited verbatim from the LFT matrix's own wording, with no qualitative anchor stated anywhere in Required Knowledge/Skills (unlike PF3's Teamwork row, where Required Skills at least states the real proactive-vs-reactive distinction); mitigated by the P3→P4 delta's second half (actively encouraging others to document), but the reliability-frequency judgment itself is under-specified. PF3 flagged 🟡 for the same pattern, more visibly: the Teamwork row's 3.3→3.5→3.6 progression ("when requested" → "sometimes" → "consistently") reads as pure frequency in the PC text, with the real qualitative shift (proactive vs. requested initiation) stated only in Required Skills ("Proactively helping teammates without being asked (P4+)"), not the PC itself. The Phase D review below confirmed the actual assessment package correctly operationalizes the proactive/reactive distinction despite the PC wording — so this is a documentation-precision issue in the standard, not a functional gap. Neither PC was rewritten in this pass (Phase C findings are theme-lead judgment calls under V2, not auto-applied).

**Phase D (assessment-reviewer, all 3 PFs, 9 files):** all 3 PFs failed Pass 1 on first read. The same systemic Rule 4 gap seen in every other competency reviewed so far — no candidate-facing sections in any of the 6 rubric/checklist files — fixed by adding "For the candidate" sections to all 6. A pass-bar calibration defect was found and fixed in PF1 and PF2: every P5+ "culture-fostering" portfolio row's "sufficient" tier could be passed on the candidate's own self-modeling alone, directly contradicting both standards' own non-negotiable Evidence Guide language ("evidenced by other people's behavior/habits changing, not just the practitioner's own modeling/output") — raised the bar in both files to require at least one instance of someone else's behavior changing. PF3 had the same pattern but was left as YELLOW only (its Evidence Guide doesn't state the "others must change" requirement as explicitly). A genuine Rule 2 coverage gap was found and fixed in PF3: sub-function 3.20 ("resolve disagreement in a healthy manner," P2) had zero coverage — the P2 instruments tested 3.19 and 3.21 but never asked about an actual disagreement resolved — added a rubric clause and a checklist prompt. A Rule 1 structural defect was found and fixed in PF3's "Helping teammates" row: the P2 and P3 pass bars bundled two independent sub-functions with an implicit AND (helping + credit-sharing at P2; blocker-resolution + on-call at P3), meaning a P3 candidate never rostered for on-call could never pass through no fault of their own — split into independent scoring rows with on-call correctly treated as N/A-able. Notably, PF3's 28-sub-function volume did NOT produce the under-coverage the review specifically checked for in Relationship Building (that row was in fact the cleanest-instrumented of the three) — the actual gap landed in Handling Disagreement instead. YELLOW items not fixed (surfaced below): missing pass/fail aggregation rules in all 3 live-demo checklists; PF2's Knowledge Sharing row tested only via artifact review, no conversational probe; PF3's P4 "helping" bar satisfiable by a single anecdote despite the PC implying an established pattern; no PF3 artifact type named for evidencing credit-sharing specifically; a question for the theme lead on whether P7 candidates should be reviewed by a P7 (not just P6+) reviewer, raised identically across all 3 PFs.

**Phase E (training-reviewer, 5 files):** Overall verdict NEEDS WORK on first read, now fixed on the RED items. Fixed: Exercise 4 (documentation contribution) was assigned in Week 1 of onboarding despite its own setup requiring "something you've explained verbally more than once recently" — a precondition no Week-1 hire can meet — moved to Month 1. A real structural gap was confirmed: Relationship Building (sub-functions 3.10–3.12, a full matrix row within PF3) had zero guided-exercise coverage — concept notes and the Phase D conversation existed, but no practice — added a new Exercise 7 (stakeholder-mapping practice) and threaded it into the learning path sequence and exercise count. YELLOW items and judgment calls not fixed (surfaced below):
- The 2-week buddy-check questions presuppose Exercises 1 and 3, both scheduled for Month 1, not Week 1–2 — only one of the four buddy questions is caveated as "fine if nothing's happened yet."
- A builder's internal session note ("WebSearch itself remained unavailable...") leaked into learner-facing concept notes and should be scrubbed; also only 1 of 13 concept sections has a "Further reading" link, an artifact of what happened to be fetched that session rather than deliberate curation.
- Exercises 3 and 4's time estimates look more than 2x optimistic once multi-person turnaround (getting reviewed by a peer and a stakeholder, or getting a doc reviewed and revised) is accounted for.
- Autonomous Project 1 is labeled a flat P4 target in the project file itself with no stretch caveat, though the standard places culture/ritual-fostering at P5+ — the learning path calls it a "P4–P5 stretch" but the project file doesn't carry that caveat.
- Credit-attribution norms (3.2, 3.8) remain concept-only with no guided exercise, the same "concept-only, no practice" pattern as the now-fixed Relationship Building gap, just smaller in scope (a sub-function pair, not a full row).
- The onboarding track never states its assumed entry P-level, making it hard to judge whether Month-1 deliverables (feedback, cross-audience explanation, a documented real disagreement) are calibrated correctly for a raw P2 hire.

**Not yet actioned (open, for Rikesh's judgment):** all YELLOW items and judgment calls above, plus the two Phase C standard-wording precision flags (PF2/PF3's frequency-worded PC text). None block use of the competency as-is.

## Primary Functions

1. Feedback (Delivering Feedback, Seeking & Receiving Feedback)
2. Communication (Effective Communication, Knowledge Sharing)
3. Collaboration (Teamwork, Relationship Building, Handling Disagreement)

See `functional-analysis.md` for the full sub-function breakdown, level tags, and the assessability reasoning behind keeping these as three PFs matching LFT's own group headings.
