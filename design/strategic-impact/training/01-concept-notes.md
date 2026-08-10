# Strategic Impact — Concept Notes

One section per Required Knowledge item in `../standard/1-business-acumen-strategy.md`. This is not a tutorial — it's the minimum theory to make the guided exercises and autonomous projects make sense. All eight Required Knowledge items are covered (none deferred — this run is whole-ladder).

**Link verification note:** the two contract-economics and roadmap-prioritization links below were checked via live WebSearch this session and are current as of 2026-08-03. The remaining links (business model literacy, staff-engineer influence patterns) are well-established references from training knowledge and were **not** re-verified by search this session — flagged here explicitly rather than presented as freshly checked.

---

## 1. Client business model literacy

**Why it matters:** LFT is a services company — it doesn't own the product P&L its engineers build against. "Understanding the business" here means understanding the *client's* revenue drivers, cost structure, and market position, not LFT's. An engineer who can recite LFT's own strategy but can't say how the client makes money hasn't actually connected their domain to a business — they've memorized an internal slogan.

**The core idea:** every feature, bug, and architecture decision either helps or hurts something the client actually gets paid for. A checkout-flow bug isn't just "a bug" — it's lost revenue on the specific mechanism that generates the client's income. Learning to ask "what does this client actually sell, to whom, and how do they make money on it" before evaluating a technical decision is the whole skill.

**You need this when:** you're asked (P2) what the product does for its users, or (P3+) how your domain contributes to the client's business goals — and any time a technical tradeoff (performance vs. cost, buy vs. build, scope vs. deadline) needs a business-relevant reason attached to it, not just a technical one.

**Further reading (unverified this session):** Alexander Osterwalder's Business Model Canvas — the standard vocabulary for revenue streams, cost structure, and customer segments (strategyzer.com/canvas).

---

## 2. Contract-economics literacy

**Why it matters:** at a product company, "business model" means how the company makes money from its product. At a services company, it means something additional and specific: how *LFT* makes money from *this engagement* — and that changes what a "good" engineering decision looks like. Gold-plating a feature is a margin problem on a fixed-bid contract and a non-problem (or even a revenue opportunity) on T&M. An engineer who doesn't know which one they're on will give confidently wrong advice about scope.

**The core idea:**
- **T&M (Time & Materials):** the client pays for actual hours/effort. Flexible scope, but the client bears cost-overrun risk, and the vendor's revenue scales with hours billed — which makes "efficiency" politically complicated (it can look like it shrinks your own billable time) and makes trust-building the actual lever for renewal.
- **Fixed-bid:** the vendor commits to a scope for a set price. Margin is made or lost based on how efficiently the committed scope is delivered. Scope creep directly eats margin — every "just one more thing" is a real cost to LFT, not a free favor.
- **Utilization** — the fraction of a person's billable time actually billed to client work — is the underlying health metric this whole model runs on. An engineer's technical decisions (how much time is spent gold-plating vs. shipping, how much rework a decision causes) show up in utilization even when nobody says the word out loud.

**You need this when:** any time you're about to over-engineer, under-scope, or say yes to "just one more thing" without checking what contract you're actually on. This is the concept most engineers new to a services business get wrong first — it's normal to have never had to think about it at a product company. It's also literally the P3 checklist item: "is this engagement T&M or fixed-bid, and does that change how you scope your own work" is a real, factual question with a real, factual answer specific to your engagement, not a hypothetical.

