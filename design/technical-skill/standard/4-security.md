# Technical Skill — Security

**Competency:** Technical Skill
**Primary Function:** 4 of 6 — Security
**Domain classification:** Core
**Version date:** 2026-07-01

## Scope

Recognizing and acting on the security implications of engineering decisions, from naming a concern at the junior level to setting organizational security strategy at the top of the ladder. Applies P2–P7. Excludes the security team's own specialized tooling and operations, and general code-quality review unrelated to security, though this PF assumes close collaboration with a dedicated security function at senior levels.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: name the security implication of a proposed change, in plain language, before submitting it for review
- A practitioner at this level can: name what counts as client IP or client data in the codebase they're working in (source, credentials, customer records) before handling it

**P3**
- A practitioner at this level can: flag a security question to a senior engineer before making a decision with unclear security implications
- A practitioner at this level can: handle client credentials and access grants only through the client's or LFT's approved secrets-management process, never via ad hoc sharing (chat, email, personal accounts)

**P4**
- A practitioner at this level can: identify a security vulnerability during a peer code review, citing the specific risk
- A practitioner at this level can: apply a security checklist to a design before implementation begins
- A practitioner at this level can: identify which client contract or data-handling terms apply to a piece of work (e.g. data residency, NDA scope, subcontracting restrictions) before moving client code or data outside the client's approved environment

**P5**
- A practitioner at this level can: refine the team's security approach jointly with the security team, documenting the resulting practice
- A practitioner at this level can: define a client-engagement-specific security practice (e.g. what tooling, environments, and data-egress rules apply for a given client) that a client's technical leadership would accept on review

**P6**
- A practitioner at this level can: apply the organization's security strategy consistently across several teams, resolving conflicts between team practices
- A practitioner at this level can: resolve a conflict between two clients' differing security/compliance requirements affecting shared LFT tooling or practice, without leaking one client's requirements or IP into another's engagement

**P7**
- A practitioner at this level can: set an organization-wide security strategy adopted by the security team and engineering leads
- A practitioner at this level can: identify an obscure security threat that standard review or tooling misses

## Required Knowledge

1. **OWASP-class vulnerability categories** (injection, broken auth, sensitive data exposure, etc.) — the baseline vocabulary for naming a risk instead of just feeling uneasy about it.
2. **Principle of least privilege** — underlies most access-control design decisions engineers make daily.
3. **Secure-by-default design** (fail closed, defense in depth) — needed to design systems that degrade safely, not catastrophically.
4. **Threat modeling basics** (who is the attacker, what do they want, what's the blast radius) — needed to reason about "obscure" threats at P7, and about "is this actually risky" at P4.
5. **Data classification and handling** (PII, credentials, secrets management) — most real-world security incidents trace back to data handling errors, not exotic exploits.
6. **Organizational security governance** (compliance frameworks relevant to enterprise clients, incident disclosure processes) — P6/P7 need this to set strategy that survives an actual enterprise client security audit, tying directly to LFT's enterprise credibility bar (see `my-role.md`).
7. **Client IP and confidentiality boundaries** (what counts as client-owned code, data, and business logic under an NDA/MSA, and how it must and must not move — e.g. never into personal tooling, never across engagements, never into a non-approved AI tool) — LFT engineers work inside client-owned environments handling client IP as a matter of routine, not an edge case; a breach here is a contract-level, not just technical, incident.
8. **Client data residency and access rules** (per-client restrictions on where data may be stored/processed and who may access it, often contractually fixed) — these vary by client and engagement and override any default internal practice.
9. **Cross-engagement isolation** (keeping one client's code, data, credentials, and even domain knowledge separate from another's, including in shared internal tooling) — a services engineer commonly works multiple client engagements concurrently or in sequence, unlike a product engineer with one codebase.

## Required Skills

- Applying a security checklist without a security specialist present
- Collaborative working relationship with the security team (P5+)
- Risk communication to non-security stakeholders (P6+)

## Evidence Guide

**Critical aspects (non-negotiable):**
- Security implications are named or flagged before implementation, not discovered after
- Vulnerabilities cited in review reference a specific, real risk rather than generic caution
- Organization-level strategy work is documented, not tribal knowledge
- Client credentials, code, and data are handled only through approved channels/tooling and never mixed across client engagements

**Assessment methods by level:**
- P2–P3: code review rubric (does the PR description or review comments show security awareness)
- P4: code review rubric + live demo (spot vulnerabilities in a seeded PR)
- P5–P6: portfolio (documented practice/strategy alignment work)
- P7: portfolio + teaching demonstration

**Work products that demonstrate this PF:** PR descriptions naming security considerations, code review comments citing specific vulnerabilities, security checklists applied to designs, team/org security strategy documents.

## Hiring Signals

- **P2:** names one security concern for a simple proposed change (e.g. "this takes user input, could it be injected"); names what in a sample codebase would count as client IP or client data.
- **P3:** describes a time they escalated a security question rather than guessing; describes how they'd handle a client credential they're given for the first time.
- **P4:** spots a seeded vulnerability in a code review exercise and names the specific risk class; identifies which data-handling terms would apply to a described piece of client work.
- **P5:** describes a security practice they helped refine with a security team; describes a client-specific security/compliance constraint they've designed around.
- **P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from naming a concern, to knowing when to escalate an unclear one.
- **P3 → P4:** from escalation, to independent vulnerability identification and checklist application.
- **P4 → P5:** from individual application, to refining team practice jointly with the security team.
- **P5 → P6:** from team practice, to consistent cross-team application of organizational strategy.
- **P6 → P7:** from applying strategy, to setting it — and catching what standard tooling misses.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 4 (functional-analysis.md, 4.1–4.8) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
