# Technical Skill — Software Design & Architecture

**Competency:** Technical Skill
**Primary Function:** 3 of 6 — Software Design & Architecture
**Domain classification:** Core
**Version date:** 2026-07-01

## Scope

Fitting new code into existing service architecture without duplication or breaking changes, designing clean interfaces and abstractions, and, at senior levels, architecting systems and setting organization-wide architecture principles. Applies P2–P7. Excludes test strategy (see PF 1 — Quality & Testing) and security-specific architecture decisions (see PF 4 — Security), though architectural choices often have security implications reviewed jointly with the security team.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: identify which existing module a new piece of logic belongs in, with guidance
- A practitioner at this level can: describe how a new function fits the overall service architecture before writing it, avoiding duplicate logic

**P3**
- A practitioner at this level can: design a function's interface so it aligns with the team's existing architectural patterns, unaided
- A practitioner at this level can: explain the data flow for a portion of the team's domain to a new teammate
- A practitioner at this level can: read and follow a newly assigned client codebase's existing architectural conventions within the engagement's ramp-up window, rather than applying patterns from a prior client

**P4**
- A practitioner at this level can: design code using abstraction and isolation to avoid coupling unrelated concerns
- A practitioner at this level can: scope a moderately complex change using a map of the team's relevant services and data flows
- A practitioner at this level can: deliver a design that fits within a client-mandated stack or platform constraint (e.g. a client-chosen cloud provider, framework, or legacy component) without treating the constraint as a blocker to raise instead of solve

**P5**
- A practitioner at this level can: architect a service or system component using an accepted design pattern that supports iterative, autonomous development
- A practitioner at this level can: negotiate an architectural tradeoff with a client's technical stakeholders, documenting the decision and rationale in terms the client's team can maintain after LFT's engagement ends

**P6**
- A practitioner at this level can: guide several teams toward a shared architectural pattern that supports cross-team scaling

**P7**
- A practitioner at this level can: define an organization-wide architecture principle covering how bounded contexts interact

## Required Knowledge

1. **Core design patterns** (layering, dependency inversion, adapter/facade) — without a shared vocabulary, engineers reinvent or misapply patterns inconsistently.
2. **Coupling and cohesion principles** — the theoretical basis for "why does this change touch 12 files" problems.
3. **Bounded contexts / domain boundaries** — needed to reason about where one service's responsibility ends and another's begins, critical from P4 up.
4. **Abstraction vs. premature generalization** (YAGNI vs. extensibility) — over-abstracting is as costly as under-abstracting; senior engineers must judge the line.
5. **Data flow and system interaction modeling** (sequence/architecture diagrams) — this is how architecture decisions get communicated and reviewed at all.
6. **Organization-wide architecture governance** (RFC processes, architecture review boards) — P6/P7 need this to get cross-team buy-in, not just technically correct designs.
7. **Working within a client-owned stack** (delivering sound design inside a client's chosen technology, hosting, and legacy constraints rather than assuming freedom to pick tools) — LFT engineers deliver into client-owned codebases and rarely control the stack; this is a baseline constraint, not an exception.
8. **Handoff-ready documentation** (design decisions explained so a client's own engineers can maintain the system after the engagement ends) — services delivery, unlike long-lived internal ownership, requires designs and rationale to survive the LFT team's departure.

## Required Skills

- Reading and writing architecture diagrams
- Cross-team facilitation and negotiation (P6+)
- Technical writing for RFCs and design docs

## Evidence Guide

**Critical aspects (non-negotiable):**
- New code doesn't duplicate existing logic or break existing interfaces
- Design decisions are explainable in terms of the team's existing patterns
- Abstraction level matches actual, not speculative, variability
- Design fits within the client's existing stack and platform constraints rather than assuming a free choice of technology

**Assessment methods by level:**
- P2–P3: code review rubric
- P4: live system-design walkthrough, scoped to one service
- P5: live demo (design a component) + portfolio
- P6–P7: portfolio + teaching demonstration

**Work products that demonstrate this PF:** PRs showing architectural fit, design docs/RFCs, architecture diagrams, cross-team architecture decision records.

## Hiring Signals

- **P2:** points to where new logic belongs given a small codebase tour.
- **P3:** designs a small function interface live that fits shown existing patterns.
- **P4:** live system design scoped to one service — reveals whether they reach for abstraction appropriately.
- **P5:** describes a component they architected and the pattern/tradeoffs chosen.
- **P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from guided module-fitting, to independent interface design aligned to existing patterns.
- **P3 → P4:** from single-function design, to codebase-wide abstraction and coupling judgment.
- **P4 → P5:** from fitting into existing architecture, to architecting new components.
- **P5 → P6:** from one team's architecture, to cross-team architectural convergence.
- **P6 → P7:** from cross-team convergence, to organization-wide architecture principles.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 3 (functional-analysis.md, 3.1–3.9) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
