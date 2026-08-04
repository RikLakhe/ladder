# Technical Skill — Concept Notes

One section per Required Knowledge item across all 6 PF standards. This is "just enough theory to be dangerous," not a tutorial — go to the linked source for depth. See `05-badge-reference-card.md` for which badge each PF's concept notes ultimately feed toward, and `02-guided-exercises.md` for where the theory gets applied.

**Link verification note (updated 2026-08-03):** WebSearch was unavailable when this file was first written (2026-07-01); a follow-up pass this session spot-checked the two most load-bearing links (Martin Fowler's TestPyramid article, §1; OWASP Top 10, §21) via WebSearch and confirmed both are current and reachable — OWASP's list was refreshed to Top 10:2025 (owasp.org/Top10/2025/) since the original write-up, updated below. The remaining links in this file are well-established, generally stable references chosen from training knowledge and were not individually re-verified this session — treat those as unverified-but-likely-stable rather than confirmed live.

---

## PF 1 — Quality & Testing

### 1. The testing pyramid
Unit tests at the base (many, fast, cheap), integration tests in the middle (fewer, slower), end-to-end tests at the top (fewest, slowest, most brittle). The shape is a guide to proportion, not a rule that e2e tests are bad.
**You need this when:** deciding what kind of test to write for a given change, or explaining why a test suite feels slow or flaky.
**Reading:** Martin Fowler, "TestPyramid" (martinfowler.com/bliki/TestPyramid.html) — verified reachable and current via WebSearch, 2026-08-03.

### 2. Test isolation and determinism
A test should produce the same result every run, regardless of what ran before it or what's happening on a shared resource (a database, an external API, the system clock).
**You need this when:** a test passes locally but fails in CI, or fails intermittently for no apparent reason.
**Reading:** any introductory testing guide's section on "flaky tests" — search your test framework's own docs (e.g. pytest, Jest) for "test isolation."

### 3. Coverage vs. quality
100% line coverage with assertions that don't actually check behavior is worse than 70% coverage with meaningful assertions — coverage tells you what ran, not what was verified.
**You need this when:** a coverage report looks good but bugs keep escaping to production anyway.

### 4. Readability/testability tradeoffs
Code that's hard to test (tight coupling, hidden side effects, global state) is usually also hard to reason about. Dependency injection and pure functions make both problems better at once.
**You need this when:** you find yourself writing elaborate test setup/mocking just to test one function — that's often a signal the function's design, not the test, needs to change.

### 5. Documentation-as-code principles
Comments rot as code changes; docstrings that describe intent (not mechanics) age better. Self-documenting code (good names, small functions) needs the least of either.
**You need this when:** deciding whether a piece of code needs a comment, a docstring, or just a better name.

### 6. Quality metrics interpretation
Flaky test rate, defect escape rate, and coverage trend each tell you something different — flaky rate about test reliability, escape rate about test effectiveness, coverage trend about whether new code is being tested at all.
**You need this when:** you're P5+ and need to find a real testing gap using data instead of a hunch.

### 7. Organizational testing strategy tradeoffs
Full integration environments catch more but cost more to run and maintain; contract testing catches less but scales across many services cheaply. Neither is universally right.
**You need this when:** you're P6/P7 setting a testing standard that several teams have to actually be able to afford.

---

## PF 2 — Debugging & Observability

### 8. Systematic debugging methods
Bisection (binary search over commits or inputs) and log correlation turn "where's the bug" into a series of yes/no questions instead of a guess.
**You need this when:** you're stuck on a bug in code you didn't write, with no obvious starting point.
**Reading:** any "scientific debugging" or "systematic debugging" guide — the core idea (form a hypothesis, test it, narrow the search space) is language-agnostic.

### 9. Symptoms vs. root cause
The error message is usually the symptom; the root cause is what actually produced it, often several steps upstream.
**You need this when:** a "fix" keeps needing to be re-applied — that's a sign only the symptom was addressed.

### 10. Observability fundamentals
Logs tell you what happened at a point in time; metrics tell you trends and aggregates; traces tell you how a request moved through multiple services. Using the wrong one wastes time.
**You need this when:** deciding how to instrument a new piece of code, or which tool to reach for during an investigation.

### 11. Baseline literacy
You can't recognize "this metric looks wrong" without knowing what "normal" looks like for your system first.
**You need this when:** onboarding to a new team's dashboards — spend real time just watching them before an incident happens. This is exactly the habit Guided Exercise 2b is built to practice.

### 12. Domain and system-boundary literacy
Knowing what's genuinely your team's responsibility vs. a related team's (or the client's own internal team's) vs. clearly out of scope, so you neither over-escalate simple things nor overreach into someone else's domain.
**You need this when:** you're P5+ and a cross-service issue lands on your desk — the first judgment call is "is this actually mine," which on a client engagement also means knowing what's in scope of the statement of work vs. the client's own team's system.

### 13. Incident response process
A shared process (severity levels, who gets paged, when to write a postmortem) means an incident doesn't require inventing a process under pressure.
**You need this when:** you're on call, or leading incident response at P7 scope.

### 14. Alerting design principles
An alert should be actionable (someone needs to do something) or it's noise. Too much noise trains people to ignore alerts, including the real ones.
**You need this when:** proposing a new alert, or auditing why a team ignores its own paging.

---

## PF 3 — Software Design & Architecture

### 15. Core design patterns
Layering, dependency inversion, adapter/facade — a shared vocabulary for common structural problems, so "let's add a layer here" means the same thing to everyone in the room.
**Reading:** "Design Patterns" (Gang of Four) for the classics, or a modern language-specific guide for how they show up in your stack.

### 16. Coupling and cohesion
High coupling (everything touches everything) means small changes ripple widely; low cohesion (a module does unrelated things) means the module is hard to reason about as a unit. Good design minimizes the first and maximizes the second.
**You need this when:** a "small" change keeps requiring edits to files that seem unrelated.

### 17. Bounded contexts / domain boundaries
Where one service's responsibility ends and another's begins — the model from Domain-Driven Design for keeping systems decomposable as they grow.
**You need this when:** you're P4+ scoping a change that touches more than one service, or P7 defining how services should relate at all.

### 18. Abstraction vs. premature generalization
Abstracting for variability that doesn't exist yet (YAGNI violations) costs as much as not abstracting for variability that does exist. The judgment is knowing which situation you're in — including the judgment of working within a client-mandated stack constraint rather than generalizing your way around it (see Guided Exercise 7).
**You need this when:** deciding whether to build a generic interface now or wait for a second real use case.

### 19. Data flow and system interaction modeling
Sequence diagrams and architecture diagrams are how a design gets communicated and reviewed — a design that only exists as code is hard for anyone else to evaluate before it's built. In a client-facing engagement, this diagram is also often the artifact a client engineer needs for a handoff-ready design doc (see the PF 3 portfolio requirements' "handoff-ready" clause at P5).
**You need this when:** writing an RFC or design doc for anything beyond a single-function change.

