## TSD S-0003.02 — Read a badge's full detail  (PRD §S-0003.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /[competency]/[pf]/badges/[badgeCode]` — HTML page. `GET /api/badges/:badgeCode` — JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}`. |
| Data / State | Reads `badges` (read-only), looked up by `badge_code`. |
| Behavior | Renders header (badge code, name, tier, level), full certifies text, `completion_bar` verbatim as pass criterion. Verifier section shows `verifier_role`; co-signer indicator + explanatory tooltip renders only when `cosigner_required` is true, otherwise absent. Unknown `badgeCode` → explicit not-found state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (co-signer indicator presence toggles exactly on `cosigner_required`) / integration (seeded badge with `cosigner_required=true` and one with `false` → indicator present/absent correctly; unknown code → not-found, no crash) |
