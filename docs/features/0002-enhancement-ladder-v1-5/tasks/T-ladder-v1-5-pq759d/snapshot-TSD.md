## TSD S-0002.05 — Polish and Accessibility  (PRD §S-0002.05)

| Aspect | Spec |
|--------|------|
| Interfaces | No new public interfaces. Modifications to `WorkshopWizard` (keyboard handler), `MatrixHeatMap` (aria-labels), and global CSS (reduced-motion media query for wizard transitions). |
| Data / State | None. |
| Behavior | (B-1) `WorkshopWizard` listens to `keydown` on the document: `ArrowRight` or `Enter` (when focus not on an input) = Next; `ArrowLeft` = Back; `Escape` = Skip. (B-2) Each `MatrixHeatMap` cell has `aria-label="{domain.name}, {LEVEL}, {X} of {Y} criteria met"`. (B-3) Wizard slide transitions wrapped in `@media (prefers-reduced-motion: reduce) { transition: none; animation: none }`. (B-4) `npm run build` exits 0. `npx tsc --noEmit` exits 0. (B-5) Lighthouse ≥ 90 all four categories on production build (manual audit). |
| Access | Keyboard users, screen-reader users, reduced-motion users. |
| Boundaries | None. |
| Tests | Unit — keyboard handler: ArrowRight calls Next; ArrowLeft calls Back; Escape calls Skip; Enter while checkbox focused does NOT trigger Next. `MatrixHeatMap`: cell `aria-label` includes domain name, level code, and criterion counts. |
