# Technical Skill — Badge Reference Card

**Purpose:** a one-screen lookup so a candidate or buddy can see, at a glance, which training unit prepares which badge — without re-reading all 18 assessment instruments. This card does not redefine anything; every cell links back to `../assessment/badges.md` and the instrument it names. If this card and an assessment instrument ever disagree, the instrument in `../assessment/` wins.

**Reuse note (for future competencies):** this file's *shape* — one row per badge, linking training unit → evidence artifact → instrument — is the reusable pattern. Only the PF names, badge IDs, and artifact names are Technical-Skill-specific.

---

## How to read this card

- **Badge ID** and **Name** — from `../assessment/badges.md` Part 2.
- **Training unit that builds it** — which guided exercise, autonomous project, or onboarding milestone in this `training/` folder produces (or rehearses producing) the required evidence artifact.
- **Evidence artifact required** — restated from the badge's "Evidence required" field, so you know what to walk away from the training unit holding.
- **Instrument** — which file in `../assessment/` actually awards the badge.

Training builds the artifact. It does not award the badge — only a Verifier at the role/level named in the instrument can do that (see `../assessment/badges.md` §1.3, §4.1).

---

## PF 1 — Quality & Testing

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| TS-1-P2 | Edge-Case Guardian | Guided Exercise 1 (×2 real instances) | Bundle of 2 real PRs: code + guided test + review thread, following client test conventions with guidance | `pf1.../01-code-review-rubric.md` |
| TS-1-P3 | Unaided Test Author | Guided Exercise 1 repeated unaided, on a new client's codebase | Bundle of 2 real PRs, no guidance thread visible, synthetic/masked fixtures where required | same |
| TS-1-P4 | Pyramid Builder | Autonomous Project 1 | Feature bundle: PR(s) + multi-layer test suite + live demo pass | `pf1.../01-code-review-rubric.md` + `02-live-demo-checklist.md` P4 scenario |
| TS-1-P5 | Metrics-Driven Fixer | Autonomous Project 3 | Portfolio item 1 + live demo P5 scenario pass | `pf1.../03-portfolio-requirements.md` + `02-live-demo-checklist.md` P5 |
| TS-1-P6 | Cross-Team Test Converger | Real cross-team work (no guided exercise — see `00-learning-path.md` P5→P6 gate) | Portfolio item 2 + live demo P6 scenario pass | same files, P6 rows |
| TS-1-P7 | Testing Standard Setter | Real org-wide work + teaching demonstration | Portfolio item 3 + teaching demo | `pf1.../03-portfolio-requirements.md` P7 |

## PF 2 — Debugging & Observability

| Badge   | Name                             | Training unit                                                                                              | Evidence artifact required                                                               | Instrument                                                                    |
| ------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| TS-2-P2 | First Reproducer                 | Guided Exercise 2                                                                                          | Live demo P2 pass + 1 real bug-fix PR                                                    | `pf2.../02-live-demo-checklist.md` + `01-code-review-rubric.md`               |
| TS-2-P3 | Systematic Debugger              | Guided Exercise 2 repeated unaided on an unfamiliar client's tooling + Exercise 2b (dashboard orientation) | 1 real bug-fix PR + seeded-bug demo + dashboard demo (including unfamiliar-tooling item) | `pf2.../01-code-review-rubric.md` + `02-live-demo-checklist.md` (2 scenarios) |
| TS-2-P4 | Cross-Service Diagnostician      | Autonomous Project 1 (cross-service variant)                                                               | Live demo P4 scenario pass, incl. minimum-access-request item                            | `pf2.../02-live-demo-checklist.md` P4                                         |
| TS-2-P5 | Domain Stability Driver          | Autonomous Project 3                                                                                       | Portfolio items 1–2 + live demo P5 pass                                                  | `pf2.../03-portfolio-requirements.md` + `02-live-demo-checklist.md` P5        |
| TS-2-P6 | Observability Practice Architect | Real cross-team work                                                                                       | Portfolio items 3–4 + live demo P6 pass                                                  | same, P6 rows                                                                 |
| TS-2-P7 | Incident Commander               | Real org-wide incident + teaching demo                                                                     | Portfolio items 5–6 + teaching demo                                                      | `pf2.../03-portfolio-requirements.md` P7                                      |

