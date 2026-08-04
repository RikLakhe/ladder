---
approved_by: "unknown"
approved_at: "2026-08-04"
approved_sha256: "47e04aa91c2cbdccc1262a5f38949e9401aac19aa9761d87014ce0c802d6c755"
---
# TSD 0002 — Competency Browser
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

## TSD S-0002.01 — Browse competencies  (PRD §S-0002.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /` — returns HTML listing all competencies. `GET /api/competencies` — returns JSON array of `{id, name, primaryFunctionCount}`. |
| Data / State | Reads `competencies`, `primary_functions` (read-only). |
| Behavior | Every row in `competencies` appears once as a card with its name and a count of rows in `primary_functions` where `competency_id` matches. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (count aggregation for a competency with 0/1/N primary functions) / integration (seeded DB → home route returns one card per competency, count matches DB) |

## TSD S-0002.02 — Drill into a competency's primary functions  (PRD §S-0002.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /competencies/:id` — HTML page. `GET /api/competencies/:id/primary-functions` — JSON array of `{id, name}`. |
| Data / State | Reads `competencies`, `primary_functions` (read-only). |
| Behavior | Given a competency id, returns/renders only primary functions whose `competency_id` equals that id. Unknown competency id → 404 / not-found state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (filter excludes primary functions of other competencies) / integration (two competencies each with their own PFs → each competency page shows only its own) |

## TSD S-0002.03 — View a standard document by level  (PRD §S-0002.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /primary-functions/:pfId/standard` — HTML page. `GET /api/primary-functions/:pfId/standard` — JSON array of `{level, body}` ordered by level. Optional `?level=<level>` query narrows to one level. |
| Data / State | Reads `standards` (read-only), filtered by `pf_id`. |
| Behavior | Without `level`, all levels for that primary function are returned/rendered in level order. With `level`, only the matching row is returned/rendered; a level with no `standards` row renders an explicit empty state, not an error. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (level-order sort; empty-state for missing level) / integration (seeded `standards` rows for a PF across P2–P7 → all-levels view returns them in order; single-level query returns exactly one) |

## TSD S-0002.04 — View functional analysis and badges for a primary function  (PRD §S-0002.04)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/primary-functions/:pfId/functional-analysis` — JSON array of `{level, body}`. `GET /api/primary-functions/:pfId/badges` — JSON array of `{id, name, level}`. |
| Data / State | Reads `functional_analyses` and `badges` (read-only), filtered by `pf_id`. |
| Behavior | Returns/renders only rows whose `pf_id` matches the requested primary function. A primary function with no rows in either table renders an explicit empty state. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (filter by pf_id excludes other PFs' rows) / integration (PF with rows in both tables → both render; PF with neither → empty states, no error) |

## TSD S-0002.05 — Version history on a document  (PRD §S-0002.05)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /api/documents/:entityTable/:entityId/versions` — JSON array of `{changeNote, changedBy, createdAt}` ordered most-recent-first. |
| Data / State | Reads `document_versions` (read-only), filtered by `entity_table` + `entity_id`. |
| Behavior | A document view surfaces the most recent version's timestamp as "last updated." A history control lists all versions for that entity in reverse-chronological order. Entity with zero versions renders "no history" rather than erroring. |
| Access | Public — no auth required (viewing history is read-only, distinct from authoring). |
| Boundaries | none |
| Tests | unit (reverse-chronological sort) / integration (entity with N `document_versions` rows → history list length N, order verified; entity with 0 rows → no-history state) |
