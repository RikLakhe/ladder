---
approved_by: "unknown"
approved_at: "2026-08-10"
approved_sha256: "879578acad9319cb0f75a7906bf849731ceaf6c36670419bd11d74dca0b0695b"
---
## Task T-assessment-badge-viewer-2eetyh — Badge detail API routes + UI consuming live data
**Parent:** story S-0003.02 · S-0003.03 · feature 0003-master-assessment-badge-viewer (docs/features/0003-master-assessment-badge-viewer/)
**Design reference:** design/Competency Review App.dc (1).html — badge card layout (lines 1034–1088): `bd.certifies`, `bd.evidence`, `bd.bar`, `bd.verifier`, level/tier tags, "Assessed via" ref chips
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: `GET /api/badges/:badgeCode` returns JSON `{badgeCode, name, tier, level, certifies, completionBar, verifierRole, cosignerRequired}` for a known badge_code; unknown badge_code → 404 JSON `{error:"not found"}`
- [ ] AC-2 [behavior]: `GET /api/badges/:badgeCode/evidence` returns JSON array of `{instrumentId, rowKey, resolved: boolean, rowText?: string}`, one entry per element of that badge's `evidence_required`, preserving order; unknown badge_code → 404
- [ ] AC-3 [e2e]: Badge detail page at `/badges/:badgeCode` renders certifies, completionBar, verifierRole sourced from the database (not mock); renders co-signer indicator when cosignerRequired=true, absent when false
- [ ] AC-4 [e2e]: Badge detail page renders each resolved evidence entry as an expandable chip showing rowText when expanded, and each unresolvable entry as a visible "evidence link broken" element (data-testid="evidence-broken") — matching the "Assessed via" card section in the design reference; no evidence entry omitted
- [ ] AC-5 [invariant]: Evidence entries are never silently omitted — page renders exactly as many evidence elements as the badge's evidence_required array length, including broken entries
**End-to-end AC:** AC-3 + AC-4 [e2e] — badge detail page reachable via GET /badges/:badgeCode from running Next.js app
**Tests:** AC-1, AC-2, AC-3, AC-4 ← ordered; AC-1 = tracer bullet (unit: API route returns correct JSON shape)
**Test scope:** tests/T-assessment-badge-viewer-2eetyh/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
