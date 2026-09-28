## TSD S-0001.04 — Home Page: Track and Level Selection  (PRD §S-0001.04)

| Aspect | Spec |
|--------|------|
| Interfaces | **Content utilities** exported from `src/lib/content.ts`: `getTracks(): Track[]`, `getTrack(id: TrackId): Track \| null`, `getDomain(trackId: TrackId, domainId: string): Domain \| null`, `getCompetency(trackId: TrackId, domainId: string, competencyId: string): Competency \| null`, `getNextLevel(level: LevelId): LevelId \| null`, `computeProgress(competency: Competency, level: LevelId, checkedIds: string[]): number`. **Home page route**: `GET /` renders the home page. |
| Data / State | Reads `currentTrack` and `currentLevel` from the assessment store. Writes `currentTrack` via `setTrack`; writes `currentLevel` via `setLevel`. |
| Behavior | (B-1) `getTracks()` returns all four track objects. (B-2) `getTrack(id)` returns the matching track or null. (B-3) `getDomain` returns the matching domain or null. (B-4) `getCompetency` returns the matching competency or null. (B-5) `getNextLevel` returns the next level in ascending order for P2–P6; returns null for P7; never returns a value beyond P7 under any code path. (B-6) `computeProgress(competency, level, checkedIds)` returns a 0–100 integer (rounded) representing the fraction of criteria at `level` whose IDs appear in `checkedIds`; returns 0 when criteria array is empty. (B-7) Home page renders exactly 4 track buttons and exactly 6 level buttons. (B-8) Each track button has `aria-pressed` set to the string `"true"` when it matches `currentTrack`, `"false"` otherwise. Each level button has `aria-pressed` set to `"true"` when it matches `currentLevel`, `"false"` otherwise. (B-9) Clicking a track button writes the selected track to the store. Clicking a level button writes the selected level to the store. (B-10) A navigation element links to `/{currentTrack}` and reflects the currently stored track value. |
| Access | Any user visiting `/`. |
| Boundaries | None. |
| Tests | Unit (content utilities): `getTracks` count, `getTrack` hit and miss, `getDomain` hit and miss, `getCompetency` hit, `getNextLevel` at p2/p6/p7 (null check strict equality), `computeProgress` at 0/partial/full checked. Unit (home page component): 4 track buttons rendered, 6 level buttons rendered, clicking track button updates store, clicking level button updates store. |

---
