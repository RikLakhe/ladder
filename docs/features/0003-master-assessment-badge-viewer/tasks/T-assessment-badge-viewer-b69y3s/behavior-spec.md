# Behavior Spec — T-assessment-badge-viewer-b69y3s: Badge detail page
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-b69y3s/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): [unit] Co-signer indicator renders when cosigner_required=true, absent when false (no DB needed)
- Given: BadgeDetail component with cosignerRequired prop
- When: cosignerRequired=true
- Then: element with data-testid="cosigner-indicator" is present; when cosignerRequired=false, element is absent

## B-2: AC-2 [behavior]: Verifier section shows `verifier_role` text; co-signer indicator + tooltip renders only when `cosigner_required` is true, absent otherwise.
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Clicking a badge card on the PF page navigates to that badge's detail page with matching badge_code/name/tier.
- Given:
- When:
- Then:

