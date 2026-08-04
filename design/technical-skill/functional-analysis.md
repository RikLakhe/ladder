# Functional Analysis: Technical Skill

> [Competency index](../index.md) › [Technical Skill](./index.md)

**Version date:** 2026-07-01 (revised — see revision note)

**Revision note:** 2026-07-01 — Phase C compliance audit found two issues, both fixed here: (1) PF 2 was missing dedicated Debugging-specific sub-functions at P5/P6 (it only carried Observability content at those levels, despite bundling both); added 2.11 and 2.12. (2) The original PF 5 "AI Capability" bundled two matrix rows (AI-Assisted Engineering, AI Judgment & Feature Delivery) that turned out not to share one assessment mode — reviewing someone's daily AI tool habits is a different observation than reviewing an eval suite they designed. Split into two Primary Functions: PF 5 (AI-Assisted Engineering) and PF 6 (AI Judgment & Feature Delivery). Old sub-function numbers 5.1–5.10 are retired; see the mapping note under PF 5/PF 6 below for anyone with a reference to the old numbering.

One-line purpose: an engineer who has this competency writes correct, testable, secure, well-architected code, diagnoses problems systematically, and uses AI tooling responsibly at a level appropriate to their career stage.

**Domain classification:** Core — occupation-defining for every engineering role at LFT, not shared incidentally (Cross-domain) and not merely a prerequisite for something else (Foundational).

**Source:** `competencies/industry-evidence/technical-skill.md` (grounded 2026-07-01, revised three times same day). Per that brief's scope note, this competency maps to the whole of Section 1 "Technical Skills" in `competencies/lft-engineering-competency-matrix.md` plus the AI Capability section — six Primary Functions below follow that existing structure (five original matrix subsections, with AI Capability split into its own two rows) rather than inventing new groupings.

---

## PF 1 — Quality & Testing

Write code and tests that hold up under real use — testable, readable, edge-case-aware, and validated at the right layer of the testing pyramid.

**Scope:** Writing code with testability and readability in mind; writing unit and higher-level tests; using testing-pyramid literacy to size test coverage; documentation that supports future testability. Excludes root-cause debugging of failures once they occur (PF 2) and system-level architectural decisions (PF 3).

Sub-functions:
- 1.1 [P2] Write a function with explicit edge-case and error-handling branches that a reviewer can approve without a walkthrough
- 1.2 [P2] Write a unit test for a new function using the team's test framework, with guidance from a senior engineer
- 1.3 [P3] Write unit and higher-level tests unaided, covering edge cases and error paths in addition to the happy path
- 1.4 [P3] Write a docstring that explains non-obvious function intent, without commenting self-evident code
- 1.5 [P4] Write production-ready, self-documenting code that reserves comments for non-obvious rationale only
- 1.6 [P4] Write a test suite spanning multiple testing-pyramid layers for a feature, unaided
- 1.7 [P5] Recommend a testing-pyramid-aligned fix for a gap surfaced by the team's quality metrics
- 1.8 [P6] Propose a converged testing strategy across several teams' existing practices
- 1.9 [P7] Set an organization-wide testing standard with a mechanism for measuring team adherence

## PF 2 — Debugging & Observability

Diagnose the root cause of defects systematically, and use operational data to understand and improve system health.

**Scope:** Reproducing and isolating defects; systematic debugging methods; reading and acting on monitoring/observability data; incident response. Excludes writing the fix itself (PF 1/PF 3) and security-specific investigation (PF 4).

