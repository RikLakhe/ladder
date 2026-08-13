---
approved_by: "Rikesh"
approved_at: "2026-08-13"
approved_sha256: "a5e33120d1c7ab88474dcbca9c55c8762d20ca355b8f6b2796388b21a728d40b"
---
# TSD 0007 — Frontend Design Alignment

## TSD S-0007.01 — Home Page Completeness  (PRD §S-0007.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /` — server-rendered page. `getCompetenciesWithPfCount` extended to return `description: string` and `lastUpdated: string \| null` per competency. Level quick-jump: client component accepting P2–P7 as options, navigates to `/competencies/[firstCompetency]/[firstPF]?level=X` on selection; code comment marks full cross-competency view as v2 TODO. |
| Data / State | Query extends to join `document_versions` for latest `created_at` per competency (via entity_table matching competency-owned entities) and reads `competencies.description`. No writes. |
| Behavior | Each competency card renders: name, description, PF count, last-updated date (formatted as readable date string; null → omit date element). Level quick-jump control renders P2–P7 options; selecting one navigates to first competency's first PF at that level. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getCompetenciesWithPfCount` returns `description` and `lastUpdated` fields when DB rows contain them; returns `null` for `lastUpdated` when no `document_versions` rows exist for a competency. integration: home page renders all competency cards with description and last-updated date from seeded data. |

---

## TSD S-0007.02 — Competency Page Completeness  (PRD §S-0007.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /competencies/[id]` — server-rendered page. New lib functions: `getFunctionalAnalysisForCompetency(connectionString, competencyId): Promise<{ content: string } \| null>` (queries `functional_analyses` table by competency_id); `getPrimaryFunctionsWithBadgeCount(connectionString, competencyId): Promise<Array<{ id, pf_number, name, domain_classification, badgeCount }>>`. `getCompetencyById` extended to return `description: string`. |
| Data / State | No `CompetencyTabs` component. PF list replaced with cards showing pf_number, name, domain_classification, badge count. FA summary section added. History link added. No writes. |
| Behavior | Page header shows competency name + description. FA summary section renders collapsed by default; clicking expands to show full `functional_analyses.content` text (client component toggle). PF cards show: pf_number (e.g. "PF-1"), name, domain_classification, badge count badge. History link at top of page navigates to `/competencies/[id]/history`. `CompetencyTabs` removed from this page. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getPrimaryFunctionsWithBadgeCount` returns correct badge count per PF (including zero). unit: `getFunctionalAnalysisForCompetency` returns null when no row exists. integration: competency page renders FA toggle, PF cards with badge counts, history link from seeded data. |

---

## TSD S-0007.03 — PF Page Structure Correction  (PRD §S-0007.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `GET /primary-functions/[pfId]?level=X` — server-rendered page (level defaults to "P2" if absent). `getPrimaryFunctionById` extended to return `pf_number: string` and `domain_classification: string`. Level applicability determined by whether a `standards` row exists for that PF+level combination. |
| Data / State | Page layout restructured: `LevelTabStrip` at top, single active tab body containing Standard section + Badge section + Training section in sequence. `CompetencyTabs` not used on this page. Inapplicable levels (no standards row) passed as `inapplicableLevels` to `LevelTabStrip`, rendering disabled with `<EmptyState variant="not-applicable">` as tab body. |
| Behavior | PF page header shows pf_number, name, domain_classification. `LevelTabStrip` renders P2–P7; disabled tabs are visually distinct and unclickable; selecting an applicable tab navigates to `?level=X` and renders Standard/Badge/Training content inside the tab body. Clicking a disabled tab shows `<EmptyState variant="not-applicable">` as the content body (not a crash or blank). Standard, Badge, and Training sections render inside the active tab body — NOT at competency scope. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getPrimaryFunctionById` returns pf_number and domain_classification. unit: inapplicable level detection returns correct set given standards rows for a PF. integration: PF page at an N/A level renders `EmptyState variant="not-applicable"` in the tab body; at a valid level renders Standard/Badge/Training content. |

---

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

## TSD S-0007.05 — Training Viewer Corrections  (PRD §S-0007.05)
| Aspect | Spec |
|--------|------|
| Interfaces | Training content renders inside the Training section of the PF page level tab (S-0007.03). `getTrainingUnitsForCompetencyAndLevel` returns `TrainingUnitRow[]` with `hasSequencingIssue: boolean` per unit (already computed by `computeHasSequencingIssue` in `src/lib/training-units.ts`). |
| Data / State | No DB changes. P6/P7 empty state triggered when no `guided_exercise` or `autonomous_project` rows exist for the competency+level combination. |
| Behavior | For P6/P7 (or any level) where guided_exercise and autonomous_project type rows are absent: `<EmptyState variant="no-simulated-training">` renders with exact copy "Growth at this level is demonstrated through real project scope, not simulated exercises." (already in `EmptyState` CONFIG). Any unit where `hasSequencingIssue` is true renders a visible "⚠ sequencing issue" indicator alongside the unit row. Neither condition crashes or renders a generic blank. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: training section with zero guided_exercise/autonomous_project rows renders `EmptyState variant="no-simulated-training"`. unit: unit with `hasSequencingIssue=true` renders sequencing warning element. integration: P6 or P7 level tab (where seeded data has no exercises) shows exact fixed copy. |

---

## TSD S-0007.06 — Version History Route  (PRD §S-0007.06)
| Aspect | Spec |
|--------|------|
| Interfaces | Two new routes: `GET /competencies/[id]/history` (competency-scoped changelog) and `GET /[entityType]/[entityId]/history` (entity-scoped changelog). New lib function: `getVersionsForCompetency(connectionString, competencyId): Promise<VersionEntry[]>` — queries `document_versions` joined to entity FK chains for the competency, newest-first. `VersionEntry` type: `{ id, entityType, entityDisplayName, changeNote, changedBy, createdAt, snapshot, prevSnapshot }` where `prevSnapshot` is the snapshot from the prior row for the same entity (null if first version). Reuses `getDocumentVersions` for entity-scoped route. |
| Data / State | Read-only. No new DB tables. `document_versions` schema: `entity_table`, `entity_id`, `version_number`, `snapshot` jsonb, `changed_by`, `change_note`, `created_at`. `changed_by` is admin user display name (stored as text or joined from `admin_users` — use what the column holds). |
| Behavior | Changelog list renders newest-first. Each row shows: formatted date, `changedBy` name, entity type label + entity display name (e.g. "Badge TS-1-P4"), `changeNote`. Expanding a row renders a field-level before/after diff: flat key/value comparison of `prevSnapshot` vs `snapshot` jsonb; changed fields highlighted; unchanged fields not shown. Zero rows → `<EmptyState variant="no-history-yet">`. Entity-scoped route filters to one entity's versions only. |
| Access | Public — no auth |
| Boundaries | Postgres (read-only) |
| Tests | unit: `getVersionsForCompetency` returns entries across entity types belonging to the competency, ordered newest-first. unit: diff computation between two flat jsonb snapshots identifies changed keys correctly; unchanged keys excluded. unit: single version (no prior snapshot) renders without crash (no before/after diff, or "first version" label). integration: `/competencies/[id]/history` renders a list from seeded version data; expanding an entry shows highlighted changed fields. smoke: `/competencies/[id]/history` returns 200 against a running DB with seeded version rows. |
