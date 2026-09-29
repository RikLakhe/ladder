---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "6f4ba5dc5e9f31c0296f1193da6491560675b45e0c4bcec6f0ce778cd98dacf9"
---
## Task T-ladder-v1-5-pq759d — Polish and Accessibility (S-0002.05)
**Parent:** story S-0002.05 · feature 0002-enhancement-ladder-v1-5
**Slice:** Workshop keyboard navigation + heat-map ARIA labels + reduced-motion CSS + build/tsc green

**Acceptance criteria:**
- [ ] AC-1 [behavior]: `WorkshopWizard` handles `keydown`: `ArrowRight` / `Enter` (when focus not on an input/checkbox) = Next; `ArrowLeft` = Back; `Escape` = Skip
- [ ] AC-2 [behavior]: Each `MatrixHeatMap` cell has `aria-label="{domain.name}, {LEVEL}, {X} of {Y} criteria met"`
- [ ] AC-3 [behavior]: Wizard slide transitions are wrapped in `@media (prefers-reduced-motion: reduce) { transition: none; animation: none }` — no motion when preference is set
- [ ] AC-4 [non-functional]: `npm run build` exits 0 and `npx tsc --noEmit` exits 0 with no `any` types
- [ ] AC-5 [non-functional]: Lighthouse ≥ 90 all four categories on a production build (manual audit before release PR)
- [ ] AC-6 [e2e]: A user can complete the workshop wizard using keyboard only (ArrowRight to advance, ArrowLeft to go back)

**Tests:** AC-1, AC-2
**Tests:** `src/components/__tests__/WorkshopWizard.test.tsx` (keyboard), `src/components/__tests__/MatrixHeatMap.test.tsx` (aria-label)
**Done =** reviewable PR, all tests pass, links to chain. One PR per task.
