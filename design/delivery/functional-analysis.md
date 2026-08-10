# Functional Analysis: Delivery

> [Competency index](../index.md) › [Delivery](./index.md)

**Version date:** 2026-07-01

One-line purpose: an engineer who has this competency scopes and sequences work so it ships incrementally, navigates ambiguity without a full picture, and manages their own (and eventually others') delivery commitments and cost/value tradeoffs responsibly, at a level appropriate to their career stage.

**Domain classification:** Core — occupation-defining for every engineering role at LFT, not shared incidentally (Cross-domain) and not merely a prerequisite for something else (Foundational).

**Source:** `competencies/industry-evidence/delivery.md` (grounded 2026-07-01, all six levels as separate passes). Per that brief's scope note, this competency maps to the whole of Section 2 "Delivery" in `competencies/lft-engineering-competency-matrix.md` — Incremental Value Delivery (Work Breakdown, Prioritisation & Dependencies, Dealing with Ambiguity) and Self-Organization (Reliability & Delivery Accountability, Economic Thinking).

**Assessability check (done during Phase A, not deferred to Phase C):** Technical Skill's Phase C found that "AI Capability" needed splitting because its two rows required genuinely different assessment mechanisms (ongoing workflow-habit review vs. reviewing one eval artifact). Applying that same test here before finalizing PF boundaries: can Work Breakdown + Prioritisation & Dependencies + Dealing with Ambiguity be watched together in one scenario? Yes — handing someone an under-specified, ambiguous initiative and watching them break it down, sequence it, and navigate the unclear parts is a single, natural exercise; these three aren't separately observable the way AI-Assisted-Engineering and AI-Judgment were. Can Reliability & Delivery Accountability + Economic Thinking be reviewed together? Yes — a retrospective conversation ("tell me about a project you delivered — how did you manage commitments and blockers, and what cost/value tradeoffs did you make") covers both naturally. Conclusion: keep LFT's own two-group structure as the two Primary Functions below, rather than splitting further.

---

## PF 1 — Incremental Value Delivery

Scope, sequence, and adapt work so it ships in small pieces, even when the full picture isn't available.

**Scope:** Sizing and breaking down tasks/epics/initiatives for incremental delivery; setting and respecting priority order and dependencies; deciding and acting responsibly under incomplete information. Excludes personal reliability/commitment-tracking and cost/value judgment (PF 2 — a distinct, more individually-scoped set of behaviors per LFT's own matrix grouping).

**Note (Phase A):** this PF runs to 17 sub-functions across 3 matrix rows (Work Breakdown, Prioritisation & Dependencies, Dealing with Ambiguity), well above the methodology's "≈4–10" granularity guideline — flagged here as an accepted exception, not a defect, for the same reason PF 2 (Debugging & Observability) in Technical Skill was accepted at 12: each row has genuinely distinct language at every level in the source matrix (no "See P4"-style consolidation cues), and the assessability check above confirms all three rows are still watchable as one coherent exercise despite the count.

Sub-functions:

*Work Breakdown:*
- 1.1 [P2] Explain why a given task should be split before starting it, when asked
- 1.2 [P3] Size a task for incremental delivery before starting it, with input from a teammate or manager
- 1.3 [P4] Resize a task that isn't appropriately scoped for incremental delivery, identified during planning, unaided
- 1.4 [P5] Break down an epic or project into well-scoped, prioritized pieces that the team understands
- 1.5 [P6] Break down cross-team work into pieces that all involved teams understand
- 1.6 [P7] Break down an organization-wide initiative into pieces that are prioritized and understood across the organization

*Prioritisation & Dependencies:*
- 1.7 [P2] Work on tasks in the priority order set by the team
- 1.8 [P3] Note a task's dependencies before starting it
- 1.9 [P4] Correct a task's priority and dependency notes during planning, unaided
- 1.10 [P5] Foster a team culture of priority-setting and urgency aligned with organizational strategy
- 1.11 [P6] Foster a cross-team culture of priority-setting and urgency, with dependencies understood by all teams involved
- 1.12 [P7] Install an organization-wide preventative measure that stops a recurring cross-team dependency issue

*Dealing with Ambiguity (no P2 — the matrix marks this explicitly "n/a" at P2; not forced):*
- 1.13 [P3] Make a reasonable decision on a task despite missing information, within their own scope of work
- 1.14 [P4] Make a reasonable decision under incomplete information in both routine and high-pressure situations
- 1.15 [P5] Guide the team through a decision made under incomplete information
- 1.16 [P6] Guide several teams through risk, change, or uncertainty spanning their work
- 1.17 [P7] Guide the organization through risk, change, or uncertainty at organizational scope

## PF 2 — Self-Organization

Manage personal (and eventually team- and org-scale) delivery reliability and cost/value judgment.

**Scope:** Communicating progress, blockers, and delays; managing commitments and roadmaps to delivery; weighing cost against value in decisions. Excludes the collaborative scoping/sequencing work covered in PF 1.

**Note (Phase A):** this PF runs to 14 sub-functions across 2 matrix rows — also above the "≈4–10" guideline, accepted for the same reason as PF 1.

Sub-functions:

*Reliability & Delivery Accountability:*
- 2.1 [P2] Report daily progress on assigned work to the team
- 2.2 [P2] Deliver on a committed task with visible urgency
- 2.3 [P3] Escalate a blocker, delay, or cost overrun to the team daily, as soon as it's identified
- 2.4 [P4] Communicate a blocker, delay, or cost overrun before it requires escalation
- 2.5 [P5] Clarify delivery expectations between the team and external stakeholders before a project starts
- 2.6 [P6] Manage a cross-team roadmap to delivery, with blockers anticipated and communicated across teams
- 2.7 [P7] Manage an organization-wide roadmap to delivery, with expectations clarified across the organization and with external stakeholders

*Economic Thinking:*
- 2.8 [P2] Ask a senior engineer for help weighing cost against value on a real decision
- 2.9 [P3] Weigh cost against value on a real decision, with senior engineer input
- 2.10 [P4] Weigh cost against value on a real decision, unaided
- 2.11 [P4] Suggest an economic tradeoff to a teammate on their work
- 2.12 [P5] Foster a team culture of applying economic thinking to make timely decisions
- 2.13 [P6] Foster an economic-thinking culture across several teams
- 2.14 [P7] Foster an economic-thinking culture across the organization

---

## Related

- Prerequisite competencies: none formally required, though Technical Skill's Work Breakdown-adjacent judgment (e.g. PF 3's "scope a moderately complex change") overlaps in spirit with PF 1 here — the two competencies reinforce each other rather than one gating the other.
- Downstream competencies: PF 1 and PF 2 are natural inputs to a future "Technical Leadership" or "Project/Program Management" competency at P6/P7 scope, where roadmap and cross-team delivery ownership becomes the primary job rather than one dimension of an engineering role.
- Cross-domain overlaps: Economic Thinking (PF 2) overlaps with `lft-engineering-competency-matrix.md` Section 5 "Strategic Impact" → "Business Acumen & Strategy," which is broader (market/business-model understanding) where Economic Thinking here is narrower (individual cost/value judgment on a specific decision). If a dedicated Business Acumen competency is ever built, re-scope PF 2's Economic Thinking rows to the decision-level baseline and point to that competency for the strategic/market-level depth.

## Coverage check

- Evidence brief grounded: 2026-07-01 (`competencies/industry-evidence/delivery.md`, all 6 levels grounded as separate passes)
- Frameworks cross-checked: Shape Up (Basecamp), Etsy Engineering Career Ladder "Delivery" competency, Kickstarter Engineering Ladder, SFIA 9 generic levels, staffeng.com Staff archetypes, internal `lft-engineering-competency-matrix.md`
- P2 coverage: 5 sub-functions (1.1, 1.7, 2.1, 2.2, 2.8) — all cited from evidence brief (Dealing with Ambiguity correctly has no P2 entry)
- P3 coverage: 5 sub-functions (1.2, 1.8, 1.13, 2.3, 2.9) — all cited from evidence brief
- P4 coverage: 6 sub-functions (1.3, 1.9, 1.14, 2.4, 2.10, 2.11) — all cited from evidence brief
- P5 coverage: 5 sub-functions (1.4, 1.10, 1.15, 2.5, 2.12) — all cited from evidence brief
- P6 coverage: 5 sub-functions (1.5, 1.11, 1.16, 2.6, 2.13) — all cited from evidence brief
- P7 coverage: 5 sub-functions (1.6, 1.12, 1.17, 2.7, 2.14) — all cited from evidence brief
- Total: 31 sub-functions across 2 Primary Functions (17 + 14)
- Deliberately excluded: dual-titling, NVQF/credit-hour framing, L1–L5 abstraction tags. Also excluded: a separate P2 sub-function for Dealing with Ambiguity — the matrix marks this row explicitly "n/a" at P2, so no sub-function was forced there.
- [model-judgment — verify] items: same as the evidence brief — P2/P3 phrasing leans on Etsy/Kickstarter/Shape Up conceptual cross-references rather than confirmed 2026 job-posting text; P5–P7 leans on the LFT matrix with staffeng.com/Etsy/SFIA corroboration but is externally under-triangulated relative to P2–P4, and carries the same staffeng.com "Architect" vs. "Right Hand" naming-collision caveat noted in both this brief and Technical Skill's.

---

Before returning:
- [x] Every sub-function is a single line, verb+object+qualifier, no banned verbs (understand/know/learn/appreciate/be aware of/be familiar with)
- [x] Every sub-function has a P2–P7 level tag sourced from the evidence brief
- [x] PFs are coherent clusters — assessability explicitly checked against the Technical Skill PF5/6 precedent before finalizing, not assumed from the matrix's grouping alone
- [x] Coverage check is complete
- [x] File written to disk
