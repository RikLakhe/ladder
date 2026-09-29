---
approved_by: "Rikesh"
approved_at: "2026-09-29"
planned_behaviors: "8"
approved_sha256: "7524895e6f4d0fb51195327abd78364a5c829a361685a018f238422205be021b"
---
## Exec Plan — Task T-ladder-v1-5-n4qvsh
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:**
- `src/lib/types.ts` — add `WorkshopPosition` type (AC-store)
- `src/lib/store.ts` — add `workshopPosition: WorkshopPosition | null` persisted field + `setWorkshopPosition` action (AC-store)
- `src/app/[track]/workshop/page.tsx` — server component; resolves track via `getTrack`; `notFound()` if missing; reads `scope` query param; passes `track` + `scope` to `<WorkshopWizard>` (AC-access)
- `src/components/WorkshopWizard.tsx` — `'use client'`; builds criterion sequence from `currentLevel` across non-coming-soon domains; renders header, criterion card, nav buttons, completion screen, resume banner (AC-1–AC-8)
- `src/components/__tests__/WorkshopWizard.test.tsx` — unit tests covering all behaviors

**Approach:**
Criterion sequence built once at mount: all `LevelDescriptor.criteria` for `currentLevel` across non-coming-soon domains in fixed order (Delivery → Leadership → FCC → Strategic Impact → Technical Skills). If `scope` non-null, filter to that competency. Local `index` state drives the wizard step. On each advance, write `workshopPosition` to store (persisted via existing Zustand middleware). Completion triggered when `index >= sequence.length`.

**Boundaries & mocks:** localStorage via existing Zustand persist middleware (real in tests via in-memory store; no special mock needed — `useLadderStore.setState` covers it).

**Behaviors (TDD order):**
- B-1 (tracer): WorkshopWizard renders track name in header + "1 of N" counter + `<progress>` element for dev track at default state
- B-2: Main area shows criterion text in a card, a checkbox, and 3 rating radio inputs (Developing / Meeting / Exceeding)
- B-3: Checking the criterion checkbox calls `toggleCriterion` (criterion ID appears in store `criteriaChecked`)
- B-4a: "Next →" advances criterion index (counter shows "2 of N")
- B-4b: "← Back" at index=0 is a no-op (counter stays "1 of N"); "Skip" advances index without toggling checkbox
- B-4c: Reaching end of sequence transitions to completion screen (heading "Workshop complete" visible)
- B-5: "Continue?" banner rendered when `workshopPosition` in store matches current track + level
- B-6: Completion screen shows "See my results" and "Review by domain" CTA links; sets `workshopPosition = null`

**PR will contain:**
- `src/lib/types.ts` (modified — add WorkshopPosition)
- `src/lib/store.ts` (modified — add workshopPosition + setWorkshopPosition)
- `src/app/[track]/workshop/page.tsx` (new)
- `src/components/WorkshopWizard.tsx` (new)
- `src/components/__tests__/WorkshopWizard.test.tsx` (new)

**Open questions / ambiguities:**
- B-7 (swipe gesture): pointer events not reliable in jsdom — will test with simulated `pointerdown`/`pointerup` events via `fireEvent`
- Criterion sequence for dev track at p3: compute length dynamically in test via `getTrack('dev')` to avoid hardcoding
- `scope` query param read server-side in page.tsx; WorkshopWizard receives it as a prop string | null

**Path:** L (lean, default)
**Escalation signals hit:** None.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
