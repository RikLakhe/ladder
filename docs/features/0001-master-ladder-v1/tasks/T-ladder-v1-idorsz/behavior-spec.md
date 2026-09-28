# Behavior Spec — T-ladder-v1-idorsz: Track Domain Overview with Progress Rings
> Source: task card ACs + docs/features/0001-master-ladder-v1/tasks/T-ladder-v1-idorsz/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: `ProgressRing` renders visible `"{n}%"` text for any integer n; `strokeWidth` defaults to 4
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: SVG arc `strokeDashoffset` equals full circumference at `percentage=0`; equals 0 at `percentage=100`
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: `/dev` renders exactly 5 domain cards; `/qa` shows "Coming soon" badge on `technical-skill`; unrecognised track returns 404
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: Each non-coming-soon domain card is a link to `/{track}/{domain}` containing a `ProgressRing`; coming-soon cards have no link and no ring
- Given:
- When:
- Then:

## B-5: AC-5 [behavior]: Domain progress = `(checked criteria at currentLevel across domain) / (total criteria at currentLevel) * 100` rounded; renders `0%` with no assessments; no crash when total criteria = 0
- Given:
- When:
- Then:

## B-6: AC-7 [e2e]: Checking a criterion on a competency page updates the domain overview progress ring without page reload
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0 — coverage:

