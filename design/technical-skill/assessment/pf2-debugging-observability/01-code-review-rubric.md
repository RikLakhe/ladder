# PF 2 — Debugging & Observability: Code Review Rubric

**Used when:** evaluating bug-fix PRs / debugging session notes as a bundle.
**Covers:** P2–P3 only. From P4 up, this PF is assessed primarily via live demo and portfolio (see `02-live-demo-checklist.md` and `03-portfolio-requirements.md`) since debugging quality is harder to observe fully from a merged diff alone.

**Substantial-work requirement:** bring **2 real bug-fix PRs (or debugging session write-ups)**, not one showcase fix — a single lucky diagnosis doesn't demonstrate a repeatable method.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 |
|---|---|---|---|
| Reproduction before fixing | PR shows a fix with no evidence the bug was reproduced first | PR description or ticket notes show an attempt to reproduce, possibly with help, on both bundle items | PR description shows the bug was reproduced independently before the fix was written, on both bundle items |
| Method vs. guesswork | Fix looks like trial-and-error (multiple unrelated changes bundled together) | Uses a debugger/logging tool to isolate cause, with visible guidance from a senior engineer in the thread | Uses a named systematic method (bisection, log correlation) unaided, documented in the PR description, on both bundle items |
| Scope of diagnosis | Fix only addresses the reported symptom | Fix addresses the root cause within a single, familiar service | Fix addresses the root cause within a single service, including cases outside the specific reported instance |

**Pass bar:** all criteria at or above "Meets [target level]" on both bundle items; no criterion below "Meets" for the level being assessed.

**For the candidate:**
- Bring 2 real bug-fix PRs (or debugging session notes) — the reviewer needs the PR descriptions and any linked ticket/debugging notes, not just the diffs. These can be bugs fixed inside an existing client codebase you ramped into, not only a system you built — fast, correct root-causing in an unfamiliar codebase is valid evidence, level-appropriately
- If a PR or ticket notes live in a client-owned system, get client sign-off before sharing, and redact client-identifying names, data, or proprietary logic from the description/notes before submission
- Make sure both PR descriptions document that you reproduced the bug before fixing it — this is checked explicitly, not assumed
- Name the systematic method you used (bisection, log correlation, etc.) in the description if you want credit for P3; "it just took some digging" won't read as systematic
- "Done" at P3 means the fix addresses a root cause you diagnosed unaided, not just the reported symptom, and the method is visible in writing without needing to explain it verbally, on both items
- This rubric only covers P2–P3; if you're being assessed at P4+, this instrument won't apply — see the live demo checklist and portfolio requirements instead
- Clearing this bar at your target level earns **TS-2-P2 (First Reproducer)** or **TS-2-P3 (Systematic Debugger)** — see `../badges.md`. Note TS-2-P2 also requires the P2 live demo scenario to pass, and TS-2-P3 also requires both P3 live demo scenarios (see `02-live-demo-checklist.md`)

**How to run this review:**
- Time: 30 minutes for the 2-PR bundle
- Artifacts to collect: both PR diffs, descriptions, and any linked ticket/debugging notes
- Who can assess: any engineer at or above P4
