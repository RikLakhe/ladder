# Behavior Spec — T-assessment-badge-viewer-2eetyh: Badge detail API routes + UI consuming live data
> Source: task card ACs + docs/features/0003-master-assessment-badge-viewer/tasks/T-assessment-badge-viewer-2eetyh/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.

## B-1 (tracer bullet): [behavior] GET /api/badges/:badgeCode returns correct JSON for known badge; 404 for unknown
- Given: a seeded badge in the database with badge_code="2E-TEST", name="Test Badge", tier="gold", level="senior", certifies="certifies text", completion_bar="80%", verifier_role="Tech Lead", cosigner_required=true
- When: GET /api/badges/2E-TEST is requested from the running Next.js server
- Then: response status 200, Content-Type application/json, body contains {badgeCode:"2E-TEST", name:"Test Badge", tier:"gold", level:"senior", certifies:"certifies text", completionBar:"80%", verifierRole:"Tech Lead", cosignerRequired:true}
- And: GET /api/badges/NO-SUCH-BADGE returns 404 with body {error:"not found"}

## B-2: [behavior] GET /api/badges/:badgeCode/evidence returns ordered EvidenceResult[]; 404 for unknown badge
- Given: a seeded badge with badge_code="2E-TEST" having evidence_required=[{instrument_id: <valid-uuid>, row_key: "k1"}, {instrument_id: <missing-uuid>, row_key: "k2"}]; the first instrument exists with rows containing key "k1" and text "row text"; the second instrument does not exist
- When: GET /api/badges/2E-TEST/evidence is requested
- Then: response status 200, body is an array of 2 EvidenceResult entries in order: first {instrumentId: ..., rowKey:"k1", resolved:true, rowText:"row text"}, second {instrumentId: ..., rowKey:"k2", resolved:false}
- And: GET /api/badges/NO-SUCH-BADGE/evidence returns 404

## B-3: [e2e] Badge detail page renders live DB data, co-signer indicator toggles correctly
- Given: seeded badge with badge_code="2E-TEST", cosigner_required=true and badge with badge_code="2E-NO-COSIGN", cosigner_required=false; Next.js server running on PORT 34322
- When: GET /badges/2E-TEST is fetched
- Then: response 200; HTML body contains the certifies text, completionBar value, verifierRole value from DB (not mock); contains element matching data-testid="cosigner-indicator"
- And: GET /badges/2E-NO-COSIGN does NOT contain data-testid="cosigner-indicator"

## B-4: [e2e] Evidence chips render resolved/broken states; count matches evidence_required length
- Given: seeded badge "2E-TEST" with evidence_required of length 2 (1 resolvable, 1 broken); Next.js server running
- When: GET /badges/2E-TEST is fetched
- Then: HTML body contains exactly 2 evidence elements; resolved entry contains the rowText inline or in expandable detail; broken entry contains element with data-testid="evidence-broken"; no entry omitted

## Invariants (not RED→GREEN cycles — verified structurally)
- AC-5: page maps over full `evidenceRequired` array without filtering — structural invariant guaranteed by implementation
