# Technical Skill — Learning Path

Reads: `../standard/` (all 6 PFs), `../assessment/` (all 6 PFs, including `badges.md` — the 36-badge catalog this training package is built to prepare candidates for), `../industry-evidence/technical-skill.md`, `../COMPANY-CONTEXT.md`.

**Level scope of this run:** whole P2–P7 ladder is covered structurally (all six PFs run P2–P7 per `functional-analysis.md`), but guided exercises and autonomous projects — the parts of this kit that are actually buildable as step-by-step content — are scoped to **P2–P5**, matching where the assessment package's own rubrics/checklists (not just portfolio review) provide a concrete target to train toward. P6/P7 readiness is demonstrated through real cross-team/org-wide work and portfolio review per each standard's Evidence Guide, not through guided exercises — see the Level gates section below and `03-autonomous-projects.md`'s framing. This is not a gap in this run; it's the same principle the methodology names for P5–P7 generally (see `competency-methodology.md`, "Level Scoping").

See `05-badge-reference-card.md` for a one-screen map of every badge in `../assessment/badges.md` to the training unit that builds its evidence artifact.

## Prerequisites checklist

Before starting this learning path, confirm:

- [ ] Comfortable with at least one language in LFT's active stack (Python, Vue, Flask, React, or the Go/AWS track — see `COMPANY-CONTEXT.md`)
- [ ] Git/version-control workflow literacy (branching, PRs, code review basics) — this is assumed throughout PF 1 and PF 2 and is not separately decomposed in this competency; if missing, close this gap first
- [ ] Access to a real (or realistic sandbox) codebase, CI pipeline, and the team's/client's approved AI coding tool
- [ ] Has read `../../lft-engineering-competency-matrix.md` Section 1 and the AI Capability section, so the P2–P7 language in this path isn't unfamiliar
- [ ] Has skimmed `../assessment/badges.md` Part 1 (the generic badge pattern) and Part 2's table for their target PF, so they know what evidence they're accumulating from day one, not just what exercise they're doing
- [ ] Understands this is a services/consulting context: the "codebase" in any exercise below may be a client's existing codebase with its own (possibly inconsistent) conventions, not one LFT designed — fast, disciplined ramp-up into unfamiliar code is a core expectation at every level, not a one-time onboarding event

## Ordered sequence

