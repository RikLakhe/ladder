# PF 6 — AI Judgment & Feature Delivery: Portfolio Requirements

**Used when:** promotion review to P4 (in combination with the live demo)/P5/P6/P7, or senior/staff/architect-level hiring.

**For the candidate:** every item must be real, shipped/used work with evidence of impact, not a hypothetical design — the "good" column is the bar a badge (below) actually requires.

## Required evidence items

| Item | Maps to PC | Quality bar: sufficient | Quality bar: good |
|---|---|---|---|
| An AI-powered feature they shipped with an eval suite and rollback condition | 6.3 [P4] | Feature shipped, eval suite exists | Eval suite documentation explicitly names covered/uncovered failure modes, and the rollback condition was specific enough to actually act on |
| A teammate's AI-generated PR they reviewed with explicit AI judgment | 6.4 [P5] | Review comments exist and address prompt/eval quality, not just code style | Review caught a real issue (eval gap, prompt design flaw) that would have shipped otherwise |
| (P6+) A systemic AI risk pattern they addressed across several teams | 6.5 [P6] | Pattern identified and documented for ≥2 teams | Structural fix (not just a one-off patch) was implemented with team leads; reduced recurrence evidenced per `../badges.md` §1.6 (a named contact at each team + a dated reference + one line on what changed), not asserted |
| (P7) Organizational AI capability/governance standards they own | 6.6 [P7] | Standards documented and published | Standards are tied to a business-outcome metric, with evidence they're used in real feature-delivery decisions |
| A documented judgment call not to use AI (or to restrict AI use) on a client feature | 6.3–6.5 | A specific instance is documented: what the feature/code was (sanitized), why AI use was restricted or avoided (compliance-sensitive logic, proprietary client algorithm, contractual restriction) | Judgment call was reviewed/confirmed with the engagement lead or client, and the decision materially shaped how the feature was built or delivered. **If the candidate's current client bans AI tooling entirely for more than one review cycle, making the P2/P3 PF-5/PF-6 evidence types unearnable in normal work, apply the assignment-limited path in `../badges.md` §1.7 rather than requiring a manufactured side project** |

## Submission format

- Link to the eval suite code/docs, review comments, or governance document
- 1-paragraph context: what the feature/risk/standard was, what changed, how it's measured
- For P7: name the specific business-outcome metric and how AI delivery connects to it
- **Client confidentiality:** where the eval suite, feature, or governance document references specific client data, proprietary algorithms, or client-identifying details, submit a sanitized/redacted version or a client-approved walkthrough — do not submit the client's actual data or proprietary logic as evidence. **Expediting that sign-off is the sponsoring delivery lead/account manager's job, not the candidate's to chase alone**; where extraction is contractually impossible, use the in-place attestation path in `../badges.md` §1.5
- Time spent assembling this submission counts as normal professional development time, coordinated with your delivery/account lead

## Review process

- Reviewed by a P6+ engineer not on the candidate's team (technical verifier), plus the candidate's manager. **For the P6 item specifically, "manager" means the candidate's delivery/account manager, co-signing to confirm the cross-team risk pattern and fix claimed actually happened** — see `../badges.md` §1.1
- 30-minute review session: reviewer reads beforehand, session is for probing questions
- Questions to ask: "What failure mode did your eval suite miss that you only found out about later?" "How do you know the fix addressed the pattern and not just one instance of it?"
- **P7 only:** add a teaching demonstration — candidate teaches the organizational AI capability/governance standards (including how they tie to the business-outcome metric) to a group; reviewer observes for clarity and evidence of adoption beyond the candidate's own team

## Badges

- P4 item + `02-live-demo-checklist.md` scenario pass → **TS-6-P4 (Eval & Rollback Shipper)**
- P5 item → **TS-6-P5 (AI-Judgment Reviewer)**
- P6 item → **TS-6-P6 (Systemic AI Risk Fixer)**
- P7 item + teaching demonstration → **TS-6-P7 (AI Governance Owner)**

See `../badges.md`. Record the award (Badge ID, date, artifact link, verifier) against the candidate's file per `../badges.md` Part 3.
