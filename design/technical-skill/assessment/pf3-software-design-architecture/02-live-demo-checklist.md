# PF 3 — Software Design & Architecture: Live Demo Checklist

**Used when:** technical interview or promotion review (45–90 min session).
**Covers:** P4, P5 (P6/P7 are assessed via portfolio + teaching demonstration — see `03-portfolio-requirements.md`).

**For the candidate:** this is a full live design session producing a real artifact (diagram, interface sketch, written tradeoffs) — come ready to build, not to recite pattern names. Badge sign-off at P5 also requires the paired portfolio item in `03-portfolio-requirements.md`.

## Scenario: P4 — System design scoped to one service

**Setup:** Give the candidate a moderately complex feature request within a single, familiar service (e.g. "add a rate-limiting layer to this API"). 40 minutes.

**Checklist:**
- [ ] Maps the relevant existing services/data flows before proposing a design
- [ ] Uses abstraction/isolation appropriately — not over-engineered, not under-designed for known variability
- [ ] Scopes the change realistically (doesn't try to redesign the whole service)
- [ ] When told the design must fit a client-mandated stack or platform constraint (e.g. a specified cloud provider, framework, or legacy component), delivers a design that works within it rather than proposing to change the constraint or treating it as a blocker

**Prompts:**
- "What would make you decide this needs more abstraction than you just proposed?"
- "What's the smallest version of this that still solves the problem?"
- "This client has already standardized on [a specific stack/legacy component] — how does that change your design?"

**Scoring:** pass/follow-up/fail per item. **Time budget:** 10 min setup, 25 min design, 5 min wrap-up.

**Badge:** ≥3/4 items "pass" earns **TS-3-P4 (Coupling Guardian)** — see `../badges.md`. Per `../badges.md` §1.1, sign-off requires the technical verifier (engineer ≥ P5) **plus the candidate's delivery/account manager as co-signer**, confirming the client-mandated-constraint scenario reflects a real engagement.

---

## Scenario: P5 — Architect a new component

**Setup:** Candidate is asked to design a new system component (e.g. "design a notification-delivery subsystem that needs to support 3 channels now and more later"). 40 minutes.

**Checklist:**
- [ ] Chooses a recognizable design pattern and explains why it fits
- [ ] Explicitly designs for iterative, autonomous development (not a big-bang rollout)
- [ ] Anticipates at least one plausible future use case without over-building for speculative ones

**Prompts:**
- "Which part of this design would be expensive to change later, and why did you accept that cost?"

**Scoring:** pass/follow-up/fail per item. **Time budget:** 10 min setup, 25 min design, 5 min wrap-up.

**Badge:** this scenario plus portfolio item 1 in `03-portfolio-requirements.md` earns **TS-3-P5 (Component Architect)** — see `../badges.md`.
