## TSD S-0002.01 — Visual Refresh  (PRD §S-0002.01)

| Aspect | Spec |
|--------|------|
| Interfaces | **Tailwind config** — extend `theme.colors` with `leapverse` tint tokens (`leapverse-10` through `leapverse-100` matching Leapfrog green ramp) and `level-p2` through `level-p7` border-colour tokens. **`CompetencyDetail`** — level card left border reads `level-{levelId}` token. **`CompetencyAssessmentView`** — self-rating buttons change from plain buttons to pill toggles (visually rounded, `aria-pressed` preserved). **`DomainDetail`** — replaces `<ProgressRing>` with a horizontal `<ProgressBar>` element showing `width: {pct}%`. All existing props and data contracts unchanged. |
| Data / State | No state changes. Reads existing `assessments` and `currentLevel` from store. |
| Behavior | (B-1) Each level card on competency detail (`/[track]/[domain]/[competency]`) has a left border coloured by its level: P2=`level-p2`, P3=`level-p3`, P4=`level-p4`, P5=`level-p5`, P6=`level-p6`, P7=`level-p7`. (B-2) Self-rating buttons on competency detail render as pill-shaped toggles; `aria-pressed` attribute unchanged. (B-3) Domain detail competency list replaces circular SVG rings with horizontal progress bars. (B-4) CTA buttons site-wide use `leapverse-100` (`#038E43`) as primary background, replacing Tailwind `blue-600`. |
| Access | Any user. |
| Boundaries | None. |
| Tests | Unit — `ProgressBar` renders correct `width` style for given `percentage` prop. Vitest + RTL. Existing `ProgressRing` tests unaffected (ring still used in `TrackOverview`). |

---
