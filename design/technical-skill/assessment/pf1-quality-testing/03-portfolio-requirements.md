# PF 1 — Quality & Testing: Portfolio Requirements

**Used when:** promotion review to P5/P6/P7, or senior/staff/architect-level hiring.

**For the candidate:** every item below must be real, shipped work with a measurable outcome — not a proposal that never ran. This is the portfolio-worthy bar this competency's redesign is built around: a paragraph of context plus a link is not enough on its own; the "good" column is what should be aimed for, since it's what a badge (below) actually requires.

## Required evidence items

| Item                                                                                         | Maps to PC | Quality bar: sufficient          | Quality bar: good                                                                                                              |
| -------------------------------------------------------------------------------------------- | ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| A testing-pyramid-aligned fix they recommended, with the quality-metrics gap it addressed    | 1.7 [P5]   | Recommendation was implemented   | Recommendation cites specific metrics (not "code felt untested") and the metric measurably improved afterward                  |
| (P6+) A testing-strategy convergence proposal across ≥2 teams                                | 1.8 [P6]   | Proposal was written and shared  | Proposal was adopted by the teams involved, evidenced by the adoption-evidence artifact in `../badges.md` §1.6 (a named contact at each adopting team + a dated Slack/email/PR reference + one line on what changed as a result), with a documented before/after |
| (P7) An organization-wide testing standard document, with an adherence-measurement mechanism | 1.9 [P7]   | Standard exists and is published | Standard has a working adherence-measurement mechanism (dashboard, audit process, etc.) and evidence of teams being held to it, instrumented the same way (named contact + dated reference + what changed) for at least 2 teams |

## Submission format

- Link to the actual artifact (metrics dashboard, proposal doc, standard document) — not a description of it. If the artifact lives in a client-owned system with no shareable link (client repo, client dashboard tooling), a screen-recorded walkthrough or a sanitized/redacted extract is acceptable in its place, with client sign-off obtained per engagement data-handling policy before submission. **Getting that sign-off expedited is the sponsoring delivery lead/account manager's job, not something to chase alone** — if a client's contract terms make any extraction impossible, use the in-place attestation path in `../badges.md` §1.5 instead (verifier reviews the artifact inside the client environment and signs an attestation; no diff needs to leave the client system)
- Redact client-identifying names, data, and any confidential business logic from the submitted artifact — the reviewer needs to see the testing approach and outcome, not client IP
- 1-paragraph context: what problem existed before, what changed, what the measured outcome was
- Named collaborators/stakeholders, for the reviewer to optionally cross-check
- Time spent assembling this submission counts as normal professional development time, coordinated with your delivery/account lead — not unpaid overtime or a billable-hours negotiation

## Review process

- Reviewed by a P6+ engineer not on the candidate's own team (technical verifier), plus the candidate's manager. **For the P6 item specifically, "manager" means the candidate's delivery/account manager, co-signing to confirm the convergence work and adoption claimed actually happened** — distinct from the P6+ engineer's technical sign-off (see `../badges.md` §1.1)
- 30-minute review session: reviewer reads the artifact beforehand, session is for questions only
- Questions to ask: "What would you have done differently?" "What resistance did you hit, and how did you handle it?" "How do you know this actually worked, not just shipped?"
- **P7 only:** add a teaching demonstration — candidate teaches the organization-wide testing standard (or the adherence-measurement approach behind it) to a group; reviewer observes for clarity and evidence of adoption beyond the candidate's own team

## Badges

Clearing an item at the "good" bar, with reviewer sign-off, earns the corresponding badge in `../badges.md`:
- P5 item → **TS-1-P5 (Metrics-Driven Fixer)**
- P6 item → **TS-1-P6 (Cross-Team Test Converger)**
- P7 item + teaching demonstration → **TS-1-P7 (Testing Standard Setter)**

Record the award (Badge ID, date, artifact link, verifier) against the candidate's file per `../badges.md` Part 3 — not in this file.
