# PF 6 — AI Judgment & Feature Delivery: Live Demo Checklist

**Used when:** technical interview or promotion review.
**Covers:** P4 only (P2/P3 are assessed via code review rubric; P5–P7 via portfolio — see `01-code-review-rubric.md` and `03-portfolio-requirements.md`).

**For the candidate:** this is a full eval-suite design exercise producing a real written artifact, not a definitions quiz on "what is a hallucination." The badge at P4 (see `../badges.md`) requires this scenario plus the shipped-feature portfolio item in `03-portfolio-requirements.md`.

## Scenario: P4 — Design a basic eval suite

**Setup:** Give the candidate a hypothetical AI-powered feature (e.g. "an AI assistant that drafts customer support replies"). Ask them to design a basic eval suite for it. 30–40 minutes.

**Checklist:**
- [ ] Names specific failure modes relevant to the feature (not generic "it might be wrong")
- [ ] Designs eval cases that would actually catch those failure modes, not just easy/obvious cases
- [ ] Explicitly states which failure modes the eval suite does NOT cover
- [ ] Proposes a rollback condition tied to a measurable signal (not "we'll just watch it")
- [ ] When the hypothetical is reframed as a client-owned feature handling the client's customer data, identifies at least one consideration specific to that context (e.g. eval data itself may be client data and can't be pasted into ungoverned tools, client sign-off may be required on eval coverage before shipping)

**Prompts:**
- "What's a failure mode your eval suite would miss, and why is that an acceptable gap for now?"
- "What would trigger a rollback, specifically — what number, what threshold?"
- "Suppose this feature runs on the client's production customer data — does that change how you'd build or store your eval set?"

**Scoring:** pass/follow-up/fail per item. Overall recommendation requires the failure-mode identification and rollback-condition items both at "pass."

**Time budget:** 10 min setup, 25 min design, 5 min wrap-up.

**Badge:** clearing this scenario plus the paired portfolio item earns **TS-6-P4 (Eval & Rollback Shipper)** — see `../badges.md`. Per `../badges.md` §1.1, sign-off requires the technical verifier (engineer ≥ P5) **plus the candidate's delivery/account manager as co-signer**, confirming the shipped-feature context is real.
