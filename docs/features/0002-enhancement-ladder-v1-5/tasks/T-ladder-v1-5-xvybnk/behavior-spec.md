# Behavior Spec — T-ladder-v1-5-xvybnk: Visual Refresh (S-0002.01)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-xvybnk/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-3 [behavior]: ProgressBar renders with width matching percentage prop
- Given: a `<ProgressBar percentage={60} />` is rendered
- When: the component mounts
- Then: the inner fill element has an inline style of `width: 60%`

## B-2: AC-2 [behavior]: Self-rating buttons on competency detail are pill-shaped and carry `aria-pressed="true"/"false"` correctly
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Domain detail competency list uses horizontal `<ProgressBar>` elements (width driven by percentage) instead of circular SVG rings
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: Primary CTA buttons site-wide (home navigate, track overview CTA) use `#038E43` (leapverse-100) as their background colour
- Given:
- When:
- Then:

## B-5: AC-5 [e2e]: A user navigating to `/dev/technical-skill/writing-code` sees colour-coded level cards and pill rating buttons
- Given:
- When:
- Then:

