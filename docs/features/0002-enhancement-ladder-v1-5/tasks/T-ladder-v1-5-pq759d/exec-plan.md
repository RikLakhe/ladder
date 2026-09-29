---
approved_by: ""
approved_at: ""
planned_behaviors: "2"
---
## Exec Plan — Task T-ladder-v1-5-pq759d
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:**
- `src/components/WorkshopWizard.tsx` — add `keydown` handler on document: ArrowRight/Enter (when focus not on input) = Next; ArrowLeft = Back; Escape = Skip (AC-1)
- `src/components/MatrixHeatMap.tsx` — add `aria-label="{domain.name}, {LEVEL}, {X} of {Y} criteria met"` to each heat cell (AC-2)
- `src/app/globals.css` — add `@media (prefers-reduced-motion: reduce)` block suppressing transitions/animations on wizard (AC-3)
- B-4 (`npm run build` + `npx tsc --noEmit` both exit 0) — verified as non-functional invariant, no code change needed

**Approach:**
Two drivable behaviors: keyboard handler (B-1, tracer) and aria-labels on MatrixHeatMap cells (B-2). Reduced-motion CSS (B-3) is non-functional/invariant — added with B-2 GREEN commit. Build check (B-4) is CI invariant verified at lane done.

**Boundaries & mocks:** None.

**Behaviors (TDD order):**
- B-1 (tracer): `WorkshopWizard` `keydown` ArrowRight fires Next; ArrowLeft fires Back; Escape fires Skip; Enter while checkbox focused does NOT trigger Next
- B-2: Each `MatrixHeatMap` heat cell has `aria-label` containing domain name, level code, and criterion count

**PR will contain:**
- `src/components/WorkshopWizard.tsx` (modified — add keydown handler)
- `src/components/MatrixHeatMap.tsx` (modified — add aria-label)
- `src/app/globals.css` (modified — reduced-motion media query)
- `src/components/__tests__/WorkshopWizard.test.tsx` (modified — add keyboard tests)
- `src/components/__tests__/MatrixHeatMap.test.tsx` (modified — add aria-label test)

**Open questions / ambiguities:**
- "Enter while checkbox focused does NOT trigger Next": in jsdom, test by focusing the checkbox then firing keydown Enter and asserting counter unchanged
- Reduced-motion CSS: not testable in jsdom — added in same commit as B-2 GREEN

**Path:** L (lean, default)
**Escalation signals hit:** None.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
