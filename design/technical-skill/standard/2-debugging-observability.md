# Technical Skill — Debugging & Observability

**Competency:** Technical Skill
**Primary Function:** 2 of 6 — Debugging & Observability
**Domain classification:** Core
**Version date:** 2026-07-01 (revised — see revision note)

**Revision note:** 2026-07-01 — Phase C compliance audit found this PF only carried Observability content at P5/P6, despite bundling Debugging too. Added P5/P6 Debugging PCs (2.11, 2.12 in the functional analysis) and updated Required Knowledge, Evidence Guide, and Promotion Criteria accordingly.

## Scope

Reproducing and diagnosing defects using a systematic method, reading and acting on operational data (logs, metrics, dashboards) to maintain and improve system health, and, at senior levels, scaling both debugging scope and observability practice across domains and teams. Applies P2–P7. Excludes writing the actual fix (see PF 1 — Quality & Testing) and architectural redesign in response to findings (see PF 3 — Software Design & Architecture), though this PF is often what surfaces the need for either.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: reproduce a reported bug from a ticket description before attempting a fix
- A practitioner at this level can: use a debugger or logging tool to isolate the cause of a failure in familiar code, with guidance

**P3**
- A practitioner at this level can: debug an issue located within a single service using a systematic method (bisection, log correlation, reproduction) unaided
- A practitioner at this level can: explain what "normal" operational data looks like for the team's domain, using team dashboards
- A practitioner at this level can: locate and use an unfamiliar client's existing logging/monitoring tooling to debug an issue, without requiring the client's stack to match a prior project's

**P4**
- A practitioner at this level can: diagnose a cross-service issue, escalating to a senior engineer only when genuinely blocked
- A practitioner at this level can: propose a monitoring or alerting change justified by an observed operational-data pattern
- A practitioner at this level can: diagnose an issue within a client's production environment while respecting the client's access restrictions (e.g. no direct prod access, redacted logs, approval-gated queries), requesting the minimum access needed rather than treating restrictions as blockers

**P5**
- A practitioner at this level can: drive a team monitoring change justified by operational data, to close a stability or performance gap
- A practitioner at this level can: diagnose an issue within the full scope of the team's domain unaided, without escalating scope-appropriate problems

**P6**
- A practitioner at this level can: establish an observability practice (dashboard conventions, alert standards) adopted by several teams
- A practitioner at this level can: diagnose an issue spanning a set of related domains across several teams

**P7**
- A practitioner at this level can: lead organization-wide incident response for a cross-team outage
- A practitioner at this level can: foster an observability culture adopted across the engineering organization

## Required Knowledge

1. **Systematic debugging methods** (bisection, binary search over commits/inputs, log correlation) — without a method, debugging becomes guesswork that doesn't scale to unfamiliar code.
2. **Symptoms vs. root cause** — fixing symptoms causes recurrence; distinguishing them is what separates a real fix from a patch.
3. **Observability fundamentals** (logs vs. metrics vs. traces, and what each is good for) — using the wrong signal type wastes investigation time.
4. **Baseline literacy** (what "normal" looks like for a system) — you can't spot an anomaly without knowing the baseline.
5. **Domain and system-boundary literacy** (what's in-scope for your domain vs. a related domain vs. unrelated) — needed at P5/P6 to know how far a diagnosis should reasonably extend before it's someone else's domain, and to recognize when a related-domain issue is actually in scope.
6. **Incident response process** (severity classification, escalation paths, postmortem practice) — P7 engineers lead this, and it only works if it's a shared, known process, not improvised each time.
7. **Alerting design principles** (signal vs. noise, actionable vs. informational alerts) — badly designed alerting either misses real problems or trains people to ignore alerts.
8. **Client-environment access constraints** (restricted prod access, redacted logs, approval gates on data queries) — LFT engineers debug inside client-owned environments under client-set access rules, not an internally owned system with unrestricted access; diagnosis must work within those limits, not around them.
9. **Rapid onboarding into unfamiliar observability tooling** (reading a new client's dashboard/logging conventions quickly rather than expecting a standard internal toolchain) — engineers rotate across client stacks and can't assume the last client's tools carry over.

## Required Skills

- Proficiency with the team's logging/monitoring/tracing tooling
- Calm, clear communication under incident pressure
- Writing a clear, blameless postmortem
- Cross-team facilitation (P6+)

## Evidence Guide

**Critical aspects (non-negotiable):**
- Reproduces the reported problem before attempting a fix
- Uses a named systematic method rather than random trial-and-error
- Distinguishes symptom from root cause in their explanation
- At P5/P6, correctly judges what's in scope for their domain vs. genuinely needs another team, rather than either over-escalating or overreaching
- Debugging inside a client environment respects the client's access and data-handling restrictions rather than working around them

**Assessment methods by level:**
- P2–P3: code review/PR rubric + live debugging demo
- P4: live demo (diagnose a seeded cross-service bug)
- P5–P6: portfolio (a monitoring change they drove, and a diagnosis that demonstrates domain-scope judgment) + live demo
- P7: portfolio (incident response they led) + teaching demonstration

**Work products that demonstrate this PF:** bug reproduction notes, debugging session logs/PR descriptions, monitoring/alerting change proposals, postmortems, observability standards documents.

## Hiring Signals

- **P2:** describes steps to reproduce a bug from a vague report; asks clarifying questions.
- **P3:** walks through a systematic debugging method on a live seeded bug within one service.
- **P4:** diagnoses a cross-service issue live, narrating hypothesis-testing; proposes a monitoring change from a data pattern shown to them.
- **P5:** describes a real monitoring/stability improvement they drove using data, and its impact; describes a diagnosis that stayed correctly within their domain's scope.
- **P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from guided single-service debugging, to unaided systematic single-service debugging.
- **P3 → P4:** from single-service diagnosis, to cross-service diagnosis with appropriate escalation.
- **P4 → P5:** from individual diagnosis, to driving team-level monitoring change from data and owning diagnosis across the full domain unaided.
- **P5 → P6:** from domain-scoped practice, to establishing a cross-team observability practice and diagnosing across a set of related domains.
- **P6 → P7:** from cross-team practice, to organization-wide incident leadership and observability culture.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 2 (functional-analysis.md, 2.1–2.12) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
