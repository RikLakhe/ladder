# Technical Skill — Guided Exercises

Eight exercises (six original + two added this run to cover the RED-fix client-context items), ordered simplest to most complex. Each maps to specific sub-functions from `../functional-analysis.md` **and** to the badge(s) it builds evidence toward (see `05-badge-reference-card.md` for the full map). Uses LFT's active stack (Python, Flask, Vue, React) per `../../COMPANY-CONTEXT.md` — substitute your team's actual stack where it differs.

None of these exercises award a badge by themselves — completing one produces (or rehearses producing) the artifact a badge's instrument requires. The badge itself still needs the named Verifier's sign-off per `../assessment/badges.md`.

---

## Exercise 1 — Write testable code + unit tests, in a client's own conventions (PF 1)

**Maps to sub-functions:** 1.1, 1.2 [P2]
**Builds toward badges:** TS-1-P2 (Edge-Case Guardian) directly; repeated unaided on a second client codebase, feeds TS-1-P3 (Unaided Test Author)
**Instrument this rehearses:** `../assessment/pf1-quality-testing/01-code-review-rubric.md` — specifically the "Client codebase conventions & test-data handling" row

**Goal:** Write a small function with explicit edge-case handling, and a unit test for it, using the team's test framework — while following an unfamiliar client codebase's existing conventions rather than your own preferred style, and handling test data the way that client's engagement requires.

**Setup:** A Flask endpoint in a client's existing codebase that applies a discount code to an order total, with three business rules (percentage discount, flat discount, minimum-order threshold). The client's existing test suite uses a slightly different naming/assertion style than what you're used to, and the client's data-handling terms prohibit using real order data (which includes customer names and totals) in test fixtures.

**Step-by-step:**
1. Before writing the function, skim the client's existing tests in the same module to identify their naming and assertion conventions — match them rather than importing your own preferred style.
2. Write the function with explicit handling for: no discount code, invalid code, order below minimum threshold.
3. Write a unit test covering the happy path.
4. Write a unit test covering at least one edge case (e.g. order exactly at the threshold) and one error case (invalid code).
5. Ask a senior engineer to review before merging — this exercise is meant to be done with guidance, per the P2 bar.
6. **(New this run)** Before finalizing fixtures, check whether any test data resembles real client data (customer names, real order totals, real discount codes). If so, replace it with synthetic values or a masked substitute — never commit a fixture built from live client data. Note in the PR description which fixtures were synthetic and why.

**Expected output:** a merged PR with the function, ≥3 passing tests, and a PR description that names (a) which existing test conventions you followed and (b) that fixtures use synthetic/masked data.

**Check:** does the PR reviewer confirm edge cases and error paths are covered without asking "what about X?" — and can you point to the specific existing test file whose conventions you matched, without the reviewer having to ask?

**To build P3 evidence (TS-1-P3):** repeat this exercise unaided (no senior-engineer guidance thread visible) on a second, different client's codebase, ramping into its test suite within the engagement's normal ramp-up window.

---

## Exercise 2 — Systematic debugging on unfamiliar code (PF 2)

**Maps to sub-functions:** 2.1, 2.2, 2.3 [P2–P3]
**Builds toward badges:** TS-2-P2 (First Reproducer), TS-2-P3 (Systematic Debugger)
**Instrument this rehearses:** `../assessment/pf2-debugging-observability/01-code-review-rubric.md` and the P2/P3 scenarios in `02-live-demo-checklist.md`

**Goal:** Reproduce and fix a seeded bug using a systematic method, not trial and error, in code you didn't write.

**Setup:** A small Vue component in a client's codebase you didn't write and haven't seen before, with a seeded bug (e.g. a computed property that gives wrong results for a specific input combination), presented as a vague client-reported bug ("the total sometimes looks wrong") with no repro steps or context from the client beyond that one line.

**Step-by-step:**
1. Try to reproduce the reported behavior before touching any code.
2. Use browser devtools or a logging statement to inspect the component's state at the point of failure.
3. Narrate (out loud or in writing) which inputs you're testing and why, rather than changing code and re-running randomly.
4. Fix the root cause, not just the reported instance.
5. **(New this run)** If reproducing this bug would normally require production access you don't have (e.g. real user session data), practice the minimum-access-request habit: write down the smallest specific access or data extract you'd request (e.g. "read-only access to the last 20 sanitized session logs for this component") rather than either escalating immediately or attempting a workaround.

**Expected output:** a written note (2–3 sentences) describing the reproduction steps and root cause, alongside the fix, plus (if applicable) the minimum-access-request note from step 5.

**Check:** could someone else follow your reproduction steps and see the same bug before your fix? Is your access request specific enough that someone else could approve or deny it in one read?

---

## Exercise 2b — Orient to an unfamiliar client's dashboard/logging tooling (PF 2)

**Maps to sub-functions:** 2.4 [P3]
**Builds toward badge:** TS-2-P3 (Systematic Debugger) — the "unfamiliar client tooling" item specifically
**Instrument this rehearses:** `../assessment/pf2-debugging-observability/02-live-demo-checklist.md`, P3 "Read a team dashboard" scenario

**Goal:** Get oriented to a monitoring/logging tool you've never used before, fast enough to tell "normal" from "anomalous" without your prior client's toolchain carrying over.

**Setup:** Pair with a teammate on a real client's dashboard (or a sanitized screen recording of one, if live access isn't available) for a system you're not deeply familiar with — a tool your last engagement didn't use (e.g. Datadog instead of Grafana, or a client's custom internal dashboard).

**Step-by-step:**
1. Before looking at any specific incident, spend 10–15 minutes just asking: where do key signals live in this tool? What's the equivalent of "error rate" or "latency" here, and where's the baseline view?
2. Describe out loud what "normal" looks like for two or three key panels, based only on what you can see plus asking clarifying questions — not by assuming yesterday's tool's layout applies.
3. Ask to be shown (or find) a time window with a known past anomaly. Identify what makes it look different from baseline.
4. Write down one thing about this tool's conventions that differs from a tool you're more used to (e.g. "this tool shows p50 by default where I'm used to p99 being default").

**Expected output:** a short written orientation note: what "normal" looks like on ≥2 panels, the anomaly you found and why it looked different, and the one convention-difference you noted.

**Check:** could you now find "is something wrong right now" on this dashboard without asking your buddy for help a second time?

---

## Exercise 3 — Fit a feature into existing architecture (PF 3)

**Maps to sub-functions:** 3.1, 3.2, 3.3 [P2–P3]
**Builds toward badges:** TS-3-P2 (Module Fit Finder), TS-3-P3 (Pattern-Aligned Designer)
**Instrument this rehearses:** `../assessment/pf3-software-design-architecture/01-code-review-rubric.md`

**Goal:** Add a new small feature to an existing React/Vue component — one you didn't design and that follows a client's own conventions, not LFT's default ones — without duplicating logic or breaking the existing interface.

**Setup:** An existing form component with validation logic, written by a previous team (the client's own engineers or a prior vendor) with conventions that don't fully match LFT's style guide; task is to add a new field with its own validation rule while conforming to the codebase as it stands, not rewriting it toward a preferred style.

**Step-by-step:**
1. Before writing code, identify where existing validation logic lives and whether your new rule can reuse it.
2. Design your new field's interface to match how existing fields are structured.
3. Confirm your change doesn't break existing field behavior (run the existing test suite).
4. Write a 2–3 sentence note explaining the data flow for this portion of the domain, as if handing it to a new teammate (this is the P3 "explain data flow" behavior, done in writing).

**Expected output:** the new field works, existing tests still pass, the new field's code follows the same pattern as existing fields (a reviewer shouldn't be able to tell it was added later without checking git blame), and the data-flow note from step 4 exists as a PR description addendum or onboarding note.

**Check:** did you have to explain your design to a reviewer, or did it visibly match the existing pattern? Would the data-flow note actually orient a new teammate?

---

## Exercise 4 — Security checklist walkthrough, implemented and shipped as a real PR (PF 4)

**Maps to sub-functions:** 4.3, 4.4 [P4] (steps 1–2 also rehearse 4.1 [P2] and 4.2 [P3])
**Builds toward badges:** TS-4-P2/P3 (naming/escalation steps), TS-4-P4 (Vulnerability Spotter, full exercise)
**Instrument this rehearses:** `../assessment/pf4-security/01-code-review-rubric.md` and `02-live-demo-checklist.md`

**Gated:** do not attempt the full exercise until the P3 → P4 transition — PF 4's rubric marks P4-specific criteria "N/A" below P4. P2/P3 learners should do only steps 1 and 4 below (naming the risk, escalating if unclear) and stop there — this stops short of implementation and does not by itself produce TS-4 badge evidence (see the note at the end of this exercise).

**Goal:** Apply a security checklist to a small API design, then actually implement the redesigned endpoint and open a real PR against a live or sandbox codebase — the design note alone does not count toward any TS-4 badge.

**Setup:** A design for a new Flask endpoint, for a US enterprise client, that accepts user-uploaded file paths and returns file contents — some of which may include client PII or confidential business documents. Use a real client codebase (or, absent client access, a sandbox/practice repo with a comparable file-serving endpoint) so this exercise produces a mergeable PR, not just a document.

**Step-by-step:**
1. Before writing code, list the security implications in plain language (what could go wrong here), including what happens if the returned file contents include client PII or confidential data and the request is spoofed or over-broad. *(P2-appropriate step.)*
2. Apply the team's security checklist (or OWASP Top 10 as a stand-in if the team doesn't have one yet) to the design. *(P4.)*
3. Identify at least one vulnerability class this design is exposed to (hint: path traversal) and redesign to close it. *(P4.)*
4. If any part of this is genuinely unclear (e.g. whether a particular client contract term restricts logging file contents), write down the specific question you'd escalate to a senior engineer rather than guessing. *(P3-appropriate step.)*
5. Note what data classification rule (per the client's data handling agreement, or the company's default if none is specified) applies to the file contents this endpoint could expose, and whether logging this endpoint's activity would itself create a data-handling risk.
6. **(New this run — required for any TS-4 badge, not optional polish.)** Implement the redesigned endpoint in code against the live/sandbox codebase from Setup, with the vulnerability class from step 3 actually closed (e.g. path traversal blocked via allow-listing or canonicalization, not just described). Open a real PR containing: the implementation, the checklist from step 2 pasted or linked in the PR description, and a one-line callout of which checklist item(s) drove which code change. This is the artifact `05-badge-reference-card.md` requires as evidence of "checklist application" for TS-4-P4, and the real-PR-touching-sensitive-input/output evidence the badges.md 2-item bundle requires for TS-4-P2/P3/P4.

