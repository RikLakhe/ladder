# Delivery — Concept Notes

One section per Required Knowledge item across both standards (12 total: 7 from PF 1 — Incremental Value Delivery, 5 from PF 2 — Self-Organization). Not a tutorial — just enough theory to apply the Performance Criteria correctly, and to understand *why* the redesigned assessment now asks for a bundle/cycle rather than a single example (see `00-learning-path.md` for what changed and why). None of these sections are level-gated — a P2 and a P6 candidate read the same theory; what differs is the scope of evidence expected, not the underlying concept.

**Session note:** WebSearch/Chrome browsing was unavailable when these notes were written. External links below point to well-established, generally stable references from training knowledge; treat them as **unverified this session** and confirm they still resolve before publishing this file more broadly.

---

## 1. Incremental delivery principles (PF 1)

Small, shippable increments reduce risk versus big-bang delivery: each increment surfaces feedback and problems early, when they're cheap to fix, instead of all at once at the end. A task that can't ship incrementally hides its risk until the last moment.

**Why the redesigned rubric wants ≥5 connected tickets, not one:** a single well-sized ticket proves you can size *that* ticket. A ≥5-ticket bundle from one delivery unit proves sizing is a repeatable pattern, not a lucky example — which is what `DL-1-P2`/`DL-1-P3` actually certify.

**You need this when:** you're asked "why does this need to be split?" and "it's faster to just do it all at once" isn't a real answer — it's a sign the risk hasn't been thought through yet.

**Further reading (unverified this session):** Shape Up, by Ryan Singer (Basecamp) — https://basecamp.com/shapeup — especially the chapters on appetite and scope-cutting.

## 2. Task/epic sizing heuristics (PF 1)

Without a shared vocabulary for "well-sized," sizing conversations become subjective arguments instead of a teachable skill. Useful heuristics: a task should be completable and reviewable within one focused work session; if you can't state its "done" condition in one sentence, it's probably not sized yet.

**You need this when:** you're resizing a task during planning and need to explain, not just assert, why the original size was wrong.

## 3. Dependency mapping (PF 1)

Unnoted dependencies are one of the most common causes of missed deadlines — not because the work was hard, but because something else had to finish first and nobody flagged it. Mapping dependencies means explicitly naming what this task needs from elsewhere, and what elsewhere needs from this task.

**Why the redesigned rubric checks ticket timestamps, not your account:** a dependency flagged in a ticket comment *before* work started is verifiable evidence; a dependency you remember flagging is not. This is why `01-work-product-review-rubric.md` explicitly says "reviewer checks ticket history/timestamps, not the candidate's account."

**You need this when:** you're about to start a task and haven't yet asked "what does this block, and what blocks this?"

## 4. Decision-making under uncertainty (PF 1)

"Dealing with Ambiguity" specifically requires knowing when to act despite an incomplete picture — this is a decision-theory skill (when does more information stop being worth the wait?), not just nerve. A documented rationale turns a guess into a defensible decision someone else can evaluate later.

**You need this when:** you don't have full information and waiting for it would cost more than the risk of being wrong.

## 5. Risk categorization (PF 1)

Not all ambiguity is equally dangerous. Some unknowns are cheap to resolve (ask someone, five minutes) and some are expensive to leave unresolved (a wrong architectural assumption discovered in week 3). Senior engineers triage which is which instead of treating all uncertainty the same.

**You need this when:** you have multiple open questions and need to decide which one actually needs answering before you can safely proceed.

## 6. Organizational strategy alignment (PF 1)

P5+ "fostering priority-setting aligned with organizational strategy" requires actually knowing what that strategy is, not just having good instincts about what feels important. See `../../my-role.md` and `../../goals/company-okr-2026.md` for the current strategic frame this should trace to.

**You need this when:** you're setting or defending a team's priority order and need to connect it to something beyond "this felt more urgent."

## 7. Preventative process design (PF 1)

P7's "installs preventative measures" is a systems-thinking skill distinct from solving the immediate case — it means root-causing a recurring problem instead of patching each instance separately.

**You need this when:** the same kind of dependency conflict or delay keeps recurring across different initiatives, and patching each occurrence individually isn't making the pattern stop.

## 7a. SOW / change-request discipline (PF 1)

A Statement of Work fixes scope, and often price, before the engineer sees the ticket. That means a task that looks oversized or badly-prioritized isn't always a pure engineering call to fix — resizing it, or absorbing a client's added request into it, can change what's billable or blow a fixed-bid estimate. The discipline is routing anything outside the agreed scope through a change request rather than quietly doing the extra work. This is also why several P4/P6 badges (`DL-1-P4`, `DL-1-P6`) require a delivery/account-manager **co-signer**, not just a technical verifier — a claimed "the client asked for this extra scope and I handled it as a change request" story is exactly the kind of claim a purely technical reviewer can't independently confirm.

