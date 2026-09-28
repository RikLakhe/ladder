## Task T-ladder-v1-idorsz — Track Domain Overview with Progress Rings
**Story:** S-0001.05 · feature 0001-master-ladder-v1
**Milestone:** M2 (v0.2.0) — closes M2
**Depends on:** T-ladder-v1-5ln8k3
**Slice:** Full vertical — ProgressRing component + track overview route; domain overview browseable
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `ProgressRing` renders visible `"{n}%"` text for any integer n; `strokeWidth` defaults to 4
- [ ] AC-2 [behavior]: SVG arc `strokeDashoffset` equals full circumference at `percentage=0`; equals 0 at `percentage=100`
- [ ] AC-3 [behavior]: `/dev` renders exactly 5 domain cards; `/qa` shows "Coming soon" badge on `technical-skill`; unrecognised track returns 404
- [ ] AC-4 [behavior]: Each non-coming-soon domain card is a link to `/{track}/{domain}` containing a `ProgressRing`; coming-soon cards have no link and no ring
- [ ] AC-5 [behavior]: Domain progress = `(checked criteria at currentLevel across domain) / (total criteria at currentLevel) * 100` rounded; renders `0%` with no assessments; no crash when total criteria = 0
- [ ] AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0
- [ ] AC-7 [e2e]: Checking a criterion on a competency page updates the domain overview progress ring without page reload
**End-to-end AC:** AC-7 [e2e] — progress ring updates live after criterion check in browser
**Tests:** AC-1 through AC-5 — ordered; tracer bullet = AC-1 (ProgressRing renders "75%" at percentage=75)
**Test scope:** src/components/__tests__/ProgressRing.test.tsx, src/app/[track]/__tests__/TrackPage.test.tsx
**Done =** reviewable PR, 5 Vitest tests green (2 ProgressRing + 3 TrackPage), `tsc --noEmit` clean.
