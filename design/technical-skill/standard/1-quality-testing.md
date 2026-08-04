# Technical Skill — Quality & Testing

**Competency:** Technical Skill
**Primary Function:** 1 of 6 — Quality & Testing
**Domain classification:** Core
**Version date:** 2026-07-01

## Scope

Writing code that is testable, readable, and accounts for edge cases and errors; writing unit and higher-level automated tests aligned to the testing pyramid; and, at senior levels, auditing team testing practice and setting testing strategy across teams and the organization. Applies to every engineering role at LFT, P2 through P7. Excludes root-cause debugging of defects once they surface (see PF 2 — Debugging & Observability) and system-level architectural decisions (see PF 3 — Software Design & Architecture), though the three interact closely in daily work.

## Performance Criteria by Level

**P2**
- A practitioner at this level can: write a function with explicit edge-case and error-handling branches that a reviewer can approve without a walkthrough
- A practitioner at this level can: write a unit test for a new function using the team's test framework, with guidance from a senior engineer
- A practitioner at this level can: locate and follow an unfamiliar client codebase's existing test conventions (framework, naming, fixture patterns) instead of introducing their own, with guidance

**P3**
- A practitioner at this level can: write unit and higher-level tests unaided, covering edge cases and error paths in addition to the happy path
- A practitioner at this level can: write a docstring that explains non-obvious function intent, without commenting self-evident code
- A practitioner at this level can: onboard into a new client codebase's test suite and stack within the engagement's ramp-up window, and write conforming tests unaided
- A practitioner at this level can: build test fixtures using synthetic or masked data, never live client data, when the client's data handling terms require it

**P4**
- A practitioner at this level can: write production-ready, self-documenting code that reserves comments for non-obvious rationale only
- A practitioner at this level can: write a test suite spanning multiple testing-pyramid layers for a feature, unaided
- A practitioner at this level can: adapt their testing approach to a client's existing tooling and CI constraints (e.g. a mandated framework, a restricted CI environment) without treating those constraints as blockers

**P5**
- A practitioner at this level can: recommend a testing-pyramid-aligned fix for a gap surfaced by the team's quality metrics

**P6**
- A practitioner at this level can: propose a converged testing strategy across several teams' existing practices

**P7**
- A practitioner at this level can: set an organization-wide testing standard with a mechanism for measuring team adherence

## Required Knowledge

1. **The testing pyramid** (unit/integration/e2e proportions and rationale) — without it, engineers over-invest in slow, brittle e2e tests or under-invest in fast unit tests, and can't reason about tradeoffs when a suite gets slow or flaky.
2. **Test isolation and determinism** (why tests shouldn't depend on shared state or external services) — flaky tests erode trust in the suite faster than missing tests do, and untangling shared-state flakiness later is expensive.
3. **Coverage vs. quality** — 100% coverage with weak assertions gives false confidence; understanding the difference prevents chasing the wrong metric.
4. **Readability/testability tradeoffs** (dependency injection, pure functions vs. side effects) — code that's hard to test is usually hard to reason about; this is what makes testable design a design skill, not an afterthought.
5. **Documentation-as-code principles** (docstrings vs. comments vs. self-documenting code) — over-commenting rots as code changes; under-documenting leaves intent unrecoverable.
6. **Quality metrics interpretation** (flaky test rate, defect escape rate, coverage trend) — P5+ engineers must read these to find real gaps rather than guessing.
7. **Organizational testing strategy tradeoffs** (contract testing vs. full integration environments, when to invest in test infra vs. feature work) — P6/P7 need this to set strategy that several teams can actually afford to follow.
8. **Client-context onboarding** (rapidly reading an unfamiliar codebase's existing test conventions and quality bar rather than assuming greenfield freedom) — LFT engineers rotate across client codebases and must work within a client's existing stack and conventions, not their own preferred setup.
9. **Test data handling for client environments** (synthetic/masked fixtures vs. live client data, per client data handling terms) — using real client data in test suites or shared CI risks breaching client contracts and exposing client IP.

## Required Skills

- Proficiency with the team's test framework and CI test-running tooling
- Writing clear, reviewable PR descriptions that explain test coverage decisions
- Facilitation skills sufficient to run a team or cross-team conversation about testing strategy (P5+)
- Data literacy sufficient to read and act on quality metrics dashboards (P5+)

## Evidence Guide

**Critical aspects (non-negotiable):**
- Tests exist for new logic and cover at least one edge case and one error path, not just the happy path
- Test suite composition reflects the testing pyramid (not e2e-heavy, not unit-only where integration risk exists)
- Code and tests are reviewable without an accompanying verbal walkthrough
- Test fixtures never contain live client data where the client's data handling terms prohibit it

**Assessment methods by level:**
- P2–P3: code review rubric (PR review)
- P4: code review rubric + live demo (design a test suite live)
- P5–P6: portfolio (evidence of a team/cross-team testing improvement they drove) + live demo (facilitation)
- P7: portfolio (organization-wide standard they set) + teaching demonstration

**Work products that demonstrate this PF:** pull requests with accompanying tests, test suite design docs, quality metrics dashboards/reports, testing strategy proposals or RFCs, org-wide testing standard documents.

## Hiring Signals

- **P2:** can write a unit test for a given function live; names what a testing pyramid is when prompted; explains one edge case they'd test for.
- **P3:** independently identifies what edge cases and error paths need coverage for a given function; explains a docstring-vs-comment tradeoff.
- **P4:** designs a small test suite live, articulating which layer each test belongs to and why; discusses a time they made code more testable through refactoring.
- **P5:** describes a testing gap they identified using quality metrics and the fix they drove; can facilitate a mock conversation about a team testing standard.
- **P6/P7:** not assessed via live coding interview — see Evidence Guide (portfolio + teaching demonstration).

## Promotion Criteria

- **P2 → P3:** from needing guidance to write tests, to writing full edge-case and error-path coverage unaided.
- **P3 → P4:** from unaided single-function testing, to production-ready self-documenting code and feature-level test suites.
- **P4 → P5:** from executing testing well individually, to recommending fixes for team-wide testing gaps using metrics, not just their own code.
- **P5 → P6:** from one team's testing practice, to converging testing strategy across several teams.
- **P6 → P7:** from cross-team convergence, to setting and measuring an organization-wide standard.

---

Before returning:
- [x] Every PC: one verb, observable output, no banned verbs
- [x] PCs are level-consistent (P2 PCs don't demand P4 judgment)
- [x] Traceability: every sub-function in PF 1 (functional-analysis.md, 1.1–1.9) has ≥1 PC above
- [x] Evidence guide: each critical aspect is observable, not a mindset
- [x] Hiring signals are specific enough to use in a 60-minute interview
- [x] File written to disk
