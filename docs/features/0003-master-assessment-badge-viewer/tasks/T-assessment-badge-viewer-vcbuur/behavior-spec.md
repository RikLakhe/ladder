# Behavior Spec — T-assessment-badge-viewer-vcbuur: Status legend on badge detail page
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-vcbuur/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: The badge detail page shows a fixed legend listing 🟢 Earned-eligible, 🟡 Blocked-assignment-limited, ⚪ Not-attempted, each with a one-line explanation.
- Given: BadgeStatusLegend component is imported and rendered
- When: component mounts
- Then: it displays three divs containing "🟢 Earned-eligible — All criteria met, ready for assessment", "🟡 Blocked-assignment-limited — Assignment quota reached, cannot be assessed this cycle", and "⚪ Not-attempted — No assessment attempt has been made" in that exact order

## B-2: AC-2 [e2e]: The legend renders identically (same three states, same order) on every badge detail page, regardless of that badge's own data.
- Given: The BadgeStatusLegend component is rendered for different badge contexts (DEMO-P3 and DEMO-P4)
- When: The component renders in both contexts
- Then: The legend markup (HTML) is identical in both cases, containing all three states in the same fixed order: Earned-eligible, Blocked-assignment-limited, Not-attempted

