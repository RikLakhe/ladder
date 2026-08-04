# PF 2 — Debugging & Observability: Live Demo Checklist

**Used when:** technical interview or promotion review (45–90 min session).
**Covers:** P2, P3, P4, P5, P6 (P7 is assessed via portfolio + teaching demonstration — see `03-portfolio-requirements.md`).

**For the candidate:** each scenario is a full, realistic build/diagnosis, not a trivia round — come ready to work a real (seeded) problem live. Badge sign-off requires this checklist plus, at P2–P3, the paired PR bundle in `01-code-review-rubric.md`; at P5+, the paired portfolio item in `03-portfolio-requirements.md`. Per `../badges.md` §1.1, **TS-2-P4** and **TS-2-P6** additionally require the candidate's delivery/account manager as co-signer alongside the technical verifier. See `../badges.md`.

## Scenario: P2 — Reproduce a reported bug

**Setup:** Give the candidate a vague bug report (2–3 sentences, like a real user ticket) for a small, familiar codebase. 20 minutes.

**Checklist:**
- [ ] Asks clarifying questions before touching code
- [ ] Attempts to reproduce the reported behavior before proposing a fix
- [ ] Uses a debugger or logging statement to inspect state, with reasonable prompting

**Prompts:** "What would you ask the person who filed this ticket?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min read-in, 15 min hands-on.

---

## Scenario: P3 — Debug a seeded single-service bug

**Setup:** A codebase with one seeded bug in a single service. 30 minutes, unaided.

**Checklist:**
- [ ] Reproduces the bug independently
- [ ] Narrates a systematic method (bisection, log correlation) rather than guessing
- [ ] Correctly distinguishes the symptom from the root cause in their explanation

**Prompts:** "How do you know this is the actual cause, not just a correlated symptom?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min setup, 25 min hands-on.

---

## Scenario: P3 — Read a team dashboard

**Setup:** Show the candidate a real (or realistic mock) team operational dashboard for a system they're not deeply familiar with, covering a normal time window plus one window with an injected anomaly. 15 minutes. If the live system is client-owned and access is restricted or gated, use a sanitized/representative extract or a screen-recorded walkthrough taken with client permission instead of live access.

**Checklist:**
- [ ] Describes what "normal" looks like on the dashboard (typical ranges, usual patterns) before being asked about the anomaly
- [ ] Identifies the anomalous window and explains what makes it look different from baseline
- [ ] Distinguishes noise/normal variance from a genuine anomaly, rather than flagging every fluctuation
- [ ] When the dashboard/logging tooling is presented as an unfamiliar client's own conventions (not a standard internal toolchain), orients to it quickly — asking where key signals live and what's normal for this tool — rather than expecting the last client's toolchain to carry over

**Prompts:** "If you only had this dashboard and nothing else, how would you know something was wrong?" "This is a client's own monitoring setup, not one you've used before — how do you get oriented before you trust what you're seeing?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min orientation, 10 min discussion.

---

## Scenario: P4 — Diagnose a seeded cross-service bug

**Setup:** A bug whose symptom appears in Service A but whose cause is in Service B. 30–40 minutes.

**Checklist:**
- [ ] Forms and tests hypotheses across service boundaries, not just within the symptomatic service
- [ ] Knows when to say "I'd loop in a senior engineer here" rather than thrashing
- [ ] Proposes a monitoring/alerting change that would have caught this sooner
- [ ] When told this is a client's production environment with access restrictions (no direct prod access, redacted logs, approval-gated queries), requests the minimum access needed to make progress rather than treating the restrictions as blockers to escalate or work around

**Prompts:** "What signal, if it had existed, would have caught this before a user reported it?" "Say you don't have direct prod access here and logs are redacted — what's the smallest access request that gets you unstuck?"

**Scoring:** pass/follow-up/fail. **Time budget:** 10 min setup, 30 min hands-on.

**Badge:** clearing this scenario contributes to **TS-2-P4 (Cross-Service Diagnostician)** — see `../badges.md`. Sign-off requires the technical verifier (engineer ≥ P5) **plus the candidate's delivery/account manager as co-signer**, confirming the production-access-restriction context is a real engagement constraint, not a hypothetical.

---

## Scenario: P5 — Domain-scope judgment

**Setup:** Candidate is given a live (or realistic mock) incident summary and asked to determine what's in scope for their team's domain vs. what should be escalated to another team. 20 minutes.

**Checklist:**
- [ ] Correctly separates in-domain from adjacent-domain aspects of the problem
- [ ] Describes a monitoring change they'd drive, justified by data, not instinct
- [ ] Doesn't over-escalate (declining to own something that is actually in scope) or overreach (owning something genuinely outside their domain)

**Prompts:** "What's your evidence this is actually your team's issue and not [adjacent team]'s?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min read-in, 15 min discussion.

---

## Scenario: P6 — Cross-domain diagnosis facilitation

**Setup:** Candidate is told an issue spans two related domains owned by different teams, and asked to walk through how they'd lead the diagnosis. 20 minutes.

**Checklist:**
- [ ] Identifies which team should own which part of the investigation
- [ ] Describes an observability practice (dashboards, alert conventions) that would help both teams going forward
- [ ] Shows they'd coordinate rather than diagnose everything solo

**Prompts:** "How do you keep two teams' incident responses from stepping on each other?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min setup, 15 min discussion.

**Badge:** clearing this scenario, plus the paired portfolio items, contributes to **TS-2-P6 (Observability Practice Architect)** — see `../badges.md`. Sign-off requires the technical verifier (P6+ engineer) **plus the candidate's delivery/account manager as co-signer**, confirming the cross-domain coordination and adoption evidence claimed in the portfolio item are real.
