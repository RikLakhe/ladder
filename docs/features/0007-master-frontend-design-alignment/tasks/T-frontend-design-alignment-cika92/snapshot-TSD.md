## TSD S-0007.04 — Badge Detail Correctness  (PRD §S-0007.04)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /badges/[badgeCode]` — server-rendered page. `getEvidenceForBadge` already resolves `evidence_required` entries to instrument row text; `resolved: false` entries already exist. `BadgeStatusLegend` component already exists. `cosignerRequired` already on `BadgeDetail` type. |
| Data / State | No schema changes. Evidence resolution already implemented in `src/lib/badges.ts`. |
| Behavior | Each evidence entry either renders resolved row text (inline, expandable via `<details>`) or a visible "⚠ evidence link broken" warning — never silently absent. Co-signer indicator renders if and only if `cosignerRequired` is true; tooltip text: "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency." `<BadgeStatusLegend>` renders once on the page. Badge header shows: badge_code (monospace), name, `<TierChip>` using the badge's `tier`. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: evidence array with a broken entry renders warning element, not blank. unit: co-signer indicator present when `cosignerRequired=true`, absent when false. integration: badge detail page for a seeded badge with valid evidence shows resolved row text; a badge with a broken reference shows the warning state. |

---
