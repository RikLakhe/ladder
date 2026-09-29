---
approved_by: "Rikesh"
approved_at: "2026-09-29"
approved_sha256: "965778eebad944a71406fe9dba3b93115a8d7ded39776abdee219412ce24e49f"
---
## Task T-ladder-v1-5-xvybnk — Visual Refresh (S-0002.01)
**Parent:** story S-0002.01 · feature 0002-enhancement-ladder-v1-5
**Slice:** Tailwind colour tokens + competency detail level card borders + pill rating buttons + horizontal progress bars on domain detail + green brand accent replacing blue

**Acceptance criteria:**
- [ ] AC-1 [behavior]: Competency detail level cards render a left border coloured by level (P2=slate, P3=blue, P4=indigo, P5=violet, P6=purple, P7=pink) using Tailwind `level-p{n}` colour tokens defined in the Tailwind config
- [ ] AC-2 [behavior]: Self-rating buttons on competency detail are pill-shaped and carry `aria-pressed="true"/"false"` correctly
- [ ] AC-3 [behavior]: Domain detail competency list uses horizontal `<ProgressBar>` elements (width driven by percentage) instead of circular SVG rings
- [ ] AC-4 [behavior]: Primary CTA buttons site-wide (home navigate, track overview CTA) use `#038E43` (leapverse-100) as their background colour
- [ ] AC-5 [e2e]: A user navigating to `/dev/technical-skill/writing-code` sees colour-coded level cards and pill rating buttons

**Tests:** AC-1, AC-2, AC-3
**Tests:** `src/components/__tests__/ProgressBar.test.tsx`, `src/app/[track]/[domain]/[competency]/__tests__/page.test.tsx`
**Done =** reviewable PR, all tests pass, links to chain. One PR per task.