**Expected output:** a merged or review-ready PR implementing the redesigned endpoint, with the checklist application visible in the PR description, plus the escalation question (if any) from step 4 and the data-handling classification note from step 5 included in the PR description or an attached design note.

**Check:** would a security-minded reviewer find an issue you missed, or did you catch it yourself? Does the PR itself — not a separate hypothetical write-up — show the checklist being applied to real code?

---

## Exercise 5 — AI-assisted workflow with review discipline (PF 5 and PF 6)

**Maps to sub-functions:** 5.1, 5.2 [P2–P3]; 6.1, 6.2 [P2–P3]
**Builds toward badges:** TS-5-P2/P3 (Review-Every-Time Practitioner, Repeatable Prompter), TS-6-P2/P3 (Uncertainty Flagger, Hallucination Catcher)
**Instrument this rehearses:** `../assessment/pf5-ai-assisted-engineering/01-code-review-rubric.md` + `02-live-demo-checklist.md`; `../assessment/pf6-ai-judgment-feature-delivery/01-code-review-rubric.md`

**Goal:** Use an AI coding tool to draft a small function, and practice consistent review-before-commit discipline, including flagging uncertainty, catching AI errors, and exercising judgment about where AI shouldn't be used at all.

**Setup:** A small, well-specified task (e.g. "write a function that validates a phone number format") on a client engagement where only one specific AI tool is contractually approved for use with that client's codebase.

**Step-by-step:**
1. Confirm which AI coding tool is actually approved for this client's engagement (it may differ from what's approved on another client's engagement you've worked on) before opening it.
2. Use the approved AI coding tool to draft the function, without pasting in any real client data, credentials, or proprietary business logic beyond what's needed to specify the task.
3. Before committing, review the output line-by-line — does every line do what you'd expect? Are there edge cases the AI didn't consider? If anything about correctness isn't obvious, write down that it's uncertain rather than shipping it silently (this is the PF 6 uncertainty-flagging habit).
4. Deliberately check for a hallucinated API call or library method the AI may have invented — verify each external call actually exists in the library's docs before trusting it.
5. Write down one thing you changed or would change about the AI's output, and why.
6. Repeat for a second, slightly different task, and compare your prompting approach between the two — noting anything you had to phrase differently to avoid sharing client-specific detail with the tool.
7. **(New this run — covers the rubric's third PF6 criterion, "judgment on where AI shouldn't be used.")** Separately from the two coding tasks above, identify one piece of real or plausible client work on your current (or a recent) engagement where using an AI tool would be inappropriate — for example: compliance-sensitive logic (tax, healthcare eligibility, financial calculations with regulatory exposure), a client's proprietary algorithm or trade-secret logic, or code that would require pasting regulated/PII data into a third-party tool to get useful AI output. Write 3–5 sentences naming the specific work, why AI assistance would be inappropriate there (contract restriction, IP exposure, correctness stakes too high to delegate drafting, etc.), and what you'd do instead (write it unaided, escalate for a data-handling exception, etc.).

**Expected output:** the function, plus a short written note on what you changed and why, one line confirming which tool was approved for this engagement and why, a note on any uncertainty flagged or hallucination caught in step 3/4, and the "where AI shouldn't be used" note from step 7.

**Check:** can you articulate your prompting pattern well enough that a teammate could follow it for a similar task on the same client, without carrying client-specific context to a different client's engagement? Did you actually verify the AI's API calls, or just assume them? Does the step 7 note name a real, specific piece of work rather than a generic statement like "AI shouldn't be used for sensitive stuff"?

**Before this bundle is assessment-ready:** one pass through this exercise produces one PR/artifact. The PF5 and PF6 rubrics expect a 3–5 PR bundle (not a 2-item bundle) to assess a repeatable pattern rather than a single instance — plan on repeating this exercise 1–3 more times across different tasks (and ideally a second client engagement) before submitting for TS-5-P2/P3 or TS-6-P2/P3 sign-off.

---

## Exercise 6 — Design a basic eval suite (PF 6)

**Maps to sub-functions:** 6.3 [P4]
**Builds toward badge:** TS-6-P4 (Eval & Rollback Shipper) — combine with Autonomous Project 2's shipped feature for the full badge
**Instrument this rehearses:** `../assessment/pf6-ai-judgment-feature-delivery/02-live-demo-checklist.md`

**Goal:** Design an eval suite for a toy AI-powered feature, naming what it does and doesn't cover.

**Setup:** A hypothetical feature: an AI assistant that suggests a Python function name given a short description. Reframe: this feature will run on a client's production customer-support ticket text.

**Step-by-step:**
1. List 3–5 failure modes this feature could exhibit (e.g. suggesting a name that violates the team's naming convention, hallucinating a name that implies functionality the description didn't ask for).
2. Design eval cases that would actually catch each failure mode.
3. Explicitly write down which failure modes your eval suite does NOT cover, and why that's an acceptable gap for a first version.
4. Write a rollback condition: what measurable signal would tell you to turn this feature off?
5. Given the client-data reframe above: note whether your eval data itself would count as client data under that client's terms, and what that implies for where you can store/paste it.

**Expected output:** an eval suite outline (doesn't need to be runnable code) plus the explicit coverage/gap list, rollback condition, and the client-data note from step 5.

**Check:** could a reviewer identify a failure mode your eval suite misses that you didn't already flag yourself?

---

## Exercise 7 — Design within a client-mandated stack constraint, with a handoff note (PF 3)

**Maps to sub-functions:** 3.5, 3.6 [P4] (handoff-note step previews 3.7 [P5] evidence)
**Builds toward badges:** TS-3-P4 (Coupling Guardian) directly; the handoff-note step feeds TS-3-P5 (Component Architect) evidence later
**Instrument this rehearses:** `../assessment/pf3-software-design-architecture/02-live-demo-checklist.md` P4 scenario, and previews the "handoff-ready" clause in `03-portfolio-requirements.md`

**Goal:** Design a moderately complex change that fits inside a client's already-standardized stack or platform constraint, rather than proposing to change the constraint — and write the design up so a client engineer (not just an LFT engineer) could maintain it.

**Setup:** A client has already standardized on a specific stack element you wouldn't have chosen (e.g. a legacy on-prem message queue instead of a managed cloud queue, or a specific framework version two majors behind current). You're asked to add a moderately complex feature (e.g. "add a rate-limiting layer to this API") that must work within that constraint.

**Step-by-step:**
1. Map the relevant existing services/data flows before proposing a design — identify exactly where the constraint (the legacy component, the pinned framework version) touches your design.
2. Design the feature to work within the constraint. If your first instinct is "we should really migrate off this," write that instinct down separately as a future recommendation, but do not let it block today's design.
3. Use abstraction/isolation appropriately so the constrained component's quirks don't leak into the rest of the codebase.
4. Scope the change realistically — don't redesign more of the service than the task requires.
5. Write a short handoff note (half a page) explaining the design decision and the constraint-driven tradeoff, in terms a client engineer with no LFT-specific context could use to maintain the feature after the engagement ends.

**Expected output:** a design note/diagram, the isolated interface to the constrained component, and the handoff note from step 5.

**Check:** could a client engineer who never talked to you maintain this from the handoff note alone? Did you avoid proposing to change the constraint itself?

---

## Exercise cross-reference

| Exercise | PF(s) | Levels | Badge(s) |
|---|---|---|---|
| 1 | PF 1 | P2–P3 | TS-1-P2, TS-1-P3 |
| 2 | PF 2 | P2–P3 | TS-2-P2, TS-2-P3 |
| 2b | PF 2 | P3 | TS-2-P3 |
| 3 | PF 3 | P2–P3 | TS-3-P2, TS-3-P3 |
| 4 | PF 4 | P2–P4 (gated) | TS-4-P2, TS-4-P3, TS-4-P4 |
| 5 | PF 5, PF 6 | P2–P3 | TS-5-P2, TS-5-P3, TS-6-P2, TS-6-P3 |
| 6 | PF 6 | P4 | TS-6-P4 (with Project 2) |
| 7 | PF 3 | P4 (previews P5) | TS-3-P4 (previews TS-3-P5) |
