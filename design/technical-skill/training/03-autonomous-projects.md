# Technical Skill — Autonomous Projects

Three open-ended projects, no step-by-step guide. Each maps to a whole PF or cluster of PFs, not a single sub-function — these are meant to be solved with real judgment, the way real work is. Each project's acceptance criteria are written so that, once complete, the project itself IS (or directly feeds) the evidence artifact a specific badge requires — see the "Badges this feeds" line on each project and `05-badge-reference-card.md` for the full map.

Completing a project does not itself award a badge — the named instrument's Verifier still has to review the resulting artifact and sign off, per `../assessment/badges.md` §1.3.

---

## Project 1 — Ship a small feature end-to-end

**[P3 target] / [P4 target]**

**Badges this feeds:** TS-1-P4 (Pyramid Builder), TS-2-P4 (Cross-Service Diagnostician), TS-3-P4 (Coupling Guardian), TS-4-P4 (Vulnerability Spotter) — this project is a live instance of all four PFs' P4 rubrics/checklists at once; a P3-scoped candidate can use it toward TS-1-P3/TS-2-P3/TS-3-P3 instead if the feature stays within a single service and epic scope.

**Brief:** Pick (or be assigned) a small, real feature for your team or client engagement. Design it, implement it, test it, and ship it to production, applying testing, debugging, and architectural fit as you go. If this is your first feature on a newly assigned client engagement, treat ramp-up into that client's codebase/conventions as part of the project, not separate overhead — budget for it explicitly rather than assuming familiarity.

**Acceptance criteria:**
- Feature is designed with an explicit note on how it fits the existing service architecture (PF 3), including — where this is a client's codebase — how it conforms to that client's existing conventions rather than LFT's default style, and how it works within any client-mandated stack/platform constraint rather than proposing to change it
- Test suite covers edge cases and error paths, composed appropriately across the testing pyramid (PF 1), and — if built against a client's existing test suite — follows that suite's conventions and uses synthetic/masked data where the engagement requires it
- Any bugs found during development are diagnosed using a systematic method, documented in the PR (PF 2); if diagnosis required production access under client restrictions, the minimum-access-request approach is documented
- Security implications are named in the PR description, even if the answer is "none identified, because X" (PF 4), including any client data-handling implications specific to this engagement
- Feature ships to production without requiring a same-day hotfix
- If working under a fixed-bid or staff-aug delivery constraint, the PR or design note states what scope/time tradeoff was made and why, rather than silently cutting corners

**What a good solution looks like:** see `../assessment/pf1-quality-testing/01-code-review-rubric.md`, `../assessment/pf2-debugging-observability/01-code-review-rubric.md` (or `02-live-demo-checklist.md` P4 scenario if the bug diagnosis was cross-service), `../assessment/pf3-software-design-architecture/02-live-demo-checklist.md` P4 scenario, and `../assessment/pf4-security/01-code-review-rubric.md`.

---

## Project 2 — Ship an AI-powered feature with eval + rollback

**[P4 target]**

**Badges this feeds:** TS-5-P4 (Full-Lifecycle AI Integrator), TS-6-P4 (Eval & Rollback Shipper — pair with the Guided Exercise 6 eval-design scenario for the live-demo half of this badge)

**Brief:** Design and ship a small AI-powered feature (using the team's approved AI tooling/APIs) with a documented eval suite and an articulated rollback condition.

**Acceptance criteria:**
- Feature uses AI capability responsibly — prompting is deliberate and documented, not ad hoc (PF 5), and AI tooling is used across coding, testing, debugging, and documentation for this feature (not just code generation)
- Only the client's/team's approved AI tooling is used, and no client data, credentials, or proprietary logic beyond what's necessary was shared with it; if you work across multiple clients, note that this feature's AI sessions/context weren't mixed with another client's
- An eval suite exists, explicitly naming which failure modes it covers and which it doesn't (PF 6)
- A rollback condition is defined before launch, tied to a measurable signal
- AI-generated code within the feature is held to the same review bar as hand-written code

**What a good solution looks like:** see `../assessment/pf5-ai-assisted-engineering/01-code-review-rubric.md` (P4 row) + `02-live-demo-checklist.md` P4 scenario, and `../assessment/pf6-ai-judgment-feature-delivery/02-live-demo-checklist.md` (the P4 eval-suite scenario describes exactly what "good" looks like here) + `03-portfolio-requirements.md` item 1.

---

## Project 3 — Drive a team testing, observability, or architecture improvement

**[P5 target]**

**Badges this feeds:** TS-1-P5 (Metrics-Driven Fixer), TS-2-P5 (Domain Stability Driver), and/or TS-3-P5 (Component Architect) depending on which variant below you run — pick the variant matching the real gap your team actually has, don't force all three at once.

**Brief:** Identify a real gap in your team's testing, observability, or architecture practice (using actual quality metrics, operational data, or a recurring design pain point — not a hunch), and drive a fix. This is real work, not a sandboxed exercise, and should take place over real sprint cycles (see time estimate in `00-learning-path.md`).

**Variant A — Testing (feeds TS-1-P5):**
- Gap identified using data (quality metrics dashboard, flaky test rate), not intuition
- A testing-pyramid-aligned fix is proposed and actually implemented by the team
- Impact is measured after the fact — did the metric actually improve?

**Variant B — Observability (feeds TS-2-P5):**
- Gap identified using operational data (monitoring dashboards, incident history), not intuition
- A monitoring/alerting change is proposed, driven to implementation, and justified by the data
- The diagnosis or change stays within your team's actual domain scope — document why it was in-scope, not an adjacent team's problem

**Variant C — Architecture (feeds TS-3-P5):**
- A service or component is architected using a named, accepted design pattern that supports iterative, autonomous development going forward (not a one-shot build)
- A design doc exists showing the pattern chosen, tradeoffs considered, and how it supports future scaling
- If a client's technical stakeholder was involved, the doc documents a negotiated tradeoff and is written handoff-ready — in terms a client engineer could use to maintain the system after the engagement ends (see Guided Exercise 7's handoff-note practice)

**What a good solution looks like:**
- Variant A: `../assessment/pf1-quality-testing/03-portfolio-requirements.md` — this project, once complete, IS the P5 portfolio evidence item.
- Variant B: `../assessment/pf2-debugging-observability/03-portfolio-requirements.md`.
- Variant C: `../assessment/pf3-software-design-architecture/03-portfolio-requirements.md` + `02-live-demo-checklist.md` P5 scenario.
