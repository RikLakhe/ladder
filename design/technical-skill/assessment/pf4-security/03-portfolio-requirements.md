# PF 4 — Security: Portfolio Requirements

**Used when:** promotion review to P5/P6/P7, or senior/staff/architect-level hiring.

**For the candidate:** every item must be real, documented work with evidence of adoption/impact, not a proposal that never ran — the "good" column is the bar a badge (below) actually requires.

## Required evidence items

| Item | Maps to PC | Quality bar: sufficient | Quality bar: good |
|---|---|---|---|
| A team security practice they refined jointly with the security team | 4.5 [P5] | Practice is documented | Practice was adopted by the team and has a documented before/after (e.g. fewer security findings in review) |
| (P6+) Evidence of applying the org security strategy consistently across several teams | 4.6 [P6] | Application documented for at least 2 teams | Includes a real conflict between team practices that was resolved, with the resolution documented, including cases where a client's contractual security requirements or existing conventions drove the resolution rather than LFT's default |
| (P7) An organization-wide security strategy they set | 4.7 [P7] | Strategy is documented and published | Strategy has been adopted by the security team and engineering leads, with evidence of enforcement |
| (P7) An obscure security threat they identified that standard tooling/review missed | 4.8 [P7] | Threat is documented, with the remediation | Documentation includes why standard tooling/review missed it, and what changed as a result (new checklist item, new tooling rule, etc.) |
| Client data/credential handling and incident escalation practice | 4.5–4.6 | A documented approach to client data classification, client-environment credential handling, or incident/breach escalation exists | Approach distinguishes client-facing escalation (engagement lead, client security contact, contractual disclosure obligations) from internal-only escalation, and has been used in a real incident or near-miss |

## Submission format

- Link to the practice document, strategy document, or threat writeup
- 1-paragraph context: what existed before, what changed, why it mattered
- For P7 threat item: include how it was discovered, since that's often the most instructive part
- **Client confidentiality:** where the underlying work touches client code, data, or infrastructure, submit a sanitized/redacted writeup or a client-approved walkthrough — do not submit literal client code, client data, or unredacted client system details as evidence. Reviewers should be able to assess the practice/strategy/finding without seeing anything under NDA. **Expediting sanitization/export sign-off is the sponsoring delivery lead/account manager's job, not the candidate's to chase alone**; where extraction is contractually impossible, use the in-place attestation path in `../badges.md` §1.5
- Time spent assembling this submission counts as normal professional development time, coordinated with your delivery/account lead

## Review process

- Reviewed by a P6+ engineer plus a member of the security team (both technical verifiers for this PF). **For the P6 item specifically, add the candidate's delivery/account manager as a co-signer** confirming the cross-team conflict and resolution claimed actually happened — distinct from the security team's technical sign-off (see `../badges.md` §1.1)
- 30-minute review session: reviewers read beforehand, session is for probing questions
- Questions to ask: "How do you know this generalizes beyond the one case you found?" "What's the cost of this strategy to teams that have to follow it, and was that cost worth it?"
- **P7 only:** add a teaching demonstration — candidate teaches the organization-wide security strategy (or the obscure threat and its remediation) to a group; reviewer observes for clarity and evidence of adoption beyond the candidate's own team

## Badges

- P5 item → **TS-4-P5 (Security Practice Co-Author)**
- P6 item → **TS-4-P6 (Cross-Team Security Enforcer)**
- P7 items + teaching demonstration → **TS-4-P7 (Security Strategy Owner)**

See `../badges.md`. Both P5/P6 badges require security-team sign-off in addition to a P6+ engineer, per the Verifier column; the P6 badge additionally requires the delivery/account-manager co-signer per `../badges.md` §1.1. Record the award (Badge ID, date, artifact link, verifier) against the candidate's file per `../badges.md` Part 3.
