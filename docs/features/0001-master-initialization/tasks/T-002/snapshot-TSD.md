## TSD S-0001.02 — App scaffold & routing shell (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | One HTTP route (`/`) serving a placeholder response. Four shared UI contracts other features depend on: a level-tag display taking a single level value (P2–P7); a level-tab strip taking a current level and enough context to know which levels are inapplicable (rendered disabled, not hidden); a layout container exposing named sub-slots for standard/badge/training content; an empty-state display taking a variant identifier and rendering variant-appropriate copy. |
| Data / State | None — this story ships structure and empty/minimal component behavior, no persisted state. |
| Behavior | A request to `/` returns a successful response with placeholder content. Each shared UI contract renders without a runtime error for any valid input, including a level marked inapplicable and an unrecognized-but-declared empty-state variant (renders a safe fallback, never crashes). |
| Access | Fully public, no session/authentication involved anywhere in this story. |
| Boundaries | None — no external service, clock, randomness, or filesystem dependency in this story's scope. |
| Tests | Unit: each shared UI contract renders correctly for its documented input range (valid level, inapplicable level, each declared empty-state variant, an undeclared variant). Smoke: start the app and fetch `/`, confirming a successful response end to end. |
