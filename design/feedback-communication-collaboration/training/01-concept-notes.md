# Feedback, Communication & Collaboration — Concept Notes

Just enough theory to be dangerous, organized by Required Knowledge relevant to the scoped levels (P2–P5; P6/P7 culture-at-scale mechanics are covered conceptually in §11, since theory doesn't level-gate, even though the guided practice built for those levels is deferred per `00-learning-path.md`). Each section closes with "You need this when." External links below verified via WebSearch this session unless flagged otherwise.

---

## PF 1 — Feedback

### §1. What makes feedback useful (not just "nice" or "harsh")

Feedback fails for one of two structural reasons: it's too vague to act on ("good job," "this needs work"), or it's not tied to a concrete, observable instance ("you're not a team player"). Useful feedback names the specific behavior or artifact, the concrete moment it happened, its impact, and — for constructive feedback — a suggested change. This is the Situation-Behavior-Impact (SBI) shape: not a rigid script, but a check — can the receiver picture exactly what you're talking about?

The reason this matters more than it seems: vague feedback is a form of avoidance. "Good job" costs the giver nothing and the receiver gets nothing to repeat deliberately. Specific feedback requires the giver to have actually paid attention and requires a small amount of social risk (naming a real thing). That's why FCC-1-P2's bar is explicitly "explains what makes feedback useful," not "gives good feedback" — the standard recognizes that articulating the theory correctly usually precedes having a track record of doing it under real stakes.

**You need this when:** giving your first documented piece of feedback for your P2/P3 evidence bundle — before you log an instance, check it against the SBI shape, or the rubric reviewer will mark it "vague praise/criticism."

Further reading: [The SBI (Situation-Behavior-Impact) feedback model — Center for Creative Leadership](https://www.ccl.org/articles/leading-effectively-articles/sbi-feedback-model/).

### §2. Seeking feedback as a growth habit, not a compliance check

Seeking feedback is a distinct skill from receiving it well, and both are distinct from giving it. The failure mode at this level isn't "never asks" (rare) — it's asking in a way that invites only reassurance ("this is fine, right?") rather than a real signal, and then not visibly changing anything afterward. The matrix's P2–P4 bar for this row is a single combined expectation because the habit itself doesn't mature much between P2 and P4 — what matures is range (more people, more contexts) and consistency, tracked via the bundle window rather than a new behavior.

The practical unlock: ask a specific question ("what's one thing about how I ran that handoff you'd change?") rather than a general one ("any feedback?"), and always close the loop by describing, out loud or in writing, what you actually changed. The described-change is what the rubric checks — asking without evidence of using it doesn't clear "Meets P2."

**You need this when:** logging your one feedback-sought instance for the bundle — the log entry needs the ask AND the described change, not just "I asked my lead for feedback this week."

Further reading: [Radical Candor — Kim Scott](https://www.radicalcandor.com/) (the most widely cited industry model for giving and soliciting feedback; "care personally + challenge directly").

### §3. Adapting feedback for a widening audience

The behavior itself (specific, SBI-shaped, growth-oriented) doesn't change P2→P4 — what changes is who it's delivered to, and how much translation that requires. Feedback to a teammate can use shared technical shorthand. Feedback to a business stakeholder — at LFT, often a client lead or PM — needs the technical detail stripped down to the impact that matters to them, plus more care about tone, since the relationship has less accumulated trust to absorb a misstep. This is the P4 bar (FCC-1-P4): not a new feedback skill, but the same skill under a harder translation constraint and a higher social-risk context.

**You need this when:** you have feedback for a client-side stakeholder rather than an internal teammate — before delivering it, ask what technical context you're about to assume they don't have, and whether the channel (live call vs. written) matches the stakes.

(See §10 below for the matrixed-reporting concept this P4 row also depends on.)

---

## PF 2 — Communication

### §4. Audience-oriented communication as translation, not simplification

"Audience-oriented" is often misread as "dumb it down." The actual skill is translation: identifying what the audience already knows, what they need to decide or do, and reframing your content around that — sometimes adding context (for a new stakeholder), sometimes removing it (for an expert who doesn't need the backstory). The tell that someone has this skill isn't vocabulary choice, it's whether they check for understanding rather than deliver a monologue — this is exactly why the P2 live-demo checklist scores "actively checks whether the audience understood" as a separate item from "clear, concise, audience-appropriate."

**You need this when:** preparing a written or verbal sample for your bundle — before logging it, ask who the intended reader/listener was and whether you can point to a moment you checked their understanding, not just delivered information at them.

### §5. Knowledge sharing as a habit, not an event

Knowledge sharing fails quietly: someone learns something useful, mentions it once in a passing Slack message, and it's gone. The P2 bar ("share knowledge... frequently") and the P3 bar ("contribute to documentation, watching for opportunities beyond routine sharing") are both about converting perishable verbal knowledge into something durable and findable. The habit to build: in the moment you solve something non-obvious, ask "would future-me or a teammate need this again?" — if yes, write it down somewhere durable before moving on, rather than batching documentation into a separate task that competes with delivery work and usually loses.

**You need this when:** you've just solved something non-trivial (a debugging path, a config quirk, an onboarding gap) — that's the moment to write the doc, not two weeks later when you've forgotten the details that made it worth writing.

### §6. Async-first writing across a real timezone gap

LFT engineers are in Nepal/India; most enterprise clients are US-based — a 10+ hour gap. This is structurally different from most communication training, which assumes same-day reply is available. An async-actionable handoff must anticipate the reader's questions and provide enough context that they can act without a same-day reply — not because sync is undesirable, but because it's physically unavailable for most of the working day. The test: could the receiving person read this cold, with no live context, and know exactly what to do next, what's still open, and what decision (if any) is waiting on them?

The 2026-08-03 redesign promotes this from "nice to have if you're client-facing" to a P2 requirement for everyone, because the timezone gap applies to internal cross-region teammates too, not only client relationships.

**You need this when:** it's end-of-day for you and the person who needs this information won't be online for 10+ hours — that's the moment the handoff note gets written, before you log off, not "whenever I get to it."

Further reading: [GitLab Handbook — "All-Remote: Asynchronous"](https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/) (the most cited public reference for async-first, cross-timezone written communication norms).

### §6a. Client-facing tone calibration

A client-facing artifact (status update, ticket comment, escalation email) carries more social risk per word than an internal one: internal shorthand, tool/ticket names, and casual blame-adjacent phrasing ("the backend team broke this") read very differently to an external enterprise stakeholder than to a teammate who shares your context. The calibration skill is: strip internal shorthand, describe impact before mechanism, and never attribute blame to a specific team/vendor in a client-facing channel even when accurate — that's an internal escalation conversation, not a client-facing one. This is exactly what the PF2 live-demo checklist's P3+ item tests by role-playing the "audience" as a client rather than an internal PM.

**You need this when:** drafting any update a client stakeholder will read — read it back and ask "would this embarrass or expose a teammate if the client forwarded it to their leadership?"

---

## PF 3 — Collaboration

### §7. Psychological safety and healthy disagreement

Teams where people share opinions openly and disagree productively aren't teams where conflict is absent — they're teams where conflict is treated as information rather than threat. The mechanics: separate the idea from the person ("I think this approach has a gap" vs. "this is wrong"), stay curious about the other person's reasoning before defending your own, and treat a changed mind as a sign the conversation worked, not a loss. The P2 bar explicitly requires three distinct things — sharing opinions respectfully, working through disagreement in a healthy way, and being willing to change your mind — because these are three separate muscles, not one: you can be good at one and weak at another.

**You need this when:** logging your P2 disagreement-related bundle instances — you need a mind-changed instance AND a separate disagreement-worked-through instance; don't try to make one anecdote cover both.

Further reading: [Amy Edmondson — "The Fearless Organization," psychological safety framework](https://amycedmondson.com/psychological-safety/) (the most widely cited academic framework behind "disagreement as information, not threat").

### §8. Relationship-building at each level's scope

Relationship building isn't networking for its own sake — the standard scopes it explicitly by level because who you need a durable working relationship with changes as your scope changes: teammates/manager (P2), + product counterpart (P3), + relevant business stakeholders (P4), + senior engineers across the org (P5). At LFT, "product counterpart" and "business stakeholder" are very often client-side roles (a client PM, product owner, or client engineering lead), not internal-only. The skill underneath all of this is consistency — showing up reliably in small interactions over time — not one big gesture.

**You need this when:** deciding who your P3/P4 relationship-building bundle instance should be about — check the level-appropriate scope before picking someone; a P4 instance about a teammate you already had a P2-level relationship with doesn't demonstrate growth in scope.

### §9. Working inside a client's existing team structure

A services engineer embedded in a client's team faces a specific version of collaboration that a pure product-company engineer doesn't: the client already has ceremonies, tools, and conventions, and defaulting to "how LFT normally does it" instead of adapting is a collaboration failure, not a neutral choice. This shows up as small frictions that compound — using LFT's ticket terminology in a client-facing thread, proposing LFT's code-review cadence over the client's established one, or assuming your manager's authority extends into a client's team decisions. The skill is noticing whose house you're in and adapting to it, while still representing LFT's standards where it matters (quality, security, professionalism) — adapting to structure isn't the same as lowering the bar.

**You need this when:** you're newly staffed on a client engagement — before your first sprint, ask explicitly (don't assume) what ceremonies/tools/conventions the client team already uses, and log the adaptation as your PF3 P3 bundle instance.

### §9a. Multi-engagement boundary-keeping

Once staffed on ≥2 concurrent client engagements, a new failure mode appears that single-engagement collaboration training doesn't cover: context leakage. Mentioning Client A's roadmap, staffing situation, or a technical approach while working with Client B — even innocently, even when it seems generically useful — is a real risk at a services company where clients may be competitors or simply expect strict confidentiality. The skill is maintaining separate mental (and often literal, separate-login) contexts, and catching yourself before a cross-reference slips out ("we did something similar for another client" is often already too much). This is exactly why PF3 P4 added a dedicated rubric row for this in the 2026-08-03 redesign — it's a distinct, learnable discipline, not an automatic byproduct of being organized.

**You need this when:** you're handed a second concurrent client engagement — before your first week on it, set up separate notes/channels/logins if you haven't already, and treat "does this reference belong here" as a check on every cross-engagement comment before you make it, not after.

---

## Cross-cutting concepts (relevant to multiple PFs)

### §10. Matrixed feedback and reporting structures

At a services company, an engineer's day-to-day direction often comes from a client lead or PM, while their formal performance record is owned by an LFT manager who doesn't see that day-to-day work directly. This creates a structural risk: good client-side feedback never reaches the LFT record, or bad client-side friction never gets surfaced until it's a crisis. The skill (PF1 P4's matrixed-reconciliation item) is proactively relaying client-side feedback to your LFT manager yourself, rather than assuming it will get there — a monthly one-line summary ("here's what my client lead said about X this month") closes this gap cheaply.

**You need this when:** you're staffed in any matrixed reporting structure — set up a recurring, lightweight habit (not a one-time fix) for relaying client-side input to your LFT manager, and use that habit as your PF1 P4 bundle evidence.

### §11. Culture-fostering mechanics: from modeling to adoption (P5+)

Every PF's P5+ rows use "foster a culture of..." language, and the redesigned portfolio requirements are explicit and strict about what that means: self-modeling alone — you personally doing the behavior well and consistently — does not clear any culture-fostering row. The evidence has to show someone *else's* behavior changing as a result: a teammate giving feedback unprompted the way you modeled it, someone else following a documentation norm you introduced without you reminding them, a client stakeholder citing your escalation practice. This is a deliberate line in the redesigned rubric, because "I do this well" and "this spread beyond me" are genuinely different claims, and only the second is what P5+ actually means on a career ladder that's about scope, not individual excellence.

The related, newer wrinkle at P5 (PF3): coaching a *named* teammate on client-structure/multi-engagement collaboration is now explicitly distinguished from just describing your own adaptation a second time — the portfolio requirements literally flag this: "a description of the candidate's own client-structure adaptation, without a named teammate on the receiving end, does not satisfy this row."

**You need this when:** you're building P5 portfolio evidence for any of the three PFs — for every row, ask "can I name a specific other person whose behavior changed, and how do I know it changed rather than assuming it did?" If the answer is no, the evidence isn't ready yet, regardless of how good your own modeling has been.

Further reading: [Everett Rogers — "Diffusion of Innovations," adoption curve framework](https://en.wikipedia.org/wiki/Diffusion_of_innovations) (underlies the `badges.md` §1.6 adoption-evidence artifact's logic — a practice isn't "adopted" until it spreads past the innovator/early-adopter who introduced it).
