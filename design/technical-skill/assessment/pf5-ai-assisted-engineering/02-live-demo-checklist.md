# PF 5 — AI-Assisted Engineering: Live Demo Checklist

**Used when:** technical interview (this PF is workflow-habit-based, so the "demo" is a structured walkthrough conversation plus a short live task, not a pure coding exercise).
**Covers:** P2, P3, P4 (P5–P7 are assessed via portfolio — see `03-portfolio-requirements.md`).

**For the candidate:** the badge at each level (see `../badges.md`) requires this checklist plus the paired PR bundle in `01-code-review-rubric.md` — neither instrument alone is sufficient, since workflow habits need to show up both live and in real history. If your current client contractually bans AI tooling for more than one review cycle, making P2/P3 evidence unearnable in normal work, this badge is marked "blocked — assignment-limited" per `../badges.md` §1.7, not failed — talk to your manager about tracking reassignment or an agreed alternate.

## Scenario: P2 — Review-before-commit habit

**Setup:** Ask the candidate to use an AI coding tool live to draft a small function, then narrate their review process before "committing." 15 minutes.

**Checklist:**
- [ ] Reviews the AI output line-by-line rather than accepting it wholesale
- [ ] Can point to something they'd change or double-check before shipping it
- [ ] Doesn't treat the AI suggestion as automatically correct
- [ ] Uses a company-approved AI tool for the exercise (or, if asked, can state which tools are approved) rather than treating "any AI tool" as interchangeable with client work

**Prompts:** "What would make you not trust this output and dig deeper?" / "If this were client code under an NDA, what would you need to check before pasting anything into this tool?"

**Scoring:** pass/follow-up/fail. **Time budget:** 5 min setup, 10 min task + discussion.

---

## Scenario: P3 — Prompting pattern walkthrough

**Setup:** Ask the candidate to describe (or demonstrate) their prompting approach for a recurring task type they do often — test writing, debugging, or code generation. 15 minutes.

**Checklist:**
- [ ] Describes a repeatable, explainable pattern — not "I just ask and see what happens"
- [ ] Can give a concrete example of the pattern applied to a real task
- [ ] Describes a time they caught a hallucinated or incorrect suggestion using this pattern

**Prompts:** "Walk me through exactly what you'd type, step by step, for [task]."

**Scoring:** pass/follow-up/fail. **Time budget:** 15 min discussion.

---

## Scenario: P4 — Full-lifecycle integration walkthrough

**Setup:** Ask the candidate to walk through how they use AI tooling across a recent feature, end to end — coding, testing, debugging, documentation, review. 20 minutes.

**Checklist:**
- [ ] Names at least 3 of the 5 lifecycle stages where they used AI tooling deliberately
- [ ] Describes holding AI-generated code to the same review bar as their own hand-written code
- [ ] Can describe a case where they chose not to use AI tooling, and why
- [ ] Can describe how they'd ramp AI tool use into a newly-onboarded, unfamiliar client codebase (client's own AI tooling rules, sensitivity of the code) rather than assuming their prior client's norms carry over
- [ ] Can describe a case where a client's contract restricted or prohibited AI tool use, or required disclosure of AI-assisted work, and how they handled it

**Prompts:** "Where in this lifecycle do you trust AI output least, and why?" / "Tell me about a case where a client's rules on AI tool use differed from your default — what did you do?"

**Scoring:** pass/follow-up/fail. **Time budget:** 20 min discussion.

**Badge:** clearing this scenario plus the paired rubric bundle earns **TS-5-P4 (Full-Lifecycle AI Integrator)** — see `../badges.md`. Per `../badges.md` §1.1, sign-off requires the technical verifier (engineer ≥ P5) **plus the candidate's delivery/account manager as co-signer**, confirming the per-client tool-discipline claims reflect real engagement constraints.