**You need this when:** a client asks for "just one more small thing" mid-ticket, or a task you're sizing turns out to map to a specific SOW line item.

## 7b. Engagement ramp-up and transition (PF 1)

Services engineers size and sequence work on codebases and domains they didn't build, on a timeline set by the client's need, not their own onboarding pace. Fast, structured ramp-up (reading existing docs, pairing, tracing a request end-to-end) is part of doing this competency well, not a prerequisite to it. The same applies in reverse at engagement end — handoff and knowledge transfer to a client team or a new LFT rotation is part of finishing the work, not an afterthought. Ramp periods are also an explicitly allowed source for a delivery-unit bundle (`01-work-product-review-rubric.md` lists "engagement ramp period" alongside sprint/epic slice).

**You need this when:** you're picking up a task on a codebase you've been on for under a few months, or your engagement is winding down and someone else needs to pick up where you left off.

## 8. Commitment reliability principles (PF 2)

Consistent delivery builds trust and predictability for a team — this is why "daily conversation about progress" matters even when nothing is wrong, not just when something is. Silence gets read as either "nothing to report" or "something's being hidden," and teams default to the worse interpretation over time.

**Why the redesigned rubric wants a full 2–4 week cycle, not a good week:** one strong week doesn't distinguish a sustained habit from a temporary effort spike right before a review. `DL-2-P2`/`DL-2-P3` certify a pattern across a full cycle specifically because that's what actually predicts reliability going forward.

**You need this when:** you're tempted to skip a status update because there's "nothing new to say."

## 9. Escalation versus anticipation (PF 2)

Escalating after an issue is a problem is reactive; communicating it before it requires escalation is the P3→P4 delta. The skill is recognizing early signals that something is escalation-worthy before it becomes urgent, not just reacting faster once it is.

**You need this when:** you notice something that *might* become a blocker and are deciding whether it's worth flagging yet.

**Further reading (unverified this session):** Shape Up's concept of a "circuit breaker" (a fixed point where a team-lead-level check-in happens regardless of status) — https://basecamp.com/shapeup — a concrete illustration of built-in anticipation rather than ad hoc escalation.

## 10. Cost/value tradeoff frameworks (PF 2)

"Weighing cost against value" is a vague instruction without a concrete framework to apply it with. Useful lenses: opportunity cost (what else could this effort have gone toward), cost of delay (what does waiting actually cost), and sunk-cost awareness (not continuing something purely because of what's already been spent).

**You need this when:** you're choosing between two valid options and "which one is more valuable relative to what it costs" is the actual question, even if nobody's phrased it that way yet.

## 11. Stakeholder expectation-setting (PF 2)

Clarifying scope and timeline upfront prevents downstream conflict — this is a preventative communication skill, not a reactive one. P5's "clarify delivery expectations... before a project starts" means the conversation happens before commitments are made, not after something's already gone wrong.

**You need this when:** a project is starting and the people outside your team don't yet have a shared, explicit understanding of what "done" and "on time" mean for it. On a client engagement, this conversation is usually with a client PM or account manager, and "done"/"on time" should trace back to what the SOW actually says, not an assumption.

## 12a. Navigating externally-imposed process constraints (PF 2)

On many engagements, the client — not LFT, and not the engineer — sets the ceremonies, the ticketing tool, and the reporting cadence. Self-organization here isn't about designing the ideal process; it's staying proactive and reliable inside someone else's process, and knowing when and how to raise something to your LFT lead versus the client stakeholder directly. If a client's process doesn't naturally produce a dated, exportable status record, flag this early with your delivery lead — assembling a cycle-record bundle from a client's own tooling may need the §1.5 in-place attestation path described in `badges.md`, not a workaround the engineer invents alone.

**You need this when:** the client's standup, tool, or reporting format doesn't naturally surface something you'd normally flag — you still have to find a way to communicate it, not wait for the process to catch it.

## 12. Roadmap management at scale (PF 2)

P6/P7 are managing portfolios of commitments, which requires different thinking than tracking a single project — dependencies, risk, and capacity all have to be reasoned about in aggregate, not one at a time.

**You need this when:** you're responsible for more concurrent commitments than you can hold the full detail of in your head, and need a structure (not just memory) to track them.

---

**Deferred from this run:** none — all 12 Required Knowledge items across both PFs are covered above; theory doesn't level-gate the way guided exercises do (see `00-learning-path.md`'s level-scoping note for what *is* deferred — P6/P7 guided/autonomous content, not concept coverage).
