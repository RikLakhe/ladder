# Delivery — Guided Exercises

5 exercises, ordered simplest to most complex. Each maps to at least one PF 1/PF 2 sub-function from `../functional-analysis.md` **and** to the badge(s) it builds evidence toward (see `05-badge-reference-card.md` for the full map). Uses the team's real backlog/ticket tool and status channel per `../../COMPANY-CONTEXT.md`.

**None of these exercises award a badge by themselves.** Completing one produces (or rehearses producing) the artifact a badge's instrument requires. The badge still needs the named Verifier's sign-off per `../assessment/badges.md` §1.3 — and for PF 1 P2/P3 and PF 2 P2–P4, that sign-off is against a **bundle** or **cycle record**, not a single exercise session. Exercises 1–4 below are explicitly designed to accumulate into that bundle/cycle as you go, not to be thrown away after the exercise ends.

---

## Exercise 1 — Assemble a delivery-unit bundle: task sizing & splitting across ≥5 real tickets (PF 1)

**Maps to sub-functions:** 1.1 [P2], 1.2 [P3]
**Builds toward badges:** DL-1-P2 (Split-Reasoning Starter) directly; extended per Exercise 2 below, feeds DL-1-P3 (Dependency-Aware Sizer)
**Instrument this rehearses:** `../assessment/pf1-incremental-value-delivery/01-work-product-review-rubric.md` — the "Task sizing for incremental delivery" row, evaluated **across the whole bundle**, not a best-case ticket

**Goal:** Build a coherent bundle of ≥5 real tickets from a single sprint, small epic slice, or engagement ramp period, each showing sizing done properly — not five disconnected best examples cherry-picked from months of work.

**Setup:** Pick, in advance, one identifiable delivery unit you're about to work — an upcoming sprint, a small epic slice, or (if newly onboarded) your ramp period. Commit to this unit *before* starting; the rubric explicitly rejects a bundle assembled retroactively from memory.

**Step-by-step:**
1. At the start of the delivery unit, identify any ticket that looks oversized for the unit's timebox. For at least one, write a one-paragraph explanation of why it should be split, *before* proposing the split — this is the P2-appropriate "explain why" behavior, and it's fine if a teammate or manager helped you see it.
2. Propose a split into 2–4 sub-tasks, each independently shippable, and record the "why" directly in the ticket (comment or description), not just in a conversation.
3. Review the split with a teammate or manager; revise based on their input, and note the input in the ticket.
4. Repeat sizing-before-starting for every other ticket you pick up during the same delivery unit, until the unit closes, so the bundle ends up with **≥5 tickets total**, not just the one oversized example from step 1.
5. Before submitting the bundle for review, check every ticket for a documented sizing rationale with a timestamp *before* work started — the reviewer checks history, not your account of what happened.

**Expected output:** a bundle of ≥5 real tickets from one delivery unit, each showing sizing done before starting the work, with at least one showing visible teammate/manager input in the ticket comments.

**Check:** could a reviewer open the bundle cold and see, from ticket history alone, that sizing happened before work started on every ticket — without you narrating it to them first? This is exactly what `01-work-product-review-rubric.md`'s pass bar checks.

**To build P3 evidence (DL-1-P3):** continue into Exercise 2 within the same bundle/delivery unit — do not start a second bundle from scratch.

---

## Exercise 2 — Dependency mapping + ambiguous-decision rationale, added to the Exercise 1 bundle (PF 1)

**Maps to sub-functions:** 1.7, 1.8 [P2–P3], 1.13 [P3]
**Builds toward badge:** DL-1-P3 (Dependency-Aware Sizer) — completes the bundle Exercise 1 started
**Instrument this rehearses:** `../assessment/pf1-incremental-value-delivery/01-work-product-review-rubric.md` — "Priority & dependency awareness" and "Decision-making under incomplete information" rows

**Goal:** Extend the same delivery-unit bundle from Exercise 1 so every ticket with a real dependency shows it flagged in advance, and at least one ticket documents a decision made despite missing information.

**Setup:** Use the same bundle and delivery unit as Exercise 1 — this exercise does not start a new one.

**Step-by-step:**
1. For every ticket in the bundle, before starting work on it, list what it needs from elsewhere (another team's API, a design decision, a dataset, a client team's sign-off or environment access) and what else is blocked on it. Note this directly on the ticket.
2. Confirm you're working tickets in the team's set priority order (PC 1.7) — note in the bundle if you ever deviated and why, since the rubric checks whether you self-selected work outside the stated order.
3. For at least one ticket in the bundle, identify a real decision you had to make despite missing information, within your own scope of work. Write the rationale in a ticket comment or PR description **at the time**, not reconstructed afterward.
4. Before submitting, re-check every ticket with a real dependency: was it flagged before work started, per the timestamp — not discovered mid-task?

**Expected output:** the same ≥5-ticket bundle from Exercise 1, now also showing dependency notes flagged before work started on every ticket that had one, and ≥1 documented ambiguous-decision rationale written at the time.

**Check:** could a reviewer confirm, from timestamps alone, that every flagged dependency predates the work starting — and that the ambiguous-decision rationale wasn't written after the fact to match how things turned out?

---

## Exercise 3 — Hold a full 2–4 week status/escalation cycle (PF 2)

**Maps to sub-functions:** 2.1, 2.2 [P2], 2.3 [P3]
**Builds toward badges:** DL-2-P2 (Daily Progress Reporter) directly; extended through the full cycle, feeds DL-2-P3 (Same-Day Escalator)
**Instrument this rehearses:** `../assessment/pf2-self-organization/01-work-product-review-rubric.md` — "Proactive progress & blocker communication" row, evaluated across the **whole cycle**, not a single good day

