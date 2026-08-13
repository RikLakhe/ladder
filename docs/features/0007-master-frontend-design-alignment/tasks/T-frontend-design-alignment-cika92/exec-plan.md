---
approved_by: "Rikesh"
approved_at: "2026-08-13"
planned_behaviors: "5"
approved_sha256: "64765fbe3e833c4cf14431fe14a71b9d5310553445471d6ab9c89fc024833284"
---
## Exec Plan — Task T-frontend-design-alignment-cika92
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code.

**Will build:**
- AC-1/AC-2: Evidence list renders resolved entries as expandable `<details>` with row text; unresolved entries show "⚠ evidence link broken" warning (logic already in lib — display needs wiring)
- AC-3: Co-signer indicator renders iff `cosignerRequired` true; tooltip text: "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency."
- AC-4: `<BadgeStatusLegend>` renders once on page (already imported, verify placement)
- AC-5: Badge header shows badge_code in monospace, name, `<TierChip tier={badge.tier}>`

**Approach:** `src/app/badges/[badgeCode]/page.tsx` already has most structure. Primarily a display/styling pass: ensure evidence entries render correctly (resolved = `<details>`, broken = warning span), co-signer tooltip added, TierChip in header, BadgeStatusLegend present. No lib changes needed — evidence resolution already in `getEvidenceForBadge`.

**Boundaries & mocks:** Postgres (read-only). Unit tests use fake evidence arrays. Integration hits seeded DB.

**Behaviors (TDD order):**
- B-1 (tracer bullet): resolved evidence entry renders row text inside a `<details>` element
- B-2: unresolved evidence entry renders visible warning element containing "evidence link broken" text
- B-3: co-signer indicator renders when `cosignerRequired=true`; absent when false; tooltip text matches spec
- B-4: `<BadgeStatusLegend>` present in rendered page output
- B-5 [e2e]: badge detail page for seeded badge shows resolved evidence, legend, conditional co-signer

**PR will contain:**
- `src/app/badges/[badgeCode]/page.tsx` — display corrections
- `tests/T-frontend-design-alignment-cika92/`

**Open questions / ambiguities:** None.

**Path:** L

**Escalation signals hit (≥2 → R):** 0
- [ ] Refactor pass done (on green; tests unchanged) — before PR
