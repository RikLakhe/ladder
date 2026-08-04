# PF 1 — Quality & Testing: Code Review Rubric

**Used when:** evaluating real work output as a bundle — not a single PR in isolation.
**Covers:** P2–P4 (P5–P7 for this PF are assessed via portfolio and live demo — see `03-portfolio-requirements.md` and `02-live-demo-checklist.md`).

**Substantial-work requirement:** bring a **bundle of 2 real PRs (or a test suite spanning ≥2 changes)**, not one showcase PR. A single clean PR can be a lucky instance; a bundle shows the behavior is a pattern. This is the same bar already applied to PF 5/PF 6 in this competency — PF 1–4 now match it.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 | Meets P4 |
|---|---|---|---|---|
| Edge-case & error-path coverage | Tests only the happy path; no error-handling branch exists in the code | Code has explicit edge-case/error branches; tests exist for the new function with senior guidance visible in review comments, across the bundle | Tests cover edge cases and error paths unaided, without a guidance comment thread, across the bundle | Full feature test suite covers edge cases and errors across all touched components, not just the new function, across the bundle |
| Test-pyramid layer selection | No tests, or tests at the wrong layer for the risk (e.g. only e2e for a pure function) | Unit test present for the new function, using the team's framework, in both bundle items | Unit and higher-level tests both present where the change warrants it, in both bundle items | Test suite spans multiple pyramid layers appropriately for the feature |
| Readability without walkthrough | Reviewer needs a verbal explanation to understand what the code/tests do | Reviewer can follow the code and tests with minor clarifying comments | Reviewer approves without needing clarification, on both bundle items | Code is self-documenting; comments (if any) explain non-obvious rationale only, not what the code does |
| Documentation intent | No docstrings/comments on non-obvious logic | Docstrings absent or inconsistent | Non-obvious function intent is documented via docstring; self-evident code is not over-commented | Same bar as P3, consistently applied across the whole bundle |
| Client codebase conventions & test-data handling | PR introduces the candidate's own test framework/naming/fixture conventions into an unfamiliar client codebase instead of following what's already there, or a test fixture contains live client data with no masking/synthetic substitute | Locates and follows the client codebase's existing test conventions (framework, naming, fixture patterns) with guidance, across the bundle | Onboards into a new client's test suite/stack unaided within the engagement's ramp-up window and writes conforming tests unaided; where the client's data-handling terms require it, builds fixtures using synthetic or masked data, never live client data, across the bundle | Adapts the testing approach to the client's existing tooling and CI constraints (e.g. a mandated framework, a restricted CI environment) without treating those constraints as blockers, across the bundle |

**Pass bar:** all criteria at or above "Meets [target level]" on every item in the bundle; no criterion below "Meets" for the level being assessed.

**For the candidate:**
- Bring a bundle of 2 real PRs (or test suites) you wrote recently, not specially-constructed showcases — the rubric is calibrated to normal work, assessed as a pattern, not a single instance. This includes PRs written against an existing client codebase and its established conventions, not only work you designed from scratch — fitting tests to a codebase you ramped into quickly is valid evidence, level-appropriately
- If a PR lives in a client-owned repo, get client sign-off (or use your engagement's standing data-handling approval) before sharing it for review; redact any client-identifying names, data, or secrets from the diff/description before it leaves the client environment — do not expose client IP as a side effect of the assessment
- Make sure the PR descriptions and review comment threads are intact and accessible to the reviewer; the rubric assesses the diffs, descriptions, and threads together, not just the code
- At P2, it's expected that edge-case coverage and test-writing show visible senior guidance in the thread — this isn't penalized at P2, only at P3+
- "Done" at P3 means edge cases, error paths, and docstring-worthy intent are covered without needing a clarifying comment thread, on both bundle items
- "Done" at P4 means the whole feature's test suite (not just your new function) spans multiple pyramid layers and the code is self-documenting
- If either bundle item was written against a client's existing codebase, be ready to show you followed (rather than replaced) the client's own test conventions, and — if the engagement's data-handling terms require it — that fixtures use synthetic or masked data rather than live client data; at P4, be ready to show you worked within the client's mandated tooling/CI constraints rather than flagging them as blockers
- Expect a 30–40 minute review folded into normal review cadence — no separate prep ceremony is required beyond having both artifacts ready
- Clearing this bar at your target level with no HIGH gap earns the corresponding badge — see `../badges.md` (TS-1-P2 / TS-1-P3 / TS-1-P4)

**How to run this review:**
- Time: 30–40 minutes per bundle (2 PRs), done as part of normal review or a scheduled catch-up, not a separate ceremony
- Artifacts to collect: both PR diffs, both PR descriptions, and both review comment threads
- Who can assess: any engineer at or above the target level being assessed; for promotion decisions, use a reviewer at least one level above the candidate
- Badge sign-off: record the badge award (Badge ID, date, artifact links) per `../badges.md` Part 3 once the bundle clears the bar