### 20. Organization-wide architecture governance
RFC processes and architecture review boards are how a technically correct design actually gets adopted across teams that don't report to the same person.
**You need this when:** you're P6/P7 and a good design isn't enough — you also need buy-in.

---

## PF 4 — Security

### 21. OWASP-class vulnerability categories
Injection, broken authentication, sensitive data exposure, and similar named categories give you a vocabulary for naming a risk instead of just feeling uneasy about it.
**Reading:** OWASP Top 10:2025 (owasp.org/Top10/2025/) — verified via WebSearch, 2026-08-03: this is the current released edition (finalized January 2026, first update since 2021), keeping Broken Access Control at #1 and adding Software Supply Chain Failures and Mishandling of Exceptional Conditions as new categories. If reading this note well after 2026-08-03, re-check owasp.org for a newer edition before treating this link as current.

### 22. Principle of least privilege
Give a user, service, or process only the access it actually needs, nothing more — the default assumption behind most access-control design.
**You need this when:** designing any new permission, role, or service-to-service credential.

### 23. Secure-by-default design
Systems should fail closed (deny by default) rather than fail open (allow by default), and should have more than one layer of defense so a single mistake isn't catastrophic.
**You need this when:** designing error handling or fallback behavior for anything security-relevant.

### 24. Threat modeling basics
Who's the attacker, what do they want, what's the blast radius if they get it — a simple framing that turns "is this secure" into an answerable question.
**You need this when:** you're P4+ reviewing a design, or P7 hunting for the threat standard tooling misses.

