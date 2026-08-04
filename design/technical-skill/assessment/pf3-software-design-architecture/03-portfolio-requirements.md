# PF 3 — Software Design & Architecture: Portfolio Requirements

**Used when:** promotion review to P5/P6/P7, or senior/staff/architect-level hiring.

**For the candidate:** every item must be real, built/shipped work, not a proposal that never ran — the "good" column is the bar a badge (below) actually requires.

## Required evidence items

| Item | Maps to PC | Quality bar: sufficient | Quality bar: good |
|---|---|---|---|
| A system/component they architected using an accepted design pattern | 3.7 [P5] | Component was built and shipped | Design doc exists showing the pattern chosen, the tradeoffs considered, and how it supports future scaling — and, where a client's technical stakeholders were involved, the doc shows a negotiated architectural tradeoff with rationale, written in terms a client engineer could use to maintain the system after the engagement ends (handoff-ready, not just an internal design record). **If the candidate's current assignment gives them no client-negotiation seat for more than one review cycle, apply the assignment-limited path in `../badges.md` §1.7** (mark "blocked — assignment-limited" and track reassignment or an agreed substitute) rather than treating the negotiation clause as unearnable |
| (P6+) Evidence of guiding several teams toward a shared architectural pattern | 3.8 [P6] | At least one cross-team architecture conversation documented | Adoption evidenced per `../badges.md` §1.6 (a named contact at each adopting team + a dated reference + one line on what changed) for ≥2 teams, with a before/after description of the divergence it resolved |
| (P7) An organization-wide architecture principle they defined | 3.9 [P7] | Principle is documented | Principle is in active use for real architecture decisions, with an example of it being applied |

## Submission format

- Link to the design doc/RFC/architecture decision record. If the document or the system it describes is client-owned and cannot be shared externally, substitute a screen-recorded walkthrough or a sanitized/redacted extract, obtained with client sign-off per engagement data-handling policy. **Expediting that sign-off is the sponsoring delivery lead/account manager's responsibility, not the candidate's to chase alone** — where extraction is contractually impossible, use the in-place attestation path in `../badges.md` §1.5
- Redact client-identifying names, data, and any confidential business logic from the submitted artifact before it leaves the client environment
- 1-paragraph context: the problem, the alternatives considered, why this design won
- For P5 items involving a client stakeholder: name the tradeoff negotiated and confirm the doc is written so a client engineer, not just an LFT engineer, could maintain the system from it
- For P6/P7: name which teams adopted it and any documented friction along the way
- Time spent assembling this submission counts as normal professional development time, coordinated with your delivery/account lead

## Review process

- Reviewed by a P6+ engineer not on the candidate's team (technical verifier), plus the candidate's manager. **For the P6 item specifically, "manager" means the candidate's delivery/account manager, co-signing to confirm the cross-team adoption claimed actually happened** — see `../badges.md` §1.1
- 30-minute review session: reviewer reads beforehand, session is for probing questions
- Questions to ask: "What alternative did you seriously consider and reject, and why?" "What would you change if you designed this again today?" "If a client stakeholder was involved, what tradeoff did they push back on, and how did you document the resolution for their team to maintain later?"
- **P6 and P7:** add a teaching demonstration — candidate teaches the shared architectural pattern (P6) or the organization-wide architecture principle (P7) to a group; reviewer observes for clarity and evidence of adoption beyond the candidate's own team

## Badges

- P5 item + `02-live-demo-checklist.md` P5 scenario pass → **TS-3-P5 (Component Architect)** — the "good" bar for this item, where applicable, requires the client negotiation/handoff-documentation clause above, or the §1.7 assignment-limited path if the candidate has no negotiation seat
- P6 item + teaching demonstration → **TS-3-P6 (Cross-Team Pattern Guide)**
- P7 item + teaching demonstration → **TS-3-P7 (Architecture Principal)**

See `../badges.md`. Record the award (Badge ID, date, artifact link, verifier) against the candidate's file per `../badges.md` Part 3.
