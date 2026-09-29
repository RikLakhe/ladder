# Behavior Spec — T-ladder-v1-5-kp8mp7: Results Dashboard (S-0002.04)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-kp8mp7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: RadarChart renders SVG with 5 axis labels and 2 polygons
- Given: `<RadarChart data={[...5 domains, all pct=0]}/>` rendered
- When: component mounts
- Then: SVG present; exactly 5 `<text>` elements with domain names; exactly 2 `<polygon>` elements (filled met + outline exceeding)

## B-2: AC-2 [behavior]: DomainScorecard renders "X / Y" text with correct counts
- Given: `<DomainScorecard domain={...} metCount={3} total={10} ratings={...} href="..."/>` rendered
- When: component mounts
- Then: text "3 / 10" visible in the DOM

## B-3: AC-3 [behavior]: ResultsDashboard shows 3 lowest-scoring focus area cards
- Given: `<ResultsDashboard track={devTrack}/>` with store at default state (no assessments)
- When: component mounts
- Then: exactly 3 elements with `data-testid="focus-area-card"` present

## B-4: AC-5 [behavior]: Nudge shown when all domains ≥ 80%; hidden at 0%
- Given: store has no assessments (all domains 0%)
- When: `<ResultsDashboard track={devTrack}/>` renders
- Then: no "ready for" text visible

## B-5: AC-access [behavior]: Results route renders ResultsDashboard for valid track
- Given: ResultsPage server component called with `{ track: 'dev' }` params
- When: rendered
- Then: radar SVG + focus-area-card elements present

## B-6: AC-6 [e2e]: A user navigating to `/dev/results` after completing assessments sees radar, scorecards, and focus areas
- Given: Playwright e2e — deferred to T5
- When: —
- Then: —

