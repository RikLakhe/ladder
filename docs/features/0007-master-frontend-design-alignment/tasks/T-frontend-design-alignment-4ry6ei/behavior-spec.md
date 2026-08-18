# Behavior Spec — T-frontend-design-alignment-4ry6ei: PF Page Structure Correction
> Source: task card ACs + snapshot-TSD.md

## B-1 (tracer bullet): AC-1 — getPrimaryFunctionById returns pf_number and domain_classification
- Given: `primary_functions` table has a row with `pf_number = "PF-3"` and `domain_classification = "Execution"`
- When: `getPrimaryFunctionById` is called with that PF's id
- Then: returned object includes `pf_number: "PF-3"` and `domain_classification: "Execution"`

## B-2: AC-4 — Standard/Badge/Training sections render inside active tab body
- Given: PF page rendered with `?level=P4` where P4 has a standards row
- When: page renders
- Then: Standard section, Badge section, and Training section are all inside the active tab body; none appear outside the tab structure

## B-3: AC-3 — N/A tab shows EmptyState not-applicable
- Given: PF page rendered with `?level=P2` where P2 has no standards row
- When: page renders
- Then: tab body shows `<EmptyState variant="not-applicable">` content; no crash; no blank

## B-4: AC-1,2 — PF header shows pf_number + domain_classification; disabled tabs for N/A levels
- Given: PF page rendered where some levels have no standards rows
- When: page renders
- Then: header shows pf_number and domain_classification; LevelTabStrip renders with those levels in disabled/inapplicableLevels prop

## B-5 [e2e]: AC-5 — full PF page navigation
- Given: seeded DB with a PF that has standards for some levels but not others
- When: user navigates to PF page
- Then: P2–P7 tab strip visible; clicking a valid level shows Standard/Badge/Training; clicking an N/A level shows EmptyState; header shows pf_number and domain_classification