## PF 3 — Software Design & Architecture

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| TS-3-P2 | Module Fit Finder | Guided Exercise 3 | 1 real PR | `pf3.../01-code-review-rubric.md` |
| TS-3-P3 | Pattern-Aligned Designer | Guided Exercise 3 repeated unaided + documented data-flow explanation | 2 real PRs + 1 data-flow note | same |
| TS-3-P4 | Coupling Guardian | Guided Exercise 7 (stack-constraint design) | Live demo P4 scenario pass, incl. client-stack-constraint item | `pf3.../02-live-demo-checklist.md` P4 |
| TS-3-P5 | Component Architect | Autonomous Project 3 (architecture variant) + handoff-doc practice from Exercise 7 | Portfolio item 1 (design doc, handoff-ready where a client stakeholder was involved) + live demo P5 pass | `pf3.../03-portfolio-requirements.md` + `02-live-demo-checklist.md` P5 |
| TS-3-P6 | Cross-Team Pattern Guide | Real cross-team work + teaching demo | Portfolio item 2 + teaching demo | `pf3.../03-portfolio-requirements.md` P6 |
| TS-3-P7 | Architecture Principal | Real org-wide work + teaching demo | Portfolio item 3 + teaching demo | same P7 |

## PF 4 — Security

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| TS-4-P2 | Security-Aware Contributor | Guided Exercise 4 (pre-checklist step) | 1 real PR touching sensitive I/O | `pf4.../01-code-review-rubric.md` |
| TS-4-P3 | Escalation-Disciplined Engineer | Guided Exercise 4 escalation step | 1 real PR + 1 documented escalation | same |
| TS-4-P4 | Vulnerability Spotter | Guided Exercise 4 (full) | Live demo P4 pass + real PR showing checklist use | `pf4.../02-live-demo-checklist.md` + `01-code-review-rubric.md` |
| TS-4-P5 | Security Practice Co-Author | Real joint work with security team | Portfolio item 1 | `pf4.../03-portfolio-requirements.md` P5 |
| TS-4-P6 | Cross-Team Security Enforcer | Real cross-team work | Portfolio item 2 | same P6 |
| TS-4-P7 | Security Strategy Owner | Real org-wide work + teaching demo | Portfolio items 3–4 + teaching demo | same P7 |

## PF 5 — AI-Assisted Engineering

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| TS-5-P2 | Review-Every-Time Practitioner | Guided Exercise 5 | Live demo P2 pass + 3–5 AI-assisted PRs | `pf5.../02-live-demo-checklist.md` + `01-code-review-rubric.md` |
| TS-5-P3 | Repeatable Prompter | Guided Exercise 5, step 5 (pattern comparison) | Live demo P3 pass + PR bundle | same, P3 rows |
| TS-5-P4 | Full-Lifecycle AI Integrator | Autonomous Project 2 | Live demo P4 pass + PR bundle | same, P4 rows |
| TS-5-P5 | Team AI Standard Setter | Real team-standard work | Portfolio item 1 | `pf5.../03-portfolio-requirements.md` P5 |
| TS-5-P6 | Cross-Team AI Adoption Driver | Real cross-team work | Portfolio item 2 | same P6 |
| TS-5-P7 | Organizational AI Workflow Governor | Real org-wide work + teaching demo | Portfolio item 3 + teaching demo | same P7 |

## PF 6 — AI Judgment & Feature Delivery

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| TS-6-P2 | Uncertainty Flagger | Guided Exercise 5 (uncertainty-flagging habit) | 3–5 AI-assisted PRs | `pf6.../01-code-review-rubric.md` |
| TS-6-P3 | Hallucination Catcher | Guided Exercise 5 + self-review log | Same PR bundle | same |
| TS-6-P4 | Eval & Rollback Shipper | Guided Exercise 6 + Autonomous Project 2 | Live demo P4 pass + portfolio item 1 | `pf6.../02-live-demo-checklist.md` + `03-portfolio-requirements.md` |
| TS-6-P5 | AI-Judgment Reviewer | Real teammate-PR review with AI judgment | Portfolio item 2 | `pf6.../03-portfolio-requirements.md` P5 |
| TS-6-P6 | Systemic AI Risk Fixer | Real cross-team work | Portfolio item 3 | same P6 |
| TS-6-P7 | AI Governance Owner | Real org-wide work + teaching demo | Portfolio item 4 + teaching demo | same P7 |

---

## Client-context items this run added exercises for

Per the RED-fix additions to the assessment package, these three client-context items now have dedicated practice, not just a mention:

- **PF 1 — client codebase conventions & test-data handling:** Guided Exercise 1, steps 1 and (new) step 6 (synthetic/masked fixture practice).
- **PF 2 — client tooling/access-restriction navigation:** Guided Exercise 2b (dashboard orientation on unfamiliar client tooling) and Exercise 2, step 5 (minimum-access-request habit).
- **PF 3 — client stack-constraint + handoff docs:** new Guided Exercise 7 (stack-constraint design) and its handoff-note step, feeding Autonomous Project 3's P5 architecture variant.

## What this card is not

- Not a substitute for reading the actual rubric/checklist/portfolio file before an assessment — it tells you where to look, not what the bar is in full.
- Not a self-certification tool — see `../assessment/badges.md` §1.3: a badge requires a named Verifier's sign-off, always.

