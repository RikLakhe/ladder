# Behavior Spec — T-frontend-design-alignment-cika92: Badge Detail Correctness
> Source: task card ACs + docs/features/0007-master-frontend-design-alignment/tasks/T-frontend-design-alignment-cika92/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Each resolved evidence entry renders row text inline in an expandable element; no resolved entry is silently blank
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: Each unresolved evidence entry renders a visible "⚠ evidence link broken" warning in place of the row
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: Co-signer indicator (with tooltip: "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency.") renders only when `cosignerRequired` is true
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: `BadgeStatusLegend` renders exactly once on the badge detail page
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: Badge header shows badge_code in monospace, name, and `TierChip` using the badge's tier value
- Given:
- When:
- Then:

## B-6: AC-6 [e2e]: A user on a badge detail page sees resolved instrument row text, the status legend, and a co-signer indicator only when cosignerRequired is true; a badge with a broken reference shows the warning state
- Given:
- When:
- Then:

