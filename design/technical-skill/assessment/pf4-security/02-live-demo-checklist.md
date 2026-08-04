# PF 4 — Security: Live Demo Checklist

**Used when:** technical interview or promotion review (45–60 min session).
**Covers:** P4 only (P2/P3 are assessed via code review rubric; P5–P7 via portfolio — see `01-code-review-rubric.md` and `03-portfolio-requirements.md`).

**For the candidate:** this is a real vulnerability-hunting exercise against a seeded PR, not a trivia round on OWASP terms — come ready to actually find and explain the risk. The badge (below) requires this checklist plus the paired code review rubric bundle.

## Scenario: P4 — Spot vulnerabilities in a seeded PR

**Setup:** Give the candidate a small PR (5–10 files) with 2–3 seeded vulnerabilities of varying obviousness (e.g. an injection risk, a missing auth check, an over-broad permission grant). 30 minutes.

**Checklist:**
- [ ] Finds at least the more obvious seeded vulnerability unaided
- [ ] Names the specific risk class (not just "this looks off")
- [ ] Applies a mental (or written) checklist rather than eyeballing randomly
- [ ] Proposes a concrete fix, not just a flag
- [ ] When told the PR is against a client-owned repo with the client's own (non-default) security conventions, adapts the checklist to those conventions rather than insisting on LFT's default, and can articulate the proper channel for reporting a finding back to the client (vs. keeping it internal only)

**Prompts:**
- "What's the actual attack scenario here — walk me through how someone would exploit this."
- "What would you check on every PR like this one, going forward?"
- "Say this is a client's codebase and their security conventions differ from ours, and you don't have standing production access to verify the fix yourself — how does that change what you do next?"
- "If you found this in a client's system rather than an internal one, who do you tell, and how?"

**Scoring:** pass/follow-up/fail per item. Overall recommendation requires finding at least 2 of the 3 seeded issues and correctly naming at least one risk class.

**Time budget:** 5 min setup, 20 min review, 5 min discussion.

**Badge:** this scenario cleared, plus the `01-code-review-rubric.md` P4 bundle cleared, earns **TS-4-P4 (Vulnerability Spotter)** — see `../badges.md`. Per `../badges.md` §1.1, sign-off requires the technical verifier (engineer ≥ P4, security team member if available) **plus the candidate's delivery/account manager as co-signer**, confirming the real-PR work context used for the paired rubric bundle is genuine.
