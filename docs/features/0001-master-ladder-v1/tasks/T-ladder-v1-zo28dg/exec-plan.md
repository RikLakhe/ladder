---
approved_by: "Rikesh"
approved_at: "2026-09-28"
planned_behaviors: ""
approved_sha256: "ca0364b3d67a7d82083a30076227339424a0155208afd70edb0a9a1bd62850a1"
---
## Exec Plan — Task T-ladder-v1-zo28dg
> Tests: N/A (e2e-only). No TDD ledger. Plain commits only. Gates: approved exec plan + approved verification.

**Will build:** (mapped to each AC)
- `e2e/coming-soon.spec.ts` — Playwright spec: QA/Data/AI technical-skill → "coming soon" visible + no "Writing Code" link; Dev technical-skill → "Writing Code" link present + no placeholder (AC-1)
- `src/app/metadata.ts` — shared metadata helpers; each route exports unique `generateMetadata` or static `metadata` (AC-5)
- Update `src/app/layout.tsx` — confirm `lang="en"` present; add root meta description (AC-5)
- Update route pages — add per-page `metadata` exports for title/description (AC-5)
- Accessibility audit pass — verify `aria-pressed` on buttons (already present per T4/T8); label associations on checkboxes (already present per T8); no unlabeled interactives (AC-2, AC-3, AC-4)
- Confirm `npm run build` exits 0 (AC-8 smoke)
- Confirm `tsc --noEmit` exits 0, no `any` types (AC-8)

**Approach:**
T10 is Tests: N/A. All work is plain commits — no RED/GREEN. Deliver: (1) Playwright e2e spec for coming-soon guard, (2) per-route metadata (title + description), (3) verify existing a11y attributes are correct, (4) confirm build passes.

Lighthouse ≥ 90 is validated manually against a production build — scores captured in verification.

**Boundaries & mocks:**
- Boundary: Playwright + browser (manual e2e). Smoke: `npm run build` in CI covers B-8.
- Lighthouse is external audit tool, run once manually — not in CI.

**Behaviors (no TDD — all plain commits):**

1. Write `e2e/coming-soon.spec.ts` Playwright spec
2. Add `metadata` exports to each route page (layout, home, track, domain, competency pages)
3. Verify accessibility: `aria-pressed` on track/level buttons; label+input associations on checkboxes; accessible names on all interactive elements
4. Run `npm run build` locally — confirm exits 0
5. Run `tsc --noEmit` — confirm exits 0

**PR will contain:**
- `e2e/coming-soon.spec.ts`
- `src/app/layout.tsx` (metadata + lang)
- `src/app/page.tsx` (metadata)
- `src/app/[track]/page.tsx` (metadata)
- `src/app/[track]/[domain]/page.tsx` (metadata)
- `src/app/[track]/[domain]/[competency]/page.tsx` (metadata)

**Open questions / ambiguities:**
- Lighthouse ≥ 90: target is production build — run `npm run build && npx serve .next/standalone` or `npx next start`. Scores captured in verification; not in CI.
- Coming-soon guard is already data-driven by `comingSoon` flag in domain data (T6 DomainDetail). T10 adds the Playwright spec to formally record this.
- B-2/B-3/B-4 accessibility: `aria-pressed` on track/level buttons was built in T4; checkbox+label associations in T8; accessible names via visible text in all components. Verification pass confirms these hold.
- `lang="en"` already in `layout.tsx` from scaffold; confirm it's still there.

**Path:** L (lean, default)
**Escalation signals hit (≥2 → R):** None.
