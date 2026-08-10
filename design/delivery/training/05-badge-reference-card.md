# Delivery — Badge Reference Card

**Purpose:** a one-screen lookup so a candidate or buddy can see, at a glance, which training unit prepares which badge — without re-reading all 6 assessment instruments across both PFs. This card does not redefine anything; every cell links back to `../assessment/badges.md` and the instrument it names. If this card and an assessment instrument ever disagree, the instrument in `../assessment/` wins.

**Reuse note (for future competencies):** this file's *shape* — one row per badge, linking training unit → evidence artifact → instrument — is the reusable pattern, copied from Technical Skill's `05-badge-reference-card.md`. Only the PF names, badge IDs, and artifact names are Delivery-specific.

---

## How to read this card

- **Badge ID** and **Name** — from `../assessment/badges.md` Part 2.
- **Training unit that builds it** — which guided exercise, autonomous project, or onboarding milestone in this `training/` folder produces (or rehearses producing) the required evidence artifact.
- **Evidence artifact required** — restated from the badge's "Evidence required" field, so you know what to walk away from the training unit holding. Where the artifact is a **bundle** (PF 1, P2/P3) or a **cycle record** (PF 2, P2–P4), this reflects the 2026-08-03 redesign — a scattered handful of tickets or status notes no longer qualifies.
- **Instrument** — which file in `../assessment/` actually awards the badge.

Training builds the artifact. It does not award the badge — only a Verifier at the role/level named in the instrument can do that (see `../assessment/badges.md` §1.3), including the required co-signer at Tier 3 (P4) and Tier 5 (P6) per §1.1.

---

## PF 1 — Incremental Value Delivery

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| DL-1-P2 | Split-Reasoning Starter | Guided Exercise 1 | 1 delivery-unit bundle, ≥5 real tickets from one sprint/ramp period, "Meets P2" rows | `pf1.../01-work-product-review-rubric.md` |
| DL-1-P3 | Dependency-Aware Sizer | Guided Exercise 1 + Exercise 2 (same bundle, extended) | Same bundle, "Meets P3" rows, incl. ≥1 documented ambiguous-decision rationale | same |
| DL-1-P4 | Unaided Resizer | Guided Exercise 5 (rehearsal) + the real proctored live-demo scenario | Live demo P4 scenario pass, all 4 checklist items | `pf1.../02-live-demo-checklist.md` — **co-signer required** (candidate's delivery/account manager) if a client-scope-change context is claimed |
| DL-1-P5 | Epic Breakdown Driver | Autonomous Project 3 | Portfolio items 1.4/1.10 at "good" + live demo P5 scenario pass | `pf1.../03-portfolio-requirements.md` + `02-live-demo-checklist.md` P5 |
| DL-1-P6 | Cross-Team Dependency Converger | Real cross-team/cross-engagement work (no guided exercise — see `00-learning-path.md` P5→P6 gate) | Portfolio items 1.5/1.11 at "good" + live demo P6 pass + §1.6 adoption-evidence artifact (or §1.8 services-signal alternative) | same files, P6 rows — **co-signer required** |
| DL-1-P7 | Org-Wide Breakdown & Prevention Owner | Real org-wide work + teaching demonstration | Portfolio items 1.6/1.12/1.17 at "good" + teaching demo | `pf1.../03-portfolio-requirements.md` P7 |

## PF 2 — Self-Organization

| Badge | Name | Training unit | Evidence artifact required | Instrument |
|---|---|---|---|---|
| DL-2-P2 | Daily Progress Reporter | Guided Exercise 3 | 1 full continuous 2–4 week status/escalation cycle record, "Meets P2" rows | `pf2.../01-work-product-review-rubric.md` |
| DL-2-P3 | Same-Day Escalator | Guided Exercise 3 + Exercise 4 (same cycle) | Same cycle record, "Meets P3" rows — every escalation same-day, checked against dates | same |
| DL-2-P4 | Early-Warning Communicator | Guided Exercise 3 + Exercise 4 (same cycle, P4 depth) | Same cycle record, "Meets P4" rows — both the early-communication instance and the teammate-tradeoff instance, within the same cycle | `pf2.../01-work-product-review-rubric.md` — **co-signer required** if a client-facing status/escalation context is claimed |
| DL-2-P5 | Expectation-Setting Lead | Autonomous Project 3 | Portfolio items 2.5/2.12 at "good" | `pf2.../03-portfolio-requirements.md` |
| DL-2-P6 | Cross-Team Roadmap Manager | Real cross-team work | Portfolio items 2.6/2.13 at "good" + §1.6 adoption-evidence artifact (or §1.8 services-signal alternative) | same, P6 rows — **co-signer required** |
| DL-2-P7 | Org-Wide Roadmap & Economic Culture Owner | Real org-wide work + teaching demonstration OR pre-sales/solutioning contribution (§1.8) | Portfolio items 2.7/2.14 at "good" + teaching demo | `pf2.../03-portfolio-requirements.md` P7 |

---

## Bundle/cycle requirements this card assumes (2026-08-03 redesign)

- **PF 1, P2/P3:** the evidence bundle must be ≥5 real tickets from **one** identifiable delivery unit (a sprint, a small epic slice, or an engagement ramp period) — not a scattered set of best-case tickets pulled from unrelated periods. Pick the unit before starting, per `02-guided-exercises.md` Exercise 1's setup.
- **PF 2, P2–P4:** the evidence record must span **one full, continuous 2–4 week delivery cycle**, chosen before it starts — not a good week cherry-picked afterward, and not a handful of disconnected status notes. Every escalation and cost/value decision named in the criteria must fall within that same cycle.
- Neither requirement can be manufactured retroactively. If a candidate discovers mid-review that their evidence spans the wrong shape (scattered tickets, a broken cycle with a gap), the fix is to run the training unit again against a real, freshly-committed delivery unit/cycle — not to reconstruct one from memory.

## Client-context items with dedicated practice in this training package

- **PF 1 — SOW / change-request discipline:** concept notes §7a, Exercise 5's scope-addition variant, Autonomous Project 1's acceptance criteria.
- **PF 1/PF 2 — engagement ramp-up as a valid bundle/cycle source:** concept notes §7b; `01-work-product-review-rubric.md` explicitly lists ramp period as an acceptable delivery unit.
- **PF 2 — externally-imposed process constraints:** concept notes §12a; the in-place attestation path (`badges.md` §1.5) is named explicitly in `00-learning-path.md`'s prerequisites and `04-onboarding-track.md`'s Day 1 section for engagements where a client's tooling can't export a record.

## What this card is not

- Not a substitute for reading the actual rubric/checklist/portfolio file before an assessment — it tells you where to look, not what the bar is in full.
- Not a self-certification tool — see `../assessment/badges.md` §1.3: a badge requires a named Verifier's sign-off, always, plus the co-signer at Tier 3/Tier 5 where noted above.
