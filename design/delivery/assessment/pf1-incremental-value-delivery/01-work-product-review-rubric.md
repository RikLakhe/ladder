# PF 1 — Incremental Value Delivery: Work Product Review Rubric

**Adaptation note:** the pipeline template names this file `01-code-review-rubric.md` for a code-artifact review. Delivery's work products are tickets, plans, and decision write-ups rather than code, so this instrument is retitled — same slot in the pipeline, same pass bar logic.

**Redesign note (2026-08-03):** this rubric previously accepted a scattered handful of unrelated tickets as sufficient P2/P3 evidence — closer to a checkbox quiz than a portfolio-worthy review. It now requires a **single coherent evidence bundle tied to one real delivery unit** (a sprint, a small epic slice, or an engagement ramp period) at every level it covers, so the reviewer is evaluating a demonstrated pattern of judgment on real, connected work — not three disconnected tickets cherry-picked to look good.

**Used when:** reviewing a candidate's real planning/sizing/dependency work product from a single, identifiable delivery unit they actually worked.
**Covers:** P2–P3. From P4 up, this PF is assessed via a live planning scenario and portfolio (see `02-live-demo-checklist.md` and `03-portfolio-requirements.md`) — resizing/dependency judgment under real ambiguity shows better live than in a single retrospective ticket read.

| Criteria | Does not meet P2 | Meets P2 | Meets P3 |
|---|---|---|---|
| Task sizing for incremental delivery | Cannot explain why an oversized task should be split, even when asked; bundle shows no evidence of sizing conversation | Explains why a given task should be split when asked, even if can't size independently yet; bundle includes ≥1 real ticket that was split with a teammate/manager's help, with the "why" documented in the ticket, not just recalled verbally | All tickets across the full bundle (≥5, spanning one sprint or delivery unit) show sizing done before starting the work, with input from a teammate or manager visible in ticket comments — not a single lucky example |
| Priority & dependency awareness | Works out of the team's set priority order without checking in; bundle shows no dependency notes anywhere | Works on tasks in the priority order set by the team (1.7); bundle shows the candidate followed a stated order rather than self-selecting work | Every ticket in the bundle that had a real dependency shows it flagged in the ticket **before** work started, not discovered mid-task (1.8) — reviewer checks ticket history/timestamps, not the candidate's account |
| Decision-making under incomplete information | _N/A at P2 — LFT matrix marks Dealing with Ambiguity "n/a" at this level; do not penalize for it_ | _N/A at P2_ | Bundle includes ≥1 real decision made despite missing information, within the candidate's own scope, with a documented rationale (ticket comment, PR description, or decision note) written at the time, not reconstructed after the fact |

**Pass bar:** all criteria at or above "Meets [target level]" across the **entire submitted bundle**, not on a best-case subset; no criterion below "Meets" for the level being assessed. The Dealing with Ambiguity row is excluded from the P2 pass bar entirely, not scored as a gap.

**For the candidate:**
- Bring one coherent bundle from a single sprint, small epic slice, or engagement ramp period — **not** a scattered set of your best individual tickets. The reviewer is assessing a demonstrated pattern across connected real work, so pick a period with at least 5 tickets you actually sized/worked, not a cherry-picked highlight reel.
- If you work on a client engagement, tickets tied to a SOW/fixed-bid line item or a change request are good evidence too — flag which is which.
- Make sure ticket comments/descriptions capture your sizing reasoning and any dependencies you flagged at the time, since the reviewer checks timestamps and history, not what you remember doing.
- At P2, it's fine if the split came from a teammate or manager — the bar is being able to explain why the split was needed, not sizing independently yet.
- "Done" at P3 means the *whole bundle*, not one ticket in it, shows sizing done before starting the work, dependencies flagged in advance, and a documented rationale for at least one ambiguous, in-scope decision.
- Expect a 30-minute review folded into normal review cadence — no separate prep ceremony required beyond assembling the bundle (budget ~30 minutes to pull it together if your tickets are otherwise well-documented).

**How to run this review:**
- Time: 30 minutes
- Artifacts to collect: one delivery-unit bundle (≥5 real tickets from a single sprint/epic slice/ramp period) plus any planning notes
- Who can assess: the candidate's manager or any P4+ engineer who worked with them during that period
