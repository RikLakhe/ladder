# Technical Skill — AI-Assisted Engineering

**Competency:** Technical Skill
**Primary Function:** 5 of 6 — AI-Assisted Engineering
**Domain classification:** Core
**Version date:** 2026-07-01 (revised — see revision note)

**Revision note:** 2026-07-01 — Phase C compliance audit found the original combined "AI Capability" PF bundled two matrix rows that don't share an assessment mode: daily AI-tool workflow habits vs. AI feature delivery/eval design. Split into two PFs. This file covers AI-Assisted Engineering only (workflow, tooling, prompting discipline, review habits). See `6-ai-judgment-feature-delivery.md` for AI feature delivery, eval design, and governance.

## Scope

How an engineer integrates AI coding tools into their own — and, at senior levels, their team's or organization's — daily engineering workflow: tool literacy, prompting discipline, and review habits. Applies P2–P7, and per `COMPANY-CONTEXT.md` reflects a company-wide strategic commitment, not a per-engineer preference. Excludes AI feature delivery, eval design, and AI-specific risk governance (see PF 6 — AI Judgment & Feature Delivery), general software architecture (PF 3), and general testing practice (PF 1) except where AI-specific.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: use an AI coding tool (Copilot, Claude, Cursor) to draft code, then review the output line-by-line before committing
- A practitioner at this level can: check which AI tools are contractually approved for a given client engagement before pasting that client's code or data into any AI tool

**P3**
- A practitioner at this level can: apply a consistent prompting pattern for a recurring task type (code generation, test writing, or debugging)
- A practitioner at this level can: strip or avoid including client-identifying data/secrets in prompts sent to an AI tool, even an approved one

**P4**
- A practitioner at this level can: integrate AI tooling across the full development lifecycle (coding, testing, debugging, documentation, review) with disciplined prompting habits, holding AI-generated code to the same review bar as human-written code
- A practitioner at this level can: apply a different client's AI-tool usage restrictions (e.g. no AI tools permitted at all, only a specific vendor, no client data in prompts) correctly when moving between engagements

**P5**
- A practitioner at this level can: establish a team-level standard for AI tool use and prompting discipline

**P6**
- A practitioner at this level can: drive AI workflow adoption and quality across several teams, closing team-level AI practice gaps identified with team leads

**P7**
- A practitioner at this level can: set and govern organizational AI workflow standards, ensuring adoption is measured by outcomes, not usage

## Required Knowledge

1. **Prompt engineering fundamentals** (context window management, few-shot examples, structured output) — without this, "prompting" stays ad hoc and non-reproducible.
2. **AI tool capability boundaries for the company's approved toolchain** (what Copilot/Claude/Cursor are actually good and bad at in the team's stack) — needed to know when to reach for the tool at all.
3. **Review parity principle** (AI-generated code gets the same review bar as human code — no more, no less) — without this, engineers either rubber-stamp AI output or distrust it reflexively, both of which defeat the point of the tooling.
4. **Workflow measurement** (outcome metrics vs. usage metrics for AI adoption) — P6/P7 need this to avoid "AI adoption theater," where usage numbers don't map to actual delivery outcomes.
5. **Per-client AI tool constraints** (contractual restrictions on which AI tools may touch a given client's code/data, ranging from unrestricted to fully prohibited) — unlike a product company with one internal policy, LFT engineers must apply a different, sometimes stricter, client-specific rule set on every engagement, and getting this wrong is a contract breach, not a workflow inefficiency.
6. **Client IP exposure via AI tooling** (what a prompt, autocomplete suggestion, or AI tool's training/logging behavior could leak of a client's proprietary code or data) — this is the primary risk services engineers must manage that a single-codebase product engineer does not.

## Required Skills

- Fluency with the company's approved AI coding tools
- Writing PR descriptions that are transparent about AI-assisted authorship and what was reviewed
- Cross-team facilitation for standard-setting (P6+)

## Evidence Guide

**Critical aspects (non-negotiable):**
- AI output is reviewed before commit, every time, regardless of how confident the tool sounds
- Prompting is a repeatable pattern the engineer can explain, not a one-off guess
- Team/org workflow standards are documented and observably followed in review, not just stated as an ideal
- The client's specific AI-tool usage restrictions for the current engagement are known and followed before any client code/data is used with an AI tool

**Assessment methods by level:**
- P2–P4: code review rubric (does commit/PR history show consistent review discipline on AI-assisted work)
- P5–P6: portfolio (a team or cross-team workflow standard they set or drove adoption of)
- P7: portfolio + teaching demonstration

**Work products that demonstrate this PF:** PRs with AI-assisted commits and review comments, team AI-use standard documents, org-wide AI workflow governance documents, adoption/outcome metrics reports.

## Hiring Signals

- **P2:** describes their process for reviewing AI-suggested code before committing; describes how they'd check whether a client permits a given AI tool before using it on that client's code.
- **P3:** describes a specific, repeatable prompting pattern they use for a task type; describes how they avoid including client data/secrets in a prompt.
- **P4:** describes how they've integrated AI tooling across their full workflow (not just code generation) while holding it to the same review bar as their own work.
- **P5/P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from reviewing individual AI suggestions, to a consistent, explainable prompting pattern.
- **P3 → P4:** from single-task-type prompting, to full-lifecycle AI tool integration with review parity.
- **P4 → P5:** from individual practice, to setting a team-level standard.
- **P5 → P6:** from one team's standard, to driving adoption and closing gaps across several teams.
- **P6 → P7:** from cross-team adoption work, to organization-wide governance measured by outcomes.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 5 (functional-analysis.md, 5.1–5.6) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
