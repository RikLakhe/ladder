---
approved_by: "Rikesh"
approved_at: "2026-08-11"
approved_sha256: "78173a00dffef07dc6df237829b3d964926434661b7dea228ef6afc73386472b"
---
## Verification — Task T-training-viewer-749xok — 2026-08-11
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- `GET /api/competencies/:competencyId/training?level=X` exists at `src/app/api/competencies/[id]/training/route.ts`, returns JSON array
- Response fields `{id, type, level, sequenceOrder, name}` all present (plus additive `hasSequencingIssue`)
- Fixed type sort order implemented: concept_notes(0) → guided_exercise(1) → autonomous_project(2) → onboarding(3) → reference_card(4); then by sequence_order
- `computeHasSequencingIssue`: prereq with sequence_order > unit.sequence_order → true; otherwise → false
- Data filtered to requested competency_id + level only (integration test confirms no cross-contamination)
- Every row shows sequenceOrder and name
- Rows with forward prereq render visible "⚠ sequencing issue" warning text
- Empty unit list renders gracefully ("No training units")
- No auth required — public handler, no session checks
- E2e test (B-4) passes: navigates to seeded PF page, confirms training section and warning visible
- Integration test uses real seeded PostgreSQL, no mocks of DB

⚠️ **Divergent:** deviation + severity (shallow/deep)
- **[shallow]** API response shape is `{id, type, level, sequenceOrder, name, hasSequencingIssue}` — TSD specifies `{id, type, level, sequenceOrder, name}`. Additive: `hasSequencingIssue` required for AC-3 (warning display) without shipping raw `prereqs` JSONB to client. Documented as resolved open question in exec-plan.
- **[shallow]** Training sub-slot placed directly in `PrimaryFunctionPage` (`page.tsx`) — TSD spec says "Training sub-slot inside `<LevelTabContent>`". No `LevelTabContent` component exists in the codebase; the PF page uses direct level filtering via query param. Functionally equivalent placement; structural label in spec does not match the codebase's actual component hierarchy.
- **[shallow]** `TrainingSection` is marked `"use client"` and re-sorts units client-side. Data arrives pre-sorted from the server; the client-side sort is redundant. Not incorrect (sorts agree) but adds unnecessary client JS bundle weight for a purely presentational component.
- **[shallow]** `TYPE_ORDER` constant duplicated in both `src/lib/training-units.ts` and `src/components/TrainingSection.tsx`. No divergence in values, so behavior is correct, but a DRY violation.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None

❌ **Missing:** acceptance criteria not addressed
- None — all four behaviors (B-1 through B-4) implemented and GREEN

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: computeHasSequencingIssue unit | ✅ | ✅ | ✅ | ✅ | ✅ (no DB, plain objects) |
| B-2: GET /training integration | ✅ | ✅ | ✅ | ✅ | ✅ (real seeded DB) |
| B-3: TrainingSection render | ✅ | ✅ | ✅ | ✅ | ✅ (no DB) |
| B-4: PF page e2e | ✅ | ✅ | ✅ | ✅ | ✅ (real running app) |

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system)
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — TSD: "Boundaries: none", N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
