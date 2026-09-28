## Task T-ladder-v1-5ln8k3 — Home Page: Track and Level Selection
**Story:** S-0001.04 · feature 0001-master-ladder-v1
**Milestone:** M2 (v0.2.0)
**Depends on:** T-ladder-v1-d0zmot
**Slice:** Full vertical — content utilities + home page route; engineer can pick track/level and navigate
**Acceptance criteria:**
- [ ] AC-1 [behavior]: `src/lib/content.ts` exports 6 pure utility functions: `getTracks`, `getTrack`, `getDomain`, `getCompetency`, `getNextLevel`, `computeProgress`; all utility tests pass
- [ ] AC-2 [invariant]: `getNextLevel('p7')` returns `null` under all code paths — never returns a value beyond P7
- [ ] AC-3 [behavior]: `computeProgress` returns a 0–100 integer (rounded); returns 0 when criteria array is empty
- [ ] AC-4 [behavior]: Home page renders exactly 4 track buttons and exactly 6 level buttons
- [ ] AC-5 [behavior]: Each track button has `aria-pressed="true"` when selected, `"false"` otherwise; same for level buttons
- [ ] AC-6 [behavior]: Clicking a track button writes selected track to the store; clicking a level button writes selected level to the store
- [ ] AC-7 [e2e]: Navigation element links to `/{currentTrack}` reflecting the active store selection; clicking navigates to the track overview page
**End-to-end AC:** AC-7 [e2e] — "View my ladder" navigates to the correct track URL in browser
**Tests:** AC-1 through AC-6 — ordered; tracer bullet = AC-1 (content.ts module import + getTracks returns 4)
**Test scope:** src/lib/__tests__/content.test.ts, src/app/__tests__/page.test.tsx
**Done =** reviewable PR, all content utility tests + home page component tests green, `tsc --noEmit` clean.
