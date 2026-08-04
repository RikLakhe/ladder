# Technical Skill — AI Judgment & Feature Delivery

**Competency:** Technical Skill
**Primary Function:** 6 of 6 — AI Judgment & Feature Delivery
**Domain classification:** Core
**Version date:** 2026-07-01

**Note:** this PF was split out of the original combined "AI Capability" PF during the Phase C compliance audit — see `5-ai-assisted-engineering.md` for the sibling PF covering daily AI-tool workflow habits. This file covers understanding AI failure modes and building, evaluating, and owning AI-powered features.

## Scope

Recognizing AI failure modes (hallucination, overconfidence, context loss), and designing, shipping, and governing AI-powered features with evals and rollback plans. Applies P2–P7, and per `COMPANY-CONTEXT.md` reflects a company-wide strategic commitment. Excludes daily AI tool workflow habits and prompting discipline (see PF 5 — AI-Assisted Engineering — a different observable unit: this PF is assessed by reviewing a specific eval/feature artifact, PF 5 by observing workflow habits over time), general software architecture (PF 3), and general testing practice (PF 1) except where AI-specific.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: flag an AI-generated suggestion as uncertain rather than shipping it, when correctness isn't obvious

**P3**
- A practitioner at this level can: catch a hallucinated API call or incorrect AI suggestion during self-review, before it reaches PR

**P4**
- A practitioner at this level can: ship an AI-powered feature backed by a basic eval suite (naming covered and uncovered failure modes) and an articulated rollback condition
- A practitioner at this level can: build an eval set for a client-facing AI feature using only data the client has approved for that purpose (synthetic or explicitly cleared data, not repurposed production client data without approval)

**P5**
- A practitioner at this level can: review a teammate's AI-generated PR with explicit AI judgment (prompt design, eval coverage), not generic code review

**P6**
- A practitioner at this level can: address a systemic AI risk pattern (e.g., shipping without evals) recurring across several teams, working with team leads on a structural fix

**P7**
- A practitioner at this level can: own organizational AI capability and governance, defining eval-culture standards connected to business outcomes

## Required Knowledge

1. **Probabilistic vs. deterministic behavior** — the conceptual shift that separates AI-feature engineering from traditional software engineering; without it, engineers apply the wrong testing mental model.
2. **Common LLM failure modes** (hallucination, overconfidence, context loss, prompt injection) — needed to know what an eval suite should actually check for.
3. **Eval design principles** (what makes a good eval set, coverage vs. false confidence) — an eval suite that only tests easy cases gives the same false confidence a weak unit test suite does.
4. **Rollback and feature-flag practices for AI features** — AI feature failures are often gradual/statistical rather than binary crashes, so rollback triggers need different design than traditional feature flags.
5. **Responsible-AI practice at organizational scale** (governance, outcome measurement vs. usage measurement) — P6/P7 need this to connect AI feature delivery to actual business outcomes rather than shipment counts.
6. **Client-approved data use in eval design** (which client data may be used to build/run evals, under what approval, and which must stay synthetic) — an AI feature delivered to a client is judged against that client's own compliance bar, and an eval suite built on unapproved client data is itself a contract risk, not just a quality risk.
7. **Model/vendor constraints per client contract** (some clients restrict which AI model providers or hosting regions may be used for a feature built on their behalf) — this shapes what "shippable" even means before eval design starts.

## Required Skills

- Writing and running a basic eval script
- Designing rollback conditions and monitoring triggers for a shipped AI feature
- Cross-team facilitation for structural risk fixes (P6+)
- Translating AI risk into business terms (P7)

## Evidence Guide

**Critical aspects (non-negotiable):**
- Uncertain or incorrect AI output is caught before it ships, not after
- Eval suites explicitly name what they do and don't cover — no eval suite is presented as complete when it isn't
- Rollback conditions are articulated before a feature ships, not improvised after an incident
- Eval data and any client-facing AI feature respect the client's data-use approvals and model/vendor contract restrictions

**Assessment methods by level:**
- P2–P3: code review rubric (does self-review/PR history show AI-output error-catching)
- P4: live demo (design an eval suite for a given hypothetical feature) + portfolio (a shipped feature with its eval and rollback plan)
- P5–P6: portfolio (a reviewed PR or a cross-team risk fix they drove)
- P7: portfolio + teaching demonstration

**Work products that demonstrate this PF:** eval suite code/docs, rollback condition documentation, PR reviews citing specific AI judgment, cross-team AI risk remediation records, org-wide AI governance documents.

## Hiring Signals

- **P2:** describes a time they flagged uncertain AI output rather than shipping it.
- **P3:** describes catching a specific AI hallucination or incorrect suggestion, and how.
- **P4:** designs a basic eval suite live for a hypothetical AI feature, naming a failure mode it wouldn't catch.
- **P5:** describes a teammate's AI-generated PR they reviewed with specific eval/prompt-design judgment, not generic code review.
- **P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from flagging uncertainty, to actively catching specific AI errors during self-review.
- **P3 → P4:** from catching errors, to shipping a fully evaluated AI feature with an articulated rollback plan.
- **P4 → P5:** from shipping individually, to reviewing others' AI work with specific eval/prompt judgment.
- **P5 → P6:** from individual review, to addressing systemic cross-team AI risk patterns.
- **P6 → P7:** from cross-team fixes, to organization-wide governance tied to business outcomes.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 6 (functional-analysis.md, 6.1–6.6) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
