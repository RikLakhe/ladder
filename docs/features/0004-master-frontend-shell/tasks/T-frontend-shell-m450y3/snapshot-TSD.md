## TSD S-0004.05 — Search  (PRD §S-0004.05)
| Aspect | Spec |
|--------|------|
| Interfaces | Client-side search over a denormalized index (badge_code, PF name, competency name, doc titles) built from real data (competencies/PFs) plus mock fixtures (badges/training) already loaded for the shell. No new persisted index. |
| Data / State | In-memory index built from already-fetched real + mock data; not persisted. |
| Behavior | Submitting a query returns matches with competency/PF/doc-type/title/snippet. An exact badge-code match and a partial PF-name match each return the relevant result. Selecting a result navigates to the corresponding PF page with the correct level tab. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (exact-code match ranks/returns correctly; partial-name match returns correctly; no-match returns empty, not an error) / integration (selecting a result navigates to the right PF/level) |
