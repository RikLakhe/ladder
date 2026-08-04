# Behavior Spec — T-002: App scaffold & routing shell
> Source: task card ACs + docs/features/0001-master-initialization/tasks/T-002/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: each shared UI contract (level-tag, level-tab strip, layout container with named sub-slots, empty-state display) renders without a runtime error across its documented input range, including an inapplicable level and an undeclared empty-state variant (safe fallback, never a crash).
- Given: the four shared UI components (`LevelTag`, `LevelTabStrip`, `ContentLayout`, `EmptyState`) rendered via Testing Library in jsdom.
- When: `LevelTag` is rendered for each valid P2–P7 level; `LevelTabStrip` is rendered with a current level and a set of levels marked inapplicable; `ContentLayout` is rendered with content passed into its standard/badge/training named slots; `EmptyState` is rendered once per declared variant and once with an unrecognized variant identifier.
- Then: every render completes without throwing; `LevelTabStrip` marks each inapplicable level's tab `disabled` (present, not removed from the DOM); `ContentLayout` renders the content passed to each named slot; `EmptyState` shows the variant-appropriate copy for declared variants and a safe fallback copy (no crash) for the unrecognized variant.

## B-2: AC-2 [e2e]: starting the app and requesting `/` returns a successful response with placeholder content.
- Given: the Next.js app running as a real dev server process (no mocked server).
- When: an HTTP GET request is made to `/`.
- Then: the response status is 200 and the body contains non-empty placeholder content.