| # | Type | Activity | PF(s) | Target level | Badge(s) built toward | Time |
|---|---|---|---|---|---|---|
| 1 | Concept | Read concept notes §1–7 (Testing pyramid → Organizational testing strategy) | PF 1 | P2 | — | 1–2 hrs |
| 2 | Guided | Exercise 1 — Write testable code + unit tests, in a client's own conventions | PF 1 | P2 | TS-1-P2 | 60–90 min |
| 3 | Guided | Exercise 1 repeated unaided, second client codebase | PF 1 | P3 | TS-1-P3 | 60–90 min |
| 4 | Concept | Read concept notes §8–14 (Debugging methods → Alerting design) | PF 2 | P2 | — | 1–2 hrs |
| 5 | Guided | Exercise 2 — Systematic debugging on unfamiliar code | PF 2 | P2–P3 | TS-2-P2, TS-2-P3 | 60–90 min |
| 6 | Guided | Exercise 2b — Orient to an unfamiliar client's dashboard/logging tooling | PF 2 | P3 | TS-2-P3 | 30–45 min |
| 7 | Concept | Read concept notes §15–20 (Design patterns → Architecture governance) | PF 3 | P2 | — | 1 hr |
| 8 | Guided | Exercise 3 — Fit a feature into existing architecture | PF 3 | P2–P3 | TS-3-P2, TS-3-P3 | 60–90 min |
| 9 | Concept | Read concept notes §21–26 (OWASP categories → Security governance) | PF 4 | P2 | — | 1–2 hrs |
| 10 | Guided | Exercise 4 — Security checklist walkthrough (**gated: do not attempt in full until the P3 → P4 transition** — PF 4's own rubric marks its P4 criteria "N/A" for P2/P3; P2/P3 learners do only steps 1 and 4 and rely on PC 4.2 until they reach P4) | PF 4 | P2–P3 partial / P4 full | TS-4-P2, TS-4-P3 (partial); TS-4-P4 (full) | 45–60 min |
| 11 | Concept | Read concept notes §27–30 (Prompting → Workflow measurement) | PF 5 | P2 | — | 1 hr |
| 12 | Guided | Exercise 5 — AI-assisted workflow with review discipline | PF 5, PF 6 | P2–P3 | TS-5-P2, TS-5-P3, TS-6-P2, TS-6-P3 | 45–60 min |
| 13 | Concept | Read concept notes §31–35 (Probabilistic behavior → Responsible AI) | PF 6 | P3 | — | 1–2 hrs |
| 14 | Guided | Exercise 6 — Design a basic eval suite | PF 6 | P4 | TS-6-P4 (with Project 2) | 60–90 min |
| 15 | Guided | Exercise 7 — Design within a client-mandated stack constraint, with a handoff note | PF 3 | P4 (previews P5) | TS-3-P4 | 60–90 min |
| 16 | Autonomous | Project 1 — Ship a small feature end-to-end | PF 1–4 | P3–P4 | TS-1-P4, TS-2-P4, TS-3-P4, TS-4-P4 | 3–5 days |
| 17 | Autonomous | Project 2 — Ship an AI-powered feature with eval + rollback | PF 5–6 | P4 | TS-5-P4, TS-6-P4 | 3–5 days |
| 18 | Autonomous | Project 3 — Drive a team testing/observability/architecture improvement | PF 1–3 | P5 | TS-1-P5, TS-2-P5, TS-3-P5 (pick variant) | 2–4 weeks (real work, not a sandboxed exercise) |

**Total guided-practice time estimate:** roughly 13–16 days of deliberate practice spread across onboarding (not consecutive working days — interleave with real assigned work).

## Level gates

- **P2 → P3:** passes the code review rubric at "Meets P3" across PF 1–4, passes the PF 2 P3 live-demo scenarios (including Exercise 2b's dashboard orientation), and passes the PF 5/PF 6 code review rubrics at "Meets P3" (neither PF has a P3 live-demo instrument beyond PF5's P3 scenario — PF 6's only live-demo checklist starts at P4). Badges typically cleared at this gate: TS-1-P3, TS-2-P3, TS-3-P3, TS-5-P3, TS-6-P3. Gate owner: manager, using the Phase D rubrics directly.
- **P3 → P4:** passes "Meets P4" on PF 1/PF 4 code review rubrics, passes the PF 2/PF 3/PF 6 P4 live-demo scenarios (including Exercise 7's stack-constraint scenario for PF 3), has completed Exercise 4 in full (the first point PF 4's P4 criteria stop being "N/A"), and has shipped Autonomous Project 1 and 2 (or equivalent real work) to the "good" quality bar. Badges typically cleared at this gate: TS-1-P4, TS-2-P4, TS-3-P4, TS-4-P4, TS-5-P4, TS-6-P4.
- **P4 → P5:** this is a scope-of-role transition (execution → facilitation), not something a guided exercise can produce. Gate is the Phase D portfolio requirements for P5 across PF 1, PF 2, PF 3, PF 4, and PF 5 — real on-the-job evidence, reviewed per each standard's Evidence Guide. Autonomous Project 3 is the natural on-ramp but the badge (TS-*-P5) still requires the named Verifier's review of real shipped work, not the project's completion alone.
- **P5 → P6 → P7:** same pattern, scaling scope from team to several teams to organization. See each standard's Promotion Criteria section; there is no guided/autonomous content for these transitions in this run — see the deferred-levels note below. P6/P7 readiness is demonstrated through actual cross-team/org-wide work plus a teaching demonstration, per each PF's portfolio requirements.

## Levels built out this run vs. deferred

**Built out this run (P2–P5):** concept notes, guided exercises (1, 1-repeat, 2, 2b, 3, 4, 5, 6, 7), and autonomous projects (1, 2, 3) all target P2–P5 explicitly, and each is labeled with the badge(s) it feeds.

**Deferred this run (P6–P7):** no new guided/autonomous content was built for P6/P7. This is a deliberate, stated deferral, not a silent gap — at P6/P7 the standard's own Evidence Guide and this competency's badge catalog both call for portfolio + teaching-demonstration evidence from real cross-team/org-wide work, which by definition isn't something a guided exercise can simulate meaningfully (see methodology "Level Scoping": P5–P7 growth is usually demonstrated through real scope and portfolio evidence, not guided exercises). What P6/P7 candidates need from this training package is already present: the onboarding-track pattern, the concept notes (which don't level-gate), and the badge reference card's pointer to the correct portfolio-requirements file per PF. A future training run could add P6/P7-specific *facilitation/mentoring* guided content (e.g. "run a mock cross-team convergence conversation") if the theme lead decides that's worth building despite the real-work bias — not done here.

## Skip guide

- **Experienced hire joining at P4 or above:** skip concept notes and guided exercises entirely. Start at Autonomous Project 1, and use the Phase D portfolio requirements to identify what evidence to bring from their prior role. Check `05-badge-reference-card.md` first to see which badges their existing work might already satisfy.
- **Experienced hire joining at P3:** skim concept notes (they're a refresher, not new material), skip straight to guided exercises to confirm baseline, then proceed to autonomous projects.
- **Anyone already fluent in the company's AI coding tools:** skip Exercise 5 and go straight to Exercise 6 and Autonomous Project 2 — but only after confirming the review-discipline and uncertainty-flagging habits in Exercise 5's checklist verbally, since those habits (not tool fluency) are what PF 5/PF 6 actually assess.
- **Engineer rotating onto a new client engagement (any level):** do not skip Exercise 2 (systematic debugging), Exercise 2b (dashboard orientation), or Exercise 3 (fit a feature into existing architecture) even if previously passed on another engagement — all three are re-run against the new client's codebase and conventions as a ramp-up check, since "fluent in PF 2/PF 3" on one client's code doesn't transfer automatically to another's. Treat `04-onboarding-track.md` as the standard rotation checklist, not just a first-job-ever checklist.
