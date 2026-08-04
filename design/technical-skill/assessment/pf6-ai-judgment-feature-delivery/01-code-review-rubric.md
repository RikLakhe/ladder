# PF 6 — AI Judgment & Feature Delivery: Code Review Rubric

**Used when:** evaluating self-review/PR history for AI-output error-catching.
**Covers:** P2–P3 only. From P4 up, this PF is assessed via live demo and portfolio (see `02-live-demo-checklist.md` and `03-portfolio-requirements.md`), since eval design and feature governance don't show up in a routine PR.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 |
|---|---|---|---|
| Flagging uncertainty | AI-suggested code is shipped without comment even where correctness is non-obvious | PR description or review comment flags an AI suggestion as uncertain rather than shipping it silently | Uncertainty-flagging has progressed from general ("I'm not sure this is right") to diagnostic: self-review notes name the specific class of error suspected (e.g. a hallucinated API call, a misapplied pattern) before the PR is opened, rather than a general caveat attached after the fact |
| Catching errors | No evidence of catching an incorrect AI suggestion before it reached review | N/A at this level | PR/commit history or self-report shows a hallucinated API call or incorrect suggestion caught during self-review, before PR |
| Judgment on where AI shouldn't be used | AI tooling was used on compliance-sensitive or proprietary client logic with no consideration of whether that was appropriate | Names, when asked, that some client code (compliance-sensitive logic, proprietary algorithms) shouldn't go through AI tooling at all | PR/self-review notes or self-report show a specific instance where the candidate chose not to use AI on a piece of client work, and why |

**For the candidate:**
- This reviews 3–5 recent AI-assisted PRs as a set, not a single PR in isolation — bring a representative sample of your recent AI-assisted work, not just your cleanest example
- **If your current client's contract bans AI tooling outright for more than one review cycle**, this rubric's evidence isn't producible in normal work — apply the assignment-limited path in `../badges.md` §1.7: the badge is recorded as "blocked — assignment-limited," not failed, and your manager tracks reassignment or an agreed alternate rather than a manufactured task
- Make sure PR descriptions, review comments, and self-review notes are intact across that set — the reviewer needs to see where uncertainty was flagged or errors were caught, not just the final code
- At P2, "done" means at least one PR description or review comment flags an AI suggestion as uncertain rather than shipping it silently
- At P3, "done" means that flagging is consistent across the set, and at least one instance shows you caught a hallucinated API call or incorrect suggestion during self-review, before it reached PR
- Also be ready to describe a case where you judged that AI tooling shouldn't be used at all on a piece of client work — e.g. compliance-sensitive logic, a proprietary client algorithm, or code under a contract that restricts AI tool use — and what you did instead
- This rubric covers P2–P3 only; if you're being assessed at P4+, this instrument won't apply — see the live demo checklist and portfolio requirements instead
- Clearing this bar earns **TS-6-P2 (Uncertainty Flagger)** or **TS-6-P3 (Hallucination Catcher)** — see `../badges.md`

**Pass bar:** all applicable criteria at or above "Meets [target level]"; no criterion below "Meets" for the level being assessed. "N/A" indicates the behavior isn't expected at that level per the standard.

**How to run this review:**
- Time: 20 minutes, reviewing 3–5 recent AI-assisted PRs together as a set
- Artifacts to collect: PR diffs, descriptions, review comment threads
- Who can assess: any engineer at or above P4