**Further reading:** [Time and Materials vs Fixed Price: Which One to Choose](https://www.eliftech.com/insights/time-and-materials-vs-fixed-price/), [itCraft: T&M vs. Fixed Price pros and cons](https://itcraftapps.com/blog/fixed-price-vs-time-and-materials-contract-the-pros-and-cons/) — both checked live via WebSearch this session (2026-08-03).

---

## 3. Company and engineering strategy literacy

**Why it matters:** "explain the organization's engineering strategy" (P3 PC) is meaningless if there is no real strategy to explain — the PC is testing whether you know the *actual* stated strategy, not whether you can generate a plausible-sounding one. LFT's real strategy lives in named, dated documents, not folklore.

**The core idea:** go read `../../my-role.md` and `../../goals/company-okr-2026.md` before attempting this competency's P3+ items. These name the actual HLOs (High-Level Objectives) and the strategic priorities (AI + AWS capability, delivery excellence at scale) the company is actually running against this year. "Engineering strategy" at LFT right now is not abstract — it is a specific, named set of commitments with owners.

**You need this when:** the P3 conversation asks you to explain engineering strategy in your own words (not recite it), and the P4 PC asks you to participate in a discussion about what that strategy implies for your specific team. You cannot do either from a generic idea of "what companies usually say."

**Further reading:** no external link — this is internal-only. See `../../goals/company-okr-2026.md` and `../../my-role.md`.

---

## 4. Market and competitive awareness

**Why it matters:** the P5 PC ("connect domain, strategy, and market trends to a real decision") and the P6 PC ("recognize a differentiator relative to alternatives the client is weighing") both collapse into unfounded opinion without this. The relevant "market" here is framed around the *client's* alternatives — other vendors, an in-house build, a different technical approach — not LFT's own market position as a company (that's a business-development concern, outside this competency's scope).

**The core idea:** every client chose LFT over some alternative, and could choose an alternative again at renewal. Understanding what that alternative would look like — a competing vendor's typical approach, what an in-house team would likely build, what a different technical strategy would cost or save — is what lets an engineer say something differentiated ("here's why our approach beats what you'd get from X") rather than something generic ("we did a good job").

**You need this when:** advising a client on a build-vs-buy decision, a vendor comparison, or any moment where "why LFT's approach, and not the alternative" needs a real answer instead of loyalty-flavored opinion.

**Further reading:** no single canonical external source for this — it's role-specific literacy built by paying attention to client conversations and account-lead debriefs, not by reading a framework.

---

## 5. Product management fundamentals

**Why it matters:** from P4 up, the standard assumes an engineer can *participate in*, not just observe, the client's product conversations — as an advisor, not the product owner. Without basic PM vocabulary (roadmap structure, prioritization criteria, feature-evaluation tradeoffs), "participate in roadmap feedback" turns into silently nodding in a meeting.

**The core idea:** a roadmap is a sequenced set of bets under uncertainty, not a wishlist. Prioritization frameworks (RICE — Reach, Impact, Confidence, Effort; ICE — Impact, Confidence, Ease) exist to make competing bets comparable on the same footing instead of "whoever argues loudest wins." An engineer doesn't need to run these frameworks themselves — they need to understand the logic well enough to contribute a real input (e.g. an accurate Effort estimate, or a Confidence caveat grounded in technical risk) rather than a vague opinion.

**You need this when:** the P4 PC asks for documented roadmap feedback, and the P5 PCs ask for regular roadmap participation and feature evaluation/creation with the client's product team as a technical advisor.

**Further reading:** [RICE vs ICE: Which Prioritization Framework Should You Use?](https://www.productlift.dev/blog/rice-vs-ice/), [monday.com: Product prioritization frameworks guide](https://monday.com/blog/rnd/product-prioritization-frameworks/) — both checked live via WebSearch this session (2026-08-03).

---

## 6. Account growth and farming awareness

**Why it matters:** this is the services-company analogue of "product opportunity" recognition. At a product company, a P4+ engineer might spot a feature opportunity that grows usage; at a services company, the equivalent move is spotting scope expansion, a cross-sell of an adjacent LFT capability, or additional work the client would genuinely value — and knowing this is a legitimate, expected part of the job from P4 up, not overreach into sales territory.

**The core idea:** "farming" an account means becoming the kind of trusted advisor a client renews and expands with, because the advice given consistently serves the client's interest, not just LFT's billing. This only works if the opportunity-spotting is genuine (the client would actually value it) — a growth suggestion that's really just upselling for its own sake damages the trust the whole model depends on. The engineer's job is to *notice and raise* these opportunities to the account lead/manager, not to sell them personally.

**You need this when:** the P4 PC asks you to "spot and raise a potential expansion or improvement opportunity... even if it isn't acted on" — this is explicitly scored on a good-faith basis (per the rubric) when no real opportunity arose during the period, but it is not optional to *notice* when one does.

**Further reading:** no single canonical external source — this is an internal, services-business-specific skill; the best available training is shadowing an account lead's client conversations.

---

## 7. Organizational influence without formal authority

**Why it matters:** from P5 up, the standard's verbs shift to "collaborate," "lead," and "influence" — none of which mean anything in the abstract. They mean something specific inside LFT's actual decision-making structure, and something separately specific with a client counterpart who does not report to you and never will.

**The core idea:** two distinct skills live under this one heading. (1) Internal influence at LFT: knowing who actually has to agree before an engineering strategy decision sticks, and how the Staff Manager/EM network actually gets alignment (see `../../goals/idp/idp-process.md` for a live example of influence-without-authority in action — the IDP rollout itself). (2) Client-facing advisory influence: shaping a client's technical direction as a trusted advisor while explicitly not owning their roadmap or P&L — a boundary the standard is careful to draw at every level ("advisor, not owner").

**You need this when:** P5's "contribute to organizational strategy work, when invited" and P6's "lead a cross-team strategic effort that achieves alignment" both require you to already know how alignment actually gets built at LFT, not guess at it from first principles.

**Further reading (unverified this session):** staffeng.com's "Staff Archetypes" essays describe influence-without-authority patterns generically (not LFT-specific) — useful as a mental model, not a description of LFT's actual process.

---

## 8. Strategic communication

**Why it matters:** this is the throughline connecting every level in this PF. The competency is fundamentally about translating between "what the code does" and "why it matters to the client's business" — in both directions. A P2 explaining product utility, a P4 explaining a contract-economics-informed decision, and a P7 leading an org-wide alignment effort are all doing the same underlying move at different scope: translating technical reality into business-legible language, and business goals into technical implications.

**The core idea:** the failure mode at every level is the same — staying in one register. Staying purely technical ("we refactored the service layer") loses the business audience. Staying purely business-speak without technical grounding loses credibility with engineers and produces advice that doesn't survive contact with the actual system. The skill is fluently moving between both, in the same conversation, for the same audience.

**You need this when:** literally every exercise and project in this training folder — this is the one Required Knowledge item with no single exercise that isolates it, because it's the connective tissue across all of them, not a standalone skill to practice separately.

**Further reading:** no single canonical source — the most direct practice is writing the same decision up twice, once for an engineering audience and once for a client-exec audience, and comparing what changed.
