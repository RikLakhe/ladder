# PF 1 — Quality & Testing: Live Demo Checklist

**Used when:** technical interview or promotion review (45–90 min session).
**Covers:** P4 (execution demonstration), P5 (facilitation demonstration), P6 (facilitation demonstration). P2/P3 are assessed via code review rubric only (see `01-code-review-rubric.md`); P7 is assessed via portfolio + teaching demonstration (see `03-portfolio-requirements.md`).

**For the candidate:** each scenario below is a full build/facilitation exercise, not a quiz — come ready to produce a real design or plan live, not recite definitions. Clearing the scenario's scoring bar contributes to the badge at that level (see `../badges.md`); at P4 the badge also requires the code review rubric bundle to be clear.

## Scenario: P4 — Design a test suite for a small feature

**Setup:** Give the candidate a short spec for a small feature (e.g. "a function that applies a discount code with three business rules"). 30 minutes.

**Checklist — observable behaviors:**
- [ ] Identifies which testing-pyramid layer each planned test belongs to, and says why
- [ ] Names at least two edge cases and one error path before writing code
- [ ] Writes code that is reviewable without narrating it
- [ ] Distinguishes what needs a comment (non-obvious rationale) from what doesn't
- [ ] When told the feature ships into a client's existing codebase with a mandated test framework or a restricted CI environment, adapts the test suite design to those constraints rather than proposing to change them or treating them as blockers

**Prompts to probe understanding vs. rote recall:**
- "Why did you put this test at the unit level instead of integration?"
- "What would make you decide this needs an integration test instead?"
- "Say this client mandates a test framework you don't normally use and the CI environment is locked down — what changes about your plan?"

**Scoring:** pass / follow-up / fail per checklist item. Overall recommendation requires at least 4 of 5 items at "pass."

**Time budget:** 5 min setup, 20 min build, 10 min discussion, 5 min wrap-up.

---

## Scenario: P5 — Facilitate a team testing-standard conversation

**Setup:** Role-play scenario — the candidate is told their team's flaky-test rate has doubled this quarter (with a mock quality-metrics snapshot). They have 20 minutes to walk through how they'd diagnose and address it with the team.

**Checklist — observable behaviors:**
- [ ] Reads the metrics snapshot and identifies a plausible root cause pattern (not just "write better tests")
- [ ] Proposes a testing-pyramid-aligned fix, not a blanket "add more tests" directive
- [ ] Describes how they'd bring the team along (not just mandate a change)

**Prompts:**
- "How would you know if this fix actually worked in a month?"
- "What would you do if a teammate pushed back on the proposed fix?"

**Scoring:** pass / follow-up / fail per item. Overall recommendation requires the root-cause and fix items both at "pass."

**Time budget:** 5 min setup/read-in, 15 min discussion, 5 min wrap-up.

---

## Scenario: P6 — Converge testing practice across teams

**Setup:** Candidate is told two teams have incompatible testing approaches (e.g. one relies on heavy e2e, one has none) and is asked how they'd converge them. 20 minutes.

**Checklist — observable behaviors:**
- [ ] Investigates why each team's current approach exists before proposing a change (doesn't assume one team is just "wrong")
- [ ] Proposes a convergence path with a realistic timeline, not an immediate mandate
- [ ] Names how they'd measure whether convergence succeeded

**Prompts:**
- "One team says the change will slow them down for a quarter — how do you respond?"

**Scoring:** pass / follow-up / fail per item.

**Time budget:** 5 min setup, 15 min discussion.

---

**Badge note:** this instrument alone does not earn the P5/P6 badge — the badge additionally requires the corresponding portfolio item in `03-portfolio-requirements.md` (real driven change / real convergence work), because the standard's own Evidence Guide requires portfolio evidence at P5+, not a scenario alone. See `../badges.md` (TS-1-P4 / TS-1-P5 / TS-1-P6). Per `../badges.md` §1.1, sign-off on **TS-1-P4** requires the technical verifier (engineer ≥ P5, or hiring panel) **plus the candidate's delivery/account manager as co-signer**; sign-off on **TS-1-P6** requires the same pairing, with the co-signer also confirming the adoption evidence in the portfolio item is real.
