# Ladder v1.5 — PRD: UI/UX Overhaul
**Created:** 2026-09-29  
**Status:** Draft  
**Owner:** Rikesh Shrestha  
**Builds on:** v1.0 (feature-complete, localStorage, no auth)  
**Precedes:** v2.0 (auth + persistence)

---

## Why v1.5

v1.0 ships the full data model and self-assessment logic. The UX, however, is browse-first: engineers navigate a tree (track → domain → competency → level) before any assessment begins. The result is high cognitive load, low engagement, and no sense of overall standing.

The reference model — [Visdom AI Maturity Matrix](https://visdom-maturity-matrix.virtuslab.com/workshop) — demonstrates a better UX pattern: a **matrix overview** that orients users immediately, a **guided workshop flow** that sequences the assessment, and a **results dashboard** that makes progress visible at a glance.

v1.5 ships a new UI/UX layer on top of v1's existing data model and localStorage state. No backend changes. No auth. No data migration. Pure front-end redesign.

---

## Goals

1. Engineers understand their full maturity picture in < 30 seconds of landing.
2. Completing an assessment feels like a guided workshop, not a tree traversal.
3. Results are visual, shareable (screenshot-friendly), and motivating.
4. Mobile experience is usable for the guided flow (focus mode).
5. Zero regression on v1 functionality — all assessment data in localStorage, all content remains.

---

## Non-Goals

- No auth, no backend, no accounts (v2).
- No peer comparison or team aggregates (v2).
- No evidence upload (v2).
- No new competency content beyond what v1 ships.
- No design system rebuild — extend shadcn/ui + Tailwind.

---

## Key UX Shifts

| v1 | v1.5 |
|---|---|
| Tree navigation as primary UX | Matrix overview as landing experience |
| No overview of full assessment state | Heat-map grid shows all domains × levels at a glance |
| Criteria scattered across deep pages | Guided wizard sequences criteria one at a time |
| Progress rings only on domain overview | Radar chart + completion dashboard on results page |
| Mobile: same tree, harder to use | Focus mode: one criterion at a time, swipe to advance |
| No visual sense of "done" | Workshop completion state with summary card |

---

## Information Architecture (v1.5)

```
/ (home — unchanged)
  → Track picker + level setter

/[track] (domain overview — redesigned)
  → Matrix heat-map: domains (rows) × levels (cols), cells coloured by completion
  → "Start Workshop" CTA → begins guided flow from current level
  → Radar chart (summary if assessment started)
  → Domain cards beneath (keep v1 ring pattern as secondary view)

/[track]/workshop (NEW — guided flow)
  → Step-by-step wizard: one criterion per screen
  → Progress bar: X of N criteria
  → Check/rate inline (no page jump)
  → Skip / back navigation
  → Mobile-optimised (full-screen, swipe-friendly)
  → Completion screen → links to /[track]/results

/[track]/results (NEW — dashboard)
  → Radar chart across all 5 domains (% meeting at current level)
  → Domain scorecards: criteria met / total, self-rating distribution
  → "Focus areas" — 3 lowest-scoring competencies surfaced
  → Share card: static PNG-exportable summary (no data, just visual)
  → CTA: "Go deeper" links back to competency detail pages

/[track]/[domain] (domain detail — light redesign)
  → Competency list with progress bars (replace rings with horizontal bars)
  → Mini heat-map: this domain across all levels

/[track]/[domain]/[competency] (competency detail — minor changes)
  → Keep v1 structure; visual refresh only (level cards, rating pills)
  → "Assess this competency" shortcut → enters workshop at this competency
```

---

## Page Designs

### 1. Track Overview `/[track]` — Matrix Heat-Map

**Layout:** Full-width grid. Rows = domains (5). Columns = levels (P2–P7). Each cell = completion % for that domain at that level.

**Cell colour scale:**
- Empty / 0%: `neutral-100` (light grey)
- 1–49%: `amber-100` → `amber-300`
- 50–79%: `blue-100` → `blue-300`
- 80–99%: `green-100` → `green-300`
- 100%: `green-500` + checkmark icon

**Current level column:** Highlighted with a coloured left border + "You" badge at column header.

**Interactions:**
- Click any cell → navigate to that domain's competency list filtered to that level.
- Hover tooltip: domain name, level, "X of Y criteria met".
- "Start Workshop" button (prominent, above grid) → `/[track]/workshop`

**Below the grid:**
- Radar chart (5 axes = 5 domains, value = % meeting at current level) — visible only once at least one assessment has been started.
- Legacy domain cards (v1 ring pattern) collapsed under "Browse by domain" disclosure — available but not primary.

---

### 2. Guided Workshop `/[track]/workshop`

**Flow type:** Full-screen wizard. One criterion per screen. No tree navigation visible.

**Screen anatomy:**
```
┌─────────────────────────────────────────────────────┐
│  [Track] Workshop          [X of N]  ████████░░░░  │  ← header + progress bar
├─────────────────────────────────────────────────────┤
│                                                      │
│  Domain: Delivery                                    │  ← breadcrumb (non-clickable)
│  Competency: Writing Code                            │
│  Level: P4                                           │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ "Consistently delivers well-structured code   │   │  ← criterion text (large)
│  │  with no significant review comments."        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [ ] I do this regularly                             │  ← single check
│                                                      │
│  Rate yourself:                                      │
│  ○ Developing  ● Meeting  ○ Exceeding                │  ← one radio group
│                                                      │
│       [← Back]           [Next →]                   │
│               [Skip this one]                        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Sequencing logic:**
1. All criteria for current level, sorted: universal domains first (Delivery → Leadership → FCC → Strategic Impact), then Technical Skills.
2. Coming-soon domains skipped automatically.
3. State saves to localStorage on every Next/Back action — safe to close and resume.
4. "Resume" state detected on return visit: "You left off at criterion 12 of 43. Continue?"

**Completion screen:**
- "Workshop complete" hero message.
- Summary: domains completed, criteria met count, top self-rating (Exceeding count).
- CTAs: "See my results" → `/[track]/results` | "Review by domain" → `/[track]`

**Mobile:** Same flow, full-screen. Swipe left = Next, swipe right = Back. Bottom sheet for rating (avoid accidental taps on small targets).

---

### 3. Results Dashboard `/[track]/results`

**Sections:**

**A. Radar Chart**
- 5-axis polygon: one axis per domain.
- Two overlaid polygons: "criteria met" (filled) vs "criteria exceeding" (outline).
- Built with Recharts `RadarChart` (already in shadcn ecosystem).

**B. Domain Scorecards** (horizontal cards)
- Domain name + icon
- Progress bar: `X / Y criteria met at P{n}`
- Self-rating pills: `{n} Developing · {n} Meeting · {n} Exceeding`
- Link: "See details →"

**C. Focus Areas**
- 3 competencies with lowest % checked at current level.
- Card per competency: name, domain badge, "X of Y met", "Work on this →" link.

**D. Share Card**
- "Export summary" button → generates a canvas PNG of the radar chart + domain scores.
- No personal data in the image (no name, no email) — safe to share.

**E. Next Steps**
- "Ready for P{n+1}?" — if current level ≥ 80% met across all domains, show nudge.
- "Switch track" — link back to home.

---

### 4. Competency Detail `/[track]/[domain]/[competency]` — Visual Refresh

No structural changes. Visual updates only:
- Level cards: border-left coloured by level (P2=slate, P3=blue, P4=indigo, P5=violet, P6=purple, P7=pink).
- Current level card: elevated (shadow-md), "Your level" badge.
- Self-rating buttons: pill toggle group (not radio buttons).
- "Assess in workshop" button: enters workshop flow scoped to this competency.

---

## Design System

**Extend shadcn/ui + Tailwind** (no new library).

**New components needed:**
| Component | Description |
|---|---|
| `<MatrixHeatMap>` | Domain × level grid with colour-coded cells |
| `<RadarChart>` | Recharts wrapper, 5-axis, dual polygon |
| `<WorkshopWizard>` | Full-screen criterion flow, progress bar, swipe handler |
| `<DomainScorecard>` | Horizontal card: bar + rating pills |
| `<FocusAreaCard>` | Compact card for lowest-scoring competencies |
| `<ShareCardExport>` | html2canvas snapshot of radar + domain scores |

**Colour tokens (extend Tailwind config):**
```js
// Maturity heat-map scale
'heat-0': '#f5f5f4',   // neutral-100
'heat-1': '#fef3c7',   // amber-100
'heat-2': '#fcd34d',   // amber-300
'heat-3': '#bfdbfe',   // blue-100
'heat-4': '#60a5fa',   // blue-400
'heat-5': '#22c55e',   // green-500 (complete)

// Level accent colours
'level-p2': '#64748b', // slate-500
'level-p3': '#3b82f6', // blue-500
'level-p4': '#6366f1', // indigo-500
'level-p5': '#8b5cf6', // violet-500
'level-p6': '#a855f7', // purple-500
'level-p7': '#ec4899', // pink-500
```

**Typography:** No change — keep v1 font stack.

---

## State & Data Changes

**localStorage schema — additive only:**
```json
{
  "currentTrack": "dev",
  "currentLevel": "p4",
  "focusedView": true,
  "workshopPosition": {
    "track": "dev",
    "criterionIndex": 12,
    "totalCriteria": 43,
    "startedAt": "2026-09-29T10:00:00Z"
  },
  "assessments": { ... }
}
```

- `workshopPosition` is new. Used only to power "resume" on return.
- No existing keys changed — v1 assessment data survives v1.5 deploy.

---

## Tech Changes

| Area | v1 | v1.5 change |
|---|---|---|
| Routing | existing pages | Add `/[track]/workshop`, `/[track]/results` |
| Components | domain cards, ring, criteria list | Add 6 new components (see above) |
| Charting | none | Add `recharts` (already shadcn peer dep — likely zero new install) |
| Export | none | Add `html2canvas` for share card PNG |
| State | Zustand + localStorage | Add `workshopPosition` slice |
| Animation | none | Add `framer-motion` for wizard transitions (lightweight) |
| Mobile | responsive but desktop-first | Add touch/swipe handlers in workshop (use `use-gesture` or pointer events) |

---

## Implementation Phases

### Phase A — Visual Refresh (low risk, no new routes)
- Level colour tokens
- Competency detail visual update (level card colours, pill ratings)
- Domain detail: progress bars replacing rings
- Estimated: 2–3 days

### Phase B — Matrix Heat-Map (new component, existing data)
- `<MatrixHeatMap>` component
- Track overview page restructure
- Estimated: 3–4 days

### Phase C — Workshop Wizard (new route, new component)
- `/[track]/workshop` route
- `<WorkshopWizard>` component + progress bar
- `workshopPosition` Zustand slice
- Resume detection
- Mobile swipe support
- Estimated: 4–5 days

### Phase D — Results Dashboard (new route, charting)
- `/[track]/results` route
- Radar chart (Recharts)
- Domain scorecards, focus areas, share card export
- Estimated: 3–4 days

### Phase E — Polish + Accessibility
- Keyboard navigation in workshop (arrow keys = back/next)
- ARIA labels on heat-map cells
- Reduced-motion support for wizard transitions
- Lighthouse ≥ 90 maintained
- Estimated: 2 days

**Total: ~3 weeks (sequential), ~2 weeks (A+B parallel with C+D).**

---

## Success Criteria

| Metric | Target |
|---|---|
| Time to first meaningful view of assessment state | < 30s from track landing |
| Workshop completion rate (engineer starts → finishes) | > 60% in first week (proxy: localStorage data) |
| Lighthouse performance score | ≥ 90 (maintain v1 bar) |
| Mobile usability (workshop flow) | No horizontal scroll, tap targets ≥ 44px |
| v1 data compatibility | Zero loss of existing localStorage assessment state |
| New component test coverage | ≥ 80% (Vitest + RTL, consistent with v1 standard) |

---

## Open Questions

1. **Workshop sequencing:** Should the wizard default to current level only, or offer "all levels" mode? (Recommendation: current level only; "all levels" is a v2 feature.)
2. **Radar chart on mobile:** 5-axis radar is hard to read at < 375px. Alternative: horizontal bar chart on small screens, radar on md+. Decide before Phase D.
3. **Share card privacy:** Export omits name/email. Should it include track + level? (Recommendation: yes — useful context, no PII.)
4. **Recharts vs other:** If recharts causes bundle bloat > 50kb gzipped, consider visx or nivo. Check at Phase D start.

---

## Related Documents

- `docs/2026-09-26-ladder-design.md` — v1 design spec (data model, IA, tech stack)
- `docs/2026-09-26-ladder-v1-plan.md` — v1 implementation plan (T1–T10)
- `docs/prd/` — PRD directory
- Reference: [Visdom AI Maturity Matrix](https://visdom-maturity-matrix.virtuslab.com/workshop)
