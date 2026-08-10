## TSD S-0003.04 — Understand the status legend  (PRD §S-0003.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Static legend rendered as part of the badge detail page (no dedicated data endpoint — content is fixed, not DB-sourced). |
| Data / State | none |
| Behavior | Badge detail page always renders exactly 3 legend entries in a fixed order: 🟢 Earned-eligible, 🟡 Blocked-assignment-limited, ⚪ Not-attempted, each with a one-line explanation, regardless of which badge is being viewed. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (legend content/order is constant) / integration (two different badge detail pages → identical legend markup) |
