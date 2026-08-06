---
approved_by: "unknown"
approved_at: "2026-08-06"
approved_sha256: "768e382691776e9dd95cbe61cdfbd950a78da3683c8df9fcd5eab274b60b7bf5"
---
# TSD 0003 — Assessment / Badge Viewer
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

**Schema note:** current `badges` table has only `id, pf_id, level, name, evidence_required`; current `instruments` table has only `id, pf_id, name, rows`. This feature's stories require additional columns (`badge_code`, `certifies`, `completion_bar`, `verifier_role`, `cosigner_required`, `tier` on `badges`; a `type` and `level` on `instruments`, or equivalent) — a migration adding these (nullable/defaulted, backward compatible) is in scope for whichever task implements S-0003.01/.02.

## TSD S-0003.01 — See a badge summary in context  (PRD §S-0003.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/primary-functions/:pfId/badges` — JSON array of `{id, badgeCode, name, tier, certifies, level}` filtered by `pf_id` (+ optional `level`). Badge card renders wherever this list is consumed (PF page Badge sub-slot). |
| Data / State | Reads `badges` (read-only), filtered by `pf_id` and level. |
| Behavior | Every badge row for the requested `pf_id`/level renders exactly one card showing badge code, name, tier, a truncated certifies sentence, and a fixed Not-attempted status marker. Card links to that badge's detail route. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (truncation of certifies text; Not-attempted status always shown regardless of input) / integration (seeded badges for a pf_id/level → one card per row, none from other pf_ids/levels) |

## TSD S-0003.02 — Read a badge's full detail  (PRD §S-0003.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /[competency]/[pf]/badges/[badgeCode]` — HTML page. `GET /api/badges/:badgeCode` — JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}`. |
| Data / State | Reads `badges` (read-only), looked up by `badge_code`. |
| Behavior | Renders header (badge code, name, tier, level), full certifies text, `completion_bar` verbatim as pass criterion. Verifier section shows `verifier_role`; co-signer indicator + explanatory tooltip renders only when `cosigner_required` is true, otherwise absent. Unknown `badgeCode` → explicit not-found state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (co-signer indicator presence toggles exactly on `cosigner_required`) / integration (seeded badge with `cosigner_required=true` and one with `false` → indicator present/absent correctly; unknown code → not-found, no crash) |

## TSD S-0003.03 — Trace a badge's evidence to real instrument rows  (PRD §S-0003.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/badges/:badgeCode/evidence` — JSON array of `{instrumentId, rowKey, resolved: boolean, rowText?: string}`, one entry per element of that badge's `evidence_required`. |
| Data / State | Reads `badges.evidence_required` and `instruments.rows` (read-only), joined by `instrument_id`. |
| Behavior | For each `evidence_required` entry, looks up `instrument_id` in `instruments`, then `row_key` within its `rows`; if both resolve, returns/renders the row's text inline (expandable). If either lookup fails, marks that entry `resolved: false` and renders a visible "evidence link broken" state — the entry is never omitted from the response/render. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (resolvable entry returns rowText; entry with bad instrument_id or bad row_key returns resolved:false, not thrown/omitted) / integration (badge with mixed resolvable/unresolvable evidence_required entries → response array length equals input array length, each correctly flagged) |

## TSD S-0003.04 — Understand the status legend  (PRD §S-0003.04)
| Aspect | Spec |
|--------|------|
| Interfaces | Static legend rendered as part of the badge detail page (no dedicated data endpoint — content is fixed, not DB-sourced). |
| Data / State | none |
| Behavior | Badge detail page always renders exactly 3 legend entries in a fixed order: 🟢 Earned-eligible, 🟡 Blocked-assignment-limited, ⚪ Not-attempted, each with a one-line explanation, regardless of which badge is being viewed. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (legend content/order is constant) / integration (two different badge detail pages → identical legend markup) |
