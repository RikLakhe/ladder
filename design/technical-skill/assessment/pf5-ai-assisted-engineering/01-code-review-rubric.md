# PF 5 — AI-Assisted Engineering: Code Review Rubric

**Used when:** evaluating commit/PR history for AI-tool workflow discipline (this is a pattern-over-time rubric, not a single-PR rubric — review 3–5 recent AI-assisted PRs together).
**Covers:** P2–P4 (P5–P7 for this PF are assessed via portfolio — see `03-portfolio-requirements.md`).

| Criteria | Does not meet P2 | Meets P2 | Meets P3 | Meets P4 |
|---|---|---|---|---|
| Review discipline | Commits show AI-generated code merged with no evidence of line-by-line review | Commit/PR history shows the candidate reviewed AI output before committing, at least when asked about it | Review discipline is consistent and visible without prompting (e.g. review comments, self-review notes) | AI-generated code is held to the identical review bar as human-written code — same scrutiny, same standards, across the full PR history sampled |
| Prompting pattern | No discernible pattern; each AI interaction looks ad hoc | N/A at this level | A consistent, explainable prompting pattern is visible for at least one recurring task type | Prompting is disciplined across multiple task types (coding, testing, debugging, docs) |
| Lifecycle integration | AI tooling used only for code generation | N/A at this level | N/A at this level | AI tooling is integrated across the full lifecycle — coding, testing, debugging, documentation, and review |
| Client data/tool hygiene | Client code, data, or credentials appear to have been pasted into a public/consumer AI tool, or an unapproved tool was used on client work with no mention of tool approval | Uses only company-approved AI tooling for client work, and does not paste client-identifying code/data into public/consumer AI tools | Same as P2, and can explain which of the client's contractual restrictions (if any) apply to AI tool use on that engagement | Consistently applies per-client AI tool restrictions across multiple engagements, discloses AI-assisted work per client policy where required, and keeps AI sessions for one client's codebase separate from another's (no cross-client context leakage) |

**For the candidate:**
- This is a pattern-over-time review, not a single-PR review — bring 3–5 recent AI-assisted PRs together as a set, not your single best example
- **If your current client's contract bans AI tooling outright for more than one review cycle**, this rubric's evidence simply isn't producible in normal work — that's not a skill gap. Apply the assignment-limited path in `../badges.md` §1.7: the badge is recorded as "blocked — assignment-limited," and your manager tracks reassignment or an agreed alternate (e.g. evidence from an internal/sandboxed context), not a side project built to manufacture a PR history
- The reviewer is looking at commit/PR history and review comment threads across that set, so make sure prior review comments and self-review notes are intact and visible, not deleted or squashed away
- At P2, evidence that you reviewed AI output before committing is enough, even if it only surfaces when asked — at P3, that discipline needs to be visible in the history without prompting
- At P3, be ready to show a consistent, explainable prompting pattern for at least one recurring task type (e.g. test writing or debugging), not just coding
- At P4, the bar is full-lifecycle: AI tooling used across coding, testing, debugging, documentation, and review, with AI-generated code held to the identical review bar as human-written code across the whole sampled history
- Because this is client work, "AI tool use" isn't just a personal choice: only company-approved tools should touch client code/data, client contracts may restrict or prohibit AI tool use entirely on that engagement, and AI-assisted authorship may need disclosure per client policy — bring evidence you followed whatever applies to the engagement(s) sampled
- If you work across multiple clients, be ready to show that AI sessions/context for one client's codebase weren't mixed with another's
- This rubric covers P2–P4; P5–P7 are assessed via portfolio instead
- Clearing this bar earns **TS-5-P2 (Review-Every-Time Practitioner)**, **TS-5-P3 (Repeatable Prompter)**, or **TS-5-P4 (Full-Lifecycle AI Integrator)** — each also requires the paired live demo scenario in `02-live-demo-checklist.md`. TS-5-P4 additionally requires the candidate's delivery/account manager as co-signer alongside the technical verifier, per `../badges.md` §1.1. See `../badges.md`

**Pass bar:** all applicable criteria at or above "Meets [target level]"; no criterion below "Meets" for the level being assessed. "N/A" cells indicate the behavior isn't expected at that level per the standard.

**How to run this review:**
- Time: 30 minutes, reviewing 3–5 recent PRs together as a set (not one PR in isolation — this PF is about a pattern, not a single instance)
- Artifacts to collect: PR diffs, PR descriptions, review comment threads
- Who can assess: any engineer at or above P4
