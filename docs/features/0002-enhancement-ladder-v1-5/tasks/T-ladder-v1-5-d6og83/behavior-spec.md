# Behavior Spec — T-ladder-v1-5-d6og83: Matrix Heat-Map (S-0002.02)
> Source: task card ACs + docs/features/0002-enhancement-ladder-v1-5/tasks/T-ladder-v1-5-d6og83/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: MatrixHeatMap renders 30 heat cells for dev track
- Given: `<MatrixHeatMap track={devTrack} />` rendered with store at default state (no assessments)
- When: component mounts
- Then: exactly 30 elements with `data-testid="heat-cell"` are in the DOM (5 domains × 6 levels)

## B-2: AC-2 [behavior]: Current-level column shows "You" badge
- Given: `currentLevel = 'p3'` in store, `<MatrixHeatMap track={devTrack} />`
- When: component mounts
- Then: exactly one element with text "You" is visible; its closest column header has `data-level="p3"`

## B-3: AC-3 [behavior]: Live cells link to domain; coming-soon cells have no link
- Given: dev track (all live domains); qa track (1 coming-soon technical-skill domain)
- When: MatrixHeatMap renders for qa track
- Then: cells for coming-soon domain have no `<a>` element; live domain cells contain an `<a>` with correct href

## B-4: AC-4 [behavior]: Each live cell has title attribute with domain + level + criterion count
- Given: `<MatrixHeatMap track={devTrack} />` with no assessments
- When: component mounts
- Then: each live cell `[data-testid="heat-cell"]` has a `title` attribute matching `/{domainName}.*{LEVEL}.*0 of \d+/`

## B-5: AC-6 [behavior]: RadarChartSmall shows SVG with 5 axis labels when data has pct > 0; hidden when all zero
- Given: `<RadarChartSmall data={[{domain:'A',pct:0},{domain:'B',pct:0},…]}` (all zero)
- When: component mounts
- Then: no SVG element rendered (or element has `hidden` attribute / display:none)
- And: when ≥1 pct > 0, SVG with exactly 5 `<text>` elements is rendered

