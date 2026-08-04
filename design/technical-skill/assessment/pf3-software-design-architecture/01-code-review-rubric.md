# PF 3 — Software Design & Architecture: Code Review Rubric

**Used when:** evaluating PRs for architectural fit, as a bundle.
**Covers:** P2–P3 only. From P4 up, this PF is assessed via live system-design walkthrough and portfolio (see `02-live-demo-checklist.md` and `03-portfolio-requirements.md`), since architectural judgment shows better in a design conversation than in a single diff.

**Substantial-work requirement:** bring **2 real PRs** where new logic was fit into an existing service, not one showcase example — architectural fit judged on one diff can be luck; a bundle shows it's a pattern.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 |
|---|---|---|---|
| Avoiding duplication | New logic duplicates existing functionality elsewhere in the codebase | Reviewer had to point out an existing module the logic could have used, but candidate understood once shown | Candidate identified and used the correct existing module unaided, on both bundle items |
| Interface alignment | New interface is inconsistent with how similar things are done elsewhere, with no rationale given | Interface roughly follows existing patterns, with guidance | Interface aligns with the team's existing architectural patterns without needing correction, on both bundle items |
| Breaking changes | PR breaks an existing interface without flagging it | PR avoids breaking changes, confirmed with a senior engineer's help | PR avoids breaking changes and the PR description explains why, on both bundle items |
| Explaining data flow | Cannot describe how data moves through the portion of the domain the PR touches, even when asked | Can describe the data flow with prompting or correction from a senior engineer | PR description, design-doc excerpt, or onboarding note shows the candidate explained the data flow for a portion of the team's domain to a new teammate, unprompted |

**Pass bar:** all criteria at or above "Meets [target level]" on both bundle items; no criterion below "Meets" for the level being assessed.

**For the candidate:**
- Bring 2 real PRs where you fit new logic into an existing service — the reviewer needs both diffs and descriptions, and needs to be familiar with the service to judge architectural fit. This is expected to be a client's existing codebase and conventions, not a greenfield design of your own — correctly identifying and following patterns you didn't set is the signal being assessed, not authorship of the original architecture
- If a PR lives in a client-owned repo, get client sign-off before sharing it for review, and redact client-identifying names, data, or proprietary logic from the diff/description before submission
- If either PR introduces a new interface, make sure the description explains how it aligns with existing patterns, or names the existing module you reused — this is what distinguishes P2 (guided) from P3 (unaided)
- If either PR touches or could break an existing interface, document why it doesn't (or how you avoided it) in the PR description — this is assessed explicitly, not inferred
- "Done" at P3 means duplication avoidance, interface alignment, and breaking-change avoidance are all evident without a reviewer needing to point anything out, on both items, plus one documented instance of explaining domain data flow to a teammate
- This rubric only covers P2–P3; if you're being assessed at P4+, this instrument won't apply — see the live system-design walkthrough and portfolio requirements instead
- Clearing this bar earns **TS-3-P2 (Module Fit Finder)** or **TS-3-P3 (Pattern-Aligned Designer)** — see `../badges.md`

**How to run this review:**
- Time: 30 minutes for the 2-PR bundle
- Artifacts to collect: both PR diffs and descriptions
- Who can assess: any engineer at or above P4 who is familiar with the relevant service
