# Technical Skill — Onboarding Track

For a new hire, an existing engineer newly picking up this competency, **or an existing engineer rotating onto a new client engagement's codebase and stack** — this track applies equally to all three. LFT is a services/consulting shop: getting productive fast in someone else's codebase, under someone else's conventions, is a recurring event across a career here, not a one-time first-job ramp. Re-run this track (at least Day 1 and Week 1) at the start of every new client engagement, not only at hire.

**Badge context:** by the end of Month 1, a P2 new hire should have accumulated the evidence for TS-1-P2, TS-2-P2, TS-3-P2, and be underway on TS-5-P2/TS-6-P2 (see `05-badge-reference-card.md`). None of these are awarded automatically by finishing the track — a Verifier still reviews the real artifacts produced along the way.

## Day 1

**Read:**
- `../../lft-engineering-competency-matrix.md` Section 1 "Technical Skills" and the AI Capability section — the source of truth this whole competency is built from
- Concept notes §1–4 (`01-concept-notes.md`) — testing pyramid, isolation, coverage vs. quality, testability
- `../../COMPANY-CONTEXT.md` — the stack and hiring bar they're being onboarded into (confirm with the buddy/manager which parts of the observed stack actually apply to this client engagement — it varies per team/client and isn't exhaustive)
- `05-badge-reference-card.md` — skim once so the new hire sees what "done" eventually looks like, without needing to read all 18 assessment instruments on Day 1
- The client engagement's data handling / IP agreement, NDA terms, and which AI coding tool (if any) is contractually approved for this client's codebase — do not assume the tool approved on a previous engagement carries over

**Do:** get local dev environment running, confirm access to the client/team's test framework, CI, and the AI coding tool approved specifically for this engagement. If this is a new client engagement rather than a first hire, also get a walkthrough of the codebase's existing conventions from the buddy or a client-side engineer — don't assume LFT's default style guide applies until confirmed.

**Fallback:** AI tool seat/security approval often lags behind repo and CI access, and approval is sometimes client-specific and slower to arrive than for internal projects. If the approved AI coding tool hasn't been provisioned by Day 1, don't treat same-day access as guaranteed — defer Exercise 5 (AI-assisted workflow with review discipline) until access comes through, and flag the delay to the buddy/manager so it doesn't silently block Week 1 progress.

## Week 1

**Do:**
- Guided Exercise 1 (testable code + unit tests, in a client's own conventions) with their buddy present for the review step — this produces the first real artifact toward TS-1-P2
- Guided Exercise 2 (systematic debugging) — this is the single highest-value early exercise, since debugging habits set in fast, good or bad, and doubly so when the code under debug wasn't written by anyone on the current team; produces the first artifact toward TS-2-P2
- Guided Exercise 2b (orient to an unfamiliar client's dashboard/logging tooling), paired with the buddy, if the client uses a monitoring tool the new hire hasn't used before
- Shadow one PR review from a senior engineer, specifically watching for how security and architecture concerns get raised, and how deviations from the codebase's existing (client) conventions get flagged
- If new to this client engagement specifically: spend deliberate time reading the codebase's existing conventions (naming, module layout, test style) before writing new code — this is time well spent, not a delay

**Read:** concept notes §8–20 (debugging through architecture) at whatever pace fits around the exercises above.

## Month 1

**Deliver:**
- A first real (small) task or bug fix, applying the PF 1/PF 2 habits from Week 1 — this is real work, not a repeat of the guided exercises, and is the kind of artifact a bundle for TS-1-P2/TS-2-P2 gets built from
- Guided Exercises 3, 5, and 6, interleaved with real assigned work rather than done as a solid block (Exercise 4 excluded — see note below)
- Start of Autonomous Project 1 (ship a small feature end-to-end) — doesn't need to be finished by end of month 1, but should be underway

**Note on Exercise 4 (Security checklist walkthrough):** this Month 1 track presumes a new hire joining at P2. Exercise 4's full form is gated behind the P3 → P4 transition (see `00-learning-path.md`) — PF 4's own rubric marks its P4 criteria "N/A" at P2/P3, so there's no P2/P3-appropriate full variant. A P2 hire should still do steps 1 and 4 (naming the risk, escalating if unclear) to start building toward TS-4-P2, but skip the checklist-application steps. If the new hire is joining directly at P3 or P4+, Exercise 4 in full may apply once they're at or approaching P4 — check with the buddy/manager.

**Read:** remaining concept notes (§21–35) as the relevant exercises come up, rather than all at once.

## Buddy check — 2-week check-in questions

- "Walk me through a bug you debugged this week — what was your process?"
- "Show me a PR you wrote — what edge cases did you think about, and how did you test them?"
- "Have you used the AI coding tool yet? What did you check before committing what it gave you — and did you confirm it's the tool actually approved for this client?"
- "Is there anything about how this team/client writes code that still feels unclear or arbitrary to you?" (This question is for catching tribal-knowledge gaps, not testing the new hire — treat the answer as feedback on onboarding quality, not a mark against them.)
- "Is there anything about this client's data handling or IP rules that's still unclear — what you can log, store, or paste into an AI tool?"
- "If someone reviewed your work this week against the rubrics in `../assessment/`, what's the one thing you're least sure you'd pass?" (Use this to catch a gap before it becomes a surprise at the actual assessment, not to pre-score the new hire.)