**Goal:** Build the proactive, unprompted daily communication habit as a sustained pattern across one continuous 2–4 week delivery cycle — not a spot-check week.

**Setup:** Pick, in advance, one continuous 2–4 week span (a sprint-and-a-half, a full month, or whatever your team's cadence naturally gives you) and commit to it as your cycle boundary before starting. Use the team's actual standup or async status channel — or, if on a client engagement with its own reporting cadence, that channel (bring both if they diverge).

**Step-by-step:**
1. For the full length of the chosen cycle, post a daily update covering: what shipped, what's in progress, and anything at risk — even when nothing is wrong. Do not skip a day because "there's nothing new" — silence is exactly what the rubric flags as a gap.
2. Deliver at least one committed task within the cycle with visible urgency (PC 2.2) — visible meaning a reviewer could point to something in the record (an early finish, a proactive status ping, a same-day fix on feedback) not just your self-assessment.
3. The first time something is at risk of slipping during the cycle, escalate it the **same day** it's identified, not at the next scheduled check-in — repeat this for every blocker/delay/cost overrun that arises during the cycle, not just the first one, since the P3 bar checks every instance, not one.
4. At the end of the cycle, export or link the full dated record (not a summary you wrote from memory) as the evidence artifact.

**Expected output:** one continuous 2–4 week status/escalation history with no unexplained gaps, and every blocker/delay/overrun that arose during the cycle escalated the same day it was identified, per timestamp.

**Check:** would a manager or peer reviewing the raw history — not your account of it — say updates were proactive throughout, and that every escalation happened the same day, not "close enough"? This is exactly what the Phase D rubric checks, and it checks dates against when the issue actually started, not when you say you noticed.

---

## Exercise 4 — Cost/value decision framework practice, inside the same cycle as Exercise 3 (PF 2)

**Maps to sub-functions:** 2.8 [P2], 2.9 [P3], 2.10, 2.11 [P4]
**Builds toward badges:** DL-2-P3 (Same-Day Escalator, cost/value half) and DL-2-P4 (Early-Warning Communicator)
**Instrument this rehearses:** `../assessment/pf2-self-organization/01-work-product-review-rubric.md` — "Cost/value tradeoff reasoning" row

**Goal:** Move from gut-feel cost/value calls to explicit, explainable reasoning, documented within the same cycle Exercise 3 is tracking — not a standalone one-off.

**Setup:** Identify one real decision arising during the same 2–4 week cycle as Exercise 3, with a genuine cost/value tradeoff (e.g. build vs. buy, fix now vs. defer, more testing vs. shipping sooner, or — on a client engagement — whether a requested addition fits the existing SOW scope or needs a change request).

**Step-by-step:**
1. Name the options and, for each, estimate the cost (time/effort/risk) and the value (what it unlocks or protects).
2. Apply one framework from concept notes §10 (opportunity cost, cost of delay, or sunk-cost check) explicitly, and name which one you used.
3. Make the call, write a 3–5 sentence rationale **at the time**, and share it with a senior engineer if you're building P2/P3 evidence (asking for help weighing cost against value is the P2/P3-appropriate behavior) — or, if you're ready for the P4 version, make the call unaided **and** suggest the same reasoning to a teammate on a decision that's theirs, not yours, within the same cycle. Both halves of the P4 row are required together, not either/or.
4. Log the decision write-up alongside the Exercise 3 cycle record — the reviewer expects it from the same span of dates.

**Expected output:** a written decision rationale, dated within the same cycle as Exercise 3's status record; at P4, also a documented instance of suggesting the tradeoff to a teammate on their own work in the same cycle.

**Check:** someone reading only the rationale (not knowing you) could follow the logic and could disagree with it on the merits, not because it's unclear. At P4: is the teammate-tradeoff instance a separate, real event from your own decision — not the same decision described twice?

---

## Exercise 5 — Under-scoped task resizing + ambiguity decision (live scenario rehearsal) (PF 1)

**Maps to sub-functions:** 1.3, 1.9 [P4], 1.14 [P4]
**Builds toward badge:** DL-1-P4 (Unaided Resizer) — **rehearsal only.** PF 1 has no rubric/portfolio backstop at P4 (see `01-work-product-review-rubric.md`'s "Covers: P2–P3" note) — the badge is earned solely through the proctored `02-live-demo-checklist.md` P4 scenario, which requires a co-signer per `badges.md` §1.1 if a client-scope-change context is claimed. This exercise rehearses that scenario; it does not itself produce badge evidence.
**Instrument this rehearses:** `../assessment/pf1-incremental-value-delivery/02-live-demo-checklist.md` — P4 scenario

**Goal:** Practice the unaided version of sizing/dependency correction, including under simulated pressure, so the real proctored scenario isn't the first time you've done this cold.

**Setup:** Have a manager or senior teammate hand you a deliberately under-scoped or vaguely-prioritized ticket, with one twist: partway through, they tell you the deadline moved up (or, if you're on a client engagement, that the client has asked for something extra that wasn't in the original scope).

**Step-by-step:**
1. Resize the ticket and correct its priority/dependency notes on your own — no help requested.
2. When told the deadline moved up (or a client scope addition lands), decide what changes about your plan and what doesn't, and state your reasoning out loud or in writing — for the scope-addition variant, explicitly decide and say whether it should go through a change request rather than be absorbed into the existing estimate.
3. Debrief with whoever ran the exercise: what would they have done differently, and how close was this to what the real live-demo checklist items ask for?

**Expected output:** a corrected ticket + a written or verbal record of the under-pressure decision and its rationale.

**Check:** did the resize and dependency correction happen without prompting, and does the pressure-decision have an explicit, defensible rationale, not just a guess made faster? Compare directly against the four checklist items in `02-live-demo-checklist.md`'s P4 scenario before treating this as "ready."
