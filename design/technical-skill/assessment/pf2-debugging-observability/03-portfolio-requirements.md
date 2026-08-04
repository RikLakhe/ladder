# PF 2 — Debugging & Observability: Portfolio Requirements

**Used when:** promotion review to P5/P6/P7, or senior/staff/architect-level hiring.

**For the candidate:** these must be real, shipped/resolved work with a measurable outcome, not a plan that never ran — the "good" column is the bar a badge (below) actually requires.

## Required evidence items

| Item | Maps to PC | Quality bar: sufficient | Quality bar: good |
|---|---|---|---|
| A monitoring/stability change they drove, with the operational-data justification | 2.7 [P5] | Change was shipped | Change is tied to a measurable before/after in the operational data |
| A diagnosis that demonstrates correct domain-scope judgment | 2.11 [P5] | Diagnosis stayed within their domain and was resolved | Diagnosis explicitly documents why the issue was in-scope vs. an adjacent team's |
| (P6+) An observability practice they established, adopted by ≥2 teams | 2.8 [P6] | Practice is documented and in use by one other team besides their own | Adoption evidenced per `../badges.md` §1.6 (a named contact at each adopting team + a dated Slack/email/PR reference + one line on what changed) for ≥2 teams, with a second dated reference at least one review cycle apart showing sustained (not one-time) use |
| (P6+) A diagnosis spanning related domains across teams | 2.12 [P6] | Diagnosis resolved the cross-domain issue | Diagnosis includes how coordination with the other team(s) was handled |
| (P7) An incident they led organization-wide, with the postmortem | 2.9 [P7] | Postmortem exists and was shared org-wide | Postmortem led to a structural fix that prevented recurrence, with evidence |
| (P7) An observability-culture initiative adopted across the engineering organization | 2.10 [P7] | Initiative documented (training, evangelism, or adoption-tracking effort) and delivered at least once org-wide | Initiative shows measurable adoption, instrumented per `../badges.md` §1.6 (named contact + dated reference + what changed) for each team counted, not a self-reported usage number — distinct from any single incident response |

## Submission format

- Link to the actual artifact: monitoring dashboard/PR, observability practice doc, or postmortem. Where the artifact sits in a client-owned system with no shareable link, substitute a screen-recorded walkthrough or a sanitized/redacted extract, obtained with client sign-off per engagement data-handling policy. **The sponsoring delivery lead/account manager is responsible for expediting that sign-off, not the candidate alone** — where extraction is contractually impossible, use the in-place attestation path in `../badges.md` §1.5 instead
- Redact client-identifying names, data, and any confidential system details from the submitted artifact before it leaves the client environment
- 1-paragraph context: what was broken, what they did, what changed as a result
- For P7: include the blast radius and severity of the incident led
- Time spent assembling this submission counts as normal professional development time, coordinated with your delivery/account lead

## Review process

- Reviewed by a P6+ engineer not on the candidate's team (technical verifier), plus the candidate's manager. **For the P6 items specifically, "manager" means the candidate's delivery/account manager, co-signing to confirm the observability-practice and cross-domain work claimed actually happened** — see `../badges.md` §1.1
- 30-minute review session: reviewer reads beforehand, session is for probing questions
- Questions to ask: "What would you do differently with what you know now?" "How did you decide this was your team's problem to own?"
- **P7 only:** add a teaching demonstration — candidate teaches the incident's postmortem findings or the observability-culture practice behind it to a group; reviewer observes for clarity and evidence of adoption beyond the candidate's own team

## Badges

Clearing an item at the "good" bar, plus the paired live-demo scenario in `02-live-demo-checklist.md`, earns the corresponding badge in `../badges.md`:
- P5 items → **TS-2-P5 (Domain Stability Driver)**
- P6 items → **TS-2-P6 (Observability Practice Architect)**
- P7 items + teaching demonstration → **TS-2-P7 (Incident Commander)**

Record the award (Badge ID, date, artifact link, verifier) against the candidate's file per `../badges.md` Part 3.