**Note (Phase C):** this PF stays combined rather than splitting Debugging from Observability, unlike PF 5/PF 6 below — a live debugging exercise naturally exercises both (you debug using the dashboards you're reading), so they share an assessment mode even though they're distinct matrix rows. At 12 sub-functions this PF runs above the methodology's "≈4–10" granularity guideline; flagged as an accepted, deliberate exception rather than a defect (see Phase C Pass 2, Load calibration).

Sub-functions:
- 2.1 [P2] Reproduce a reported bug from a ticket description before attempting a fix
- 2.2 [P2] Use a debugger or logging tool to isolate the cause of a failure in familiar code, with guidance
- 2.3 [P3] Debug an issue located within a single service using a systematic method (bisection, log correlation, reproduction) unaided
- 2.4 [P3] Explain what "normal" operational data looks like for the team's domain, using team dashboards
- 2.5 [P4] Diagnose a cross-service issue, escalating to a senior engineer only when genuinely blocked
- 2.6 [P4] Propose a monitoring or alerting change justified by an observed operational-data pattern
- 2.7 [P5] Drive a team monitoring change justified by operational data, to close a stability or performance gap
- 2.11 [P5] Diagnose an issue within the full scope of the team's domain unaided, without escalating scope-appropriate problems *(added in Phase C backfill)*
- 2.8 [P6] Establish an observability practice (dashboard conventions, alert standards) adopted by several teams
- 2.12 [P6] Diagnose an issue spanning a set of related domains across several teams *(added in Phase C backfill)*
- 2.9 [P7] Lead organization-wide incident response for a cross-team outage
- 2.10 [P7] Foster an observability culture adopted across the engineering organization

## PF 3 — Software Design & Architecture

Fit new code into existing service architecture, and, at senior levels, design that architecture.

**Scope:** Module boundaries, abstraction, data flow, and architectural patterns, from "avoid duplicating this logic" at P2 up to "define the organization's architecture principles" at P7. Excludes test strategy (PF 1) and security architecture specifically (PF 4).

**Note (Phase C):** this PF consolidates two matrix rows (Understanding Code, Software Architecture) rather than keeping them fully distinct — unlike the PF 5/PF 6 split, these two rows overlap heavily in what they actually observe (architectural comprehension), so consolidation is a defensible simplification, not a coverage gap. Flagged LOW in Phase C Pass 1 for awareness only; no fix applied.

Sub-functions:
- 3.1 [P2] Identify which existing module a new piece of logic belongs in, with guidance
- 3.2 [P2] Describe how a new function fits the overall service architecture before writing it, avoiding duplicate logic
- 3.3 [P3] Design a function's interface so it aligns with the team's existing architectural patterns, unaided
- 3.4 [P3] Explain the data flow for a portion of the team's domain to a new teammate
- 3.5 [P4] Design code using abstraction and isolation to avoid coupling unrelated concerns
- 3.6 [P4] Scope a moderately complex change using a map of the team's relevant services and data flows
- 3.7 [P5] Architect a service or system component using an accepted design pattern that supports iterative, autonomous development
- 3.8 [P6] Guide several teams toward a shared architectural pattern that supports cross-team scaling
- 3.9 [P7] Define an organization-wide architecture principle covering how bounded contexts interact

## PF 4 — Security

Recognize and act on the security implications of engineering work, from flagging uncertainty at junior levels to setting organizational security strategy at the top of the ladder.

**Scope:** Security awareness in day-to-day code and design decisions, vulnerability identification in review, and organizational security strategy. Excludes general code-quality review unrelated to security (PF 1) and the security team's own specialized tooling/operations.

Sub-functions:
- 4.1 [P2] Name the security implication of a proposed change, in plain language, before submitting it for review
- 4.2 [P3] Flag a security question to a senior engineer before making a decision with unclear security implications
- 4.3 [P4] Identify a security vulnerability during a peer code review, citing the specific risk
- 4.4 [P4] Apply a security checklist to a design before implementation begins
- 4.5 [P5] Refine the team's security approach jointly with the security team, documenting the resulting practice
- 4.6 [P6] Apply the organization's security strategy consistently across several teams, resolving conflicts between team practices
- 4.7 [P7] Set an organization-wide security strategy adopted by the security team and engineering leads
- 4.8 [P7] Identify an obscure security threat that standard review or tooling misses

## PF 5 — AI-Assisted Engineering

Use AI coding tools responsibly and effectively as part of daily engineering workflow — tool literacy, prompting discipline, and review habits — scaling from individual practice to organizational workflow governance.

**Scope:** The AI-Assisted Engineering row of the LFT matrix's AI Capability section: how an engineer integrates AI tooling into their own and, at senior levels, their team's/organization's daily workflow. Excludes AI feature delivery and eval design (PF 6 — a different observable unit: this PF is assessed by watching workflow habits over time; PF 6 is assessed by reviewing a specific eval/feature artifact).

**Phase C note:** this PF and PF 6 were originally one combined "AI Capability" PF (old sub-functions 5.1–5.10). Split because the two matrix rows don't share an assessment mode. Mapping from old numbers: old 5.1→5.1, old 5.3→5.2, old 5.5/5.6 stayed in PF 6, old 5.8→5.4, old 5.10 (which had blended both rows) is now 5.6 (AI-Assisted-only). New sub-functions 5.3 (P4) and 5.5 (P6) close a coverage gap the original decomposition had inherited from the evidence brief (the P4 and P6 AI-Assisted Engineering matrix rows were never grounded in Phase 0 — backfilled in the evidence brief before this fix).

Sub-functions:
- 5.1 [P2] Use an AI coding tool (Copilot, Claude, Cursor) to draft code, then review the output line-by-line before committing
- 5.2 [P3] Apply a consistent prompting pattern for a recurring task type (code generation, test writing, or debugging)
- 5.3 [P4] Integrate AI tooling across the full development lifecycle (coding, testing, debugging, documentation, review) with disciplined prompting habits, holding AI-generated code to the same review bar as human-written code
- 5.4 [P5] Establish a team-level standard for AI tool use and prompting discipline
- 5.5 [P6] Drive AI workflow adoption and quality across several teams, closing team-level AI practice gaps identified with team leads
- 5.6 [P7] Set and govern organizational AI workflow standards, ensuring adoption is measured by outcomes, not usage

## PF 6 — AI Judgment & Feature Delivery

Understand AI failure modes, and build, evaluate, and own AI-powered features responsibly — scaling from individual judgment to organizational AI governance.

**Scope:** The AI Judgment & Feature Delivery row of the LFT matrix's AI Capability section: recognizing probabilistic/failure-mode risk, and designing, shipping, and governing AI-powered features with evals and rollback plans. Excludes daily AI tool workflow habits (PF 5 — a different observable unit).

Sub-functions:
- 6.1 [P2] Flag an AI-generated suggestion as uncertain rather than shipping it, when correctness isn't obvious
- 6.2 [P3] Catch a hallucinated API call or incorrect AI suggestion during self-review, before it reaches PR
- 6.3 [P4] Ship an AI-powered feature backed by a basic eval suite (naming covered and uncovered failure modes) and an articulated rollback condition
- 6.4 [P5] Review a teammate's AI-generated PR with explicit AI judgment (prompt design, eval coverage), not generic code review
- 6.5 [P6] Address a systemic AI risk pattern (e.g., shipping without evals) recurring across several teams, working with team leads on a structural fix
- 6.6 [P7] Own organizational AI capability and governance, defining eval-culture standards connected to business outcomes

---

## Related

- Prerequisite competencies: none yet defined — Technical Skill is the first competency run through this pipeline, so there's nothing upstream to point to. Candidate future prerequisites: a foundational "Version Control & Collaboration Workflow" competency, since git literacy is assumed (not decomposed) in PF 1/PF 2 above.
- Downstream competencies: PF 1 (Quality & Testing) and PF 2 (Debugging & Observability) are natural inputs to a future "Code Review" competency; PF 3 (Software Design & Architecture) is a natural input to a future "System Design" competency. PF 5/PF 6 are already split at the granularity a dedicated "Prompt Engineering" or "MLOps" competency would need if AI tooling depth outgrows what fits here.
- Cross-domain overlaps: PF 4 (Security) will overlap heavily with any future dedicated "Application Security" competency — if one is built, re-scope PF 4 here to the generalist baseline and point to that competency for depth. PF 6 (AI Judgment & Feature Delivery) overlaps with any future "MLOps" or "Eval Engineering" competency for the same reason.

## Coverage check

- Evidence brief grounded: 2026-07-01 (`competencies/industry-evidence/technical-skill.md`, revised three times same day — P2–P4 well-grounded externally + internally; P5–P7 grounded in the LFT matrix with Etsy/Kickstarter/SFIA corroboration; row-coverage gap at P4 AI-Assisted Engineering and P5/P6 Debugging found and fixed in Phase C)
- Frameworks cross-checked: SFIA 9 (generic Levels of Responsibility), O*NET 15-1252.00 (Software Developers task list), Etsy Engineering Career Ladder, Kickstarter Engineering Ladder, internal `lft-engineering-competency-matrix.md`
- P2 coverage: 9 sub-functions (1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 4.1, 5.1, 6.1) — all cited from evidence brief
- P3 coverage: 9 sub-functions (1.3, 1.4, 2.3, 2.4, 3.3, 3.4, 4.2, 5.2, 6.2) — all cited from evidence brief
- P4 coverage: 10 sub-functions (1.5, 1.6, 2.5, 2.6, 3.5, 3.6, 4.3, 4.4, 5.3, 6.3) — all cited from evidence brief
- P5 coverage: 7 sub-functions (1.7, 2.7, 2.11, 3.7, 4.5, 5.4, 6.4) — cited from evidence brief; evidence base thinner than P2–P4 per brief's own coverage check
- P6 coverage: 7 sub-functions (1.8, 2.8, 2.12, 3.8, 4.6, 5.5, 6.5) — cited from evidence brief; externally corroborated (SFIA/Etsy/Kickstarter) but not job-posting-verified
- P7 coverage: 8 sub-functions (1.9, 2.9, 2.10, 3.9, 4.7, 4.8, 5.6, 6.6) — cited from evidence brief; same caveat as P6
- Total: 50 sub-functions across 6 Primary Functions (9+12+9+8+6+6)
- Deliberately excluded: dual-titling, NVQF/credit-hour framing (per methodology, these are dropped framework artifacts). Also excluded: stack-specific sub-functions (e.g. "write a React hook," "configure a Flask blueprint") — Technical Skill per the LFT matrix is stack-agnostic; stack-specific depth belongs in a future competency (e.g. "Python/Flask Development," "TypeScript/React Development") that would sit downstream of this one.
- [model-judgment — verify] items: P2/P3 sub-function phrasing leans on Etsy/Kickstarter ladder language rather than confirmed current (2026) job-posting text, since the evidence brief's job-posting angle was never successfully sourced (browsing tools unavailable across three grounding passes) — validate phrasing against real job postings when browsing is available. P5–P7 sub-functions are internally consistent with the LFT matrix but, per the evidence brief, externally under-triangulated relative to P2–P4 — treat PF-level groupings at P5–P7 as more provisional than P2–P4 until a market-calibration pass or job-posting research fills the gap.

---

Before returning:
- [x] Every sub-function is a single line, verb+object+qualifier, no banned verbs (understand/know/learn/appreciate/be aware of/be familiar with)
- [x] Every sub-function has a P2–P7 level tag sourced from the evidence brief
- [x] PFs are coherent clusters (each is assessable as a whole via code review, live demo, or portfolio per the methodology's assessment-mode table) — PF 5/PF 6 split specifically to satisfy this after Phase C found they weren't
- [x] Coverage check is complete
- [x] File written to disk
