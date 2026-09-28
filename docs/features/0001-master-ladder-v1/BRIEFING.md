---
approved_by: "Rikesh"
approved_at: "2026-09-28"
approved_sha256: "bd79e3009e328bc5d43352eccdb6265f83e36a2c95fcd6545f2c577efba99174"
---
# Briefing 0001 — Ladder v1: LFT Engineering Career Matrix Platform

## Why

Leapfrog engineers (P2–P7, ~500 people across Dev, QA, Data, and AI tracks) lack a single place to understand where they are on the career ladder, what the next level looks like, and how to self-assess their own progress. Career path clarity is the #2 reason engineers leave — not compensation. A platform that makes the ladder visible and self-assessable directly addresses retention, promotion fairness, and 1:1 development conversation quality.

Evidence:
- Gallup 2025: 45% of engineers say advancement clarity would make them stay
- Princeton RSE (arXiv:2602.19353): structured ladder rollout reduced turnover from 70% to 7%
- LinkedIn Learning 2025: engineers with internal mobility tenure 5.4 vs 2.9 years
- SHRM 2024: self-assessment anchored to observable criteria improves fairness perception 2.5x

## Hypothesis

We think Leapfrog engineers will more actively engage in their career development if they have a browser-native, always-available view of the LFT competency matrix — one that lets them self-assess against observable criteria, see their progress visually, and compare their current level to the next. We expect reduced ambiguity in 1:1s and a measurable increase in engineers who can articulate their growth path.

## Mocks / references

- Design spec: `docs/context/2026-09-26-ladder-design.md`
- v1 implementation plan: `docs/context/2026-09-26-ladder-v1-plan.md`
- PRD task files: `docs/context/prd/T1–T10`
- progression.fyi — 75 companies publish career ladders publicly (prior art / benchmark)
- LFT competency matrix: `competencies/lft-engineering-competency-matrix.md`

## Scope hints

**Probably in (v1):**
- All 4 tracks: Dev, QA, Data, AI
- 4 universal domains: Delivery, Leadership, FCC, Strategic Impact
- Dev Technical Skills domain fully populated (9 competencies, P2–P7)
- QA/Data/AI Technical Skills: "coming soon" placeholder
- Browse all levels P2–P7; engineer sets current track + level in-browser
- Focused view toggle: collapses to current + next level
- Per-level: descriptor text + checkable criteria
- Self-rating per competency: Developing | Meeting | Exceeding
- Progress rings on domain overview (% criteria checked at current level)
- All state in localStorage — no login, no backend

**Probably out (v1):**
- No authentication or backend
- No manager visibility
- No notifications or peer comparison
- No HRIS integration
- No QA/Data/AI Technical Skills content (placeholder only)
- No mobile app

## Open questions

- **Data model conflict (must resolve before PRD):** T2 PRD defines `setRating(competencyId, level, rating)` with nested `assessments[compId][level]` store shape. T8 PRD defines `setRating(assessmentKey, rating)` with flat `assessments[trackId/domainId/compId]` store shape. These are incompatible. Recommendation: T8 flat model (coherent with criterion IDs that encode level). Needs stakeholder decision before TSD is written.

## Approval

Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
