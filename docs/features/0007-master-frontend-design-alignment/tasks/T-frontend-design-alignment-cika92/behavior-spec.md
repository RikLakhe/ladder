# Behavior Spec — T-frontend-design-alignment-cika92: Badge Detail Correctness
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — resolved evidence entry renders as expandable element
- Given: badge detail page rendered with a resolved evidence entry (`resolved: true`, `rowText: "Demonstrated X"`)
- When: page renders
- Then: a `<details>` element (or equivalent expandable) is present containing "Demonstrated X"; it is not silently blank

## B-2: AC-2 — unresolved evidence entry renders warning
- Given: badge detail page rendered with an unresolved evidence entry (`resolved: false`, `instrumentId: "I-1"`, `rowKey: "r1"`)
- When: page renders
- Then: a visible warning element containing "evidence link broken" text is rendered; no blank gap

## B-3: AC-3 — co-signer indicator conditional on cosignerRequired
- Given: two badge detail pages — one with `cosignerRequired: true`, one with `cosignerRequired: false`
- When: each renders
- Then: first shows a co-signer indicator element with tooltip text "Co-signer (delivery/account manager) confirms work context; technical verifier certifies competency."; second shows no co-signer indicator

## B-4: AC-4 — BadgeStatusLegend present exactly once
- Given: badge detail page rendered
- When: page renders
- Then: `<BadgeStatusLegend>` output appears exactly once in the rendered output

## B-5: AC-5 — badge header shows monospace badge_code and TierChip
- Given: badge with `badgeCode: "TS-1-P4"` and `tier: "P4"`
- When: badge detail page renders
- Then: badge_code "TS-1-P4" appears in a monospace element; `<TierChip>` for "P4" is present in the header

## B-6 [e2e]: AC-6 — full badge detail page
- Given: seeded DB with a badge that has valid evidence and `cosignerRequired: true`
- When: user navigates to `/badges/[badgeCode]`
- Then: resolved evidence text visible, status legend present, co-signer indicator present; for a badge with broken evidence reference, warning state visible
