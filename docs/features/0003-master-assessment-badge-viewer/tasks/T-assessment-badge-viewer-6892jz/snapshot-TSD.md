## TSD S-0003.03 — Trace a badge's evidence to real instrument rows  (PRD §S-0003.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/badges/:badgeCode/evidence` — JSON array of `{instrumentId, rowKey, resolved: boolean, rowText?: string}`, one entry per element of that badge's `evidence_required`. |
| Data / State | Reads `badges.evidence_required` and `instruments.rows` (read-only), joined by `instrument_id`. |
| Behavior | For each `evidence_required` entry, looks up `instrument_id` in `instruments`, then `row_key` within its `rows`; if both resolve, returns/renders the row's text inline (expandable). If either lookup fails, marks that entry `resolved: false` and renders a visible "evidence link broken" state — the entry is never omitted from the response/render. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (resolvable entry returns rowText; entry with bad instrument_id or bad row_key returns resolved:false, not thrown/omitted) / integration (badge with mixed resolvable/unresolvable evidence_required entries → response array length equals input array length, each correctly flagged) |
