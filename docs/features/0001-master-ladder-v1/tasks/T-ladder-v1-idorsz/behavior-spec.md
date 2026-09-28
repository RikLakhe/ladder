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
- Given: `ProgressRing` component is imported with `percentage` and `size` props
- When: rendered with percentage=75 or percentage=0
- Then: DOM contains visible text "75%" or "0%" respectively; SVG arc uses `strokeDashoffset` = circumference at 0%, 0 at 100%; `strokeWidth` defaults to 4 when prop omitted

## B-2: AC-2 [behavior]: SVG arc `strokeDashoffset` equals full circumference at `percentage=0`; equals 0 at `percentage=100`
- Given: `ProgressRing` rendered with percentage=0 or percentage=100
- When: SVG DOM inspected
- Then: circle.progress-arc `stroke-dashoffset` equals `2 * Math.PI * r` at 0%; equals 0 at 100%

## B-3: AC-3 [behavior]: `/dev` renders exactly 5 domain cards; `/qa` shows "Coming soon" badge on `technical-skill`; unrecognised track returns 404
- Given: track overview page rendered with valid or invalid track slug
- When: dev track rendered vs qa track vs unknown slug
- Then: dev shows 5 domain cards; qa technical-skill card shows "Coming soon" badge; unknown slug triggers notFound()

## B-4: AC-4 [behavior]: Each non-coming-soon domain card is a link to `/{track}/{domain}` containing a `ProgressRing`; coming-soon cards have no link and no ring
- Given: track overview rendered for dev track
- When: non-coming-soon and coming-soon domain cards inspected
- Then: non-coming-soon cards wrapped in `<a href="/{track}/{domain}">` and contain ProgressRing; coming-soon cards have no link and no ProgressRing

## B-5: AC-5 [behavior]: Domain progress = `(checked criteria at currentLevel across domain) / (total criteria at currentLevel) * 100` rounded; renders `0%` with no assessments; no crash when total criteria = 0
- Given: store has assessments with some criteriaChecked for a competency in a domain
- When: track overview rendered
- Then: ProgressRing receives correct aggregated percentage; 0% with no assessments; no crash when domain has zero total criteria

## B-6: AC-7 [e2e]: Checking a criterion on a competency page updates the domain overview progress ring without page reload
- Given: user is on track overview page with a progress ring visible
- When: user navigates to competency, checks a criterion, returns to track overview
- Then: progress ring reflects updated percentage — manual browser verification

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-6 [invariant]: No `any` types; `tsc --noEmit` exits 0 — coverage: all behaviors; verified at review time