### 25. Data classification and handling
Not all data is equally sensitive — PII, credentials, and secrets need handling rules that ordinary application data doesn't. In a services context this extends to client IP and confidential business data: what a client's engagement contract permits you to store, log, paste into an AI tool, or move between one client's environment and another's.
**You need this when:** designing storage, logging, or any place data flows through the system — most real incidents trace back to data handling, not exotic exploits. Also applies whenever you're deciding what's safe to paste into an AI coding tool, or whether a pattern/snippet learned on one client engagement is safe to reuse on another.

### 26. Organizational security governance
Compliance frameworks and incident disclosure processes exist because "we'll figure it out if it happens" doesn't survive an enterprise client's security audit.
**You need this when:** you're P6/P7 setting strategy that has to hold up under external scrutiny — ties directly to LFT's enterprise credibility bar (see `my-role.md`).

---

## PF 5 — AI-Assisted Engineering

### 27. Prompt engineering fundamentals
Context window management, few-shot examples, and structured output requests turn "ask the AI and see what happens" into a repeatable, explainable process.
**You need this when:** you find yourself re-explaining the same context to an AI tool every time — that's a sign to build a reusable prompt pattern.

### 28. AI tool capability boundaries
Every AI coding tool is better at some tasks than others in your specific stack — knowing the boundary tells you when reaching for the tool is worth it. In a multi-client services setting this also means knowing which tool is actually approved for a given client's engagement — approval, and what data can be sent to the tool, can differ by client contract, not just by team.
**You need this when:** deciding whether to use AI assistance for a given task at all, not just how to use it — and, before that, confirming the tool is the one approved for the client you're currently working for.

### 29. Review parity principle
AI-generated code gets exactly the same review bar as human-written code — no rubber-stamping because it "came from AI," and no reflexive distrust either.
**You need this when:** you notice yourself reviewing AI-assisted PRs faster (or slower) than equivalent human-written ones for no good reason. On a client engagement, review also has to catch AI-suggested code that quietly imports a pattern, dependency, or license from a different client's codebase or from outside the approved toolchain.

### 30. Workflow measurement
Usage metrics (how much AI tooling is used) and outcome metrics (whether delivery actually got better) are different things — usage can go up while outcomes stay flat or worsen.
**You need this when:** you're P6/P7 reporting on AI adoption — pick the metric that answers "did this help," not "did people use it."

---

## PF 6 — AI Judgment & Feature Delivery

### 31. Probabilistic vs. deterministic behavior
Traditional code either works or doesn't for a given input; AI model output varies probabilistically even for similar inputs. This changes what "testing" means.
**You need this when:** you catch yourself applying a unit-test mental model ("does it return the exact right answer") to something that should instead be evaluated for a distribution of acceptable outputs.

### 32. Common LLM failure modes
Hallucination (confidently wrong output), overconfidence (no calibrated uncertainty), context loss (forgetting earlier instructions), and prompt injection (untrusted input hijacking behavior) are the failure modes an eval suite should specifically target.
**You need this when:** designing an eval suite — each failure mode needs its own test cases, since they fail in different ways.

### 33. Eval design principles
An eval set that only covers easy, obvious cases gives false confidence, the same way a weak unit test suite does. Good evals specifically probe the failure modes above.
**You need this when:** you're P4+ shipping an AI-powered feature and need to know what "tested" actually means for it.

### 34. Rollback and feature-flag practices for AI features
AI feature failures are often gradual and statistical (accuracy drifting down) rather than a hard crash, so rollback triggers need a measurable threshold, not just "if it breaks."
**You need this when:** defining what would actually make you turn an AI feature off.

### 35. Responsible-AI practice at organizational scale
Governance that measures AI adoption by business outcomes, not usage counts, and treats failure-mode documentation as mandatory, not optional.
**You need this when:** you're P6/P7 setting standards that need to survive contact with real incentives (teams wanting to show usage numbers regardless of impact).

---

Before returning:
- [x] One section per Required Knowledge item across all 6 standards (35 total)
- [x] Each section answers "why do I need to know this?" via "You need this when:"
- [x] External links: the two most load-bearing links (Fowler TestPyramid, OWASP Top 10) verified reachable/current via WebSearch on 2026-08-03; remaining links are stable-reference-by-training-knowledge and flagged as not individually re-verified this session
- [x] File written to disk
