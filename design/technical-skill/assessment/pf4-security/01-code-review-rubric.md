# PF 4 — Security: Code Review Rubric

**Used when:** evaluating PRs/designs for security awareness, as a bundle.
**Covers:** P2–P4 (P5–P7 for this PF are assessed via portfolio — see `03-portfolio-requirements.md`).

**Substantial-work requirement:** bring **2 real PRs/designs** that touch sensitive input/output, not one showcase example — security awareness assessed on one diff can be luck; a bundle shows it's consistent practice.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 | Meets P4 |
|---|---|---|---|---|
| Naming the risk | PR touches sensitive input/output (user data, auth, external calls) with no mention of security anywhere | PR description names the security implication in plain language, on both bundle items | Same as P2, and candidate flags genuinely unclear cases to a senior engineer rather than guessing | Reviewer comments cite the specific vulnerability class (e.g. "this is a SQLi risk," not "this seems unsafe") |
| Checklist application | No evidence a security checklist was considered | N/A at this level | N/A at this level | Security checklist was applied to the design before implementation, documented in the PR or design doc — and, where the client's own security conventions differ from LFT's default checklist, the deviation is noted and reasoned through rather than silently overridden |
| Review behavior | N/A at this level | N/A at this level | N/A at this level | Identifies a security vulnerability in someone else's PR during peer review, citing the specific risk |
| Client credential/data handling | PR or design handles client-issued credentials, secrets, or client data with no mention of handling constraints | Names, in plain language, that a credential or client data item is sensitive and under client control | Escalates unclear client data-handling or access-scope questions to a senior engineer or the engagement lead rather than guessing | Applies client contractual/NDA handling constraints correctly (e.g. no client secrets in shared repos or non-approved tools) and, where a vulnerability is found in client-owned code/infra rather than LFT-owned code, routes it through the proper client-facing reporting channel (engagement lead/account security contact) instead of only raising it internally |

**Pass bar:** all applicable criteria at or above "Meets [target level]" across the bundle; no criterion below "Meets" for the level being assessed. "N/A" cells indicate the behavior isn't expected at that level per the standard — do not penalize for their absence.

**For the candidate:**
- Bring 2 real PRs or designs that touch sensitive input/output (user data, auth, external calls) — the rubric can't assess security awareness on a change with no security surface
- **If your current assignment genuinely never puts a sensitive-input/output ticket in front of you for more than one review cycle**, this isn't a skill gap — flag it to your manager and apply the assignment-limited path in `../badges.md` §1.7 (badge recorded as "blocked — assignment-limited," reassignment or an agreed substitute tracked) rather than manufacturing a task solely to produce evidence
- Name the security implication in plain language directly in both PR descriptions; don't assume it's obvious from the diff
- At P3, if a security implication is genuinely unclear, flag it to a senior engineer rather than guessing — that escalation is itself what's being assessed, not a fallback
- At P4, cite the specific vulnerability class (e.g. "SQLi risk"), not generic caution, and be ready to show the security checklist was applied to the design before implementation started, including how it was reconciled with the client's own security conventions if those differ from LFT's default
- P2–P3 criteria are assessed from the PR/description/thread alone; P4 also expects evidence you identified a vulnerability in someone else's PR during peer review
- Most engineers work under client-controlled access (gated environments, client-issued credentials, no standing prod access) rather than owning the system outright — the rubric assesses handling of that reality, not full-ownership access
- If the PR/design surfaces a vulnerability in a client-owned system rather than LFT's own codebase, be ready to describe the proper reporting channel (engagement lead / account security contact) — this is assessed separately from internal-only reporting
- This rubric covers P2–P4; P5–P7 are assessed via portfolio instead
- Clearing this bar earns **TS-4-P2 (Security-Aware Contributor)**, **TS-4-P3 (Escalation-Disciplined Engineer)**, or (combined with the live demo) **TS-4-P4 (Vulnerability Spotter)** — see `../badges.md`. TS-4-P4 sign-off additionally requires the candidate's delivery/account manager as co-signer alongside the technical verifier, per `../badges.md` §1.1

**How to run this review:**
- Time: 25–30 minutes for the 2-item bundle
- Artifacts to collect: both PR diffs, descriptions, review comment threads
- Who can assess: any engineer at or above P4; for P4 checklist-application review, pair with someone from the security team if available
